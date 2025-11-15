import React from 'react';
import { Award, Plus } from 'lucide-react';

const Navbar = ({ onAddClick }) => {
return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
    <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <Award className="w-8 h-8" />
            <div>
            <h1 className="text-2xl font-bold">FDP & Workshop Management</h1>
            <p className="text-blue-100 text-sm">Faculty Development Program Record System</p>
            </div>
        </div>
        <button
            onClick={onAddClick}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center space-x-2"
        >
            <Plus className="w-5 h-5" />
            <span>Add Record</span>
        </button>
        </div>
    </div>
    </div>
);
};

export default Navbar;