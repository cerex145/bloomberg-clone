import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Clock } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/formatters';

export default function OrderHistory() {
    const { getRecentOrders } = usePortfolioStore();
    const orders = getRecentOrders();

    if (orders.length === 0) {
        return (
            <div className="bg-bg-secondary border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                    <Clock size={16} className="text-accent-orange" />
                    <h3 className="font-semibold text-text-primary">Order History</h3>
                </div>
                <p className="text-text-secondary text-sm">No orders yet</p>
            </div>
        );
    }

    return (
        <div className="bg-bg-secondary border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-accent-orange" />
                <h3 className="font-semibold text-text-primary">Recent Orders</h3>
            </div>

            <div className="space-y-2">
                {orders.map(order => (
                    <div key={order.id} className="bg-bg-primary rounded p-3 border border-border/50 text-xs">
                        <div className="flex items-center justify-between mb-2">
                            <span className={`font-semibold ${order.type === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                                {order.type} {order.ticker}
                            </span>
                            <span className="text-text-secondary text-xs">
                                {formatTime(order.timestamp)}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-text-secondary">
                            <div>
                                <p>Quantity</p>
                                <p className="text-text-primary">{order.shares}</p>
                            </div>
                            <div>
                                <p>Price</p>
                                <p className="text-text-primary font-mono">${order.price.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>Total</p>
                                <p className="text-text-primary font-mono">${order.totalValue.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
