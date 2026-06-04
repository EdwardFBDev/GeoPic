import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { LogbookEntry } from "../types/logbook";

type PhotoCardProps = {
  entry: LogbookEntry;
  onPress?: () => void;
};

export function PhotoCard({ entry, onPress }: PhotoCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: entry.imageUri }} style={styles.image} />

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.description}>
          {entry.description || "Sin descripción"}
        </Text>

        <Text style={styles.coordinates}>
          📍 {entry.latitude.toFixed(4)}, {entry.longitude.toFixed(4)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: colors.surface,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 130,
    backgroundColor: colors.border,
  },
  content: {
    padding: 10,
  },
  description: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  coordinates: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
});