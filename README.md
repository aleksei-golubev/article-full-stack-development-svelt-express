# Full stack development: Svelte + Express

This is a repository with examples from articles:
- [Angular developer trying Svelte](https://medium.com/@aleksei_golubev/angular-developer-trying-svelte-e54898ca986b)
- [TypeScript setup for Node.js project](https://medium.com/@aleksei_golubev/typescript-setup-for-node-js-project-28699ed3f6d0)

Here you can find the implementation of RSS Reader.

Environment:
- Node.js 18.13.0
- Docker 20.10.23

## Frameworks

Frontend is based on Svelte and for backend Express was chosen. Application is wraped with coupled Docker containers. 

## How to

Build:

```
./build.sh
```

Run:

```
docker compose up -d
```

Stop:

```
docker compose stop
```
