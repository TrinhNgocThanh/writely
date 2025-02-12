import { batchAdd } from '@/common/api/instructions'
import { useSettings } from '@/common/store/settings'
import i18next from 'i18next'
import { debounce } from 'lodash-es'
import { useCallback, useState } from 'react'

export const Import: React.FC = () => {
  const { refresh } = useSettings()
  const [loading, setLoading] = useState(false)
  const [popoverVisible, setPopoverVisible] = useState(false)

  const handleUploadChange = useCallback(
    debounce(
      async (file: File) => {
        try {
          setLoading(true)
          const text = await file.text()
          const json = JSON.parse(text)
          await batchAdd(json)
          await refresh()
          alert(i18next.t('😄 Imported successfully'))
        } catch {
          alert(i18next.t('😭 Error format'))
        } finally {
          setLoading(false)
        }
      },
      1000,
      { leading: true, trailing: false }
    ),
    []
  )

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleUploadChange(file)
    }
  }

  return (
    <div className="relative inline-block">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onMouseEnter={() => setPopoverVisible(true)}
        onMouseLeave={() => setPopoverVisible(false)}
        disabled={loading}
      >
        {loading ? i18next.t('Loading...') : i18next.t('Import')}
      </button>
      {popoverVisible && (
        <div className="absolute left-0 mt-2 w-48 p-2 bg-white border border-gray-300 rounded shadow-lg">
          {i18next.t('Import instructions')}
        </div>
      )}
      <input
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <span className="sr-only">Upload file</span>
      </label>
    </div>
  )
}
