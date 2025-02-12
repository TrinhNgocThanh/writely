import { Tooltip } from 'antd'
import { ReactNode, useState } from 'react'

export const Operation: React.FC<{
  icon: ReactNode
  tooltip?: string // Không bắt buộc tooltip
  onClick?: () => void
}> = ({ icon, onClick }) => {
  return (
    <div onClick={onClick} className="writely-button">
      {icon}
    </div>
  )
}
