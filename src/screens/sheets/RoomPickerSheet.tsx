import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Photo } from '../../components/Photo';
import { Sheet } from '../../components/Sheet';
import { Txt } from '../../components/Txt';
import { roomPhotos } from '../../data/images';
import { TREND_ROOMS } from '../../data/trend';
import { color, radius, space } from '../../theme/tokens';

type Props = {
  visible: boolean;
  onClose: () => void;
  roomIndex: number;
  onSelect: (index: number) => void;
};

/** Picks which room type the price-trend graph plots. */
export function RoomPickerSheet({ visible, onClose, roomIndex, onSelect }: Props) {
  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      title="Choose room type"
      subtitleColor={color.textSecondary}
      subtitle="Trends update for the room you pick"
      headerDivider={false}
    >
      <ScrollView contentContainerStyle={styles.body}>
        {TREND_ROOMS.map((room, index) => {
          const on = roomIndex === index;
          return (
            <Pressable
              key={room.name}
              onPress={() => onSelect(index)}
              style={[
                styles.row,
                {
                  borderColor: on ? color.primary : color.border,
                  backgroundColor: on ? color.primaryTint : color.surface,
                },
              ]}
            >
              <Photo uri={roomPhotos[index % roomPhotos.length]} style={styles.thumb} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Txt variant="semibold14">{room.name}</Txt>
                <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
                  {room.meta}
                </Txt>
                <Txt variant="semibold14" style={{ marginTop: space.x4 }}>
                  From {room.from}
                </Txt>
              </View>
              <View
                style={[
                  styles.radio,
                  on
                    ? { borderWidth: 7, borderColor: color.primary }
                    : { borderWidth: 1.5, borderColor: color.radioBorder },
                ]}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: space.x16,
    paddingBottom: space.x20,
    gap: space.x12,
  },
  row: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.x12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  thumb: {
    width: 72,
    height: 56,
    borderRadius: radius.md,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
  },
});
