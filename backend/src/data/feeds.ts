import { Feed } from "@app/model/feed";
import { Post } from "@app/model/post";
import { parseFeed } from "@app/utils/posts-utils";
import { getProperty } from "@engine/config";

import * as fs from 'node:fs';
import { URL } from "node:url";

let storageLocation: string;
let cachedFeeds: Feed[] = [];

export function initFeeds() {
    storageLocation = getProperty('storageLocation');
    loadFeeds();
}

export function loadFeeds(): void {
    cachedFeeds = JSON.parse(fs.readFileSync(`${storageLocation}/feeds.json`).toString('utf-8'));
}

export function writeFeeds(feeds: Feed[]): Feed[] {
    cachedFeeds = feeds;
    fs.writeFileSync(`${storageLocation}/feeds.json`, JSON.stringify(feeds));
    return cachedFeeds
}

export function getFeeds(): Feed[] {
    return cachedFeeds;
}

export async function getPosts(feedId: string): Promise<Post[]> {
    let feed = cachedFeeds?.find((feed) => feed.id == feedId);
    let result: Promise<Post[]> = new Promise((resolve) => resolve([]));

    if (feed) {
        try {
            new URL(feed.url);
        } catch(e: any) {
            console.error(e.message);
            return result;
        }

        result = fetch(feed.url)
            .then((result) => result.text())
            .then((xml) => parseFeed(xml));
        
    }
    return result;
}