require("dotenv").config();

import express from "express";
import { getCommitDetails, getCommitDiff } from "./git.service";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/repositories/:owner/:repository/commits/:oid", async (req, res) => {
  const { owner, repository, oid } = req.params;
  const commit = await getCommitDetails(owner, repository, oid);
  res.json(commit);
});

app.get(
  "/repositories/:owner/:repository/commits/:oid/diff",
  async (req, res) => {
    const { owner, repository, oid } = req.params;
    const commit = await getCommitDiff(owner, repository, oid);
    res.json(commit);
  }
);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
