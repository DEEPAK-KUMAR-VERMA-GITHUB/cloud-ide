import express, { urlencoded } from "express";
import { fileRouter } from "./routes/fileRoutes";

const app = express();
app.use(express.json({ limit: "50mb̥" }));
app.use(urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/v1", fileRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
