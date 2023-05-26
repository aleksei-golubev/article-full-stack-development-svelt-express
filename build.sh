cd ./backend
npm install
npm run build

cd ../frontend
npm install
npm run build

cd ..
docker compose build

# to run application:
# docker compose up -d

# to stop application:
# docker compose stop