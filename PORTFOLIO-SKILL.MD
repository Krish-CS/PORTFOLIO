# Coding Skill: Single-Screen Animated Navigation (SSAN)

## Core Philosophy
Every update or new feature must adhere to the "One Screen, One Concept" rule. Users should never see "cut-off" content. Transitioning between sections must feel fluid, like a high-end presentation.

## Technical Constraints

### 1. Layout & Scroll Behavior
- **Viewport Lock:** Use CSS Scroll Snapping (`scroll-snap-type: y mandatory`). 
- **Section Sizing:** Every main content container must be exactly `100vh` and `100vw`.
- **Sensory Trigger:** Implement a "gentle slide" threshold. If using JavaScript, use `wheel` and `touchstart` listeners with a debounced function to trigger the next section animation.
- **TV Compatibility:** Ensure focus management is handled for D-pad (remote control) navigation.

### 2. Animations & Transitions
- **Entry/Exit:** Use CSS transitions or Framer Motion. Content must not just "appear"; it must slide or fade in with a 0.6s ease-out timing.
- **Glitch-Free Nav:** The top navigation bar must remain `position: fixed` with a high `z-index`. When sections update, the Nav must not re-render or flicker. Use "memoization" for Nav components.

### 3. Responsiveness & Assets
- **Aspect Ratio:** Use `object-fit: cover` for HD background images to ensure they don't stretch on Ultra-wide monitors or vertical mobile screens.
- **Media Quality:** Default to WebP/AVIF formats for HD backgrounds to maintain performance without losing quality.
- **Spacing:** Use relative units (`rem`, `vh`, `vw`) rather than pixels to ensure the "single screen" look persists on 4K TVs and small mobile devices.

### 4. Preservation Rule
- **Legacy Support:** When adding new sections, do not overwrite the existing `scroll-snap` logic. 
- **State Management:** Ensure the current "active slide" index is preserved during hot-reloads or partial updates.