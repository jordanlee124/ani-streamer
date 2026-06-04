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
