const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const notificationRoutes = require("./routes/notificationRoutes");

const seedNotifications = require("./seed/seed");

const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();

connectDB().then(() => {
    seedNotifications();
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notifications", authMiddleware, notificationRoutes);


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Notification System Backend Running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



