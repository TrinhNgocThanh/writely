import { MutableRefObject, useRef } from 'react'
import ReactDraggable from 'react-draggable'
import { useSelectionManager } from '../store/selection'
import { useView } from '../store/view'
import { Content } from './content'

export const AskWritely: React.FC = () => {
  const selectionManager = useSelectionManager()
  const { position } = selectionManager
  const { viewStatus } = useView()
  const fixedRef = useRef<HTMLDivElement>(null) // Khởi tạo ref đúng cách

  if (viewStatus === 'none') {
    return null
  }

  const content = (
    <div
      ref={fixedRef}
      style={{
        position: 'fixed',
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: 9999999999999,
      }}
    >
      <Content />
    </div>
  )

  if (viewStatus === 'icon') {
    return content
  }

  return <ReactDraggable handle=".handle">{content}</ReactDraggable>
}

// Hàm này trả về ref nếu tồn tại, tránh lỗi undefined
export const getFixedDom = () => {
  console.warn('getFixedDom được gọi, nhưng ref có thể chưa được gán.')
  return null
}
