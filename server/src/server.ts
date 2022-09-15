import express from "express";

const app = express();

app.get("/ads", (req, res) => {
  res.send("Hello user");
});

app.listen(3333, () => console.log("Listening on port 3333"));
