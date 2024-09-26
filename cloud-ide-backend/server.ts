import express from "express";
import fs from "fs";
import path from "path";

const app = express();

app.use(express.json());

// route to handle file creation
app.post("/create-file", (req, res) => {
  const { filename } = req.body;
  const filePath = path.join(__dirname, filename);
  fs.writeFileSync(filePath, "", "utf-8");
  res.status(201).json({
    success: true,
    message: "File created successfully...",
  });
});

// route to handle saving a file contents
app.post("/save-file", (req, res) => {
  const { filename, content } = req.body;
  const filePath = path.join(__dirname, filename);
  fs.writeFileSync(filePath, content, "utf-8");
  res.status(200).json({
    success: true,
    message: "File saved successfully...",
  });
});

// route to handle opening an existing file
app.get("/open-file", (req, res) => {
  const { filename } = req.body;
  const filePath = path.join(__dirname, filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  res.status(200).json({
    success: true,
    message: "File opened successfully...",
    content: fileContent,
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
