import { router, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import { AppButton } from "../../src/components/AppButton";
import { Screen } from "../../src/components/Screen";
import { colors } from "../../src/constants/colors";
import { useLogbook } from "../../src/context/LogbookContext";

export default function EntryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entries } = useLogbook();

  const entry = entries.find((item) => item.id === id);

  if (!entry) {
    return (
      <Screen style={styles.center}>
        <Text style={styles.title}>Registro no encontrado</Text>
        <AppButton title="Volver" onPress={() => router.back()} />
      </Screen>
    );
  }

  return (
    <Screen scroll style={styles.container}>
      <AppButton title="← Volver" variant="secondary" onPress={() => router.back()} />

      <Image source={{ uri: entry.imageUri }} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.title}>
          {entry.description || "Sin descripción"}
        </Text>

        <View style={styles.locationBox}>
          <Text style={styles.locationTitle}>Ubicación GPS</Text>
          <Text style={styles.locationText}>
            Latitud: {entry.latitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Longitud: {entry.longitude.toFixed(6)}
          </Text>
        </View>

        <Text style={styles.date}>
          Fecha: {new Date(entry.createdAt).toLocaleString()}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    gap: 16,
  },
  center: {
    justifyContent: "center",
    gap: 20,
  },
  image: {
    width: "100%",
    height: 360,
    borderRadius: 28,
    backgroundColor: colors.border,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    gap: 16,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
  },
  locationBox: {
    backgroundColor: colors.dark,
    borderRadius: 18,
    padding: 16,
  },
  locationTitle: {
    color: colors.primary,
    fontWeight: "800",
    marginBottom: 8,
  },
  locationText: {
    color: colors.surface,
    fontSize: 15,
  },
  date: {
    color: colors.muted,
    fontSize: 14,
  },
});