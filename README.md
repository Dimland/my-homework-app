# Homework App - Advanced 1

Starting Advanced 1 from commit `HEAD`. API used: DummyJSON (https://dummyjson.com).

## Deliverables

### Step 0: Preparation

- **API:** DummyJSON (https://dummyjson.com)
- **Endpoints:** `/products`, `/products/:id`
- **Status:** Existing app verified, TanStack Query working.

### Step 1: i18n Setup

- **Locales:** English (`en`), Hebrew (`he`)
- **Namespaces:** `common` (header, buttons, status), `products` (list, details, columns)

### Step 2: i18n Usage

- **Interpolation:** "Showing {{count}} products" (ProductsList footer)
- **Pluralization:** "Showing {{count}} product" vs "Showing {{count}} products" (ProductsList footer)
- **Trans Component:** Used in `ProductsList.tsx` footer to bold the count number.

### Step 3: Language Switcher & Persistence

- **Switcher:** Added to Header. Toggles between EN and HE.
- **Persistence:** Handled by `i18next-browser-languagedetector` (localStorage).

### Step 4: RTL Mode

- **RTL Support:** Enabled for Hebrew (`he`).
- **Fixes:**
  1. Updated `margin-right` to `margin-inline-end` in Header links (`App.tsx`) to support correct spacing in RTL.
  2. PrimeReact components automatically handle RTL direction based on `dir="rtl"`.

### Step 5: PrimeReact + DataTable

- **Component:** `ProductsList` converted to use `DataTable`.
- **Features:**
  1. **Sorting:** Enabled on Title, Price, and Category columns.
  2. **Pagination:** Enabled with 5 rows per page and options [5, 10, 25].
  3. **Search:** Global search input filters the query (server-side search via API).

### Step 6: Theme Switcher

- **Switcher:** Added to Header. Toggles between Light (`lara-light-cyan`) and Dark (`lara-dark-cyan`) themes.
- **Persistence:** Saved in `localStorage` under key `theme`. Default is `light`.

### Bonus A: Price Formatting

- **Implementation:** Used `Intl.NumberFormat` in `ProductsList` and `ProductDetail` to format prices according to the selected locale (e.g., `$` for EN, correct formatting for HE).

## Screenshots

_(Please refer to the running application for live verification)_

---

# React + TypeScript + Vite

## Homework Deliverables (Previous)

### Step 2: API Choice

I chose DummyJSON.

- List: /products
- Detail: /products/:id

### Bonus Tasks Completed

1. **Query key with filters**: Added search input in `ProductsList.tsx` that updates the query key and fetches filtered data.
2. **Cache behavior experiments**: Set global `staleTime` to 60000ms (1 minute) in `main.tsx`.
3. **Global "Fetching..." indicator**: Implemented `useIsFetching` in `App.tsx`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
