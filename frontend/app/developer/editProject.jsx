import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProject() {
  const router = useRouter();
  const { project } = useLocalSearchParams();
  const parsed = JSON.parse(project);

  const [title, setTitle] = useState(parsed.title);
  const [description, setDescription] = useState(parsed.description);
  const [price, setPrice] = useState(String(parsed.price));
  const [imageUri, setImageUri] = useState(
    parsed.screenshot ? { uri: parsed.screenshot } : null
  );
  const [loading, setLoading] = useState(false);

  /* ================= PICK IMAGE ================= */
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0]);
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!title) {
      Alert.alert("Error", "Title is required");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);

      // only attach image if changed
      if (imageUri && imageUri.uri && !imageUri.uri.startsWith("http")) {
        if (Platform.OS === "web") {
          const response = await fetch(imageUri.uri);
          const blob = await response.blob();
          const file = new File([blob], "screenshot.jpg", {
            type: blob.type || "image/jpeg",
          });
          formData.append("screenshot", file);
        } else {
          formData.append("screenshot", {
            uri: imageUri.uri,
            name: "screenshot.jpg",
            type: "image/jpeg",
          });
        }
      }

      const res = await fetch(
        `http://localhost:4000/api/projects/update/${parsed._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      await res.json();

      Alert.alert("Success", "Project updated successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Project</Text>

      <TextInput
        placeholder="Project Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, { height: 80 }]}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={pickImage}>
        <Text style={styles.btnText}>Change Screenshot</Text>
      </TouchableOpacity>

      {/* IMAGE PREVIEW */}
      {imageUri && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: imageUri.uri }} style={styles.previewImage} />

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setImageUri(null)}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[styles.btn, loading && styles.disabledBtn]}
        onPress={handleUpdate}
        disabled={loading}
      >
        <Text style={styles.btnText}>
          {loading ? "Updating..." : "Update Project"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 5,
    marginBottom: 12,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  previewContainer: {
    position: "relative",
    alignSelf: "center",
    marginBottom: 15,
  },
  previewImage: {
    width: 220,
    height: 220,
    borderRadius: 5,
  },
  closeBtn: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#333",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  disabledBtn: {
    opacity: 0.6,
  },
});
