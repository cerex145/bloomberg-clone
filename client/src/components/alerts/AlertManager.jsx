import React, { useState } from 'react';
import { useAlertStore } from '../../store/useAlertStore';
import { Bell, Trash2 } from 'lucide-react';

export default function AlertManager({ ticker }) {
    const { alerts, addAlert, removeAlert } = useAlertStore();
    const [showForm, setShowForm] = useState(false);
    const [alertType, setAlertType] = useState('price_above');
    const [value, setValue] = useState('');

    const tickerAlerts = alerts.filter(a => a.ticker === ticker);

    const handleAddAlert = (e) => {
        e.preventDefault();
        if (value) {
            addAlert(ticker, alertType, parseFloat(value));
            setValue('');
            setShowForm(false);
        }
    };

    return (
        <div className="bg-bg-secondary border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary flex items-center gap-2">
                    <Bell size={16} className="text-accent-orange" />
                    Price Alerts
                </h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="text-xs bg-accent-orange text-white px-2 py-1 rounded hover:bg-orange-500 transition"
                >
                    + New
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleAddAlert} className="mb-4 p-3 bg-bg-primary rounded border border-border">
                    <div className="space-y-2 mb-3">
                        <select
                            value={alertType}
                            onChange={(e) => setAlertType(e.target.value)}
                            className="w-full bg-bg-secondary border border-border rounded px-2 py-1 text-sm text-text-primary"
                        >
                            <option value="price_above">Price Above</option>
                            <option value="price_below">Price Below</option>
                            <option value="volume_spike">Volume Spike</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full bg-bg-secondary border border-border rounded px-2 py-1 text-sm text-text-primary"
                            step="0.01"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-xs bg-accent-orange text-white py-1 rounded hover:bg-orange-500 transition"
                    >
                        Create Alert
                    </button>
                </form>
            )}

            {tickerAlerts.length === 0 ? (
                <p className="text-text-secondary text-xs">No active alerts</p>
            ) : (
                <div className="space-y-2">
                    {tickerAlerts.map(alert => (
                        <div key={alert.id} className="flex items-center justify-between p-2 bg-bg-primary rounded border border-border/50 text-xs">
                            <span className="text-text-secondary">
                                {alert.type === 'price_above' && `Price > $${alert.value}`}
                                {alert.type === 'price_below' && `Price < $${alert.value}`}
                                {alert.type === 'volume_spike' && `Volume spike ${alert.value}x`}
                            </span>
                            <button
                                onClick={() => removeAlert(alert.id)}
                                className="p-1 hover:bg-red-900/20 rounded transition"
                            >
                                <Trash2 size={14} className="text-red-400" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
