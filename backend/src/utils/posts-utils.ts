import type { Post } from "@app/model/post";
import { XMLParser } from "fast-xml-parser";

export function parseFeed(xml: string | null): Post[]  {
    let posts: Post[] = [];

    if (xml) {
        let parser = new XMLParser({ignoreAttributes: false});
        let json = parser.parse(xml);

        let items = json.feed ? json.feed.entry : json.rss.channel.item;
        
        items.forEach((item: any) => {
            posts.push({
                title: item.title,
                link: json.feed ? item.link['@_href'] : item.link
            });
        });
    }

    return posts;
}