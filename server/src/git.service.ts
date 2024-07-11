import axios from "axios";
import { Commit, CommitResponse } from "./git.types";

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
    console.error(`Error fetching commits: ${error}`);
  }
};

function transformCodeSnippet(codeSnippet: string) {
  console.log(codeSnippet);
  const diffLines = codeSnippet.split("\n");
  const result: string[] = [];
  let currentBlock: any = null;

  diffLines.forEach((line) => {
    const matchHeader: any = line.match(/^@@ -(\d+),\d+ \+(\d+),\d+ @@/);
    console.log(matchHeader, "matchHeader");
    if (matchHeader) {
      if (currentBlock) result.push(currentBlock);
      currentBlock = {
        header: line,
        lines: [],
      };
      return;
    }

    if (currentBlock) {
      const baseLineNumber = currentBlock.lines.length
        ? currentBlock.lines[currentBlock.lines.length - 1].baseLineNumber + 1
        : parseInt(matchHeader[1], 10);
      const headLineNumber = line.startsWith("-")
        ? null
        : currentBlock.lines.length
        ? currentBlock.lines[currentBlock.lines.length - 1].headLineNumber + 1
        : parseInt(matchHeader[2], 10);
      currentBlock.lines.push({
        baseLineNumber,
        headLineNumber,
        content: line,
      });
    }
  });
  console.log(currentBlock);
  if (currentBlock) result.push(currentBlock);

  return result;
}

const sanitizeCommitDiff = (commitFiles: Commit["files"]) => {
  return commitFiles?.map((commitFile) => {
    const { status, patch, blob_url } = commitFile;
    const decodedUrl = decodeURIComponent(blob_url);

    const [_, path] =
      decodedUrl.match(/github\.com\/.*\/.*\/blob\/[^\/]+\/(.*)/) ?? [];

    transformCodeSnippet(patch ?? "");

    return {
      changeKind: status,
      hunk: patch,
      headFile: { path },
      baseFile: { path },
    };
  });
};

export const getCommitDiff = async (
  owner: string,
  repository: string,
  oid: string
) => {
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
    console.error(`Error fetching commits: ${error}`);
  }
};
