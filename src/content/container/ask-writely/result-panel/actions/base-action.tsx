import { PropsWithChildren, useCallback } from 'react'

export const BaseAction: React.FC<
  PropsWithChildren<{
    tooltip?: string
    successTooltip?: string
    onClick?: () => void
  }>
> = ({ tooltip, successTooltip, children, onClick }) => {
  const handleClick = useCallback(() => {
    onClick?.()
  }, [onClick])

  return (
    <div
      className="h-8 w-8 text-base hover:text-xl hover:bg-black hover:text-white rounded-sm hover:rounded-sm flex items-center justify-center cursor-pointer transition-all duration-700"
      onClick={handleClick}
      // data-tooltip={tooltip} // Giữ khai báo tooltip nhưng không hiển thị
    >
      {children}
    </div>
  )
}
