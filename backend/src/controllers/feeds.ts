import { getFeeds, getPosts, writeFeeds } from "@app/data/feeds";
import { Controller } from "@engine/interfaces/controller";

export const feedsController: Controller = {
    get: {
        '/api/feeds': (req: any) => getFeeds(),
        '/api/feeds/:id': async (req: any) => await getPosts(req.params['id'])
    },
    post: {
        '/api/feeds': (req: any) => writeFeeds(req.body)
    }
};