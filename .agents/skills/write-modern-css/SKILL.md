---
name: write-modern-css
description: Enforce native, modern, maintainable CSS with intrinsic responsive layouts, Grid, native nesting, low-specificity cascade, logical properties, accessibility, and Baseline-compatible features. Use whenever creating, editing, reviewing, debugging, or refactoring CSS, component styles, design tokens, responsive layouts, animations, or styling architecture in any frontend project.
---

# Write Modern CSS

Use the web platform directly. Produce resilient styles that respond to content and containers without framework abstractions or device-specific assumptions.

## Native CSS First

- Do not use or introduce Tailwind, utility CSS frameworks, component libraries, CSS-in-JS libraries, preprocessors, or other styling abstractions unless the user explicitly requests them.
- Prefer plain static CSS. Use CSS Modules only when the repository already uses them or explicit local scoping is required.
- Preserve semantic HTML and native browser behavior. Do not add wrapper elements solely to make styling easier when existing semantic elements can express the structure.
- Use modern CSS features whose Baseline status satisfies the project's browser support policy.
- Treat Baseline Widely Available features as the default. Baseline Newly Available features are allowed when the project supports them or the enhancement degrades safely.
- For a feature with Limited Availability, use progressive enhancement with `@supports`, provide a simple fallback, or ask before making it critical to the experience.
- Check current MDN or Web Platform Baseline data when support is uncertain; do not rely on remembered browser-version tables.
- Do not add legacy layout hacks, clearfixes, CSS expressions, browser sniffing, spacer elements, table-based layout, or hand-written vendor-prefix duplication.
- Let the existing build tool add prefixes only when the declared browser policy requires them.

## Cascade and Selectors

- Prefer the cascade, inheritance, semantic element selectors, and shared custom properties over assigning a class to every element.
- Establish sensible classless base styles for typography, links, controls, media, and document flow, scoped appropriately to avoid unintended global changes.
- Use classes for components, variants, states, and intentional exceptions. Do not style with IDs.
- Keep selector specificity low and predictable. Prefer single classes, semantic descendants, and `:where()` when a structural selector should add no specificity.
- Use cascade layers to establish explicit precedence when styles come from distinct origins or architectural concerns.
- Never use `!important` to win a specificity conflict. Fix the cascade, layer order, or selector design.
- Avoid inline style attributes for static presentation. Use inline custom properties only when a genuinely dynamic value must cross from application code into CSS.
- Avoid selectors coupled to deep DOM structure. A component should remain styleable after behavior-preserving markup changes.
- Represent design tokens and repeated decisions with meaningful custom properties. Provide fallbacks at external or theming boundaries.

## Native Nesting

- Use native CSS nesting for states, variants, pseudo-elements, conditional rules, and closely related descendants.
- Keep nesting shallow, normally no more than three levels, and preserve low specificity.
- Use `&` when the relationship to the parent selector needs to be explicit.
- Do not use Sass-only selector concatenation such as `&--active`; native CSS nesting does not concatenate selector text.
- Do not nest unrelated selectors merely to mirror the DOM tree.
- Remember that nested selector lists use `:is()`-like specificity. Avoid placing high-specificity selectors in a list that would raise every nested selector's weight.

## Layout

- Let normal document flow solve the layout before adding a layout system.
- Prefer CSS Grid for page structure, two-dimensional layouts, explicit alignment, overlapping regions, and controlled tracks.
- Use Flexbox for genuinely one-dimensional distribution or intrinsic groups such as toolbars and button rows.
- Prefer `gap` for spacing between grid or flex items instead of compensating child margins.
- Build intrinsic grids with `repeat()`, `auto-fit` or `auto-fill`, `minmax()`, `fit-content()`, and fractional tracks when they express the behavior without a breakpoint.
- Use `subgrid` when descendants must align to ancestor tracks and its Baseline status fits the project policy.
- Avoid absolute or fixed positioning for primary layout. Use them only for intentional layering or viewport attachment.
- Avoid fixed heights for content containers. Let content define block size and constrain only where the product behavior requires it.
- Set `min-inline-size: 0` on grid or flex children when intrinsic sizing would otherwise cause overflow.
- Use `box-sizing: border-box` as the global sizing model.

## Responsive Design

- Do not create breakpoints for named devices such as phone, tablet, laptop, or desktop.
- Start with semantic source order, normal flow, flexible tracks, wrapping, intrinsic sizing, and fluid values. Add a query only when the content or interaction actually needs a mode change.
- Prefer container queries for reusable components whose presentation depends on their available container space.
- Use media queries for page-level viewport changes, print, display characteristics, input capabilities, and user preferences. Media queries are current CSS and are not deprecated.
- Choose viewport breakpoints where the content stops working, not from a device-width list.
- Prefer relative, content-oriented breakpoints and modern range syntax, such as `@media (width >= 60rem)`.
- Do not branch on orientation when available inline or block space expresses the actual constraint.
- Use mobile-first enhancement when a viewport query is necessary: keep the narrow layout in normal flow and add complexity when enough space exists.
- Use responsive images through `srcset`, `sizes`, `<picture>`, `aspect-ratio`, and `object-fit` as appropriate; do not download oversized assets and hide them with CSS.

## Sizing and Internationalization

- Prefer `rem`, `em`, `ch`, percentages, fractional units, and intrinsic keywords over fixed pixel dimensions.
- Use `clamp()`, `min()`, and `max()` for bounded fluid values instead of many small breakpoint adjustments.
- Constrain readable prose with a logical maximum such as `max-inline-size` in `ch`; do not stretch text across arbitrarily wide viewports.
- Prefer logical properties and values such as `margin-inline`, `padding-block`, `inline-size`, and `inset-inline-start` over physical left/right/top/bottom properties.
- Design for long text, localization, right-to-left writing, user font substitution, and text zoom without clipping or overlap.
- Use `dvh`, `svh`, or `lvh` deliberately for viewport-dependent interfaces instead of assuming `100vh` always represents visible mobile space.
- Do not hide overflow to conceal a layout defect. Resolve the sizing or wrapping cause.

## Accessibility and Interaction

- Never remove a focus outline unless replacing it with an equally visible `:focus-visible` treatment.
- Provide equivalent hover and keyboard-focus states. Do not make information or actions available only on hover.
- Maintain sufficient text, icon, focus-indicator, and control-state contrast in every theme and interaction state.
- Respect `prefers-reduced-motion`. Default to little or no motion and enable nonessential animation only under `prefers-reduced-motion: no-preference` when practical.
- Support relevant preferences and modes such as `prefers-color-scheme`, `prefers-contrast`, and `forced-colors` without using them as device proxies.
- Animate only when it communicates state or spatial continuity. Prefer `transform` and `opacity`; never use `transition: all`.
- Keep animation durations bounded and make repeated, parallax, flashing, or large-area motion avoidable.
- Preserve usable controls under zoom, text resizing, coarse pointers, touch input, and keyboard navigation.

## Maintainability and Verification

- Follow the repository's existing naming convention unless it conflicts with low specificity or semantic structure.
- Keep component-specific styles near their component while keeping tokens, foundations, and page-level layout at their appropriate shared boundary.
- Remove dead declarations, duplicated rules, overridden properties, and obsolete fallbacks during focused edits.
- Comment surprising constraints and compatibility fallbacks with the reason, not a narration of the declaration.
- Verify layouts across a continuous range of viewport and container widths rather than only a few preset device sizes.
- Test narrow and wide containers, 200% text zoom, long and unbroken content, localization, keyboard focus, reduced motion, forced colors, and supported color schemes where relevant.
- Check for overflow, layout shift, obscured focus, unreadable line lengths, unstable scrollbars, and content hidden behind fixed elements.
- Do not add JavaScript layout measurement when CSS Grid, intrinsic sizing, container queries, or normal flow can express the behavior.
