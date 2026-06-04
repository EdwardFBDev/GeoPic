import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors } from "../constants/colors";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
};

export function AppButton({
  title,
  onPress,
  variant = "primary",
  style,
}: AppButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        style,
      ]}
    >
      <Text style={[styles.text, !isPrimary && styles.secondaryText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.input,
  },
  text: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryText: {
    color: colors.text,
  },
});