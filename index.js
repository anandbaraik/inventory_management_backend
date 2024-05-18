import express from "express";
import dotenv from "dotenv";
import "./database/init.js";
import cors from "cors";
import itemRouter from "./routes/item.routes.js";
import saleRouter from "./routes/sales.routes.js";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

app.use("/v1/api", itemRouter);
app.use("/v1/api", saleRouter);

app.use("*", (req, res) => {
  return res.status(404).json({
    message: `No Route found`,
    success: false,
  });
});

app.use((error, req, res, next) => {
  return res.status(error.status || 500).json({
    message: `${error.message}`,
    success: false,
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is started and started at ${PORT}`);
});
