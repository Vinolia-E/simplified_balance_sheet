
import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AddEntryModal from '@/Components/AddEntryModal';
import EditEntryModal from '@/Components/EditEntryModal';
import EntryTable from '@/Components/EntryTable';
import BalanceSummary from '@/Components/BalanceSummary';

export default function Index({ 
    auth, 
    assets, 
    liabilities, 
    totalAssets, 
    totalLiabilities, 
    netWorth 
}) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [addModalType, setAddModalType] = useState('asset');

    const { delete: destroy } = useForm();

    const handleAddAsset = () => {
        setAddModalType('asset');
        setShowAddModal(true);
    };

    const handleAddLiability = () => {
        setAddModalType('liability');
        setShowAddModal(true);
    };

    const handleEdit = (entry, type) => {
        setEditingEntry({ ...entry, type });
        setShowEditModal(true);
    };

    const handleDelete = (id, type) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            const route = type === 'asset' ? 'assets.destroy' : 'liabilities.destroy';
            destroy(route(id));
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Balance Sheet</h2>}
        >
            <Head title="Balance Sheet" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">Balance Sheet</h1>
                                        <p className="text-gray-600">User: {auth.user.email}</p>
                                        <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Balance Summary */}
                            <BalanceSummary 
                                totalAssets={totalAssets}
                                totalLiabilities={totalLiabilities}
                                netWorth={netWorth}
                                formatCurrency={formatCurrency}
                            />

                            {/* Assets Section */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-semibold text-gray-900">Assets</h2>
                                    <button
                                        onClick={handleAddAsset}
                                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Add Asset
                                    </button>
                                </div>
                                <EntryTable
                                    entries={assets}
                                    type="asset"
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    formatCurrency={formatCurrency}
                                />
                                <div className="mt-4 text-right">
                                    <p className="text-lg font-semibold">
                                        Total Assets: {formatCurrency(totalAssets)}
                                    </p>
                                </div>
                            </div>

                            {/* Liabilities Section */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-semibold text-gray-900">Liabilities</h2>
                                    <button
                                        onClick={handleAddLiability}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Add Liability
                                    </button>
                                </div>
                                <EntryTable
                                    entries={liabilities}
                                    type="liability"
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    formatCurrency={formatCurrency}
                                />
                                <div className="mt-4 text-right">
                                    <p className="text-lg font-semibold">
                                        Total Liabilities: {formatCurrency(totalLiabilities)}
                                    </p>
                                </div>
                            </div>

                            {/* Print Button */}
                            <div className="text-center">
                                <button
                                    onClick={() => window.print()}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                                >
                                    Print Balance Sheet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showAddModal && (
                <AddEntryModal
                    type={addModalType}
                    onClose={() => setShowAddModal(false)}
                />
            )}

            {showEditModal && editingEntry && (
                <EditEntryModal
                    entry={editingEntry}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </AuthenticatedLayout>
    );
}