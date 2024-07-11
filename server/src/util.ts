import { Commit, DiffBlock } from "./git.types";

export const transformDiff = (diff: string): DiffBlock[] => {
  const diffLines = diff.split("\n");
  const result: DiffBlock[] = [];
  let currentBlock: DiffBlock | null = null;
  let baseLineNumber: number | null = null;
  let headLineNumber: number | null = null;

  diffLines.forEach((line) => {
    const matchHeader = line.match(/^@@ -(\d+),\d+ \+(\d+),\d+ @@/);
    if (matchHeader) {
      if (currentBlock) result.push(currentBlock);
      currentBlock = {
        header: line,
        lines: [],
      };
      baseLineNumber = parseInt(matchHeader[1], 10);
      headLineNumber = parseInt(matchHeader[2], 10);
      return;
    }

    if (currentBlock) {
      currentBlock.lines.push({
        baseLineNumber: line.startsWith("+") ? null : baseLineNumber,
        headLineNumber: line.startsWith("-") ? null : headLineNumber,
        content: line,
      });

      if (!line.startsWith("+")) baseLineNumber!++;
      if (!line.startsWith("-")) headLineNumber!++;
    }
  });

  if (currentBlock) result.push(currentBlock);

  return result;
};

export const sanitizeCommitDiff = (commitFiles: Commit["files"]) => {
  return commitFiles?.map((commitFile) => {
    const { status, patch, blob_url } = commitFile;
    const decodedUrl = decodeURIComponent(blob_url);

    const [_, path] =
      decodedUrl.match(/github\.com\/.*\/.*\/blob\/[^\/]+\/(.*)/) ?? [];

    return {
      changeKind: status,
      hunk: transformDiff(patch ?? ""),
      headFile: { path },
      baseFile: { path },
    };
  });
};
