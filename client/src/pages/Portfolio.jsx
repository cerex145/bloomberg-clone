import TopBar from '../components/layout/TopBar';
import Sidebar from '../components/layout/Sidebar';
import StatusBar from '../components/layout/StatusBar';
import PortfolioTable from '../components/portfolio/PortfolioTable';

export default function Portfolio() {
    return (
        <div className="bg-bg-primary text-text-primary min-h-screen">
            <TopBar />
            <Sidebar />

            <main className="pl-sidebar-width pt-topbar-height pb-statusbar-height p-6">
                <PortfolioTable />
            </main>

            <StatusBar />
        </div>
    );
}
