import { prisma } from "@/lib/db";

export interface GithubEventItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  timeAgo: string;
  createdAt: string;
  url?: string;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
}

export interface GithubCalendarData {
  totalContributions: number;
  years: number[];
  weeks: {
    contributionDays: ContributionDay[];
  }[];
}

export interface GithubData {
  isConnected: boolean;
  isConfigured: boolean;
  username: string | null;
  avatarUrl: string | null;
  events: GithubEventItem[];
  calendar: GithubCalendarData | null;
}

function timeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}mo ago`;
}

export async function getGithubData(userId: string): Promise<GithubData> {
  const isConfigured = Boolean(
    (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) ||
    process.env.GITHUB_TOKEN
  );

  try {
    const account = await prisma.account.findFirst({
      where: {
        userId,
        providerId: "github",
      },
    });

    const accessToken = account?.accessToken || process.env.GITHUB_TOKEN;

    if (!accessToken) {
      return {
        isConnected: false,
        isConfigured,
        username: null,
        avatarUrl: null,
        events: [],
        calendar: null,
      };
    }

    // 1. Fetch GitHub User Profile
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "Portfolio-Admin",
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 },
    });

    if (!userRes.ok) {
      console.warn("Failed to fetch GitHub user with token");
      return {
        isConnected: false,
        isConfigured,
        username: null,
        avatarUrl: null,
        events: [],
        calendar: null,
      };
    }

    const userData = await userRes.json();
    const username = userData.login;
    const avatarUrl = userData.avatar_url;

    // 2. Fetch Recent Events (commits, PRs, etc.)
    let events: GithubEventItem[] = [];
    try {
      const eventsRes = await fetch(
        `https://api.github.com/users/${username}/events?per_page=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "User-Agent": "Portfolio-Admin",
            Accept: "application/vnd.github.v3+json",
          },
          next: { revalidate: 300 }, // refresh events every 5 mins
        }
      );

      if (eventsRes.ok) {
        const rawEvents = await eventsRes.json();
        if (Array.isArray(rawEvents)) {
          events = rawEvents
            .slice(0, 5)
            .map((evt: any) => {
              const repoName = evt.repo?.name || "repository";
              let title = "Activity in repository";
              let subtitle = repoName;

              switch (evt.type) {
                case "PushEvent": {
                  const count = evt.payload?.commits?.length || 1;
                  const commitMsg = evt.payload?.commits?.[0]?.message || "";
                  title = `Pushed ${count} commit${count > 1 ? "s" : ""}`;
                  subtitle = commitMsg ? `${repoName}: "${commitMsg.slice(0, 40)}${commitMsg.length > 40 ? "..." : ""}"` : repoName;
                  break;
                }
                case "PullRequestEvent": {
                  const action = evt.payload?.action || "updated";
                  const prTitle = evt.payload?.pull_request?.title || "";
                  title = `${action.charAt(0).toUpperCase() + action.slice(1)} PR #${evt.payload?.number || ""}`;
                  subtitle = prTitle ? `${repoName}: ${prTitle.slice(0, 40)}` : repoName;
                  break;
                }
                case "CreateEvent": {
                  const refType = evt.payload?.ref_type || "repository";
                  title = `Created ${refType} ${evt.payload?.ref || ""}`.trim();
                  subtitle = repoName;
                  break;
                }
                case "WatchEvent": {
                  title = "Starred repository";
                  subtitle = repoName;
                  break;
                }
                case "ForkEvent": {
                  title = "Forked repository";
                  subtitle = repoName;
                  break;
                }
                case "IssuesEvent": {
                  const action = evt.payload?.action || "updated";
                  title = `${action.charAt(0).toUpperCase() + action.slice(1)} issue`;
                  subtitle = evt.payload?.issue?.title ? `${repoName}: ${evt.payload.issue.title.slice(0, 40)}` : repoName;
                  break;
                }
                default:
                  title = evt.type.replace("Event", "");
                  subtitle = repoName;
              }

              return {
                id: evt.id,
                type: evt.type,
                title,
                subtitle,
                timeAgo: timeAgo(evt.created_at),
                createdAt: evt.created_at,
              };
            });
        }
      }
    } catch (err) {
      console.error("Error fetching GitHub events:", err);
    }

    // 3. Fetch Contribution Graph via GraphQL API
    let calendar: GithubCalendarData | null = null;
    try {
      const gqlQuery = {
        query: `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionYears
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                      contributionLevel
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { username },
      };

      const gqlRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "Portfolio-Admin",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gqlQuery),
        next: { revalidate: 3600 },
      });

      if (gqlRes.ok) {
        const gqlData = await gqlRes.json();
        const collection = gqlData?.data?.user?.contributionsCollection;
        const cal = collection?.contributionCalendar;
        const years = collection?.contributionYears || [];
        if (cal) {
          calendar = {
            totalContributions: cal.totalContributions || 0,
            years,
            weeks: cal.weeks || [],
          };
        }
      }
    } catch (err) {
      console.error("Error fetching GitHub GraphQL contributions:", err);
    }

    return {
      isConnected: true,
      isConfigured,
      username,
      avatarUrl,
      events,
      calendar,
    };
  } catch (error) {
    console.error("getGithubData error:", error);
    return {
      isConnected: false,
      isConfigured: false,
      username: null,
      avatarUrl: null,
      events: [],
      calendar: null,
    };
  }
}

export async function fetchGithubCalendarForYear(userId: string, year?: number): Promise<GithubCalendarData | null> {
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId,
        providerId: "github",
      },
    });

    const accessToken = account?.accessToken || process.env.GITHUB_TOKEN;
    if (!accessToken) return null;

    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "Portfolio-Admin",
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 },
    });

    if (!userRes.ok) return null;
    const userData = await userRes.json();
    const username = userData.login;

    let variables: any = { username };
    if (year) {
      variables.from = `${year}-01-01T00:00:00Z`;
      variables.to = `${year}-12-31T23:59:59Z`;
    }

    const gqlQuery = {
      query: `
        query($username: String!, $from: DateTime, $to: DateTime) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              contributionYears
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    contributionLevel
                  }
                }
              }
            }
          }
        }
      `,
      variables,
    };

    const gqlRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "Portfolio-Admin",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gqlQuery),
      next: { revalidate: 3600 },
    });

    if (!gqlRes.ok) return null;
    const gqlData = await gqlRes.json();
    const collection = gqlData?.data?.user?.contributionsCollection;
    const cal = collection?.contributionCalendar;
    const years = collection?.contributionYears || [];

    if (cal) {
      return {
        totalContributions: cal.totalContributions || 0,
        years,
        weeks: cal.weeks || [],
      };
    }
    return null;
  } catch (error) {
    console.error("fetchGithubCalendarForYear error:", error);
    return null;
  }
}
