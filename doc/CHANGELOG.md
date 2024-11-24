# Tassadraft v2.0

### Infrastructure

-   Switched from Angular/Ionic to Svelte/TailwindCSS/Capacitor
-   Improved performance through shadow-dom
-   Lighter components
-   Prepared Tassadecks & Tassacards for the future (routing is already in place)
-   Capacitor build now ignores .env.local file, to avoid the previous common problem where .env.local was built and so app was requesting on localhost on mobile

### New features

-   Deck manager & edito

### Processing

-   Added card processing into editor to upload cards by taking photos

### Code quality

-   Exploded the monolith into smaller components

[Documentation](/README.md)
