import { router } from "expo-router";
import { FlatList, StyleSheet, Text } from "react-native";

import { EmptyState } from "../../src/components/EmptyState";
import { PhotoCard } from "../../src/components/PhotoCard";
import { Screen } from "../../src/components/Screen";
import { colors } from "../../src/constants/colors";
import { useLogbook } from "../../src/context/LogbookContext";

export default function GalleryScreen() {
  const { entries } = useLogbook();

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Mi Bitácora</Text>

      <Text style={styles.subtitle}>
        Fotografías guardadas con coordenadas GPS.
      </Text>

      {entries.length === 0 ? (
        <EmptyState
          title="Aún no hay registros"
          message="Toma tu primera fotografía para verla en esta galería."
        />
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PhotoCard
              entry={item}
              onPress={() => router.push(`/entry/${item.id}`)}
            />
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted,
    marginTop: 8,
    marginBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  listContent: {
    paddingBottom: 120,
  },
});