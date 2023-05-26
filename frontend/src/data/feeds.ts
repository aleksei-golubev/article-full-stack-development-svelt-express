import type { Feed } from "@app/model/feed";

const FEEDS_PATH = '/api/feeds';

const feeds: Feed[] = await loadFeeds();
const feedsMap: Map<string, Feed> = (function(): Map<string, Feed> {
    const map: Map<string, Feed> = new Map()
    feeds.forEach(feed => map.set(feed.id, feed));

    return map;
})();

export async function loadFeeds(): Promise<Feed[]> {
    return fetch(FEEDS_PATH).then((result) => result.json())
}

export function getFeeds(): Feed[] {
    return feeds;
}

export function getFeedById(id: string): Feed | undefined {
    return feedsMap.get(id);
}

export function deleteFeed(feed: Feed): void {
    const idx = feeds.indexOf(feed);
    if (idx != -1) {
        feeds.splice(idx, 1);
        feedsMap.delete(feed.id);
    }   
}

export function setNewFeed(feed: Feed): string {
    const feedURL = new URL(feed.url);
    feed.id = `${feedURL.host.replaceAll(/\./g, '-')}-${feedURL.pathname.replaceAll(/[\.\/]/g,'-')}`;
    if (typeof getFeedById(feed.id) == 'undefined') {
        feedsMap.set(feed.id, feed);
        feeds.push(feed)    
    }

    return feed.id;
}

export function updateFeeds() {
    return fetch(FEEDS_PATH, {
        method: 'POST',
        body: JSON.stringify(feeds),
        headers: {
          "content-type": "application/json"  
        } 
    });
}