import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const { itemCount } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-heading font-bold tracking-wide">
            KAAपड.
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">
              HOME
            </Link>
            <Link to="/collection" className="text-sm font-medium hover:text-accent transition-colors">
              COLLECTION
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-accent transition-colors">
              ABOUT
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-accent transition-colors">
              CONTACT
            </Link>
            {isAuthenticated && isAdmin() && (
              <Link to="/admin" className="text-sm font-medium hover:text-accent transition-colors">
                ADMIN PANEL
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-32 md:w-48 pl-3 pr-8 py-1.5 text-sm border border-border rounded-full focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </form>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 hover:bg-secondary rounded-full transition-colors">
                  <User className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm font-medium">{user?.name}</div>
                  <DropdownMenuSeparator />
                  {isAdmin() ? (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      Admin Dashboard
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      My Profile
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => {
                    logout();
                    navigate('/');
                  }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 hover:bg-secondary rounded-full transition-colors">
                  <User className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/login')}>
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/register')}>
                    Register
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/admin/login')}>
                    Admin Login
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-full transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}