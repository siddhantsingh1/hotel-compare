import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DestinationResults,
  resultsHeading,
  useDestinationMatches,
} from '../components/DestinationResults';
import { ChevronLeft, SearchIcon } from '../components/Icon';
import { Txt } from '../components/Txt';
import { color, fontFamily, radius, space, TOUCH_TARGET, type } from '../theme/tokens';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (place: string) => void;
};

export function DestinationSearchScreen({ visible, onClose, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const { trimmed, matches } = useDestinationMatches(query);

  const close = () => {
    setQuery('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={close} statusBarTranslucent>
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.searchBar}>
          <Pressable onPress={close} style={styles.back} hitSlop={space.x8}>
            <ChevronLeft size={18} />
          </Pressable>
          <View style={styles.field}>
            <SearchIcon size={18} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              autoFocus
              placeholder="Search hotel, city, or country"
              placeholderTextColor={color.textMuted}
              style={styles.input}
              returnKeyType="search"
            />
            {query.length > 0 ? (
              <Pressable onPress={() => setQuery('')} style={styles.clear} hitSlop={space.x8}>
                <Txt variant="regular12" color={color.textSecondary}>
                  ×
                </Txt>
              </Pressable>
            ) : null}
          </View>
        </View>

        <ScrollView keyboardShouldPersistTaps="handled">
          <Txt variant="medium12" color={color.textSecondary} style={styles.heading}>
            {resultsHeading(trimmed, matches.length)}
          </Txt>

          <DestinationResults
            matches={matches}
            onSelect={(name) => {
              setQuery('');
              onSelect(name);
            }}
          />

          {trimmed.length > 0 && matches.length === 0 ? (
            <Txt variant="regular14" color={color.textSecondary} style={styles.noResults}>
              No matches. Try a city or hotel name.
            </Txt>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.surface,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  back: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    marginLeft: -space.x12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: color.page,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: radius.pill,
    paddingHorizontal: space.x16,
  },
  input: {
    flex: 1,
    // react-native-web only: suppress the browser focus ring on the search field
    ...({ outlineStyle: 'none' } as object),
    height: TOUCH_TARGET,
    padding: 0,
    color: color.text,
    fontFamily: fontFamily.regular,
    fontSize: type.regular16.fontSize,
    letterSpacing: type.regular16.letterSpacing,
  },
  clear: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
    backgroundColor: color.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    paddingTop: space.x12,
    paddingBottom: space.x4,
    paddingHorizontal: space.x16,
  },
  noResults: {
    paddingVertical: space.x32,
    paddingHorizontal: space.x16,
    textAlign: 'center',
  },
});
