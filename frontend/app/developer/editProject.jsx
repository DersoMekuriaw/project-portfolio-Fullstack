import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateProject } from "../../services/api";

export default function EditProject() {
  const router = useRouter();
  const { project } = useLocalSearchParams();
  const parsed = JSON.parse(project);

  const [title, setTitle] = useState(parsed.title);
  const [description, setDescription] = useState(parsed.description);
  const [price, setPrice] = useState(String(parsed.price));

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      await updateProject(
        parsed._id,
        {
          title,
          description,
          price,
        },
        token
      );

      Alert.alert("Success", "Project updated");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Update failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={{ borderBottomWidth: 1, marginBottom: 15 }}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        style={{ borderBottomWidth: 1, marginBottom: 15 }}
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Price"
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Update Project" onPress={handleUpdate} />
    </View>
  );
}
