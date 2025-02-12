import { ReactNode, useState } from 'react'

export const Operation: React.FC<{
  icon: ReactNode
  tooltip?: string // Không bắt buộc tooltip
  onClick?: () => void
}> = ({ icon, tooltip, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div
      onClick={onClick}
      className="writely-button relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {icon}
      {tooltip && showTooltip && (
        <div className="absolute bottom-full mb-2 w-max p-2 bg-gray-700 text-white text-sm rounded">
          {tooltip}
        </div>
      )}
    </div>
  )
}
