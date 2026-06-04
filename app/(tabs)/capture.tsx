import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { AppButton } from "../../src/components/AppButton";
import { PermissionMessage } from "../../src/components/PermissionMessage";
import { Screen } from "../../src/components/Screen";
import { colors } from "../../src/constants/colors";
import { useLogbook } from "../../src/context/LogbookContext";

export default function CaptureScreen() {
  const cameraRef = useRef<CameraView | null>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const [hasPermissionError, setHasPermissionError] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const { addEntry } = useLogbook();

  const verifyPermissions = async () => {
    const cameraResult = await requestCameraPermission();
    const locationResult = await Location.requestForegroundPermissionsAsync();

    const hasPermissions =
      cameraResult.granted && locationResult.status === "granted";

    setHasPermissionError(!hasPermissions);

    if (!hasPermissions) {
      Alert.alert(
        "Permisos requeridos",
        "Debes permitir cámara y ubicación para tomar una foto con coordenadas."
      );
      return false;
    }

    return true;
  };

  const openCamera = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) return;

    setIsCameraOpen(true);
  };

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      setIsLoading(true);

      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setImageUri(photo.uri);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setIsCameraOpen(false);
    } catch {
      Alert.alert(
        "Error",
        "No fue posible capturar la fotografía o la ubicación."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const saveEntry = () => {
    if (!imageUri || latitude === null || longitude === null) {
      Alert.alert(
        "Registro incompleto",
        "Primero debes tomar una fotografía con ubicación."
      );
      return;
    }

    addEntry({
      id: Date.now().toString(),
      imageUri,
      description: description.trim(),
      latitude,
      longitude,
      createdAt: new Date().toISOString(),
    });

    setImageUri(null);
    setDescription("");
    setLatitude(null);
    setLongitude(null);

    Alert.alert("Registro guardado", "La fotografía fue agregada a tu bitácora.");
  };

  if (!cameraPermission) {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Screen>
    );
  }

  if (hasPermissionError) {
    return (
      <Screen>
        <PermissionMessage
          title="Permisos requeridos"
          message="GeoPic necesita acceso a la cámara y ubicación para guardar fotografías con coordenadas GPS."
          onPress={verifyPermissions}
        />
      </Screen>
    );
  }

  if (isCameraOpen) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing="back" />

        <View style={styles.cameraActions}>
          <AppButton
            title={isLoading ? "Capturando..." : "Tomar fotografía"}
            onPress={takePhoto}
          />

          <AppButton
            title="Cancelar"
            variant="secondary"
            onPress={() => setIsCameraOpen(false)}
          />
        </View>
      </View>
    );
  }

  return (
    <Screen scroll style={styles.container}>
      <Text style={styles.title}>Nueva captura</Text>

      <Text style={styles.subtitle}>
        Toma una fotografía y registra automáticamente su ubicación GPS.
      </Text>

      <View style={styles.previewCard}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        ) : (
          <View style={styles.emptyPreview}>
            <Text style={styles.cameraIcon}>📷</Text>
            <Text style={styles.emptyText}>Aún no has tomado una fotografía</Text>
          </View>
        )}
      </View>

      {latitude !== null && longitude !== null && (
        <View style={styles.locationCard}>
          <Text style={styles.locationLabel}>Ubicación capturada</Text>
          <Text style={styles.locationText}>Latitud: {latitude.toFixed(6)}</Text>
          <Text style={styles.locationText}>
            Longitud: {longitude.toFixed(6)}
          </Text>
        </View>
      )}

      <Text style={styles.inputLabel}>Descripción</Text>

      <TextInput
        style={styles.input}
        placeholder="Ejemplo: Vista desde la montaña..."
        placeholderTextColor={colors.muted}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.actions}>
        <AppButton title="Tomar fotografía" onPress={openCamera} />
        <AppButton title="Guardar registro" onPress={saveEntry} />
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  previewCard: {
    height: 260,
    backgroundColor: colors.surface,
    borderRadius: 28,
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  emptyPreview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    fontSize: 42,
    marginBottom: 12,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "600",
  },
  locationCard: {
    backgroundColor: colors.dark,
    borderRadius: 20,
    padding: 16,
  },
  locationLabel: {
    color: colors.primary,
    fontWeight: "700",
    marginBottom: 8,
  },
  locationText: {
    color: colors.surface,
  },
  inputLabel: {
    fontWeight: "700",
    color: colors.text,
  },
  input: {
    minHeight: 100,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    textAlignVertical: "top",
    color: colors.text,
  },
  actions: {
    gap: 12,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  camera: {
    flex: 1,
  },
  cameraActions: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 12,
    backgroundColor: colors.dark,
  },
});