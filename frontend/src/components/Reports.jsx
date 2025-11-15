import React, { useState } from 'react';
import { FileText, Calendar, Award, Download } from 'lucide-react';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Reports = ({ records }) => {
const [reportType, setReportType] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [selectedDepartment, setSelectedDepartment] = useState('');

const departments = [...new Set(records.map(r => r.department))];

const generateDepartmentReport = () => {
    const deptRecords = selectedDepartment 
    ? records.filter(r => r.department === selectedDepartment)
    : records;
    
    const deptStats = {};
    deptRecords.forEach(record => {
        if (!deptStats[record.department]) {
        deptStats[record.department] = {
        total: 0,
        workshops: 0,
        fdps: 0,
        seminars: 0,
        conferences: 0,
        completed: 0,
        ongoing: 0,
        upcoming: 0
        };
    }
    deptStats[record.department].total++;
    const typeKey = record.type.toLowerCase() + 's';
    const statusKey = record.status.toLowerCase();
    if (deptStats[record.department][typeKey] !== undefined) deptStats[record.department][typeKey]++;
    if (deptStats[record.department][statusKey] !== undefined) deptStats[record.department][statusKey]++;
    });
    return deptStats;
};

const generateDateRangeReport = () => {
    if (!startDate || !endDate) return [];
    return records.filter(record => {
    const recordStart = new Date(record.startDate);
    return recordStart >= new Date(startDate) && recordStart <= new Date(endDate);
    });
};

const generateFacultyReport = () => {
    const facultyStats = {};
    records.forEach(record => {
    if (!facultyStats[record.facultyName]) {
        facultyStats[record.facultyName] = {
        department: record.department,
        records: []
        };
    }
    facultyStats[record.facultyName].records.push(record);
    });
    return facultyStats;
};

// ----------------- PDF DOWNLOAD -----------------
const downloadReport = (type) => {
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString('en-IN');
    let title = "";

    if (type === "department") {
    title = "Department-wise Report";
    const deptData = Object.entries(generateDepartmentReport()).map(([dept, s]) => [
        dept, s.total, s.workshops, s.fdps, s.completed, s.ongoing
    ]);
    doc.text(title, 14, 15);
    doc.text(`Generated on: ${today}`, 14, 22);
    autoTable(doc, {
        startY: 28,
        head: [["Department", "Total", "Workshops", "FDPs", "Completed", "Ongoing"]],
        body: deptData,
    });
    }

    else if (type === "daterange") {
    title = "Date Range Report";
    const data = generateDateRangeReport().map(r => [
        r.title,
        r.facultyName,
        r.department,
        r.type,
        new Date(r.startDate).toLocaleDateString('en-IN'),
        r.status
    ]);
    doc.text(title, 14, 15);
    doc.text(`Range: ${startDate} to ${endDate}`, 14, 22);
    autoTable(doc, {
        startY: 28,
        head: [["Title", "Faculty", "Department", "Type", "Start Date", "Status"]],
        body: data,
    });
    }

    else if (type === "faculty") {
    title = "Faculty-wise Report";
    doc.text(title, 14, 15);
    doc.text(`Generated on: ${today}`, 14, 22);

    let y = 28;
    Object.entries(generateFacultyReport()).forEach(([faculty, data]) => {
        doc.text(`${faculty} (${data.department})`, 14, y);
        y += 6;
        const rows = data.records.map(r => [
        r.title,
        r.type,
        r.organizer,
        new Date(r.startDate).toLocaleDateString('en-IN'),
        r.status
        ]);
        autoTable(doc, {
        startY: y,
        head: [["Title", "Type", "Organizer", "Start Date", "Status"]],
        body: rows,
        margin: { left: 14 },
        });
        y = doc.lastAutoTable.finalY + 8;
        if (y > 260) {
        doc.addPage();
        y = 20;
        }
    });
    }

    doc.save(`${type}-report.pdf`);
};

// ----------------- JSX -----------------
return (
    <div>
    {/* Report Selection Buttons */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button 
        onClick={() => setReportType('department')}
        className={`p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition ${
            reportType === 'department' ? 'border-blue-500 bg-blue-50' : 'border-dashed'
        }`}
        >
        <FileText className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h3 className="font-semibold mb-2">Department-wise Report</h3>
        <p className="text-sm text-gray-600">Generate report by department</p>
        </button>

        <button 
        onClick={() => setReportType('daterange')}
        className={`p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition ${
            reportType === 'daterange' ? 'border-blue-500 bg-blue-50' : 'border-dashed'
        }`}
        >
        <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h3 className="font-semibold mb-2">Date Range Report</h3>
        <p className="text-sm text-gray-600">Generate report by date</p>
        </button>

        <button 
        onClick={() => setReportType('faculty')}
        className={`p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition ${
            reportType === 'faculty' ? 'border-blue-500 bg-blue-50' : 'border-dashed'
        }`}
        >
        <Award className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h3 className="font-semibold mb-2">Faculty-wise Report</h3>
        <p className="text-sm text-gray-600">Generate report by faculty</p>
        </button>
    </div>

    {/* ----------------- Department Report ----------------- */}
    {reportType === 'department' && (
        <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Department-wise Report</h2>
            <button
            onClick={() => downloadReport('department')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
            </button>
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Filter by Department</label>
            <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <option value="">All Departments</option>
            {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
            ))}
            </select>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="bg-gray-50 border-b">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Workshops</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">FDPs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ongoing</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {Object.entries(generateDepartmentReport()).map(([dept, stats]) => (
                <tr key={dept} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{dept}</td>
                    <td className="px-6 py-4">{stats.total}</td>
                    <td className="px-6 py-4">{stats.workshops}</td>
                    <td className="px-6 py-4">{stats.fdps}</td>
                    <td className="px-6 py-4">{stats.completed}</td>
                    <td className="px-6 py-4">{stats.ongoing}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    )}

    {/* ----------------- Date Range Report ----------------- */}
    {reportType === 'daterange' && (
        <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Date Range Report</h2>
            <button
            onClick={() => downloadReport('daterange')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={!startDate || !endDate}
            >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
        </div>
        </div>
    )}

    {/* ----------------- Faculty Report ----------------- */}
    {reportType === 'faculty' && (
        <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Faculty-wise Report</h2>
            <button
            onClick={() => downloadReport('faculty')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
            </button>
        </div>
        </div>
    )}
    </div>
);
};

export default Reports;
