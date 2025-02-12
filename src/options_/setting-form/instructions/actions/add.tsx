import i18next from 'i18next'
import { useModalState } from '../modal-state'

export const Add: React.FC = () => {
  const { setIsOpen } = useModalState()

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        {i18next.t('Add')}
      </button>
      <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg p-2">
        {i18next.t('Add new instruction')}
      </div>
    </div>
  )
}
