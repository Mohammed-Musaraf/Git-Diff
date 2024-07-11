import { components } from "@octokit/openapi-types/types";

export interface Commit {
  /**
   * Format: uri
   * @example https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e
   */
  url: string;
  /** @example 6dcb09b5b57875f334f61aebed695e2e4193db5e */
  sha: string;
  /** @example MDY6Q29tbWl0NmRjYjA5YjViNTc4NzVmMzM0ZjYxYWViZWQ2OTVlMmU0MTkzZGI1ZQ== */
  node_id: string;
  /**
   * Format: uri
   * @example https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e
   */
  html_url: string;
  /**
   * Format: uri
   * @example https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e/comments
   */
  comments_url: string;
  commit: {
    /**
     * Format: uri
     * @example https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e
     */
    url: string;
    author: components["schemas"]["nullable-git-user"];
    committer: components["schemas"]["nullable-git-user"];
    /** @example Fix all the bugs */
    message: string;
    /** @example 0 */
    comment_count: number;
    tree: {
      /** @example 827efc6d56897b048c772eb4087f854f46256132 */
      sha: string;
      /**
       * Format: uri
       * @example https://api.github.com/repos/octocat/Hello-World/tree/827efc6d56897b048c772eb4087f854f46256132
       */
      url: string;
    };
    verification?: components["schemas"]["verification"];
  };
  author: components["schemas"]["nullable-simple-user"];
  committer: components["schemas"]["nullable-simple-user"];
  parents: {
    /** @example 7638417db6d59f3c431d3e1f261cc637155684cd */
    sha: string;
    /**
     * Format: uri
     * @example https://api.github.com/repos/octocat/Hello-World/commits/7638417db6d59f3c431d3e1f261cc637155684cd
     */
    url: string;
    /**
     * Format: uri
     * @example https://github.com/octocat/Hello-World/commit/7638417db6d59f3c431d3e1f261cc637155684cd
     */
    html_url?: string;
  }[];
  stats?: {
    additions?: number;
    deletions?: number;
    total?: number;
  };
  files?: components["schemas"]["diff-entry"][];
}

export type CommitResponse = Pick<
  Commit,
  "committer" | "parents" | "author"
> & {
  message: Commit["commit"]["message"];
  oid: Commit["sha"];
};
