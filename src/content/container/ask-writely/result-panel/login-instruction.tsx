import { openOptionPage } from '@/common/browser'
import i18next from 'i18next'

export const LoginInstruction: React.FC<{
  accountType: 'Writely' | 'ChatGPT'
}> = ({ accountType }) => {
  return (
    <div className="p-3 bg-zinc-100">
      <span>
        {i18next
          .t('No Writely account detected')
          .replace('Writely', accountType || 'Writely')}
        , {i18next.t('please Go to')}{' '}
      </span>
      <button onClick={openOptionPage} className="text-blue-500 underline">
        {i18next.t('Extension Settings')}
      </button>
      <span> {i18next.t('to connect')}</span>
    </div>
  )
}
