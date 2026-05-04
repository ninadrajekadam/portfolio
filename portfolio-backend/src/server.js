import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";

await connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: env.CORS_ORIGIN,
    credentials: true,
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
});


app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
});