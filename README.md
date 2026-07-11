# Multi-Tenant Notification System

A full-stack Multi-Tenant Notification System built using **Node.js, Express.js, MongoDB Atlas, Mongoose, React (Vite), and Axios**. The application demonstrates how notifications can be created, retrieved, counted, and managed while maintaining tenant isolation.

---

# Project Overview

This project implements a Multi-Tenant Notification System where users receive and manage notifications while maintaining complete tenant isolation. Each notification request is associated with a specific tenant and user, ensuring that users can access only their own notifications.

The backend exposes REST APIs for notification management, while the frontend provides a clean and responsive interface for viewing notifications, unread counts, and notification status. MongoDB Atlas is used for data persistence, and tenant isolation is implemented through request headers.

---

# Features

## Backend

- Multi-tenant notification APIs
- Create notifications
- Retrieve notifications
- Retrieve unread notification count
- Mark individual notifications as read
- Mark all notifications as read
- Trigger notification generation APIs
- Request-header based tenant and user identification
- MongoDB data persistence using Mongoose
- RESTful API architecture

## Frontend

- Notification Bell
- Notification List
- Unread notification counter
- Mark notification as read
- Mark all notifications as read
- Automatic polling every 30 seconds
- Empty state handling
- Backend connection handling

---

# Technologies Used

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- REST APIs

## Frontend

- React
- Vite
- Axios

---

# Folder Structure

```text
notification-system
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── seed
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── index.html
│
├── .gitignore
└── README.md
```

---

# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/CODEWITHSOURAVBANERJEE26/notification-system.git
```

---

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

An example configuration is available in:

```text
backend/.env.example
```

Run the backend.

```bash
npm run dev
```

---

## Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the frontend.

```bash
npm run dev
```

Open the URL displayed by Vite (typically `http://localhost:5173` or `http://localhost:5174`).

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /notifications | Retrieve notifications |
| GET | /notifications/unread-count | Retrieve unread notification count |
| POST | /notifications | Create a notification |
| PATCH | /notifications/:id/read | Mark a notification as read |
| PATCH | /notifications/read-all | Mark all notifications as read |
| POST | /notifications/trigger/member-invited | Trigger member invitation notification |
| POST | /notifications/trigger/creator-reply | Trigger creator reply notification |

---

# Tenant Isolation Test

Tenant isolation is implemented using request headers.

Example request headers:

### Tenant A

```
X-Tenant-Id: t1
X-User-Id: u1
```

### Tenant B

```
X-Tenant-Id: t2
X-User-Id: u2
```

### Expected Behaviour

- Tenant A can retrieve only notifications belonging to Tenant A.
- Tenant B can retrieve only notifications belonging to Tenant B.
- Unread notification counts remain isolated between tenants.
- Mark Read affects only notifications belonging to the requesting tenant.
- Mark All Read affects only notifications belonging to the requesting tenant.

---

# Integration Write-up

In an existing production application, this notification system would be integrated with the application's existing authentication and authorization mechanisms instead of relying on manually supplied request headers.

Notification creation would be triggered automatically through the application's event system whenever business events occur, such as member invitations or creator replies. The notification model, REST APIs, unread count logic, and tenant filtering can remain largely unchanged because they are independent of the authentication mechanism.

For production environments, additional improvements such as centralized logging, monitoring, retry mechanisms, and real-time notification delivery using WebSockets or Server-Sent Events could be introduced while maintaining compatibility with the existing REST APIs.

---

# What I Would Do Differently With More Time

If additional time were available, I would:

- Improve the frontend user interface and user experience.
- Add search and filtering for notifications.
- Implement pagination for handling large numbers of notifications.
- Replace polling with real-time notifications using WebSockets.
- Improve validation and error handling across the application.
- Test the application more thoroughly under different user and tenant scenarios.
- Improve application logging for easier debugging and maintenance.

---

# Author

**Sourav Banerjee**

