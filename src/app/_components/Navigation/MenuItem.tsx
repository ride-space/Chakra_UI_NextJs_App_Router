import {ComponentProps, memo} from 'react'

export const MenuItem = ({label,onClick }:{label: string,onClick:ComponentProps<'button'>['onClick'] }) => {
  return (
    <button
    onClick={onClick}
    className="px-4 py-3 text-center font-bold transition hover:bg-neutral-100"
  >
    {label}
  </button>
  )
}

export const MenuItemMemo = memo(MenuItem)

