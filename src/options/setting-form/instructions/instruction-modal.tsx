import { addOne, update } from '@/common/api/instructions'
import { useSettings } from '@/common/store/settings'
import i18next from 'i18next'
import { useCallback, useEffect, useState } from 'react'
import { Emoji } from './emoji'
import { useModalState } from './modal-state'

export const InstructionModal: React.FC = () => {
  const { isOpen, reset, editTarget } = useModalState()
  const { refresh } = useSettings()
  const [formValues, setFormValues] = useState({
    icon: '',
    name: '',
    instruction: '',
  })
  const [loading, setLoading] = useState(false)

  const handleOk = useCallback(async () => {
    try {
      setLoading(true)
      if (!formValues.icon || !formValues.name || !formValues.instruction) {
        alert(i18next.t('Please fill in all required fields'))
        return
      }

      if (editTarget) {
        await update({
          ...editTarget,
          ...formValues,
        })
      } else {
        await addOne(formValues)
      }

      reset()
      await refresh()
    } finally {
      setLoading(false)
    }
  }, [formValues, editTarget])

  useEffect(() => {
    if (!isOpen) {
      setFormValues({ icon: '', name: '', instruction: '' })
    } else {
      if (editTarget) {
        setFormValues(editTarget)
      } else {
        setFormValues({ icon: '', name: '', instruction: '' })
      }
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {i18next.t('Create new instruction')}
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {i18next.t('Icon')}
            </label>
            <Emoji
              value={formValues.icon}
              onChange={(icon) => setFormValues({ ...formValues, icon })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {i18next.t('Name')}
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder={i18next.t('Enter the instruction name...')}
              value={formValues.name}
              onChange={(e) =>
                setFormValues({ ...formValues, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {i18next.t('Instruction')}
            </label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder={i18next.t('Example: Write an email to my boss')}
              value={formValues.instruction}
              onChange={(e) =>
                setFormValues({ ...formValues, instruction: e.target.value })
              }
            />
          </div>
        </form>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={reset}
          >
            {i18next.t('Cancel')}
          </button>
          <button
            className={`bg-blue-600 text-white px-4 py-2 rounded-md ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleOk}
            disabled={loading}
          >
            {i18next.t('Ok')}
          </button>
        </div>
      </div>
    </div>
  )
}
