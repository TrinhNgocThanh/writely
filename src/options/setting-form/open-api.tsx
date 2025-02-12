import { useCallback, useState } from 'react'
import { useModels, useOpenAIEditPrompt } from '../../common/api/openai'
import cx from 'classnames'
import i18next from 'i18next'
import { ServiceProvider } from '../types'

export const OPENAISettings: React.FC = () => {
  const value = useWatch('serviceProvider')

  if (value !== ServiceProvider.OpenAI) {
    return null
  }

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Open AI</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {i18next.t('OpenAI API Key')}
        </label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder={i18next.t('Enter your API key')}
        />
        <div className="text-xs text-gray-500 mt-1">
          Don't know or don't have one? reach{' '}
          <a
            className="text-blue-300"
            href="https://platform.openai.com/account/api-keys"
          >
            here
          </a>{' '}
          for more details
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {i18next.t('Model')}
        </label>
        <FormModelSelect />
        <div className="text-xs text-gray-500 mt-1">
          <a
            className="text-blue-300"
            href="https://platform.openai.com/docs/models/overview"
          >
            {i18next.t('Models Introduction')}
          </a>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {i18next.t('Temperature')}
        </label>
        <div className="flex space-x-2">
          <button className="p-2 border rounded bg-gray-200" value="0">
            {i18next.t('accurate')}
          </button>
          <button className="p-2 border rounded bg-gray-200" value="0.7">
            {i18next.t('balance')}
          </button>
          <button className="p-2 border rounded bg-gray-200" value="1">
            {i18next.t('creative')}
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          <a
            className="text-blue-300"
            href="https://platform.openai.com/docs/api-reference/chat/create#chat/create-temperature"
          >
            {i18next.t('Temperature Introduction')}
          </a>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {i18next.t('URL')}
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="https://api.openai.com/v1"
        />
      </div>
      <ConnectionTest />
    </div>
  )
}

const ConnectionTest: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const queryOpenAIEdit = useOpenAIEditPrompt()
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<string>('')
  const [message, setMessage] = useState<string>('hello')

  const handleOk = useCallback(async () => {
    setLoading(true)
    setResult('')

    try {
      await queryOpenAIEdit(message, 'test', (text, err, end) => {
        setResult(text)

        if (err) {
          setLoading(false)
          setResult(err.message)
        }

        if (end) {
          setLoading(false)
        }
      })
    } catch (e) {
      setResult(e.toString())
      setLoading(false)
    }
  }, [queryOpenAIEdit])

  return (
    <div>
      <button
        onClick={() => setModalVisible(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {i18next.t('Test')}
      </button>
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-1/2">
            <h3 className="text-lg font-semibold mb-4">
              {i18next.t('Test connection')}
            </h3>
            <textarea
              className="w-full p-2 border rounded mb-4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModalVisible(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                {i18next.t('Cancel')}
              </button>
              <button
                onClick={handleOk}
                className={`px-4 py-2 bg-blue-500 text-white rounded ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {i18next.t('Send message')}
              </button>
            </div>
            <div className="mt-4">
              <p>{result}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const ModelCard: React.FC<
  React.PropsWithChildren<{ tooltip: string; model: string }>
> = ({ model, tooltip, children }) => {
  const m = useWatch('model')
  const content = (
    <div
      className={cx(
        'border border-gray-100 hover:rounded-lg rounded-sm hover:shadow-sm transition-all duration-300 p-3  bg-zinc-100 flex flex-col gap-2',
        m === model ? '!border-black' : ''
      )}
    >
      <div className="font-semibold text-sm">{children ? children : model}</div>
    </div>
  )

  if (tooltip) {
    return <div title={tooltip}>{content}</div>
  }

  return content
}

const FormModelSelect: React.FC<{
  value?: string
  onChange?: (v: string) => void
}> = ({ value, onChange }) => {
  const models = useModels()

  return (
    <>
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder={i18next.t('Model')}
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value)
        }}
      />
      <div className="flex items-center gap-2 py-2">
        {models.map((m) => (
          <div
            className="px-1 bg-orange-300 hover:bg-orange-400 cursor-pointer text-white rounded-sm text-xs"
            onClick={() => {
              onChange?.(m)
            }}
            key={m}
          >
            {m}
          </div>
        ))}
      </div>
    </>
  )
}

const useWatch = (name: string) => {
  // Mock implementation of Form.useWatch
  const [value, setValue] = useState('')
  return value
}
