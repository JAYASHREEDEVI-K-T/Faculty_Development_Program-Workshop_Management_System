import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddRecordModal = ({ isOpen, onClose, onSubmit, editRecord }) => {
const [formData, setFormData] = useState({
    title: '',
    type: 'Workshop',
    startDate: '',
    endDate: '',
    facultyName: '',
    department: '',
    organizer: '',
    venue: '',
    description: '',
    status: 'Upcoming',
    participants: 1
});

const [errors, setErrors] = useState({});

useEffect(() => {
    if (editRecord) {
    setFormData({
        ...editRecord,
        startDate: editRecord.startDate?.split('T')[0] || '',
        endDate: editRecord.endDate?.split('T')[0] || ''
    });
    } else {
    resetForm();
    }
}, [editRecord, isOpen]);

const resetForm = () => {
    setFormData({
    title: '',
    type: 'Workshop',
    startDate: '',
    endDate: '',
    facultyName: '',
    department: '',
    organizer: '',
    venue: '',
    description: '',
    status: 'Upcoming',
    participants: 1
    });
    setErrors({});
};

const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.facultyName.trim()) newErrors.facultyName = 'Faculty name is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.organizer.trim()) newErrors.organizer = 'Organizer is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
    newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
    onSubmit(formData);
    resetForm();
    }
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
    ...prev,
    [name]: value
    }));
    if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: '' }));
    }
};

if (!isOpen) return null;

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
        <h2 className="text-2xl font-bold">
            {editRecord ? 'Edit Record' : 'Add New Record'}
        </h2>
        <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
        >
            <X className="w-6 h-6" />
        </button>
        </div>
        
        <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
                Program Title <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : ''
                }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">
                Type <span className="text-red-500">*</span>
            </label>
            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="Workshop">Workshop</option>
                <option value="FDP">FDP</option>
                <option value="Seminar">Seminar</option>
                <option value="Conference">Conference</option>
            </select>
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">
                Status <span className="text-red-500">*</span>
            </label>
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
            </select>
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">
                Faculty Name <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="facultyName"
                value={formData.facultyName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.facultyName ? 'border-red-500' : ''
                }`}
            />
            {errors.facultyName && <p className="text-red-500 text-sm mt-1">{errors.facultyName}</p>}
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">
                Department <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.department ? 'border-red-500' : ''
                }`}
            />
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">
                Organizer <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.organizer ? 'border-red-500' : ''
                }`}
            />
            {errors.organizer && <p className="text-red-500 text-sm mt-1">{errors.organizer}</p>}
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">
                Number of Participants
            </label>
            <input
                type="number"
                name="participants"
                value={formData.participants}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">
                Start Date <span className="text-red-500">*</span>
            </label>
            <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.startDate ? 'border-red-500' : ''
                }`}
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">
                End Date <span className="text-red-500">*</span>
            </label>
            <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.endDate ? 'border-red-500' : ''
                }`}
            />
            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
            </div>

            <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Venue</label>
            <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter program description..."
            />
            </div>

            <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Certificate URL</label>
            <input
                type="url"
                name="certificateUrl"
                value={formData.certificateUrl || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/certificate.pdf"
            />
            </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
            <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
            >
            Cancel
            </button>
            <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
            {editRecord ? 'Update Record' : 'Save Record'}
            </button>
        </div>
        </div>
    </div>
    </div>
);
};

export default AddRecordModal;