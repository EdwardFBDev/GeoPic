import { router } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AppButton } from "../src/components/AppButton";
import { colors } from "../src/constants/colors";

export default function WelcomeScreen() {
  const [, requestCameraPermission] = useCameraPermissions();
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    requestInitialPermissions();
  }, []);

  const requestInitialPermissions = async () => {
    try {
      setIsRequesting(true);

      const cameraResult = await requestCameraPermission();
      const locationResult =
        await Location.requestForegroundPermissionsAsync();

      if (
        !cameraResult.granted ||
        locationResult.status !== "granted"
      ) {
        Alert.alert(
          "Permisos requeridos",
          "GeoPic necesita acceso a la cámara y ubicación para guardar fotografías con coordenadas GPS."
        );
      }
    } catch {
      Alert.alert(
        "Error",
        "No fue posible solicitar los permisos."
      );
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View>
          <Text style={styles.title}>Capture.</Text>
          <Text style={[styles.title, styles.accent]}>
            Explore.
          </Text>
          <Text style={styles.title}>Remember.</Text>

          <Text style={styles.subtitle}>
            Guarda fotografías junto con su ubicación
            geográfica real.
          </Text>
        </View>

        <View style={styles.actions}>
          <AppButton
            title={
              isRequesting
                ? "Solicitando permisos..."
                : "Empezar Bitácora →"
            }
            onPress={() => router.push("/(tabs)/capture")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 36,
    justifyContent: "space-between",
  },

  title: {
    color: colors.surface,
    fontSize: 42,
    fontWeight: "900",
  },

  accent: {
    color: colors.primary,
  },

  subtitle: {
    color: colors.surface,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 24,
    maxWidth: 300,
  },

  actions: {
    gap: 12,
  },
});