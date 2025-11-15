import React, { useState } from 'react';
import { Edit2, Trash2, Search, Filter } from 'lucide-react';

const RecordsList = ({ records, onEdit, onDelete }) => {
const [searchTerm, setSearchTerm] = useState('');
const [filterType, setFilterType] = useState('');
const [filterStatus, setFilterStatus] = useState('');

const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        record.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        record.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || record.type === filterType;
    const matchesStatus = !filterStatus || record.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
});

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
    });
};

return (
    <div>
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
            type="text"
            placeholder="Search by title, faculty, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">All Types</option>
            <option value="Workshop">Workshop</option>
            <option value="FDP">FDP</option>
            <option value="Seminar">Seminar</option>
            <option value="Conference">Conference</option>
        </select>
        <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">All Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
        </select>
        </div>
    </div>

    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full">
            <thead className="bg-gray-50 border-b">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Faculty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
            </thead>
            <tbody className="divide-y">
            {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                <tr key={record._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                    <div>
                        <div className="font-medium">{record.title}</div>
                        <div className="text-sm text-gray-500">{record.organizer}</div>
                    </div>
                    </td>
                    <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                        record.type === 'FDP' ? 'bg-blue-100 text-blue-800' : 
                        record.type === 'Workshop' ? 'bg-green-100 text-green-800' :
                        record.type === 'Seminar' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                    }`}>
                        {record.type}
                    </span>
                    </td>
                    <td className="px-6 py-4">
                    <div>
                        <div className="text-sm font-medium">{record.facultyName}</div>
                        <div className="text-sm text-gray-500">{record.department}</div>
                    </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(record.startDate)} to {formatDate(record.endDate)}
                    </td>
                    <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        record.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                    }`}>
                        {record.status}
                    </span>
                    </td>
                    <td className="px-6 py-4">
                    <div className="flex space-x-2">
                        <button 
                        onClick={() => onEdit(record)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                        >
                        <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this record?')) {
                            onDelete(record._id);
                            }
                        }}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                        >
                        <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No records found
                </td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    </div>
    </div>
);
};

export default RecordsList;