import { useEffect } from 'react'
import { AskWritely, getFixedDom } from './ask-writely'
import { SelectionManagerProvider } from './store/selection'
import 'highlight.js/styles/github.css'
import { ViewProvider } from './store/view'
import { InstructionProvider } from './store/instruction'

export const Menu: React.FC = () => {
  return (
    <div className="relative">
      <SelectionManagerProvider>
        <InstructionProvider>
          <ViewProvider>
            <AskWritely />
          </ViewProvider>
        </InstructionProvider>
      </SelectionManagerProvider>
    </div>
  )
}
