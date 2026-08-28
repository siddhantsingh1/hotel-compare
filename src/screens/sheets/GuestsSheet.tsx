import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { GuestControls, GuestCounts } from '../../components/GuestControls';
import { Sheet } from '../../components/Sheet';
import { space } from '../../theme/tokens';

export type { GuestCounts };

type Props = {
  visible: boolean;
  onClose: () => void;
  counts: GuestCounts;
  onChange: (patch: Partial<GuestCounts>) => void;
};

export function GuestsSheet({ visible, onClose, counts, onChange }: Props) {
  return (
    <Sheet visible={visible} onClose={onClose} title="Rooms & guests" headerDivider={false}>
      <View style={styles.body}>
        <GuestControls counts={counts} onChange={onChange} />
        <Button label="Apply" onPress={onClose} style={{ marginTop: space.x4 }} />
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: space.x16,
    paddingBottom: space.x16,
    gap: space.x16,
  },
});
