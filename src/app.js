import express from "express";
import jwt from "jsonwebtoken";
import userRoutes from "./routes/user.routes.js";
import noteRoutes from "./routes/note.routes.js";

const app = express();

app.get("/token", (req, res) => {
  const secret = "$2a$12$kxHyO2./SM/wucbfmSu37.1RdqVbWZEUbFIKT5UF35ze2wfcU6K5m";

  const token = jwt.sign(user, secret);
  res.send(token);
});

//Middleware
app.use(express.json());
app.use("/user", userRoutes);
app.use("/note", noteRoutes);

export default app;
