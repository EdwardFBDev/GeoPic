import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "./AppButton";
import { colors } from "../constants/colors";

type PermissionMessageProps = {
  title: string;
  message: string;
  onPress: () => void;
};

export function PermissionMessage({
  title,
  message,
  onPress,
}: PermissionMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔐</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      <AppButton title="Intentar nuevamente" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  icon: {
    fontSize: 48,
    textAlign: "center",
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
  },
  message: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
});