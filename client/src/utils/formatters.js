export function formatCurrency(value, decimals = 2) {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
}

export function formatPercent(value, decimals = 2) {
    if (value === null || value === undefined) return 'N/A';
    return `${(Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals)}%`;
}

export function formatNumber(value, decimals = 0) {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
}

export function formatVolume(value) {
    if (value === null || value === undefined) return 'N/A';
    if (value >= 1000000000) return (value / 1000000000).toFixed(2) + 'B';
    if (value >= 1000000) return (value / 1000000).toFixed(2) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(2) + 'K';
    return value.toString();
}

export function formatMarketCap(value) {
    if (value === null || value === undefined) return 'N/A';
    if (value >= 1000000000000) return '$' + (value / 1000000000000).toFixed(2) + 'T';
    if (value >= 1000000000) return '$' + (value / 1000000000).toFixed(2) + 'B';
    if (value >= 1000000) return '$' + (value / 1000000).toFixed(2) + 'M';
    return '$' + value.toString();
}

export function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

export function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export function formatDateShort(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
}
