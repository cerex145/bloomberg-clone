import { AlertCircle, X } from 'lucide-react';

export default function OrderConfirmationModal({ isOpen, orderData, onConfirm, onCancel }) {
    if (!isOpen || !orderData) return null;

    const total = orderData.shares * orderData.price;
    const commission = total * 0.001; // 0.1% commission
    const totalWithCommission = total + commission;

    const isBuy = orderData.type === 'BUY';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-bg-secondary border border-border-primary rounded-lg shadow-2xl w-full max-w-md mx-4">
                {/* Header */}
                <div className={`p-6 border-b border-border-primary ${isBuy ? 'bg-green-900/20' : 'bg-red-900/20'}`}>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <AlertCircle size={24} className={isBuy ? 'text-green-400' : 'text-red-400'} />
                            <div>
                                <h2 className="text-xl font-bold text-text-primary">
                                    Confirm {orderData.type}
                                </h2>
                                <p className="text-text-secondary text-sm">Review your order details</p>
                            </div>
                        </div>
                        <button onClick={onCancel} className="text-text-muted hover:text-text-primary transition">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Order Details */}
                <div className="p-6 space-y-4">
                    {/* Ticker & Shares */}
                    <div className="bg-bg-primary rounded p-4 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary">Stock</span>
                            <span className="text-2xl font-bold text-text-primary">{orderData.ticker}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-text-secondary">Shares</span>
                            <span className="text-xl font-mono text-text-primary">{orderData.shares}</span>
                        </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="bg-bg-primary rounded p-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-text-secondary">Price per share</span>
                            <span className="font-mono text-text-primary">${orderData.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span className="text-text-secondary">Subtotal</span>
                            <span className="font-mono text-text-primary">${total.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-border-primary pt-3 flex justify-between">
                            <span className="text-text-secondary text-xs">Commission (0.1%)</span>
                            <span className="font-mono text-text-secondary text-xs">${commission.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Total */}
                    <div className={`rounded p-4 border-2 ${isBuy ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'}`}>
                        <div className="flex justify-between items-center">
                            <span className={`font-bold ${isBuy ? 'text-green-300' : 'text-red-300'}`}>
                                Total {isBuy ? 'Debit' : 'Credit'}
                            </span>
                            <span className={`text-2xl font-mono font-bold ${isBuy ? 'text-green-400' : 'text-red-400'}`}>
                                ${totalWithCommission.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Warning for Buy Orders */}
                    {isBuy && (
                        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded p-3">
                            <p className="text-xs text-yellow-300">
                                ⚠️ <span className="font-semibold">Executing this order will debit your account by ${totalWithCommission.toFixed(2)}</span>. This cannot be undone.
                            </p>
                        </div>
                    )}

                    {/* Warning for Sell Orders */}
                    {!isBuy && (
                        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded p-3">
                            <p className="text-xs text-yellow-300">
                                ⚠️ <span className="font-semibold">You will sell {orderData.shares} shares and receive ${totalWithCommission.toFixed(2)}</span> after commission.
                            </p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-border-primary flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-3 bg-bg-primary border border-border-primary rounded hover:bg-bg-tertiary text-text-primary font-semibold transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-3 rounded font-semibold transition text-white ${isBuy
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-red-600 hover:bg-red-700'
                            }`}
                    >
                        Confirm {orderData.type}
                    </button>
                </div>
            </div>
        </div>
    );
}
