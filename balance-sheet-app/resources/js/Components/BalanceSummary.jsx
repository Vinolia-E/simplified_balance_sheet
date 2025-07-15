import React from 'react';

export default function BalanceSummary({ totalAssets, totalLiabilities, netWorth, formatCurrency }) {
    const netWorthColor = netWorth >= 0 ? 'text-green-600' : 'text-red-600';
    const netWorthBg = netWorth >= 0 ? 'bg-green-50' : 'bg-red-50';

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Assets */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Total Assets</h3>
                <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(totalAssets)}
                </p>
            </div>

            {/* Total Liabilities */}
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Total Liabilities</h3>
                <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(totalLiabilities)}
                </p>
            </div>

            {/* Net Worth */}
            <div className={`${netWorthBg} p-6 rounded-lg border ${netWorth >= 0 ? 'border-green-200' : 'border-red-200'}`}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Net Worth</h3>
                <p className={`text-2xl font-bold ${netWorthColor}`}>
                    {formatCurrency(netWorth)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                    Assets - Liabilities
                </p>
            </div>
        </div>
    );
}