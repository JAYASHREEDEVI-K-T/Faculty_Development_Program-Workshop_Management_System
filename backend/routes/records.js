const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

// GET all records with optional filters
router.get('/', async (req, res) => {
try {
    const { department, type, status, facultyName, startDate, endDate } = req.query;
    let query = {};

    if (department) query.department = new RegExp(department, 'i');
    if (type) query.type = type;
    if (status) query.status = status;
    if (facultyName) query.facultyName = new RegExp(facultyName, 'i');
    
    if (startDate && endDate) {
    query.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const records = await Record.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
    success: true,
    count: records.length,
    data: records
    });
} catch (error) {
    res.status(500).json({
    success: false,
    message: 'Server Error',
    error: error.message
    });
}
});

// GET single record by ID
router.get('/:id', async (req, res) => {
try {
    const record = await Record.findById(req.params.id);
    
    if (!record) {
    return res.status(404).json({
        success: false,
        message: 'Record not found'
    });
    }

    res.status(200).json({
    success: true,
    data: record
    });
} catch (error) {
    res.status(500).json({
    success: false,
    message: 'Server Error',
    error: error.message
    });
}
});

// POST create new record
router.post('/', async (req, res) => {
try {
    const record = await Record.create(req.body);
    
    res.status(201).json({
    success: true,
    message: 'Record created successfully',
    data: record
    });
} catch (error) {
    res.status(400).json({
    success: false,
    message: 'Failed to create record',
    error: error.message
    });
}
});

// PUT update record
router.put('/:id', async (req, res) => {
try {
    const record = await Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new: true,
        runValidators: true
    }
    );

    if (!record) {
    return res.status(404).json({
        success: false,
        message: 'Record not found'
    });
    }

    res.status(200).json({
    success: true,
    message: 'Record updated successfully',
    data: record
    });
} catch (error) {
    res.status(400).json({
    success: false,
    message: 'Failed to update record',
    error: error.message
    });
}
});

// DELETE record
router.delete('/:id', async (req, res) => {
try {
    const record = await Record.findByIdAndDelete(req.params.id);

    if (!record) {
    return res.status(404).json({
        success: false,
        message: 'Record not found'
    });
    }

    res.status(200).json({
    success: true,
    message: 'Record deleted successfully',
    data: {}
    });
} catch (error) {
    res.status(500).json({
    success: false,
    message: 'Server Error',
    error: error.message
    });
}
});

// GET statistics
router.get('/stats/summary', async (req, res) => {
try {
    const totalRecords = await Record.countDocuments();
    const completedRecords = await Record.countDocuments({ status: 'Completed' });
    const ongoingRecords = await Record.countDocuments({ status: 'Ongoing' });
    const upcomingRecords = await Record.countDocuments({ status: 'Upcoming' });
    
    // Get unique faculty count
    const uniqueFaculty = await Record.distinct('facultyName');
    
    // Get department-wise count
    const departmentStats = await Record.aggregate([
    {
        $group: {
        _id: '$department',
        count: { $sum: 1 }
        }
    },
    { $sort: { count: -1 } }
    ]);

    // Get type-wise count
    const typeStats = await Record.aggregate([
    {
        $group: {
        _id: '$type',
        count: { $sum: 1 }
        }
    }
    ]);

    res.status(200).json({
    success: true,
    data: {
        totalRecords,
        completedRecords,
        ongoingRecords,
        upcomingRecords,
        uniqueFacultyCount: uniqueFaculty.length,
        departmentStats,
        typeStats
    }
    });
} catch (error) {
    res.status(500).json({
    success: false,
    message: 'Server Error',
    error: error.message
    });
}
});

module.exports = router;