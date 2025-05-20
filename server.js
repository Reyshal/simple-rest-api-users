const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger/swagger.js");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB connected");
}).catch((error) => {
    console.error("❌ MongoDB connection failed:", error);
});

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.message : ""
    });
});

// Vercel deployment handler
module.exports = app;

// Local server startup
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server is running on http://localhost:${PORT}`));
}