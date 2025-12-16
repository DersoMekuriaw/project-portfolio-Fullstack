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
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function UploadProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [message, setMessage] = useState("");

  

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

  /* ================= UPLOAD ================= */
  const uploadImage = async () => {
    
const token = await AsyncStorage.getItem("token");

    if (!title || !imageUri) {
      setMessage("Title and screenshot are required");
      return;
    }

    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);

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

    try {
      const res = await fetch("http://localhost:5000/api/projects/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // <-- IMPORTANT
        },
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      Alert.alert("Success", "Project uploaded successfully");

      // reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setImageUri(null);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Upload failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Project</Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}

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
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={pickImage}>
        <Text style={styles.btnText}>Add Screenshot</Text>
      </TouchableOpacity>

      {/* IMAGE PREVIEW WITH CLOSE ICON */}
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

      <TouchableOpacity style={styles.btn} onPress={uploadImage}>
        <Text style={styles.btnText}>Upload Project</Text>
      </TouchableOpacity>
    </View>
  );
}
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
  message: {
    textAlign: "center",
    marginBottom: 12,
    color: "red",
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
});
