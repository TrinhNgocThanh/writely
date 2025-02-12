import { Avatar, Button, Input } from 'antd'
import { forwardRef, PropsWithChildren, useCallback, useState } from 'react'
import cx from 'classnames'
import { ResultPanel } from '../result-panel'
import { PromptCenter } from '../prompts'
import { IcBaselineSend, Logo } from '@/components/icon'
import { DashiconsMove } from '@/components/icon/drag'

import i18next from 'i18next'
import { IcOutlineKeyboardReturn } from '@/components/icon/return'
import { useView } from '../../store/view'
import { QuickPrompt } from './quick-prompt'
import { useInstruction } from '../../store/instruction'

export const Content: React.FC<PropsWithChildren> = () => {
  return <CenterContent />
}

const CenterContent = forwardRef<HTMLDivElement>((_, ref) => {
  const { instruction, setInstruction } = useInstruction()
  const { viewStatus, goToInputPage } = useView()

  const handleClickIcon = useCallback(() => {
    goToInputPage()
  }, [goToInputPage])

  if (viewStatus === 'icon') {
    return (
      <div
        onClick={handleClickIcon}
        className="flex justify-center items-center"
      >
        <Avatar
          className="cursor-pointer bg-black text-2xl hover:text-gray-700 transition-colors"
          icon={<Logo />}
        />
      </div>
    )
  }

  if (viewStatus === 'result') {
    return <ResultPanel text={instruction} />
  }

  return <InputPanel keyword={instruction} onChange={setInstruction} />
})

const InputPanel: React.FC<{
  keyword: string
  onChange: (keyword: string, instruction?: string) => void
}> = ({ onChange }) => {
  const { goToResult } = useView()
  const [value, setValue] = useState('')

  return (
    <>
      <div className="bg-zinc-100 transition-all duration-300 relative w-80 border border-gray-300">
        {/* Textarea Input */}
        <Input.TextArea
          className="pl-8 pr-12 py-2 text-sm border-none focus:ring-0 bg-transparent"
          onPressEnter={() => {
            onChange(value)
            goToResult()
          }}
          autoFocus
          autoSize={{ minRows: 1, maxRows: 4 }}
          placeholder="Yêu cầu AI..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {/* Gửi yêu cầu */}
        <SendToWritelyTip>
          <div
            className="absolute right-2 bottom-[6px] cursor-pointer"
            onClick={() => {
              onChange(value)
              goToResult()
            }}
          >
            <IcBaselineSend
              className={cx(
                'w-5 h-5 text-gray-500',
                value?.trim()?.length
                  ? 'text-blue-600 hover:text-blue-700'
                  : 'text-gray-300'
              )}
            />
          </div>
        </SendToWritelyTip>

        {/* Nút kéo thả */}
        <Button
          type="text"
          className="absolute left-[4px] top-[4px] text-lg handle flex items-center justify-center w-6 h-6 p-0 bg-transparent"
          icon={<DragTip />}
        />
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="w-80 bg-zinc-100 border border-gray-300 overflow-auto max-h-52 mt-2">
        <QuickPrompt
          filter={value}
          onClick={(instruction: string) => {
            goToResult()
            onChange(instruction)
          }}
        />
      </div>
    </>
  )
}

const SendToWritelyTip: React.FC<PropsWithChildren> = ({ children }) => {
  return <div data-tooltip={i18next.t('Send to writely')}>{children}</div>
}

const DragTip: React.FC<PropsWithChildren> = () => {
  return (
    <div
      data-tooltip={i18next.t('Drag')}
      className="flex items-center justify-center w-full h-full"
    >
      <DashiconsMove className="text-gray-500 hover:text-gray-700" />
    </div>
  )
}
