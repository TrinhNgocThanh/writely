import { Menu } from './container/index'
import { SettingsProvider } from '../common/store/settings'
import { conatinerId, tag } from './shadow-dom'

export const App: React.FC = () => {
  const shadowRoot = document.getElementsByTagName(tag)[0]?.shadowRoot

  return (
    <SettingsProvider>
      <div className="text-black">
        <Menu />
      </div>
    </SettingsProvider>
  )
}
