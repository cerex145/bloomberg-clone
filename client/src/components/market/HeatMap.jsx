import { useMarketSectors } from '../../hooks/useMarketData';
import { getHeatmapColor } from '../../utils/colors';

export default function HeatMap() {
    const { data: sectors, isLoading } = useMarketSectors();

    if (isLoading) {
        return <div className="bg-bg-secondary p-4 rounded text-text-muted">Cargando mapa de calor...</div>;
    }

    return (
        <div className="bg-bg-secondary border border-border-primary rounded p-4">
            <h2 className="text-text-primary font-bold mb-4 text-sm">Mapa de Sectores S&P 500</h2>
            <div className="grid grid-cols-4 gap-2">
                {sectors?.map((sector) => {
                    const color = getHeatmapColor(sector.change1D);
                    const size = Math.sqrt(sector.marketCap) / 100000;

                    return (
                        <div
                            key={sector.symbol}
                            className="rounded p-3 text-center text-xs cursor-pointer hover:opacity-80 transition-opacity"
                            style={{
                                backgroundColor: color,
                                gridColumn: `span ${Math.max(1, Math.ceil(size / 2))}`
                            }}
                        >
                            <div className="font-bold text-white truncate">{sector.name}</div>
                            <div className="text-white font-mono text-xs">{sector.change1D.toFixed(2)}%</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
