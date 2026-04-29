'use client'
import { Menu } from 'lucide-react'
import { useSidebarStore } from '@/store/sidebar.store'
import { KarigaiLogo } from '@/components/ui/KarigaiLogo'

export function TopBar() {
  const { toggle } = useSidebarStore()
  return (
    <div className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-paper border-b border-hairline">
      <button
        onClick={toggle}
        className="w-9 h-9 rounded-xl hover:bg-shell flex items-center justify-center transition-colors"
      >
        <Menu className="w-5 h-5 text-ink2" />
      </button>
      <KarigaiLogo size={17} />
    </div>
  )
}
