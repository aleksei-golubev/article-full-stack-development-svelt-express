<script lang="ts">
    import { deleteFeed, getFeeds, updateFeeds } from "@app/data/feeds";
    import { links, Router, Route, navigate, Link } from "svelte-navigator";
    import { onMount } from "svelte";
    import FeedViewer from "./feedViewer.svelte";
    import AddFeedForm from "./addFeedForm.svelte";
    import type { Feed } from "@app/model/feed";

    let pathname = window.location.pathname;
    let feeds: Feed[] = [];

    const updatePathname = () => {
        // The best I could do at 3:23, later was worse...
        // Routing in Svelte seems to be shit.
        setTimeout(() => pathname = window.location.pathname);
    }

    const changeFeed = (event: any) => {
      navigateToFeed(event.detail.focus.id);
    }

    const navigateToFeed = (id: string) => {
      navigateTo(`/feed/${id}`);
    }

    const navigateTo = (path: string): void => {
      navigate(path);
      updatePathname();
    }

    const removeFeed = (feed: Feed, event: any) => {
        let idx = feeds.indexOf(feed);
        deleteFeed(feed);
        updateFeeds().then(() => {
            feeds = getFeeds();
            if (feeds.length > 0) {
              let feedToFocus = nextFeed(feeds, feed, idx);
              if (feedToFocus) {
                navigateToFeed(feedToFocus.id);
              }
            } else {
              navigateTo('/add');
            }
        });
    }
 
    const nextFeed = (feeds: Feed[], removedFeed: Feed, idx: number): Feed | null => {
      let feed: Feed = null;
      if (pathname === `/feed/${removedFeed.id}`) {
          feed = idx === feeds.length ? feeds[feeds.length-1] : feeds[idx];
      }
      return feed;
    }

    onMount(() => {
        feeds = getFeeds();
        if (pathname === '/') {
          feeds.length > 0 ? navigateToFeed(feeds[0].id) : navigateTo('/add');
        }
        updatePathname();
    })
</script>

<ul class='nav nav-tabs mb-3' use:links>
  {#each feeds as feed}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <li class="nav-item">
    <a class="nav-link" class:active={pathname === '/feed/'+feed.id} href='/feed/{feed.id}' on:click={updatePathname}>@{feed.name}
      <span on:click|preventDefault={(e) => removeFeed(feed, e)}>&times;</span></a>
  </li>
  {/each}
  <li class="nav-item">
    <a class="nav-link fw-bold" class:active={pathname === '/add'} href='/add' on:click={updatePathname}>+</a>
  </li>
</ul>  

<div class="container">
  <Router primary={false}>
      <Route path="feed/:id" let:params>
        <FeedViewer id={params.id}/>
      </Route>
      <Route path="add">
        <AddFeedForm bind:feeds={feeds} on:add={changeFeed}/>
      </Route>
  </Router>
</div>