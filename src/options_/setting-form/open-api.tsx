import { useCallback, useState } from 'react'
import { useModels, useOpenAIEditPrompt } from '../../common/api/openai'
import i18next from 'i18next'
import { ServiceProvider } from '../types'

export const OPENAISettings: React.FC = () => {
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('')
  const [temperature, setTemperature] = useState('1')
  const [url, setUrl] = useState('https://api.openai.com/v1')

  return (
    <div className="shadow-lg p-4 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold">Open AI</h2>
      <div className="flex flex-col gap-4 mt-4">
        <label className="block">
          {i18next.t('OpenAI API Key')}
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="border p-2 w-full mt-1 rounded"
          />
          <p className="text-sm text-gray-500">
            {i18next.t("Don't know? Get your API key")}{' '}
            <a
              className="text-blue-500"
              href="https://platform.openai.com/account/api-keys"
            >
              {i18next.t('here')}
            </a>
          </p>
        </label>

        <label className="block">
          {i18next.t('Model')}
          <FormModelSelect value={model} onChange={setModel} />
        </label>

        <label className="block">
          {i18next.t('Temperature')}
          <div className="flex gap-2 mt-1">
            {['0', '0.7', '1'].map((temp) => (
              <button
                key={temp}
                className={`p-2 border rounded ${
                  temperature === temp
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100'
                }`}
                onClick={() => setTemperature(temp)}
                title={temp}
              >
                {i18next.t(
                  temp === '0'
                    ? 'accurate'
                    : temp === '0.7'
                    ? 'balance'
                    : 'creative'
                )}
              </button>
            ))}
          </div>
        </label>

        <label className="block">
          {i18next.t('URL')}
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border p-2 w-full mt-1 rounded"
          />
        </label>
      </div>

      <ConnectionTest />
    </div>
  )
}

const ConnectionTest: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const queryOpenAIEdit = useOpenAIEditPrompt()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [message, setMessage] = useState('hello')

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
    <div className="mt-4">
      <button
        onClick={() => setModalVisible(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {i18next.t('Test')}
      </button>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold">
              {i18next.t('Test connection')}
            </h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 w-full mt-2 rounded"
            ></textarea>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setModalVisible(false)}
                className="px-4 py-2 border rounded"
              >
                {i18next.t('Cancel')}
              </button>
              <button
                onClick={handleOk}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? i18next.t('Loading...') : i18next.t('Send message')}
              </button>
            </div>
            <p className="mt-2 text-gray-700">{result}</p>
          </div>
        </div>
      )}
    </div>
  )
}

const FormModelSelect: React.FC<{
  value?: string
  onChange?: (v: string) => void
}> = ({ value, onChange }) => {
  const models = useModels()

  return (
    <>
      <input
        placeholder={i18next.t('Model')}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="border p-2 w-full mt-1 rounded"
      />
      <div className="flex items-center gap-2 py-2">
        {models.map((m) => (
          <div
            className="px-2 py-1 bg-orange-300 hover:bg-orange-400 cursor-pointer text-white rounded text-sm"
            onClick={() => onChange?.(m)}
            key={m}
          >
            {m}
          </div>
        ))}
      </div>
    </>
  )
}
