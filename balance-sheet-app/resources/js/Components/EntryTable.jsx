import React from 'react';

export default function EntryTable({ entries, type, onEdit, onDelete, formatCurrency }) {
    if (entries.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>No {type}s added yet.</p>
                <p className="text-sm">Click "Add {type === 'asset' ? 'Asset' : 'Liability'}" to get started.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {type === 'asset' ? 'Asset' : 'Liability'} Name
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount (KES)
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {entries.map((entry, index) => (
                        <tr key={entry.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {entry.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                {formatCurrency(entry.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                <button
                                    onClick={() => onEdit(entry, type)}
                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(entry.id, type)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}