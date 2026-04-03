# EFX Brand Reference

Primary working reference for this Backstage customization.

## Fonts

```css
--font-family-open-sans: "Open Sans", arial, sans-serif;
--material-symbol-font: "Material Symbols Rounded";
```

## Brand Colors

```css
--efx-brand-red: #9e1b32;
--efx-brand-gray: #333e48;
```

## Primary Palette

```css
--efx-primary-red: #9e1b32;
--efx-primary-orange: #e77204;
--efx-primary-yellow: #f1c319;
--efx-primary-green: #45842a;
--efx-primary-blue: #007298;
--efx-primary-purple: #652f6c;
--efx-black: #000000;
--efx-white: #ffffff;
--efx-gray: #333e48;
```

## Gray Palette

```css
--efx-gray-100: #e7e7e7;
--efx-gray-200: #cfcfcf;
--efx-gray-300: #b5b5b5;
--efx-gray-400: #9c9c9c;
--efx-gray-500: #828282;
--efx-gray-600: #696969;
--efx-gray-700: #4f4f4f;
--efx-gray-800: #363636;
--efx-gray-900: #1c1c1c;
```

## Shadow Palette

```css
--efx-shadow-red: #6d1222;
--efx-shadow-orange: #994a00;
--efx-shadow-yellow: #98700c;
--efx-shadow-green: #294d19;
--efx-shadow-blue: #004d66;
--efx-shadow-purple: #431f47;
```

## Highlight Palette

```css
--efx-highlights-red: #ffccd5;
--efx-highlights-orange: #ffe5cc;
--efx-highlights-yellow: #fff4cc;
--efx-highlights-green: #dbffcc;
--efx-highlights-blue: #cdf3ff;
--efx-highlights-purple: #f9ccff;
```

## Status Palette

```css
--efx-status-red: #e8002a;
--efx-status-orange: #ff9633;
--efx-status-yellow: #ffd332;
--efx-status-green: #36b300;
--efx-status-blue: #00ace6;
--efx-status-purple: #9e00b3;
```

## Basic Elements

```css
--efx-text-color: var(--efx-gray);
--efx-link-color: var(--efx-primary-blue);
--efx-link-hover-color: var(--efx-shadow-blue);
--efx-disabled: var(--efx-gray-200);
--efx-page-background: #f7f7f7;
--efx-footer-background: var(--efx-gray);
--efx-accessibility-focus-color: var(--efx-gray-200);
```

## Borders

```css
--efx-borders: var(--efx-gray-400);
--efx-light-borders: var(--efx-gray-200);
--efx-dark-borders: var(--efx-gray-600);
```

## Usage Snippets

```html
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,300,0,0"
  rel="stylesheet"
/>
```

```html
<span class="material-symbols-outlined" aria-hidden="true">search</span>
<span class="material-symbols-outlined" aria-hidden="true">rocket_launch</span>
<span class="material-symbols-outlined" aria-hidden="true">hearing</span>
<span class="material-symbols-outlined" aria-hidden="true">handshake</span>
<span class="material-symbols-outlined" aria-hidden="true">bug_report</span>
```

```css
html {
  font-family: var(--font-family-open-sans);
}
```
