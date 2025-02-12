import { DashiconsAdminGeneric } from '@/components/icon'
import './index.css'
import browser from 'webextension-polyfill'

export const App: React.FC = () => {
  const openSettings = () => {
    const url = browser.runtime.getURL('dist/options/index.html')
    window.open(url)
  }

  return (
    <div className="w-64 bg-transparent">
      {/* Hộp chứa nội dung */}
      <div className="bg-white border border-gray-300 rounded-sm shadow-lg overflow-hidden pb-2">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
          <div className="text-sm font-semibold text-blue-600 tracking-wide drop-shadow-sm animate-bounce">
            ✨ Trợ lý nội dung AI...
          </div>
          <button
            className="p-1.5 rounded-sm hover:bg-gray-300 transition-all shadow-sm"
            onClick={openSettings}
          >
            <DashiconsAdminGeneric className="text-lg text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  )
}
