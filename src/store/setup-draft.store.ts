import { create } from 'zustand'

interface SetupDraftStore {
  currentSection: number
  setSection: (n: number) => void
  progress: number
  setProgress: (n: number) => void
}

export const useSetupDraftStore = create<SetupDraftStore>((set) => ({
  currentSection: 0,
  setSection: (n) => set({ currentSection: n }),
  progress: 0,
  setProgress: (n) => set({ progress: n }),
}))
