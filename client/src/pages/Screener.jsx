import TopBar from '../components/layout/TopBar';
import Sidebar from '../components/layout/Sidebar';
import StatusBar from '../components/layout/StatusBar';
import Screener from '../components/screener/Screener';

export default function ScreenerPage() {
    return (
        <div className="bg-bg-primary text-text-primary min-h-screen">
            <TopBar />
            <Sidebar />

            <main className="pl-sidebar-width pt-topbar-height pb-statusbar-height p-6">
                <h1 className="text-2xl font-bold mb-6">Stock Screener</h1>
                <Screener />
            </main>

            <StatusBar />
        </div>
    );
}
