<script lang="ts">
  import RssReader from './lib/RSSReader.svelte';
    import RssIcon from './lib/rssIcon.svelte';
</script>

<div class="container-xl p-3">
  <h1 class="mt-3 mb-4"><RssIcon classes="mt-3 mb-4" width="36" height="36" /> RSS Reader</h1>
  <RssReader/>
</div>