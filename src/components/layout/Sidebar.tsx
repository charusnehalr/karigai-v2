'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { KarigaiLogo } from '@/components/ui/KarigaiLogo'
import { createClient } from '@/lib/supabase/client'
import { useSidebarStore } from '@/store/sidebar.store'
import {
  LayoutDashboard, SlidersHorizontal, BarChart3,
  Moon, UtensilsCrossed, Dumbbell, MessageCircle,
  User, Shield, LogOut, X
} from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  badge?: string
}

const navItems: NavItem[] = [
  { href: '/app/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: '/app/setup', label: 'Setup', icon: <SlidersHorizontal className="w-4 h-4" /> },
  { href: '/app/analysis', label: 'Analysis', icon: <BarChart3 className="w-4 h-4" /> },
  { href: '/app/cycle', label: 'Cycle Tracker', icon: <Moon className="w-4 h-4" /> },
  { href: '/app/meals', label: 'Meals & Nutrition', icon: <UtensilsCrossed className="w-4 h-4" /> },
  { href: '/app/workout', label: 'Workout', icon: <Dumbbell className="w-4 h-4" /> },
  { href: '/app/chat', label: 'Chat', icon: <MessageCircle className="w-4 h-4" /> },
]

const bottomItems: NavItem[] = [
  { href: '/app/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  { href: '/app/privacy', label: 'Privacy', icon: <Shield className="w-4 h-4" /> },
]

function NavLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const pathname = usePathname()
  const active = pathname === item.href || pathname.startsWith(item.href + '/')
  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={cn(
        'flex items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm transition-all duration-150',
        active
          ? 'bg-claySoft text-clay border-l-2 border-clay pl-2.5'
          : 'text-muted hover:bg-shell hover:text-ink2',
        collapsed && 'justify-center px-2'
      )}
    >
      <span className="flex-shrink-0">{item.icon}</span>
      {!collapsed && (
        <span className="flex-1 truncate">{item.label}</span>
      )}
      {!collapsed && item.badge && (
        <span className="ml-auto text-[10px] font-mono text-muted bg-shell rounded-full px-2 py-0.5">
          {item.badge}
        </span>
      )}
    </Link>
  )
}

export function Sidebar() {
  const { open, setOpen } = useSidebarStore()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full bg-card border-r border-hairline z-50 flex flex-col transition-all duration-200',
        'lg:relative lg:translate-x-0',
        open ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0',
        'lg:w-64 xl:w-64'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-hairline">
          <KarigaiLogo size={18} tagline />
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden w-7 h-7 rounded-full hover:bg-shell flex items-center justify-center"
          >
            <X className="w-4 h-4 text-muted" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} collapsed={false} />
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 border-t border-hairline pt-3 flex flex-col gap-0.5">
          {bottomItems.map((item) => (
            <NavLink key={item.href} item={item} collapsed={false} />
          ))}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm text-muted hover:bg-shell hover:text-ink2 transition-all w-full text-left"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
