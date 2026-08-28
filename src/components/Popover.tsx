import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, Platform, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { color, radius, shadow, space } from '../theme/tokens';

export type Anchor = { x: number; y: number; width: number; height: number };

const GAP = space.x8;
const EDGE = space.x16;

type Props = {
  visible: boolean;
  onClose: () => void;
  /** Trigger rectangle in window coordinates, from measureInWindow. */
  anchor: Anchor | null;
  children: React.ReactNode;
  /** Panel width. Defaults to matching the trigger. */
  width?: number;
  /** Which edge of the panel lines up with the trigger. */
  align?: 'left' | 'right';
};

/**
 * A dropdown anchored to the element that opened it — the desktop counterpart
 * to the mobile bottom sheets. Flips above the trigger when there is not enough
 * room below, clamps to the viewport, and closes on outside click or Escape.
 *
 * Deliberately not a Modal: a Modal takes focus, which would kill typing in the
 * field that opened the popover. Render it as the last child of a flex:1 root
 * so it overlays the page in window coordinates.
 */
export function Popover({ visible, onClose, anchor, children, width, align = 'left' }: Props) {
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  const [panel, setPanel] = useState<{ width: number; height: number } | null>(null);

  // Re-measure whenever it reopens, since content can differ between openings.
  useEffect(() => {
    if (!visible) setPanel(null);
  }, [visible]);

  useEffect(() => {
    if (!visible || Platform.OS !== 'web') return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible, onClose]);

  if (!visible || !anchor) return null;

  const panelWidth = width ?? anchor.width;
  const below = winHeight - (anchor.y + anchor.height) - GAP - EDGE;
  const above = anchor.y - GAP - EDGE;
  // Prefer below; flip only when below genuinely cannot hold the panel and
  // above has more room.
  const flip = !!panel && panel.height > below && above > below;

  const top = flip ? Math.max(EDGE, anchor.y - GAP - (panel?.height ?? 0)) : anchor.y + anchor.height + GAP;
  const maxHeight = flip ? above : below;

  const rawLeft = align === 'right' ? anchor.x + anchor.width - panelWidth : anchor.x;
  const left = Math.min(Math.max(rawLeft, EDGE), Math.max(EDGE, winWidth - panelWidth - EDGE));

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View
        style={[
          styles.panel,
          {
            top,
            left,
            width: panelWidth,
            maxHeight,
            // Hide the first frame, before the panel has been measured.
            opacity: panel ? 1 : 0,
          },
        ]}
        onLayout={(event: LayoutChangeEvent) => {
          const { width: w, height: h } = event.nativeEvent.layout;
          if (!panel || Math.abs(panel.height - h) > 1) setPanel({ width: w, height: h });
        }}
      >
        {children}
      </View>
    </View>
  );
}

/** Measures a trigger so a Popover can be anchored to it. */
export function measureAnchor(
  ref: React.RefObject<View | null>,
  onMeasured: (anchor: Anchor) => void
) {
  ref.current?.measureInWindow((x, y, width, height) => onMeasured({ x, y, width, height }));
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  panel: {
    position: 'absolute',
    backgroundColor: color.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: color.border,
    overflow: 'hidden',
    ...shadow.cardActive,
  },
});
