import { NextResponse } from 'next/server';

const USERNAME = 'ANKOR0804';

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 }, // кешируем на 1 час
      }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`, {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch GitHub data' },
        { status: 500 },
      );
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    // Считаем языки по байтам через /languages endpoint
    const languageCounts: Record<string, number> = {};
    for (const repo of repos) {
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1;
      }
    }

    // Топ 5 языков
    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      avatar: user.avatar_url,
      name: user.name,
      bio: user.bio,
      repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      topLanguages,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 },
    );
  }
}
