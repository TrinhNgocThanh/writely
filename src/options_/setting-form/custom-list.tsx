import { useState } from 'react'

export const CustomList: React.FC<{
  value?: string[]
  onChange?: (value: string[]) => void
}> = (props) => {
  const [value, setValue] = useState<string[]>(props.value || [])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleAddItem = () => {
    if (inputValue.trim()) {
      const newValue = [inputValue.trim(), ...value]
      setValue(newValue)
      props.onChange?.(newValue)
      setInputValue('')
    }
  }

  const handleRemoveItem = (item: string) => {
    const newValue = value.filter((i) => i !== item)
    setValue(newValue)
    props.onChange?.(newValue)
  }

  return (
    <div>
      <div className="flex gap-4 items-center">
        <input
          className="w-60 p-2 border border-gray-300 rounded"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddItem()
            }
          }}
        />
        <button
          className={`p-2 rounded ${
            inputValue.trim() ? 'bg-green-500' : 'bg-gray-300'
          }`}
          disabled={!inputValue.trim()}
          onClick={handleAddItem}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-2 max-h-56 overflow-auto">
        {value.map((item) => (
          <div key={item} className="flex gap-2 items-center">
            <div>{item}</div>
            <button
              className="p-2 rounded bg-red-500"
              onClick={() => handleRemoveItem(item)}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
