import { useCallback, useEffect, useState } from 'react'
import { createContainer } from 'unstated-next'
import browser from 'webextension-polyfill'
import { omit, uniqueId } from 'lodash-es'
import { ServiceProvider, Settings, Instruction } from '../../options/types'

const key = 'writingly-settings'

export const defaultSetting: Settings = {
  model: 'gpt-3.5-turbo',
  url: 'https://api.openai.com/v1',
  customInstructions: [], // ✅ Đảm bảo có giá trị mặc định
}

const _useSettings = () => {
  const [settings, _setSettings] = useState<Settings>(defaultSetting)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    refresh()
  }, [])

  const setSettings = useCallback(
    async (newSettings: Partial<Settings>) => {
      const updatedSettings = {
        ...settings,
        ...newSettings,
        customInstructions:
          newSettings.customInstructions ?? settings.customInstructions ?? [],
      }

      _setSettings(updatedSettings)
      await saveSetting(updatedSettings)
    },
    [settings]
  )

  const refresh = useCallback(async () => {
    const fetchedSettings = await getSetting()
    _setSettings(fetchedSettings)
    setLoading(false)
  }, [])

  return {
    settings,
    setSettings,
    refresh,
    loading,
  }
}

const { useContainer: useSettings, Provider: SettingsProvider } =
  createContainer(_useSettings)
export { useSettings, SettingsProvider }

export const getSetting = async (): Promise<Settings> => {
  const localData = (await browser.storage.local.get(key))?.[key] || {}
  const syncData = (await browser.storage.sync.get(key))?.[key] || {}

  // ✅ Đảm bảo `customInstructions` luôn là một mảng hợp lệ
  const settings: Settings = {
    ...defaultSetting,
    ...syncData,
    ...localData,
    customInstructions: Array.isArray(localData.customInstructions)
      ? localData.customInstructions
      : [],
  }

  patchCustomInstructions(settings)
  patchDefaultSetting(settings)

  if (!settings.serviceProvider) {
    settings.serviceProvider = ServiceProvider.Writely
  }

  return settings
}

export const saveSetting = async (newSettings: Partial<Settings>) => {
  const settings = {
    ...(await getSetting()),
    ...newSettings,
    customInstructions: Array.isArray(newSettings.customInstructions)
      ? newSettings.customInstructions
      : [],
  }

  // Chỉ lưu `customInstructions` vào local storage
  const localNewSettings =
    settings.customInstructions.length > 0
      ? { customInstructions: settings.customInstructions }
      : null
  const remoteSettings = omit(settings, 'customInstructions')

  await browser.storage.sync.set({ [key]: remoteSettings })

  if (localNewSettings) {
    await browser.storage.local.set({ [key]: localNewSettings })
  }
}

const patchCustomInstructions = (setting: Settings) => {
  setting.customInstructions = Array.isArray(setting.customInstructions)
    ? setting.customInstructions.map((instruction: string | Instruction) => {
        if (typeof instruction === 'string') {
          return {
            id: uniqueId(),
            name: instruction,
            instruction,
            icon: '😄',
          }
        }
        return instruction
      })
    : []
}

const patchDefaultSetting = (setting: Settings) => {
  Object.keys(defaultSetting).forEach((key) => {
    if (setting[key] === undefined) {
      setting[key] = defaultSetting[key]
    }
  })
}
