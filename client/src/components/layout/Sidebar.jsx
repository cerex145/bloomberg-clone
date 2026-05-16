import { BarChart3, TrendingUp, Newspaper, Calendar, DollarSign, ShoppingCart, Settings, Home, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
    { icon: Home, path: '/', label: 'Dashboard' },
    { icon: BarChart3, path: '/screener', label: 'Screener' },
    { icon: TrendingUp, path: '/markets', label: 'Markets' },
    { icon: ShoppingCart, path: '/portfolio', label: 'Portfolio' },
    { icon: Newspaper, path: '/news', label: 'News' },
    { icon: Calendar, path: '/calendar', label: 'Calendar' },
    { icon: DollarSign, path: '/crypto', label: 'Crypto' }
];

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="fixed left-0 top-topbar-height bottom-statusbar-height w-sidebar-width bg-bg-primary border-r border-border-primary flex flex-col items-center py-4 gap-2 z-50">
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');

                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        title={item.label}
                        className={`p-3 rounded-lg transition-colors ${isActive
                            ? 'bg-accent-orange text-bg-primary'
                            : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                            }`}
                    >
                        <Icon size={20} />
                    </Link>
                );
            })}

            <div className="flex-1" />

            {/* User Badge */}
            {user && (
                <div className="w-10 h-10 rounded-full bg-accent-orange flex items-center justify-center text-bg-primary text-xs font-bold mb-2" title={user.name}>
                    {user.name.substring(0, 2).toUpperCase()}
                </div>
            )}

            <button
                onClick={handleLogout}
                className="p-3 text-text-secondary hover:bg-red-900/20 hover:text-red-400 rounded-lg transition-colors"
                title="Logout"
            >
                <LogOut size={20} />
            </button>
        </div>
    );
}
