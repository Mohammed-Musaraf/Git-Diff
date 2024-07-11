require("dotenv").config();

import express from "express";
import cors from "cors";
import { getCommitDetails, getCommitDiff } from "./git.service";
const app = express();
const port = 3000;

app.use(
  cors({
    origin: process.env.WEB_APP_URL ?? "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/repositories/:owner/:repository/commits/:oid", async (req, res) => {
  try {
    const { owner, repository, oid } = req.params;
    const commit = await getCommitDetails(owner, repository, oid);
    res.json(commit);
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "Unable to get commit",
      error,
    });
  }
});

app.get(
  "/repositories/:owner/:repository/commits/:oid/diff",
  async (req, res) => {
    try {
      const { owner, repository, oid } = req.params;
      const commit = await getCommitDiff(owner, repository, oid);
      res.json(commit);
    } catch (error) {
      res.status(400).json({
        status: "Error",
        message: "Unable to get commit difference",
        error,
      });
    }
  }
);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
