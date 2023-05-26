<script lang='ts'>
    import { getFeedById, getFeeds, setNewFeed, updateFeeds } from "@app/data/feeds";
    import type { Feed } from "@app/model/feed";
    import { createEventDispatcher } from "svelte";

    export let feeds: Feed[];
    
    const dispatcher = createEventDispatcher();

    let feed: Feed = {id: '', name: '', url: ''}

    function addFeed() {
        if (feed.name && feed.url) {
            let newFeedId: string = setNewFeed(feed);
            updateFeeds().then(() => {
                feeds = getFeeds();
                dispatcher('add', {focus: getFeedById(newFeedId)});
                feed = {id: '', name: '', url: ''}
            });
        }
    }
</script>

<div class="input-group mb-3">
    <span  class="input-group-text">URL</span>
    <input class="form-control w-50 mw-100" type="text" bind:value={feed.url} />
    <span class="input-group-text">Name</span>
    <input class="form-control mw-100" type="text" bind:value={feed.name} />
    <button class="btn btn-primary" on:click={addFeed}>+ Add</button>
</div>

<style>
.mw-100 { min-width: 100px; }
</style>