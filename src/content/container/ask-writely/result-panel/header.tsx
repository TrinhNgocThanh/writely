import { Switch } from 'antd'
import {
  MdiClose,
  MaterialSymbolsKeyboardBackspace,
  DashiconsAdminGeneric,
} from '@/components/icon'
import { MutableRefObject, ReactNode } from 'react'
import { useView } from '../../store/view'
import i18next from 'i18next'
import { useResultPanel } from '../../store/result-panel'
import type { MessagePayload } from '@/common/types'
import { EventName } from '@/common/event-name'
import browser from 'webextension-polyfill'

export const Header: React.FC<{ abortRef: MutableRefObject<() => void> }> = ({
  abortRef,
}) => {
  const { hide, goToInputPage } = useView()
  const { isOriginText, setIsOriginText } = useResultPanel()

  const back = () => {
    goToInputPage()
    abortRef.current?.()
  }

  return (
    <div className="flex px-2 items-center bg-zinc-900 cursor-move handle justify-between">
      <div className="flex items-center">
        <Operation icon={<MaterialSymbolsKeyboardBackspace />} onClick={back} />
        <Operation icon={<MdiClose />} onClick={hide} />
      </div>
      <div className="flex items-center">
        <Operation
          icon={
            <Switch
              size="small"
              title={i18next.t('Text')}
              checked={!!isOriginText}
              onChange={(e) => setIsOriginText(e)}
              className={isOriginText ? '!bg-amber-800' : '!bg-gray-400'}
            />
          }
        />
        <Operation
          onClick={() => {
            browser.runtime.sendMessage({
              type: EventName.openOptionsPage,
            })
          }}
          icon={<DashiconsAdminGeneric />}
        />
      </div>
    </div>
  )
}

const Operation: React.FC<{
  icon: ReactNode
  onClick?: () => void
}> = ({ icon, onClick }) => {
  return (
    <div
      onClick={() => onClick?.()}
      className="text-white p-3 text-base flex items-center justify-center cursor-pointer hover:bg-zinc-700 transition-all duration-700"
    >
      {icon}
    </div>
  )
}
