import TopBar from '../components/layout/TopBar';
import Sidebar from '../components/layout/Sidebar';
import StatusBar from '../components/layout/StatusBar';

export default function Crypto() {
    const cryptos = [
        { symbol: 'BTC', name: 'Bitcoin', price: 68234.50, change: 2.45, volume: '32.4B' },
        { symbol: 'ETH', name: 'Ethereum', price: 3456.78, change: 1.23, volume: '18.9B' },
        { symbol: 'BNB', name: 'BNB', price: 612.34, change: -0.85, volume: '1.2B' },
        { symbol: 'SOL', name: 'Solana', price: 142.56, change: 3.21, volume: '890M' },
    ];

    return (
        <div className="bg-bg-primary text-text-primary min-h-screen">
            <TopBar />
            <Sidebar />

            <main className="pl-sidebar-width pt-topbar-height pb-statusbar-height p-6">
                <h1 className="text-2xl font-bold mb-6">Criptomonedas</h1>

                <div className="bg-bg-secondary border border-border-primary rounded overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-bg-tertiary border-b border-border-primary">
                            <tr>
                                <th className="px-4 py-3 text-left text-text-secondary font-semibold">Símbolo</th>
                                <th className="px-4 py-3 text-left text-text-secondary font-semibold">Nombre</th>
                                <th className="px-4 py-3 text-right text-text-secondary font-semibold">Precio</th>
                                <th className="px-4 py-3 text-right text-text-secondary font-semibold">Cambio 24h</th>
                                <th className="px-4 py-3 text-right text-text-secondary font-semibold">Volumen</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-primary">
                            {cryptos.map((crypto) => (
                                <tr key={crypto.symbol} className="hover:bg-bg-tertiary transition-colors">
                                    <td className="px-4 py-3 text-text-primary font-bold">{crypto.symbol}</td>
                                    <td className="px-4 py-3 text-text-primary">{crypto.name}</td>
                                    <td className="px-4 py-3 text-right font-mono text-text-primary font-bold">${crypto.price.toFixed(2)}</td>
                                    <td className={`px-4 py-3 text-right font-mono ${crypto.change > 0 ? 'text-price-green' : 'text-price-red'}`}>
                                        {crypto.change > 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                                    </td>
                                    <td className="px-4 py-3 text-right text-text-secondary">{crypto.volume}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <StatusBar />
        </div>
    );
}
