import express from "express";
import cors from "cors";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import swaggerDocs from "./swagger.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

// Swagger
swaggerDocs(app);
console.log("Swagger docs: http://localhost:5000/api-docs");

// Error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
