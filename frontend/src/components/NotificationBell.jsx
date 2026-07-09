import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../services/api";
import NotificationList from "./NotificationList";

function NotificationBell() {

    const [count, setCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [showList, setShowList] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        fetchUnreadCount();
        fetchNotifications();

        const interval = setInterval(() => {

            fetchUnreadCount();
            fetchNotifications();

        }, 30000);

        return () => clearInterval(interval);

    }, []);

    const fetchUnreadCount = async () => {

        try {

            const response = await axios.get(

                `${BASE_URL}/notifications/unread-count`,

                {
                    headers: {
                        "X-Tenant-Id": "t1",
                        "X-User-Id": "u1"
                    }
                }

            );

            setCount(response.data.count);

        } catch (error) {

            console.log(error);
            setError("Unable to connect to backend.");

        }

    };

    const fetchNotifications = async () => {

        try {

            const response = await axios.get(

                `${BASE_URL}/notifications`,

                {
                    headers: {
                        "X-Tenant-Id": "t1",
                        "X-User-Id": "u1"
                    }
                }

            );
   setNotifications(Array.isArray(response.data) ? response.data : []);

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

                {
                    headers: {
                        "X-Tenant-Id": "t1",
                        "X-User-Id": "u1"
                    }
                }

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

                {
                    headers: {
                        "X-Tenant-Id": "t1",
                        "X-User-Id": "u1"
                    }
                }

            );

            fetchUnreadCount();
            fetchNotifications();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div
            style={{
                width: "700px",
                margin: "30px auto",
                fontFamily: "Arial"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "20px"
                }}
            >

                <h2>Notification System</h2>

                <div
                    style={{
                        fontSize: "30px",
                        cursor: "pointer"
                    }}
                    onClick={() => setShowList(!showList)}
                >

                     🔔 {count}

                </div>

            </div>

            {
    error && (

        <div
            style={{
                marginTop: "20px",
                padding: "15px",
                backgroundColor: "#ffecec",
                color: "#d8000c",
                border: "1px solid #d8000c",
                borderRadius: "8px"
            }}
        >

            <strong>Backend Connection Error</strong>

            <br /><br />

            {error}

            <br /><br />

            MongoDB Atlas connection could not be established on this development machine.

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





