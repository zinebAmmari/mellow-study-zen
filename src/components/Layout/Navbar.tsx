import { Moon, Sun, Home, Calendar, CheckSquare, BookOpen, Timer, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { NavLink } from '@/components/NavLink';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: BookOpen, label: 'Notes', path: '/notes' },
    { icon: Timer, label: 'Timer', path: '/timer' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">StudySpace</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="px-4 py-2 rounded-lg smooth-transition text-muted-foreground hover:text-foreground hover:bg-muted/50"
                activeClassName="text-primary bg-primary/10"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </NavLink>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
