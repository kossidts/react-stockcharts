# 0.8.0-pre

-   Upgrade packages to the respective latest versions possible
-   Non critical package upgrades and remove dangling packages
-   Drop d3-collection
-   DOC: Update Urls in the Doc
-   DEV: Update linting to use prettier
-   DEV: Drop modernizr and es6-promises
-   Migrate to Bootstrap v5
-   TODO: Move src/lib/series components to functional components
-   TODO: Move src/lib/tooltip components to functional components
-   TODO: Move src/lib/annotation components to functional components
-   TODO: Move src/lib/axes components to functional components
-   TODO: Move src/lib/coordinates components to functional components
-   TODO: Move src/lib/interactive components to functional components
-   TODO: Transform higher order components src/lib/helper to functional components

```text
// Idea to collocate data needed for the documentation pages
// or alternatively use astro starlight?
export const docPageProps = {
	title: "Area Chart",
	mdContent: require("md/AREACHART.md").default,
};
```

-   TODO: Upgrade from React 15 / 16 to 17. It is challenging since the codebase was written more than a few years ago and isn’t actively maintained.

npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm WARN deprecated source-map-url@0.4.1: See https://github.com/lydell/source-map-url#deprecated
npm WARN deprecated @babel/plugin-proposal-class-properties@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-class-properties instead.
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated @babel/plugin-proposal-nullish-coalescing-operator@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-nullish-coalescing-operator instead.
npm WARN deprecated source-map-resolve@0.5.3: See https://github.com/lydell/source-map-resolve#deprecated
npm WARN deprecated @babel/plugin-proposal-optional-chaining@7.21.0: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-optional-chaining instead.
npm WARN deprecated cross-spawn-async@2.2.5: cross-spawn no longer requires a build toolchain, use it instead
Thank you for using react-codemods!

Then `npx react-codemod update-react-imports`

# 0.7.8 - Takeover
