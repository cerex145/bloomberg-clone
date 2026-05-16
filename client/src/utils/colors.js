import clsx from 'clsx';

export function getPriceColor(change) {
    if (change > 0) return 'text-price-green';
    if (change < 0) return 'text-price-red';
    return 'text-text-secondary';
}

export function getPriceBgColor(change) {
    if (change > 0) return 'bg-price-green/10';
    if (change < 0) return 'bg-price-red/10';
    return 'bg-bg-tertiary';
}

export function getHeatmapColor(percentChange) {
    // Retornar color según % cambio para heatmap
    if (percentChange >= 3) return '#16a34a'; // Verde intenso
    if (percentChange >= 1.5) return '#4ade80'; // Verde medio
    if (percentChange >= 0) return '#86efac'; // Verde claro
    if (percentChange >= -1.5) return '#fca5a5'; // Rojo claro
    if (percentChange >= -3) return '#f87171'; // Rojo medio
    return '#dc2626'; // Rojo intenso
}

export function getTextColorForChange(change) {
    return getPriceColor(change);
}
