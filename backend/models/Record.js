const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
},
type: {
    type: String,
    required: true,
    enum: ['Workshop', 'FDP', 'Seminar', 'Conference'],
    default: 'Workshop'
},
startDate: {
    type: Date,
    required: [true, 'Please provide start date']
},
endDate: {
    type: Date,
    required: [true, 'Please provide end date']
},
facultyName: {
    type: String,
    required: [true, 'Please provide faculty name'],
    trim: true
},
department: {
    type: String,
    required: [true, 'Please provide department'],
    trim: true
},
organizer: {
    type: String,
    required: [true, 'Please provide organizer name'],
    trim: true
},
venue: {
    type: String,
    trim: true
},
description: {
    type: String,
    trim: true
},
status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed'],
    default: 'Upcoming'
},
certificateUrl: {
    type: String
},
participants: {
    type: Number,
    default: 1
}
}, {
timestamps: true
});

// Index for faster queries
RecordSchema.index({ department: 1, startDate: -1 });
RecordSchema.index({ facultyName: 1 });

module.exports = mongoose.model('Record', RecordSchema);