import React from 'react';
import { Calendar, Users, Award, FileText } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, color }) => (
<div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderLeftColor: color }}>
    <div className="flex items-center justify-between">
    <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
    <Icon className="w-12 h-12 opacity-20" style={{ color }} />
    </div>
</div>
);

const Dashboard = ({ stats, recentRecords }) => {
return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard 
        icon={FileText} 
        title="Total Programs" 
        value={stats?.totalRecords || 0} 
        color="#3B82F6" 
        />
        <StatCard 
        icon={Users} 
        title="Faculty Participated" 
        value={stats?.uniqueFacultyCount || 0} 
        color="#10B981" 
        />
        <StatCard 
        icon={Calendar} 
        title="Ongoing" 
        value={stats?.ongoingRecords || 0} 
        color="#F59E0B" 
        />
        <StatCard 
        icon={Award} 
        title="Completed" 
        value={stats?.completedRecords || 0} 
        color="#8B5CF6" 
        />
    </div>

    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <div className="space-y-4">
        {recentRecords && recentRecords.length > 0 ? (
            recentRecords.slice(0, 5).map((record) => (
            <div key={record._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    record.type === 'FDP' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                }`}>
                    <Award className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-semibold">{record.title}</h3>
                    <p className="text-sm text-gray-600">{record.facultyName} • {record.department}</p>
                </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                record.status === 'Completed' ? 'bg-green-100 text-green-800' :
                record.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
                }`}>
                {record.status}
                </span>
            </div>
            ))
        ) : (
            <p className="text-gray-500 text-center py-8">No records available</p>
        )}
        </div>
    </div>

    {stats?.departmentStats && stats.departmentStats.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Department-wise Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.departmentStats.map((dept, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold">{dept._id}</p>
                <p className="text-2xl font-bold text-blue-600">{dept.count} Programs</p>
            </div>
            ))}
        </div>
        </div>
    )}
    </div>
);
};

export default Dashboard;