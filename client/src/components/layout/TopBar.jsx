import { useState } from 'react';
import { Menu, X, BarChart3, TrendingUp, Newspaper, Settings, User } from 'lucide-react';

export default function TopBar() {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className="fixed top-0 left-0 right-0 h-topbar-height bg-bg-secondary border-b border-border-primary flex items-center justify-between px-4 z-40">
            <div className="flex items-center gap-4 flex-1">
                <h1 className="text-accent-orange font-bold text-lg">Erico_Babje_chifita</h1>

                <div className="flex-1 max-w-xl">
                    <input
                        type="text"
                        placeholder="Search ticker, company, news..."
                        className="w-full px-3 py-2 bg-bg-tertiary border border-border-primary text-text-primary text-sm rounded placeholder-text-muted focus:outline-none focus:border-accent-orange"
                        onFocus={() => setShowSearch(true)}
                        onBlur={() => setShowSearch(false)}
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right text-xs">
                    <div className="text-text-primary font-mono">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                    <div className="text-text-secondary">{new Date().toLocaleDateString('en-US')}</div>
                </div>
                <User size={18} className="text-text-secondary cursor-pointer hover:text-text-primary" />
            </div>
        </div>
    );
}
