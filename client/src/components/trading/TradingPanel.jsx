import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { ShoppingCart, TrendingUp, TrendingDown, Check } from 'lucide-react';
import OrderConfirmationModal from './OrderConfirmationModal';

export default function TradingPanel({ ticker, currentPrice }) {
    const { buyStock, sellStock, cash, positions } = usePortfolioStore();
    const [shares, setShares] = useState('');
    const [activeTab, setActiveTab] = useState('buy');
    const [executing, setExecuting] = useState(false);
    const [lastTrade, setLastTrade] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [pendingOrder, setPendingOrder] = useState(null);

    const position = positions.find(p => p.ticker === ticker);
    const cost = parseFloat(shares || 0) * currentPrice;
    const canBuy = cost <= cash && cost > 0;
    const canSell = position && parseFloat(shares || 0) <= position.shares && shares > 0;

    const handleBuy = () => {
        if (canBuy) {
            setPendingOrder({
                type: 'BUY',
                ticker,
                shares: parseFloat(shares),
                price: currentPrice
            });
            setShowConfirmation(true);
        }
    };

    const handleSell = () => {
        if (canSell) {
            setPendingOrder({
                type: 'SELL',
                ticker,
                shares: parseFloat(shares),
                price: currentPrice
            });
            setShowConfirmation(true);
        }
    };

    const handleConfirmOrder = async () => {
        if (!pendingOrder) return;

        setExecuting(true);
        setShowConfirmation(false);

        setTimeout(() => {
            if (pendingOrder.type === 'BUY') {
                buyStock(pendingOrder.ticker, pendingOrder.shares, pendingOrder.price);
            } else {
                sellStock(pendingOrder.ticker, pendingOrder.shares, pendingOrder.price);
            }

            setLastTrade({
                type: pendingOrder.type,
                shares: pendingOrder.shares,
                price: pendingOrder.price,
                timestamp: new Date()
            });

            setShares('');
            setExecuting(false);
            setPendingOrder(null);

            setTimeout(() => setLastTrade(null), 3000);
        }, 600);
    };

    const handleCancelOrder = () => {
        setShowConfirmation(false);
        setPendingOrder(null);
    };

    return (
        <>
            <div className="bg-bg-secondary border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                    <ShoppingCart size={16} className="text-accent-orange" />
                    <h3 className="font-semibold text-text-primary">Paper Trading</h3>
                </div>

                {/* Notification */}
                {lastTrade && (
                    <div className={`mb-4 p-3 rounded border-l-4 flex items-center gap-2 ${lastTrade.type === 'BUY'
                        ? 'bg-green-900/20 border-green-400 text-green-300'
                        : 'bg-red-900/20 border-red-400 text-red-300'
                        }`}>
                        <Check size={16} />
                        <div>
                            <p className="font-semibold text-sm">
                                Order Executed ✓
                            </p>
                            <p className="text-xs">
                                {lastTrade.type} {lastTrade.shares} @ ${lastTrade.price.toFixed(2)}
                            </p>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-4 border-b border-border">
                    <button
                        onClick={() => setActiveTab('buy')}
                        className={`px-3 py-2 text-sm font-semibold border-b-2 transition ${activeTab === 'buy'
                            ? 'border-green-500 text-green-400'
                            : 'border-transparent text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        <TrendingUp size={14} className="inline mr-1" />
                        Buy
                    </button>
                    <button
                        onClick={() => setActiveTab('sell')}
                        className={`px-3 py-2 text-sm font-semibold border-b-2 transition ${activeTab === 'sell'
                            ? 'border-red-500 text-red-400'
                            : 'border-transparent text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        <TrendingDown size={14} className="inline mr-1" />
                        Sell
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-3">
                    <div>
                        <label className="text-text-secondary text-xs block mb-1">Shares</label>
                        <input
                            type="number"
                            value={shares}
                            onChange={(e) => setShares(e.target.value)}
                            placeholder="Enter number of shares"
                            className="w-full bg-bg-primary border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent-orange"
                            min="1"
                            step="1"
                            disabled={executing}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-bg-primary rounded p-2">
                            <p className="text-text-secondary">Price</p>
                            <p className="text-text-primary font-mono">${currentPrice.toFixed(2)}</p>
                        </div>
                        <div className="bg-bg-primary rounded p-2">
                            <p className="text-text-secondary">Total</p>
                            <p className={`font-mono ${cost > 0 ? 'text-text-primary' : 'text-text-secondary'}`}>
                                ${cost.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {activeTab === 'buy' && (
                        <>
                            <div className={`text-xs p-2 rounded ${canBuy ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-300'
                                }`}>
                                Available Cash: <span className="font-mono font-bold">${cash.toFixed(2)}</span>
                                {cost > 0 && <span className="ml-2">({canBuy ? '✓ Enough funds' : '✗ Insufficient funds'})</span>}
                            </div>

                            <button
                                onClick={handleBuy}
                                disabled={!canBuy || executing || showConfirmation}
                                className={`w-full py-2 rounded font-semibold transition ${canBuy && !executing && !showConfirmation
                                    ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                                    : 'bg-green-600/50 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {executing ? 'Executing...' : `Buy ${shares || 0} shares @ $${currentPrice.toFixed(2)}`}
                            </button>
                        </>
                    )}

                    {activeTab === 'sell' && (
                        <>
                            <div className={`text-xs p-2 rounded ${canSell ? 'bg-blue-900/20 text-blue-300' : 'bg-red-900/20 text-red-300'
                                }`}>
                                Your Position: <span className="font-mono font-bold">{position?.shares || 0} shares</span>
                                {shares && <span className="ml-2">({canSell ? '✓ OK' : '✗ Not enough shares'})</span>}
                            </div>

                            <button
                                onClick={handleSell}
                                disabled={!canSell || executing || showConfirmation}
                                className={`w-full py-2 rounded font-semibold transition ${canSell && !executing && !showConfirmation
                                    ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                                    : 'bg-red-600/50 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {executing ? 'Executing...' : `Sell ${shares || 0} shares @ $${currentPrice.toFixed(2)}`}
                            </button>
                        </>
                    )}
                </div>

                {/* Info */}
                <div className="mt-4 p-2 bg-blue-900/20 border border-blue-700/50 rounded text-xs text-blue-300">
                    📊 Paper trading. No real money involved.
                </div>
            </div>

            {/* Order Confirmation Modal */}
            <OrderConfirmationModal
                isOpen={showConfirmation}
                orderData={pendingOrder}
                onConfirm={handleConfirmOrder}
                onCancel={handleCancelOrder}
            />
        </>
    );
}
