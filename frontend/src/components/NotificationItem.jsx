function NotificationItem({ notification, onMarkRead }) {

    return (

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "10px",
                backgroundColor: notification.read ? "#f5f5f5" : "#ffffff"
            }}
        >

            <h3>{notification.title}</h3>

            <p>{notification.body}</p>

            <p>
                <strong>Status : </strong>
                {notification.read ? "Read" : "Unread"}
            </p>

            {
                !notification.read && (

                    <button
                        onClick={() => onMarkRead(notification._id)}
                    >
                        Mark as Read
                    </button>

                )
            }

        </div>

    );

}

export default NotificationItem;