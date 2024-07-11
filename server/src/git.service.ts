import axios from "axios";
import { Commit, CommitDifferenceResponse, CommitResponse } from "./git.types";
import { sanitizeCommitDiff } from "./util";

export const getCommitDetails = async (
  owner: string,
  repository: string,
  oid: string
): Promise<CommitResponse | undefined> => {
  const apiUrl = `https://api.github.com/repos/${owner}/${repository}/commits/${oid}`;
  try {
    const gitToken = process.env.GIT_KEY;
    if (!gitToken) throw new Error("Git token not found");
    const commitDetails = await axios.get<Commit>(apiUrl, {
      headers: {
        Authorization: `token ${gitToken}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    const { committer, parents, author, commit } = commitDetails.data;
    return { committer, parents, author, message: commit.message, oid };
  } catch (error) {
    throw error;
  }
};

export const getCommitDiff = async (
  owner: string,
  repository: string,
  oid: string
): Promise<CommitDifferenceResponse[] | undefined> => {
  const apiUrl = `https://api.github.com/repos/${owner}/${repository}/commits/${oid}`;
  try {
    const gitToken = process.env.GIT_KEY;
    if (!gitToken) throw new Error("Git token not found");
    const commit = await axios.get<Commit>(apiUrl, {
      headers: {
        Authorization: `token ${gitToken}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    const { files } = commit.data;
    return sanitizeCommitDiff(files);
  } catch (error) {
    throw error;
  }
};
