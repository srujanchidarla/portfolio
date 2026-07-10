import { fetchGitHubActivity } from "@/lib/github";
import GitHubActivityClient from "./github/GitHubActivityClient";

export default async function GitHubActivity() {
  const data = await fetchGitHubActivity();
  return <GitHubActivityClient data={data} />;
}
