import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import RecordsList from './components/RecordsList';
import AddRecordModal from './components/AddRecordModal';
import Reports from './components/Reports';
import { recordsAPI } from './services/api';
import './App.css';

function App() {
const [activeTab, setActiveTab] = useState('dashboard');
const [showAddModal, setShowAddModal] = useState(false);
const [records, setRecords] = useState([]);
const [stats, setStats] = useState(null);
const [editRecord, setEditRecord] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    fetchRecords();
    fetchStats();
}, []);

const fetchRecords = async () => {
    try {
    setLoading(true);
    const response = await recordsAPI.getAll();
    setRecords(response.data.data);
    setError(null);
    } catch (err) {
    setError('Failed to fetch records');
    console.error('Error fetching records:', err);
    } finally {
    setLoading(false);
    }
};

const fetchStats = async () => {
    try {
    const response = await recordsAPI.getStats();
    setStats(response.data.data);
    } catch (err) {
    console.error('Error fetching stats:', err);
    }
};

const handleAddRecord = async (formData) => {
    try {
    if (editRecord) {
        await recordsAPI.update(editRecord._id, formData);
        alert('Record updated successfully!');
    } else {
        await recordsAPI.create(formData);
        alert('Record created successfully!');
    }
    setShowAddModal(false);
    setEditRecord(null);
    fetchRecords();
    fetchStats();
    } catch (err) {
    alert('Error saving record: ' + err.message);
    console.error('Error saving record:', err);
    }
};

const handleEdit = (record) => {
    setEditRecord(record);
    setShowAddModal(true);
};

const handleDelete = async (id) => {
    try {
    await recordsAPI.delete(id);
    alert('Record deleted successfully!');
    fetchRecords();
    fetchStats();
    } catch (err) {
    alert('Error deleting record: ' + err.message);
    console.error('Error deleting record:', err);
    }
};

const handleCloseModal = () => {
    setShowAddModal(false);
    setEditRecord(null);
};

return (
    <div className="min-h-screen bg-gray-50">
    <Navbar onAddClick={() => setShowAddModal(true)} />

    <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6">
        <div className="flex space-x-8">
            {['dashboard', 'records', 'reports'].map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium transition ${
                activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
            >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
            ))}
        </div>
        </div>
    </div>

    <div className="container mx-auto px-6 py-8">
        {loading && (
        <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        )}

        {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
        </div>
        )}

        {!loading && !error && (
        <>
            {activeTab === 'dashboard' && (
            <Dashboard stats={stats} recentRecords={records} />
            )}

            {activeTab === 'records' && (
            <RecordsList
                records={records}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            )}

            {activeTab === 'reports' && (
            <Reports records={records} stats={stats} />
            )}
        </>
        )}
    </div>

    <AddRecordModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        onSubmit={handleAddRecord}
        editRecord={editRecord}
    />
    </div>
);
}

export default App;