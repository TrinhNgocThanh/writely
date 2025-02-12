import { remove, setTopPinned } from '@/common/api/instructions'
import { useSettings } from '@/common/store/settings'
import { IconBtn } from '@/components/icon-btn'
import { IcBaselineDeleteOutline } from '@/components/icon/delete'
import { MaterialSymbolsEditOutline } from '@/components/icon/edit'
import { MaterialSymbolsArrowUpward } from '@/components/icon/up'
import { Instruction } from '@/options/types'
import i18next from 'i18next'
import { useModalState } from './modal-state'
import { useState } from 'react'

export const List: React.FC<{ value: Instruction[] }> = ({ value }) => {
  const columns = useColumns()

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.title}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {value.map((record) => (
          <tr key={record.id}>
            {columns.map((column) => (
              <td key={column.title} className="px-6 py-4 whitespace-nowrap">
                {column.render
                  ? column.render(null, record)
                  : record[column.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const useColumns = () => {
  const { refresh } = useSettings()
  const { setIsOpen, setEditTarget } = useModalState()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Instruction | null>(null)

  const columns = [
    {
      title: i18next.t('Icon'),
      dataIndex: 'icon',
    },
    {
      title: i18next.t('Name'),
      dataIndex: 'name',
      width: 120,
      render: (value) => <p className="w-48 truncate">{value}</p>,
    },
    {
      title: i18next.t('Instruction'),
      dataIndex: 'instruction',
      width: 200,
      render: (value) => <p className="w-48 truncate">{value}</p>,
    },
    {
      title: i18next.t('/'),
      render: (_, record) => (
        <div className="flex gap-1">
          <button
            className="text-red-500"
            onClick={() => {
              setConfirmDelete(true)
              setDeleteTarget(record)
            }}
          >
            <IcBaselineDeleteOutline />
          </button>
          <button
            onClick={() => {
              setIsOpen(true)
              setEditTarget(record)
            }}
          >
            <MaterialSymbolsEditOutline />
          </button>
          <button
            onClick={async () => {
              await setTopPinned(record.id)
              await refresh()
            }}
          >
            <MaterialSymbolsArrowUpward />
          </button>
        </div>
      ),
    },
  ]

  return columns
}
