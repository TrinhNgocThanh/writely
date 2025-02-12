import { useState } from 'react'
import i18next from 'i18next'
import { useModalState } from '../modal-state'

export const Add: React.FC = () => {
  const { setIsOpen } = useModalState()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {i18next.t('Add')}
      </button>
      {isPopoverOpen && (
        <div className="absolute z-10 w-48 p-2 mt-2 text-sm text-white bg-gray-800 rounded shadow-lg">
          {i18next.t('Add new instruction')}
        </div>
      )}
    </div>
  )
}
