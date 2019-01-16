const express = require("express");
const logger = require("morgan");

const app = express();
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Secure Restfull Api" });
});
const port = process.env.port || 3000;

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.message = "Invalid Route";
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(3000, () => {
  console.log(`server running on port ${port}`);
});
