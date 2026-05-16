import TopBar from '../components/layout/TopBar';
import Sidebar from '../components/layout/Sidebar';
import StatusBar from '../components/layout/StatusBar';
import NewsFeed from '../components/news/NewsFeed';

export default function News() {
    return (
        <div className="bg-bg-primary text-text-primary min-h-screen">
            <TopBar />
            <Sidebar />

            <main className="pl-sidebar-width pt-topbar-height pb-statusbar-height p-6">
                <h1 className="text-2xl font-bold mb-6">Noticias de Mercados</h1>
                <div className="max-w-4xl">
                    <NewsFeed category="all" />
                </div>
            </main>

            <StatusBar />
        </div>
    );
}
