# FDX Brand Reference

Primary working reference for this Backstage customization.

## Fonts

```css
--font-family-open-sans: "Open Sans", arial, sans-serif;
--material-symbol-font: "Material Symbols Rounded";
```

## Brand Colors

```css
--fdx-brand-red: #9e1b32;
--fdx-brand-gray: #333e48;
```

## Primary Palette

```css
--fdx-primary-red: #9e1b32;
--fdx-primary-orange: #e77204;
--fdx-primary-yellow: #f1c319;
--fdx-primary-green: #45842a;
--fdx-primary-blue: #007298;
--fdx-primary-purple: #652f6c;
--fdx-black: #000000;
--fdx-white: #ffffff;
--fdx-gray: #333e48;
```

## Gray Palette

```css
--fdx-gray-100: #e7e7e7;
--fdx-gray-200: #cfcfcf;
--fdx-gray-300: #b5b5b5;
--fdx-gray-400: #9c9c9c;
--fdx-gray-500: #828282;
--fdx-gray-600: #696969;
--fdx-gray-700: #4f4f4f;
--fdx-gray-800: #363636;
--fdx-gray-900: #1c1c1c;
```

## Shadow Palette

```css
--fdx-shadow-red: #6d1222;
--fdx-shadow-orange: #994a00;
--fdx-shadow-yellow: #98700c;
--fdx-shadow-green: #294d19;
--fdx-shadow-blue: #004d66;
--fdx-shadow-purple: #431f47;
```

## Highlight Palette

```css
--fdx-highlights-red: #ffccd5;
--fdx-highlights-orange: #ffe5cc;
--fdx-highlights-yellow: #fff4cc;
--fdx-highlights-green: #dbffcc;
--fdx-highlights-blue: #cdf3ff;
--fdx-highlights-purple: #f9ccff;
```

## Status Palette

```css
--fdx-status-red: #e8002a;
--fdx-status-orange: #ff9633;
--fdx-status-yellow: #ffd332;
--fdx-status-green: #36b300;
--fdx-status-blue: #00ace6;
--fdx-status-purple: #9e00b3;
```

## Basic Elements

```css
--fdx-text-color: var(--fdx-gray);
--fdx-link-color: var(--fdx-primary-blue);
--fdx-link-hover-color: var(--fdx-shadow-blue);
--fdx-disabled: var(--fdx-gray-200);
--fdx-page-background: #f7f7f7;
--fdx-footer-background: var(--fdx-gray);
--fdx-accessibility-focus-color: var(--fdx-gray-200);
```

## Borders

```css
--fdx-borders: var(--fdx-gray-400);
--fdx-light-borders: var(--fdx-gray-200);
--fdx-dark-borders: var(--fdx-gray-600);
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
