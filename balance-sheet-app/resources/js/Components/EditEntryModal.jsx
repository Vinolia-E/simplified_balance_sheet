import React, { useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';

export default function EditEntryModal({ entry, onClose }) {
    const nameInputRef = useRef(null);
    
    const { data, setData, put, processing, errors, reset } = useForm({
        name: entry.name,
        amount: entry.amount,
    });

    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const route = entry.type === 'asset' ? 'assets.update' : 'liabilities.update';
        
        put(route(entry.id), {
            onSuccess: () => {
                reset();
                onClose();
            }
        });
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Edit {entry.type === 'asset' ? 'Asset' : 'Liability'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            {entry.type === 'asset' ? 'Asset' : 'Liability'} Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            ref={nameInputRef}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter ${entry.type === 'asset' ? 'asset' : 'liability'} name`}
                            required
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            Amount (KES)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter amount"
                            min="0"
                            step="0.01"
                            required
                        />
                        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`px-4 py-2 text-white rounded-md ${
                                entry.type === 'asset' 
                                    ? 'bg-green-600 hover:bg-green-700' 
                                    : 'bg-red-600 hover:bg-red-700'
                            } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {processing ? 'Updating...' : `Update ${entry.type === 'asset' ? 'Asset' : 'Liability'}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}