import { OpenAILogo } from '@/components/icon/open-ai'
import { IconWritely } from '@/components/icon/writely'
import i18next from 'i18next'
import { ServiceProvider } from '../types'
import classNames from 'classnames'
import { MaterialSymbolsAddLink } from '@/components/icon/link'
import { useUser } from '@/common/api/writely'
import { MaterialSymbolsCheckCircleRounded } from '@/components/icon/checked'
import { ChatGPTIcon } from '@/components/icon/chatgpt'
import { useChatGPTWebInfo } from '@/common/api/chatgpt-web'
import { useState } from 'react'

export const ProviderSetting: React.FC = () => {
  const [value, setValue] = useState<ServiceProvider | null>(null)
  const activeClassNames = 'bg-black text-white'

  const isCheckedWritely = value === ServiceProvider.Writely
  const isCheckedOpenAI = value === ServiceProvider.OpenAI
  const isCheckedChatGPT = value === ServiceProvider.ChatGPT

  return (
    <div className="p-4 shadow-md rounded-md">
      <h2 className="text-xl font-semibold">{i18next.t('Service Provider')}</h2>
      <div className="mt-4">
        <div className="flex justify-center w-full">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="serviceProvider"
              value={ServiceProvider.Writely}
              checked={isCheckedWritely}
              onChange={() => setValue(ServiceProvider.Writely)}
              className="hidden"
            />
            <div
              className={classNames(
                'flex gap-2 justify-center items-center py-3 px-5 rounded-full',
                isCheckedWritely ? activeClassNames : '',
                isCheckedWritely ? 'shadow-md' : ''
              )}
            >
              <IconWritely className="h-11" />
              <span className="font-semibold text-3xl">Writely</span>
            </div>
          </label>
          <label className="flex items-center cursor-pointer ml-4">
            <input
              type="radio"
              name="serviceProvider"
              value={ServiceProvider.OpenAI}
              checked={isCheckedOpenAI}
              onChange={() => setValue(ServiceProvider.OpenAI)}
              className="hidden"
            />
            <div
              className={classNames(
                'items-center py-3 px-5 rounded-full',
                isCheckedOpenAI ? activeClassNames : '',
                isCheckedOpenAI ? 'shadow-md' : ''
              )}
            >
              <OpenAILogo className="h-11 w-auto" />
            </div>
          </label>
          <label className="flex items-center cursor-pointer ml-4">
            <input
              type="radio"
              name="serviceProvider"
              value={ServiceProvider.ChatGPT}
              checked={isCheckedChatGPT}
              onChange={() => setValue(ServiceProvider.ChatGPT)}
              className="hidden"
            />
            <div
              className={classNames(
                'items-center py-3 px-5 rounded-full flex gap-2',
                isCheckedChatGPT ? activeClassNames : '',
                isCheckedChatGPT ? 'shadow-md' : ''
              )}
            >
              <ChatGPTIcon className="h-11 w-auto" />
              <span className="font-semibold text-3xl">ChatGPT</span>
            </div>
          </label>
        </div>
      </div>
      {isCheckedWritely ? <LinkToWritelySite /> : null}
      {isCheckedChatGPT ? <LinkToChatgptWeb /> : null}
    </div>
  )
}

const LinkToWritelySite: React.FC = () => {
  const { isLoading, data } = useUser()
  const email = data?.data?.user?.email

  return (
    <div className="flex py-4 border-t border-gray-300 text-xl gap-3 items-center justify-center">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : email ? (
        <div className="flex gap-1 items-center">
          <a
            target="_blank"
            href="https://writely.miao-ya.com"
            className="text-lg"
          >
            {data?.data?.user?.email}
          </a>
          <span className="text-green-500">
            <MaterialSymbolsCheckCircleRounded />
          </span>
        </div>
      ) : (
        <>
          <span>{i18next.t('Connect your writely account')}</span>
          <a
            target="_blank"
            href="https://writely.miao-ya.com"
            className="text-blue-500 text-3xl"
          >
            <MaterialSymbolsAddLink />
          </a>
        </>
      )}
    </div>
  )
}

const LinkToChatgptWeb: React.FC = () => {
  const { isLoading, error, data } = useChatGPTWebInfo()

  if (error) {
    return <span>error</span>
  }

  const name = data?.user?.name || data?.user?.email

  return (
    <div className="flex py-4 border-t border-gray-300 text-xl gap-3 items-center justify-center">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : name ? (
        <div className="flex gap-1 items-center">
          <a
            target="_blank"
            href="https://chat.openai.com/"
            className="text-lg"
          >
            {name}
          </a>
          <span className="text-green-500">
            <MaterialSymbolsCheckCircleRounded />
          </span>
        </div>
      ) : (
        <>
          <span>{i18next.t('Connect your Chatgpt account')}</span>
          <a
            target="_blank"
            href="https://chat.openai.com/"
            className="text-blue-500 text-3xl"
          >
            <MaterialSymbolsAddLink />
          </a>
        </>
      )}
    </div>
  )
}
