import { Instruction } from '@/options/types'
import { uniqueId } from 'lodash-es'
import { getSetting, saveSetting } from '../store/settings'

export const addOne = async (instruction: Instruction) => {
  const settings = await getSetting()

  const newInstruction = {
    id: uniqueId(Date.now() + ''),
    ...instruction,
  }

  settings.customInstructions.push(newInstruction)
  await saveSetting(settings)

  return newInstruction // ✅ Trả về object mới thay vì undefined
}

export const update = async (instruction: Instruction) => {
  const settings = await getSetting()

  settings.customInstructions = settings.customInstructions.map((item) =>
    item.id === instruction.id ? instruction : item
  )

  await saveSetting(settings)
  return true // ✅ Trả về true khi hoàn thành
}

export const remove = async (id: string) => {
  const settings = await getSetting()

  settings.customInstructions = settings.customInstructions.filter(
    (item) => item.id !== id
  )

  await saveSetting(settings)
  return true // ✅ Trả về true khi xóa thành công
}

export const setTopPinned = async (id: string) => {
  const settings = await getSetting()
  const pinnedInstruction = settings.customInstructions.find(
    (item) => item.id === id
  )

  if (!pinnedInstruction) return false // ✅ Kiểm tra nếu không tìm thấy

  settings.customInstructions = [
    pinnedInstruction,
    ...settings.customInstructions.filter((item) => item.id !== id),
  ]

  await saveSetting(settings)
  return true
}

export const batchAdd = async (instructions: Instruction[]) => {
  const settings = await getSetting()

  const validInstructions = instructions
    .filter((i) => i.name && i.instruction)
    .map((i) => ({
      id: uniqueId(Date.now() + ''),
      name: i.name,
      instruction: i.instruction,
      icon: i.icon,
    }))

  settings.customInstructions.push(...validInstructions)
  await saveSetting(settings)

  return validInstructions.length // ✅ Trả về số lượng đã thêm
}
