import express from "express";
import sequelize from "./db";
import findingsRoutes from "./routes/findings.route";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API Routes
app.use("/api/v1/findings", findingsRoutes);

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  try {
    await sequelize.sync();
    console.log("Database connected");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
