
Very basic Express application for serving a sub set of Spotify web API.

Requirements:
- Registered Spotify developer application (CLIENT ID + CLIENT SECRET)
- Sqlite3
- Yarn
- Node.js

# Installation and running

```bash
# Install dependencies
yarn
```

Rename `sample.env` to `.env` and fill in with **your** environment variables.

```bash
# Initialize database (Sqlite3 required).
yarn create-db
```

```bash
yarn dev
```

# Login with your Spotify account

With the application running, navigate to *localhost:4050/login*

The backend will request *Spotify* for some access rights, which on your consent will be saved to a sqlite database running locally (*db.sqlite*).

# Requesting active playback

`GET http://localhost:4050/?id=<your spotify id>`
