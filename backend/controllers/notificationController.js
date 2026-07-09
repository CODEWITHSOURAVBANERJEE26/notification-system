const Notification = require("../models/notification");

const getNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find({
            tenantId: req.tenantId,

            $or: [
                { userId: null },
                { userId: req.userId }
            ]
        }).sort({
            read: 1,
            createdAt: -1
        });

        res.status(200).json(notifications);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getUnreadCount = async (req, res) => {

    try {

        const count = await Notification.countDocuments({

            tenantId: req.tenantId,

            read: false,

            $or: [
                { userId: null },
                { userId: req.userId }
            ]

        });

        res.status(200).json({
            count
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const createNotification = async (req, res) => {
    try {

        const notification = await Notification.create({
            ...req.body,
            tenantId: req.tenantId,
            userId: req.body.userId ?? null
        });

        res.status(201).json(notification);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const markAsRead = async (req, res) => {
    try {

        const notification = await Notification.findOne({
            _id: req.params.id,
            tenantId: req.tenantId
        });

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        notification.read = true;
        notification.readAt = new Date();

        await notification.save();

        res.status(200).json(notification);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const markAllAsRead = async (req, res) => {
    try {

        await Notification.updateMany(
            {
                tenantId: req.tenantId,
                read: false,
                $or: [
                    { userId: null },
                    { userId: req.userId }
                ]
            },
            {
                read: true,
                readAt: new Date()
            }
        );

        res.status(200).json({
            message: "All notifications marked as read"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const inviteMember = async (req, res) => {
    try {

        const notification = await Notification.create({
            id: "n" + Date.now(),
            tenantId: req.tenantId,
            userId: null,
            type: "member_invited",
            title: "New Team Member",
            body: "A new member joined your team.",
            read: false,
            readAt: null
        });

        res.status(201).json(notification);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const creatorReply = async (req, res) => {
    try {

        const notification = await Notification.create({
            id: "n" + Date.now(),
            tenantId: req.tenantId,
            userId: req.userId,
            type: "new_reply",
            title: "Creator Replied",
            body: "A creator replied to your outreach message.",
            read: false,
            readAt: null
        });

        res.status(201).json(notification);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getNotifications,
    getUnreadCount,
    createNotification,
    markAsRead,
    markAllAsRead,
    inviteMember,
    creatorReply
};


