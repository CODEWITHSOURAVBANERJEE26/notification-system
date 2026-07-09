const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

id: {
    type: String,
    required: true,
    unique: true
},

    tenantId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        default: null
    },

    type: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    read: {
        type: Boolean,
        default: false
    },

    readAt: {
        type: Date,
        default: null
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Notification", notificationSchema);