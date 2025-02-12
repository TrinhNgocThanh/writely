import React from 'react'
import i18next from 'i18next'
import { langs } from '../../common/langs'
import { Instructions } from './instructions'

export const SystemSetting: React.FC = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">{i18next.t('System')}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {i18next.t('Language')}
        </label>
        <div className="flex space-x-2">
          {langs.map((lang, index) => (
            <label key={index} className="flex items-center space-x-1">
              <input
                type="radio"
                name="lang"
                value={lang.value}
                className="form-radio"
              />
              <span>{lang.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {i18next.t('Debug')}
        </label>
        <input type="checkbox" name="debug" className="form-checkbox" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {i18next.t('Custom instructions')}
        </label>
        <Instructions />
      </div>
    </div>
  )
}
