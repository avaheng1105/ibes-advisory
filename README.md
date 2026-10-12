# IBES Advisory

Website for IBES Advisory, hosted on Cloudflare Workers.

- `public/` – the website files (edit `public/index.html` to change content)
- `wrangler.jsonc` – tells Cloudflare to serve the `public/` folder

Any change pushed to `main` is deployed automatically once the repo is connected in Cloudflare.

## Placeholders to replace
In `public/index.html`:
- Email `hello@example.com` and phone `+60 0-000 0000`
- Stats (years of experience, clients advised)
- Service descriptions and About text
