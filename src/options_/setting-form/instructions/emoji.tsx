import { useControllableValue } from 'ahooks'
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useState } from 'react'

export const Emoji: React.FC<{
  value?: string
  onChange?: (value: string) => void
}> = (props) => {
  const [value, setValue] = useControllableValue(props)
  const [isPickerVisible, setPickerVisible] = useState(false)

  useEffect(() => {
    if (!value) {
      setValue('😄')
    }
  }, [value])

  return (
    <div className="relative">
      <div
        className="w-10 h-10 flex items-center justify-center text-xl rounded-sm bg-slate-200 cursor-pointer"
        onClick={() => setPickerVisible(!isPickerVisible)}
      >
        {value}
      </div>
      {isPickerVisible && (
        <div className="absolute z-10">
          <EmojiPicker
            onEmojiClick={(e) => {
              setValue(e.emoji)
              setPickerVisible(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
