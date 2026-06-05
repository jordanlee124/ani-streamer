const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;
const MANGADEX_BASE = 'https://api.mangadex.org';
const HEADERS = { 'User-Agent': 'ani-streamer/0.1.0' };

const TTL = {
    popular: 10 * 60 * 1000,  // 10 min — changes rarely
    search:   5 * 60 * 1000,  //  5 min — per unique query
    detail:  30 * 60 * 1000,  // 30 min — manga metadata is stable
};

const cache = new Map();

function cacheGet(key) {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) { cache.delete(key); return null; }
    return entry.value;
}

function cacheSet(key, value, ttl) {
    cache.set(key, { value, expiresAt: Date.now() + ttl });
}

async function mdFetch(path, cacheKey, ttl) {
    const cached = cacheGet(cacheKey);
    if (cached) return cached;

    const res = await fetch(`${MANGADEX_BASE}${path}`, { headers: HEADERS });
    if (!res.ok) throw new Error(`MangaDex returned ${res.status}`);
    const data = await res.json();

    cacheSet(cacheKey, data, ttl);
    return data;
}

app.get('/api/manga/popular', async (req, res) => {
    try {
        const data = await mdFetch(
            '/manga?limit=20&order[followedCount]=desc&includes[]=cover_art&contentRating[]=safe',
            'popular',
            TTL.popular
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/manga/tags', async (_req, res) => {
    try {
        const data = await mdFetch('/manga/tag', 'tags', 24 * 60 * 60 * 1000);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/manga/advanced', async (req, res) => {
    try {
        const { title, status, sort, demographic, contentRating, originalLanguage, includedTags, excludedTags, includedTagsMode } = req.query;
        const toArr = val => [].concat(val || []).filter(Boolean);

        const parts = ['limit=20', 'includes[]=cover_art'];

        if (title) parts.push(`title=${encodeURIComponent(title)}`);

        toArr(status).forEach(s => parts.push(`status[]=${s}`));
        toArr(demographic).forEach(d => parts.push(`publicationDemographic[]=${d}`));

        const ratings = toArr(contentRating);
        (ratings.length ? ratings : ['safe', 'suggestive']).forEach(r => parts.push(`contentRating[]=${r}`));

        toArr(originalLanguage).forEach(l => parts.push(`originalLanguage[]=${l}`));
        toArr(includedTags).forEach(t => parts.push(`includedTags[]=${t}`));
        toArr(excludedTags).forEach(t => parts.push(`excludedTags[]=${t}`));

        if (toArr(includedTags).length > 0) parts.push(`includedTagsMode=${includedTagsMode || 'AND'}`);
        if (toArr(excludedTags).length > 0) parts.push(`excludedTagsMode=OR`);

        const sortMap = {
            latest: 'latestUploadedChapter',
            relevance: 'relevance',
            follows: 'followedCount',
            rating: 'rating',
            year: 'year',
        };
        parts.push(`order[${sortMap[sort] || 'latestUploadedChapter'}]=desc`);

        const qs = parts.join('&');
        const data = await mdFetch(`/manga?${qs}`, `advanced:${qs}`, TTL.search);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/manga/recent', async (_req, res) => {
    try {
        const data = await mdFetch(
            '/manga?limit=20&order[latestUploadedChapter]=desc&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive',
            'recent',
            TTL.search
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/manga/toprated', async (_req, res) => {
    try {
        const data = await mdFetch(
            '/manga?limit=20&order[rating]=desc&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive',
            'toprated',
            TTL.popular
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/manga/new', async (_req, res) => {
    try {
        const data = await mdFetch(
            '/manga?limit=20&order[createdAt]=desc&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive',
            'new',
            TTL.search
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/manga/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: 'Query parameter q is required' });
        const data = await mdFetch(
            `/manga?title=${encodeURIComponent(q)}&limit=20&includes[]=cover_art&contentRating[]=safe`,
            `search:${q.toLowerCase().trim()}`,
            TTL.search
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/chapter/:id/pages', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await mdFetch(
            `/at-home/server/${id}`,
            `pages:${id}`,
            TTL.detail
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/manga/:id/chapters', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await mdFetch(
            `/manga/${id}/feed?limit=100&translatedLanguage[]=en&order[chapter]=asc&includes[]=scanlation_group`,
            `chapters:${id}`,
            TTL.detail
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/manga/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await mdFetch(
            `/manga/${id}?includes[]=cover_art&includes[]=author&includes[]=artist`,
            `detail:${id}`,
            TTL.detail
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`MangaDex server running on http://localhost:${PORT}`));
