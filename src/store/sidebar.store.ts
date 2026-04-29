import { create } from 'zustand'

interface SidebarStore {
  open: boolean
  toggle: () => void
  setOpen: (v: boolean) => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  open: false,
  toggle: () => set((s) => ({ open: !s.open })),
  setOpen: (v) => set({ open: v }),
}))
