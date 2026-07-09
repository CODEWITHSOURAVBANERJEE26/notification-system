# Multi-Tenant Notification System

## Project Overview

This project is a full-stack Multi-Tenant Notification System developed as part of an assignment. It consists of a Node.js/Express backend and a React (Vite) frontend. The application demonstrates how notifications can be created, retrieved, counted, and managed while maintaining tenant isolation.

The frontend provides a simple notification interface that communicates with REST APIs exposed by the backend. The backend stores notifications in MongoDB and ensures that users can only access notifications belonging to their own tenant.

---

## Features

### Backend

- Multi-tenant notification APIs
- Create notification
- Fetch notifications
- Fetch unread notification count
- Mark a notification as read
- Mark all notifications as read
- Trigger APIs for notification generation
- Request header based tenant and user identification
- MongoDB data persistence

### Frontend

- Notification Bell
- Notification List
- Unread notification count
- Mark notification as read
- Mark all notifications as read
- Automatic polling every 30 seconds
- Empty state handling
- Backend connection error message

---

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Frontend

- React
- Vite
- Axios

---

## Folder Structure

```

notification-system

├── backend

│ ├── config

│ ├── controllers

│ ├── middleware

│ ├── models

│ ├── routes

│ ├── seed

│ ├── package.json

│ └── server.js

│

├── frontend

│ ├── public

│ ├── src

│ ├── package.json

│ └── vite.config.js

│

└── README.md

```

---

## Setup Instructions

### Clone Repository

```bash
git clone <repository-url>
```

---

### Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

Run:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /notifications | Fetch notifications |
| GET | /notifications/unread-count | Fetch unread notification count |
| POST | /notifications | Create notification |
| PATCH | /notifications/:id/read | Mark notification as read |
| PATCH | /notifications/read-all | Mark all notifications as read |
| POST | /notifications/trigger/member-invited | Trigger member invitation notification |
| POST | /notifications/trigger/creator-reply | Trigger creator reply notification |

---

## Tenant Isolation Test

Tenant isolation is implemented using request headers.

Example headers:

Tenant A

```
X-Tenant-Id: t1
X-User-Id: u1
```

Tenant B

```
X-Tenant-Id: t2
X-User-Id: u2
```

Expected behaviour:

- Tenant A can only retrieve notifications belonging to Tenant A.
- Tenant B can only retrieve notifications belonging to Tenant B.
- Unread counts are isolated per tenant.
- Mark Read and Mark All Read operations affect only notifications within the requesting tenant.

---

## Integration Write-up

In an existing production application, I would integrate this notification system with the application's existing authentication and event infrastructure instead of relying on manually supplied request headers. User identity and tenant information would be extracted from authenticated tokens provided by the existing authentication service.

Notification creation would be triggered automatically through the application's event system whenever business events occur, such as user invitations or creator replies, instead of exposing dedicated trigger endpoints for manual testing. The notification APIs, notification model, unread count logic, and tenant filtering can largely remain unchanged because they are independent of the authentication mechanism.

For production use, I would also add centralized logging, monitoring, retry handling, and real-time delivery using WebSockets or Server-Sent Events while keeping the existing REST APIs available for compatibility.

---

## What I Would Do Differently With More Time

If additional time were available, I would:

- Improve the frontend user interface for a better user experience.
- Add search and filtering for notifications.
- Implement pagination to efficiently handle a large number of notifications.
- Replace the current polling approach with real-time notifications using WebSockets.
- Add more validation and error handling across the application.
- Test the application more thoroughly under different user and tenant scenarios.
- Improve logging and debugging support for easier maintenance.


---

## Known Issue

The project implementation is complete; however, during final integration, MongoDB Atlas could not be reached from the development environment because of a DNS SRV resolution error (`querySrv ECONNREFUSED`).

As a result, backend API execution requiring database connectivity could not be demonstrated on this machine. The application structure, APIs, frontend integration, and project organization remain complete.

---

## Author

Sourav Banerjee

