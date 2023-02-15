# About

My personal web site & spiritual wiki.

## Init data

The first commit when I finally got how this should be done is `10597010` from `Fri Feb 3 11:19:17 2023 -0600` from when I was in Emiliano Zapata, Morelos.

# Template

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="/css/layout.css" />
    <script type="module" src="/js/layout.js"></script>
  </head>

  <body>
    <main>
    </main>
  </body>
</html>
```

## Caveats

Do not put anything else into the head like `<style>`. It'd get applied only when loaded initially, but not when transitioned to your page from another component as we're using `history.pushState` rather than loading a new page.

Every page transition sets `body.id` to `{your-page-name}-page`, so for instance on `/about` the `body.id` will be set to `about-page`.

# Development

Run `./bin/serve` ([Babashka](https://babashka.org) is required).

# TODO

## Design

- Hero image(s).
- Mapache.
- How to choose a healer.
- https://stackoverflow.com/questions/11722442/is-there-a-way-to-use-dpi-in-css-media-queries-instead-of-px
- Use 3 sizes: mobile (3x4 ratio), desktop (1x4) and large screen (1x4 HD). Based on this do media queries to set correct height for contain, as in we know the ratios now.
- Use EM/EX to scale.

## Hosting

- Consider hosting elsewhere. GH pages stopped working for subprojects, i. e. jakub-stastny.github.io/dev
