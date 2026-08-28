import { useWindowDimensions } from 'react-native';

/**
 * Additive desktop breakpoint. Below this the app renders exactly the mobile
 * layout it always has; at or above it, screens may opt into a desktop
 * composition. Nothing between 360 and 1023 changes.
 */
export const DESKTOP_MIN_WIDTH = 1024;

/** Content column cap — the page centres inside wider viewports. */
export const DESKTOP_CONTENT_WIDTH = 1200;

export function useIsDesktop() {
  const { width } = useWindowDimensions();
  return width >= DESKTOP_MIN_WIDTH;
}
