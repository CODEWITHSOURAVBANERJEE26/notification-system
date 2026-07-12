import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../services/api";
import NotificationList from "./NotificationList";

function NotificationBell({ tenantId, userId }) {

    const [count, setCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [showList, setShowList] = useState(false);
    const [error, setError] = useState("");

    const headers = {
        "X-Tenant-Id": tenantId,
        "X-User-Id": userId
    };

    useEffect(() => {

        fetchUnreadCount();
        fetchNotifications();

        const interval = setInterval(() => {

            fetchUnreadCount();
            fetchNotifications();

        }, 10000);

        return () => clearInterval(interval);

    }, [tenantId, userId]);

    const fetchUnreadCount = async () => {

        try {

            const response = await axios.get(
                `${BASE_URL}/notifications/unread-count`,
                { headers }
            );

            setCount(response.data.count);
            setError("");

        } catch (error) {

            console.log(error);
            setError("Unable to connect to backend.");

        }

    };

    const fetchNotifications = async () => {

        try {

            const response = await axios.get(
                `${BASE_URL}/notifications`,
                { headers }
            );

            setNotifications(Array.isArray(response.data) ? response.data : []);
            setError("");

        } catch (error) {

            console.log(error);
            setError("Unable to connect to backend.");

        }

    };

    const markAsRead = async (id) => {

        try {

            await axios.patch(
                `${BASE_URL}/notifications/${id}/read`,
                {},
                { headers }
            );

            fetchUnreadCount();
            fetchNotifications();

        } catch (error) {

            console.log(error);

        }

    };

    const markAllAsRead = async () => {

        try {

            await axios.patch(
                `${BASE_URL}/notifications/read-all`,
                {},
                { headers }
            );

            fetchUnreadCount();
            fetchNotifications();

        } catch (error) {

            console.log(error);

        }

    };

    const inviteMember = async () => {

        try {

            await axios.post(
                `${BASE_URL}/notifications/trigger/member-invited`,
                {},
                { headers }
            );

            fetchUnreadCount();
            fetchNotifications();

        } catch (error) {

            console.log(error);

        }

    };

    const creatorReply = async () => {

        try {

            await axios.post(
                `${BASE_URL}/notifications/trigger/creator-reply`,
                {},
                { headers }
            );

            fetchUnreadCount();
            fetchNotifications();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="notification-card">

            <div className="header">

                <div>

                    <h2>Notification System</h2>

                    <small className="tenant">
                        Tenant: {tenantId} | User: {userId}
                    </small>

                    <div className="events">

                        <button onClick={inviteMember}>
                            Invite Member
                        </button>

                        <button onClick={creatorReply}>
                            Creator Reply
                        </button>

                    </div>

                </div>

                <div
                    className="bell"
                    onClick={() => setShowList(!showList)}
                >
                    🔔 {count}
                </div>

            </div>

            {
                error && (

                    <div className="error">

                        <strong>Backend Connection Error</strong>

                        <br /><br />

                        {error}

                    </div>

                )
            }

            {
                showList && (

                    <NotificationList
                        notifications={notifications}
                        onMarkRead={markAsRead}
                        onMarkAllRead={markAllAsRead}
                    />

                )
            }

        </div>

    );

}

export default NotificationBell;