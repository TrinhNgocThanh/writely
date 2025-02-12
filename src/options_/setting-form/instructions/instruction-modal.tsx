import { addOne, update } from '@/common/api/instructions'
import { useSettings } from '@/common/store/settings'
import i18next from 'i18next'
import { useCallback, useEffect, useState } from 'react'
import { Emoji } from './emoji'
import { useModalState } from './modal-state'

export const InstructionModal: React.FC = () => {
  const { isOpen, reset, editTarget } = useModalState()
  const { refresh } = useSettings()
  const [formData, setFormData] = useState({
    icon: '',
    name: '',
    instruction: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setFormData({ icon: '', name: '', instruction: '' })
    } else {
      setFormData(editTarget || { icon: '', name: '', instruction: '' })
    }
  }, [isOpen, editTarget])

  const handleOk = useCallback(async () => {
    try {
      setLoading(true)
      if (!formData.icon || !formData.name || !formData.instruction) {
        return
      }

      if (editTarget) {
        await update({ ...editTarget, ...formData })
      } else {
        await addOne(formData)
      }

      reset()
      await refresh()
    } finally {
      setLoading(false)
    }
  }, [formData, editTarget])

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-semibold">
            {i18next.t('Create new instruction')}
          </h3>
          <div className="flex flex-col gap-4 mt-4">
            <label className="block">
              {i18next.t('Icon')}
              <Emoji
                value={formData.icon}
                onChange={(icon) => setFormData({ ...formData, icon })}
              />
            </label>

            <label className="block">
              {i18next.t('Name')}
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={i18next.t('Enter the instruction name...')}
                className="border p-2 w-full mt-1 rounded"
              />
            </label>

            <label className="block">
              {i18next.t('Instruction')}
              <textarea
                value={formData.instruction}
                onChange={(e) =>
                  setFormData({ ...formData, instruction: e.target.value })
                }
                placeholder={i18next.t('Example: Write an email to my boss')}
                className="border p-2 w-full mt-1 rounded"
              ></textarea>
            </label>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={reset}
              className="px-4 py-2 border rounded text-gray-700"
            >
              {i18next.t('Cancel')}
            </button>
            <button
              onClick={handleOk}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? i18next.t('Loading...') : i18next.t('Ok')}
            </button>
          </div>
        </div>
      </div>
    )
  )
}
