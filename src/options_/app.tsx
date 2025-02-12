import { SettingsForm } from './setting-form'
import { SettingsProvider } from '../common/store/settings'

export const App: React.FC = () => {
  return (
    <SettingsProvider>
      <div className="flex justify-center min-h-screen min-w-full bg-gray-100">
        <div className="w-full max-w-5xl p-4 bg-white shadow-md rounded-lg">
          <SettingsForm />
        </div>
      </div>
    </SettingsProvider>
  )
}
