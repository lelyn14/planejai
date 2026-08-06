import { type SimulationFormData, type SimulationRecord } from '../data/simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const record: SimulationRecord = {
      ...formData,
      id,
      createdAt: new Date().toISOString(),
      conversation: [],
    }

    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage
      ? (JSON.parse(storage) as SimulationRecord[])
      : []

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...savedData, record]),
    )

    return id
  }

  const getSimulations = () => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!storage) return []

    try {
      return JSON.parse(storage) as SimulationRecord[]
    } catch {
      return []
    }
  }

  const getFormData = (id: string) => {
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!storage) {
    return null
  }

  const savedData = getSimulations()
  return savedData.find((record) => record.id === id) || null
}

  const updateSimulation = (id: string, data: SimulationRecord) => {
  const savedData = getSimulations()

  const updated = savedData.map((record) =>
    record.id === id ? { ...data } : record,
  )

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
}

  const deleteSimulation = (id: string) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(getSimulations().filter((record) => record.id !== id)),
    )
  }

  return { saveFormData, getFormData, getSimulations, updateSimulation, deleteSimulation }
}
