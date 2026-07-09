import NotificationItem from "./NotificationItem";

function NotificationList({
    notifications,
    onMarkRead,
    onMarkAllRead
}) {

    if (notifications.length === 0) {

        return (

            <div
                style={{
                    marginTop: "20px",
                    textAlign: "center"
                }}
            >
                <h3>No Notifications</h3>
            </div>

        );

    }

    return (

        <div
            style={{
                marginTop: "20px"
            }}
        >

            <button
                onClick={onMarkAllRead}
                style={{
                    marginBottom: "20px"
                }}
            >
                Mark All as Read
            </button>

            {

                notifications.map((notification) => (

                    <NotificationItem
                        key={notification._id}
                        notification={notification}
                        onMarkRead={onMarkRead}
                    />

                ))

            }

        </div>

    );

}

export default NotificationList;