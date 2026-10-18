---
name: TerraRoute Editorial
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#414845'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#717975'
  outline-variant: '#c1c8c3'
  surface-tint: '#3f6658'
  primary: '#002218'
  on-primary: '#ffffff'
  primary-container: '#0f382c'
  on-primary-container: '#79a292'
  inverse-primary: '#a6d0be'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#301600'
  on-tertiary: '#ffffff'
  tertiary-container: '#4f2700'
  on-tertiary-container: '#e48015'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecda'
  primary-fixed-dim: '#a6d0be'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#274e41'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: Newsreader
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 24px
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-telemetry:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-tablet: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system pairs high-end editorial travel journalism with technical cartographic precision. It is crafted for discerning overland travelers, expedition planners, and cultural road-trippers who expect both refined storytelling and actionable, uncompromising route telemetry.

The aesthetic philosophy balances **Editorial Elegance** and **Tactile Cartography**:
- **Field Journal Meets Digital Instrument:** Generous whitespace, razor-sharp serif headlines, and understated utilitarian controls evoke vintage National Geographic field guides upgraded for modern responsive GIS applications.
- **Precision Over Decoration:** Visual hierarchy is anchored by strict hairline dividers, topographic vector layers, coordinate references, and micro-metric badges rather than generic decorative drop shadows or heavy illustrations.
- **Calm, High-Information Density:** Interactive route elevation profiles, switchback ratings, and surface telemetry remain legible without crowding narrative photography and curatorial prose.

## Colors
The color system reflects natural topography, alpine forests, open coastlines, and functional navigation waypoints.

- **Primary (`#0F382C` - Deep Forest Emerald):** The foundational brand anchor. Used for primary buttons, high-level navigation headers, key branding typography, and focal interactive states.
- **Secondary (`#0D9488` - Navigation Teal):** Represents movement, GPS vector paths, live track overlays, focal pins, and active switch/toggle states.
- **Base Canvas (`#F8F6F0` - Topographic Sand):** The primary light-mode background canvas. It eliminates clinical white glare, imparting a tactile, archival map-stock feel.
- **Surfaces & Borders:**
  - `surface-elevated`: `#FFFFFF`
  - `surface-muted`: `#EFECE4`
  - `border-hairline`: `rgba(15, 23, 42, 0.08)`
  - `border-strong`: `rgba(15, 56, 44, 0.20)`
- **Text & Neutral (`#0F172A` - Slate Obsidian):** Deep slate ensures AAA contrast on sand surfaces while softening pure black harshness.
  - `text-primary`: `#0F172A`
  - `text-secondary`: `#475569`
  - `text-muted`: `#64748B`
  - `text-inverse`: `#F8F6F0`
- **Road Condition Indicator Scale:**
  - `condition-paved` (Smooth / Paved Highway): `#15803D` (Text/Icon: `#14532D`, Tinted Ground: `#DCFCE7`)
  - `condition-moderate` (Moderate / Gravel / Winding): `#D97706` (Text/Icon: `#78350F`, Tinted Ground: `#FEF3C7`)
  - `condition-challenging` (Rough Terrain / 4WD Only): `#DC2626` (Text/Icon: `#7F1D1D`, Tinted Ground: `#FEE2E2`)

## Typography
The system employs a tri-font pairing to partition editorial narrative from navigational guidance:

1. **Newsreader (Editorial Headline Display):** Provides literary gravity, grace, and human depth. Headlines larger than 32px automatically compress down on mobile displays to avoid hyphenation and visual sprawl.
2. **Plus Jakarta Sans (Body & UI Utility):** A geometric, approachable sans-serif that renders cleanly across all display resolutions. Used for itinerary itineraries, long-form guide descriptions, settings panels, and control labels.
3. **JetBrains Mono (Cartographic & Telemetry Metadata):** Used for technical data points: coordinates (`45°12'N 121°41'W`), road surface metrics (`Grade 14%`, `Elev. +1,420m`), passage runtimes, and status telemetry badges.

## Layout & Spacing
The layout follows a fluid-grid structure configured around editorial splits and responsive map workspaces.

- **Grid Architecture:** 12-column layout on desktop (breakpoint `1200px+`), collapsing to 8 columns on tablet (`768px - 1199px`), and 4 columns on mobile (`<768px`).
- **Sidebar-Canvas Split:** For route inspection views, the interface uses a 40/60 asymmetrical split: a fixed/scrollable 480px left telemetry sidebar paired with a fluid vector cartography canvas. On tablet and mobile, the sidebar collapses into a gesture-driven bottom sheet with elevation mini-bars.
- **Rhythm:** Spacing follows an 8pt vertical rhythm, punctuated by spacious `space-xl` gaps between distinct geographic sectors and tight `space-xs` increments inside dense telemetry clusters.

## Elevation & Depth
Elevation in this design system avoids heavy shadows, instead using **Cartographic Stratification**:

- **Tonal Layers:** The baseline canvas is `#F8F6F0`. Floating route sidebars and narrative cards rest at `#FFFFFF`. Inset map controls and telemetry wells use `#EFECE4`.
- **Low-Contrast Hairline Outlines:** All cards, floating map drawers, and inspection badges feature crisp 1px borders colored with `rgba(15, 23, 42, 0.08)` to resemble hand-scribed map registers.
- **Topographic Glassmorphism:** Map overlays, compass widgets, and sticky waypoint bars floating over satellite/vector maps utilize `rgba(248, 246, 240, 0.85)` with a `12px` backdrop blur and an inner `1px` translucent white border (`rgba(255, 255, 255, 0.6)`).
- **Subtle Grounding Shadow:** When modals or floating panels lift off the base canvas, elevation is achieved via an ambient, tinted drop: `box-shadow: 0 10px 30px -10px rgba(15, 56, 44, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)`.

## Shapes
A disciplined, architectural approach (`roundedness: 1` / Soft) keeps UI elements crisp and grounded:

- Standard cards, navigation panels, interactive inputs, and sidebars use `0.25rem` (4px) or `0.5rem` (8px for `rounded-lg`) border radii.
- Circular elements are reserved strictly for focal map pins, coordinate waypoints, directional compass needles, and profile avatars.
- Pill forms are restricted solely to high-contrast road condition pills and telemetry tags to signify real-time status.

## Components

### 1. Buttons & Navigation Triggers
- **Primary Action:** Solid `#0F382C` surface, `#F8F6F0` text, 4px corner radius, standard 12px vertical by 20px horizontal padding. Subtle hover state transition to `#164E3D`.
- **Secondary Action:** Outlined 1px `#0F382C`, transparent sand surface, `#0F382C` text. Hover state introduces a faint `#0F382C0A` wash.
- **Map Control Floating Buttons:** 40x40px square controls, `#FFFFFF` with hairline `rgba(15, 23, 42, 0.1)` border, featuring navigation teal `#0D9488` icon indicators.

### 2. Road Condition Badges & Indicators
- Compact, high-visibility capsules using `JetBrains Mono` at `label-telemetry`.
- **Smooth/Paved Highway:** `#DCFCE7` fill, `#14532D` label, solid `#22C55E` leading dot indicator.
- **Moderate/Gravel/Winding:** `#FEF3C7` fill, `#78350F` label, solid `#F59E0B` leading dot indicator.
- **Challenging/Rough 4WD:** `#FEE2E2` fill, `#7F1D1D` label, solid `#EF4444` leading dot indicator.

### 3. Route Cards & Waypoint Itineraries
- Enclosed in `#FFFFFF` with `1px` hairline slate border and subtle rounded corners (`rounded-lg`).
- Editorial image ratio 16:10 with pinned top-left road condition indicator and top-right distance/elevation chip.
- Content stack: `caption` country/region tag, `headline-sm` route name in Newsreader, followed by a summary row tracking grade, road type, and drivetime.

### 4. Interactive Elevation & Road Condition Sidebar
- Structural, vertically split inspector panel.
- Dynamic SVG gradient elevation profile spanning from start to endpoint coordinates.
- Scrubbing cursor displays real-time surface type (e.g., "Km 42.8: Unpaved switchback, 12% grade"), highlighted dynamically via the green-amber-red status tokens.
- Fixed summary footer displaying total ascent, high point, and technical vehicle clearance requirements.

### 5. Inputs & Filter Chips
- **Inputs:** Clean sand/white surfaces with sharp 1px borders (`#CBD5E1`), focusing with a sharp 1.5px ring in Navigation Teal (`#0D9488`).
- **Filter Chips:** 28px height, outlined pill styling with mono counts (`Alpine [12]`). Active states fill with `#0F382C` and reverse text to `#F8F6F0`.

### 6. Checkboxes & Radio Controls
- Custom square checkboxes (3px radius) and circular radios with a 1.5px `#0F382C` border. Checked states feature solid `#0F382C` fill with clean white interior ticks.