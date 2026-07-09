const express = require("express");

const router = express.Router();

const {
    getNotifications,
    getUnreadCount,
    createNotification,
    markAsRead,
    markAllAsRead,
    inviteMember,
    creatorReply
} = require("../controllers/notificationController");
const { now } = require("mongoose");

router.get("/", getNotifications);

router.get("/unread-count", getUnreadCount);

router.post("/", createNotification);

router.post("/trigger/member-invited", inviteMember);

router.post("/trigger/creator-reply", creatorReply);

router.patch("/:id/read", markAsRead);

router.patch("/read-all", markAllAsRead);

module.exports = router;

