const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger/swagger.js");

console.log("🚀 Server started")

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("✅ MongoDB connected");
}).catch((_) => {
    console.log("❌ MongoDB connection failed");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server is running on http://localhost:${PORT}`));

app.use("/api/users", require("./routes/users"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));