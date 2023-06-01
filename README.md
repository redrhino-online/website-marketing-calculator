# Website Marketing Calculator

An interactive calculator that helps coaches and course creators model the
economics of a marketing funnel — from ad spend to booked calls to enrolled
clients.

## Live site

Once published, the site is available at:

https://redrhino-online.github.io/website-marketing-calculator/

## How it works

The calculator supports two modes, switchable from the top toolbar:

- **Budget** — start from an ad budget and cost per lead and project the
  resulting leads, calls, clients, revenue, and profit.
- **Income** — start from an income goal and a "Profit First" margin and back
  into the number of leads, calls, and bookings required to hit it.

The stepper walks through five stages:

1. **Program** — program price, ad budget / cost per lead, or income goal / margin.
2. **Funnel** — call scheduled, call completed, and enrollment rates.
3. **Projections** — projected revenue, clients, calls, appointments, and leads.
4. **Advertising** — ad budget, cost per client (CPA), call (CPC), booking (CPB), and lead (CPL).
5. **Metrics** — ROAS, overall conversion rate, gross margin, and gross profit.

## Technology

A single-page app built with [Vue 2](https://vuejs.org/) and
[Vuetify 2](https://vuetifyjs.com/), loaded from CDN. No build step is required.

## Repository layout

```
src/
  index.html                 # Page markup and Vue template
  calculator-20230601-0.js   # Vue app: calculations and state
.github/workflows/pages.yml  # GitHub Pages deployment
```

## Local development

Serve the `src/` directory with any static file server:

```sh
python3 -m http.server 8080 --directory src
```

Then open http://localhost:8080.

## Deployment

Pushing to `main` triggers the **Deploy to GitHub Pages** workflow, which
uploads the contents of `src/` and publishes them via GitHub Pages.
