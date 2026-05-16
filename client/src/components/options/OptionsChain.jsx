import { useStockOptions } from '../../hooks/useStockDetail';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export default function OptionsChain({ ticker }) {
    const { data: optionsData, isLoading } = useStockOptions(ticker);

    if (isLoading || !optionsData) {
        return <div className="bg-bg-secondary p-4 rounded text-text-muted">Cargando cadena de opciones...</div>;
    }

    const firstExpiration = optionsData[0];
    if (!firstExpiration) return null;

    const chain = firstExpiration.chain;

    return (
        <div className="bg-bg-secondary border border-border-primary rounded overflow-auto">
            <div className="bg-bg-tertiary border-b border-border-primary p-4">
                <h2 className="text-text-primary font-bold">Cadena de Opciones - {ticker}</h2>
                <p className="text-text-secondary text-xs">Expiración: {firstExpiration.expirationDate}</p>
            </div>

            <table className="w-full text-xs font-mono">
                <thead className="bg-bg-tertiary border-b border-border-primary">
                    <tr>
                        <th className="px-2 py-2 text-left text-text-secondary">Call Bid</th>
                        <th className="px-2 py-2 text-left text-text-secondary">Ask</th>
                        <th className="px-2 py-2 text-left text-text-secondary">IV</th>
                        <th className="px-2 py-2 text-left text-text-secondary">Strike</th>
                        <th className="px-2 py-2 text-left text-text-secondary">IV</th>
                        <th className="px-2 py-2 text-left text-text-secondary">Put Bid</th>
                        <th className="px-2 py-2 text-left text-text-secondary">Ask</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-primary">
                    {chain.map((row) => (
                        <tr key={row.strike} className={row.inTheMoney ? 'bg-price-green/5' : 'hover:bg-bg-tertiary'}>
                            <td className="px-2 py-2 text-right text-text-primary">{formatCurrency(row.call.bid)}</td>
                            <td className="px-2 py-2 text-right text-text-primary">{formatCurrency(row.call.ask)}</td>
                            <td className="px-2 py-2 text-right text-text-secondary">{row.call.impliedVolatility}</td>
                            <td className="px-2 py-2 text-center font-bold text-text-primary">{formatCurrency(row.strike)}</td>
                            <td className="px-2 py-2 text-right text-text-secondary">{row.put.impliedVolatility}</td>
                            <td className="px-2 py-2 text-right text-text-primary">{formatCurrency(row.put.bid)}</td>
                            <td className="px-2 py-2 text-right text-text-primary">{formatCurrency(row.put.ask)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
