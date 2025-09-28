install dependencies
`pnpm install`

install turso
`curl -sSL tur.so/install | sh`

create a database, and run db server
`turso dev -f src/db/ralph.db`

migrate
`pnpm run drizzle-kit migrate`

set env
get google client id and secret from google cloud console
https://console.cloud.google.com

if you can't get it ask me for it
`cp .env.example .env`

run the pnpm
`pnpm run dev`
