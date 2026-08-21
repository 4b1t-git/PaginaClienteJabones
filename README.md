# Field & Form storefront prototype

A polished, front-end-only storefront concept for a small-batch botanical soap studio. The project uses Vite, React and TypeScript, with original code-owned SVG product artwork and no remote assets.

## Setup

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Commands

```bash
npm run dev        # Start the development server
npm run typecheck  # Run the TypeScript compiler
npm run build      # Typecheck and create a production build
npm run preview    # Serve the production build locally
```

## Prototype behavior

- The catalog demonstrates available, sold-out and coming-soon states.
- Coming-soon products use a live countdown. After the release time, a product becomes purchasable when its stock is greater than zero.
- **Prototype inventory** in the header/footer opens a browser-only editor for product name, price, stock, status and release time.
- Catalog edits and cart contents persist in `localStorage`. **Reset to demo data** restores the catalog defaults and creates a fresh future release time for Citrus Sun.
- Cart quantity controls respect current stock. Unavailable cart lines must be removed or adjusted before checkout.
- Checkout is explicitly a demo: it requests no payment details, processes no payment and creates no real order.
- Dispatch copy consistently shows the next Wednesday using a UTC date-only calculation. It describes a dispatch window, not a delivery promise.

## Data and assets

- Demo catalog: `src/data/products.ts`
- Product state rules: `src/utils/catalog.ts`
- Wednesday calculation: `src/utils/dates.ts`
- Local SVG compositions: `public/images/`
- Main visual system and responsive behavior: `src/styles.css`

Local storage keys:

- `field-and-form.catalog.v1`
- `field-and-form.cart.v1`

Remove those keys in browser developer tools to clear all saved prototype state.

## Production gaps

This is intentionally not a live commerce system. Production work would require a real CMS/database, authenticated and authorized administration, transactional inventory controls, product and order APIs, regional taxes and shipping rules, a payment provider with verified webhooks, transactional email, fulfillment integrations, analytics/privacy review, input validation, abuse protection, secrets management and a full security/accessibility/quality audit.
