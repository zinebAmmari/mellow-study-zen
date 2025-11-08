import { Home, Calendar, CheckSquare, BookOpen, Timer } from 'lucide-react';
import { NavLink } from '@/components/NavLink';

export function MobileNav() {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: BookOpen, label: 'Notes', path: '/notes' },
    { icon: Timer, label: 'Timer', path: '/timer' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-muted-foreground smooth-transition"
            activeClassName="text-primary"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
