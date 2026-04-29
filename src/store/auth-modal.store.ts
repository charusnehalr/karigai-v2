import { create } from 'zustand'

type Mode = 'login' | 'signup'
interface AuthModalStore {
  open: boolean
  mode: Mode
  openModal: (mode?: Mode) => void
  closeModal: () => void
  setMode: (mode: Mode) => void
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  open: false,
  mode: 'login',
  openModal: (mode = 'login') => set({ open: true, mode }),
  closeModal: () => set({ open: false }),
  setMode: (mode) => set({ mode }),
}))
