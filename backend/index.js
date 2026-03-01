const { MongoMemoryServer } = require("mongodb-memory-server");
const express = require("express");
const path = require("path");
const { connection } = require("./connection");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const staticRoute = require("./routes/static");
const staticRestrictedRoute = require("./routes/static_restrict");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

// DB connection will happen inside startServer()

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json()); // ✅ Handle JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files (e.g. React build in production)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use("/", staticRoute);
app.use("/", staticRestrictedRoute);
app.use("/user", userRoute);

// Initialize Database and Start Server
async function startServer() {
  // Spin up an automatic in-memory MongoDB instance
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Connect Mongoose to it
  connection(mongoUri);

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Connected to automatic in-memory MongoDB at: ${mongoUri}`);
  });
}

startServer();
