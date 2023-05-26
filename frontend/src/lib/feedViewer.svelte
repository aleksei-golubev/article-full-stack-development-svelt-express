<script lang="ts">
    import type { Post } from "@app/model/post";

    export let id: string;

    async function getPosts(id: string): Promise<Post[]> {
        return fetch(`/api/feeds/${id}`)
            .then((result) => result.json())
    }
</script>

<div class="posts">
    {#await getPosts(id)}
        loading...
    {:then posts}
        {#each posts as post}
        <div class="post">
            <div class="title"><a href={post.link}>{post.title}</a></div>
        </div>
        {/each}
    {:catch error}
        {error.message}
    {/await}
</div>