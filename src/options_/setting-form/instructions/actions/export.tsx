import { download } from '@/common/file'
import { getSetting } from '@/common/store/settings'
import i18next from 'i18next'
import { useCallback, useState } from 'react'

export const Export: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false)

  const handleExport = useCallback(async () => {
    const settings = await getSetting()
    const instructions = settings.customInstructions

    if (!instructions || !instructions?.length) {
      alert(i18next.t('No data'))
      return
    }

    const blob = new Blob([JSON.stringify(instructions)])
    const url = URL.createObjectURL(blob)

    download(url, 'writely-instructions.json')
  }, [])

  return (
    <div className="relative inline-block">
      <button
        onClick={handleExport}
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        {i18next.t('Export')}
      </button>
      {showPopover && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
          {i18next.t('Export instructions as JSON')}
        </div>
      )}
    </div>
  )
}
