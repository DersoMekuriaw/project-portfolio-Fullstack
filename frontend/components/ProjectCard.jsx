import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const BASE_URL = "http://localhost:4000";

export default function ProjectCard({
  project,
  isOwner = false,
  onEdit,
  onDelete,
}) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      {/* CLICKABLE AREA */}
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/buyer/projectDetail",
            params: { id: project._id },
          })
        }
      >
        {/* IMAGE */}
        {project.screenshot ? (
          <Image
            source={{ uri: `${BASE_URL}${project.screenshot}` }}
            style={styles.image}
          />
        ) : (
          <View style={styles.noImage}>
            <Text style={styles.noImageText}>No Image</Text>
          </View>
        )}

        {/* TEXT */}
        <View style={styles.textBox}>
          <Text style={styles.title}>{project.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {project.description}
          </Text>
          <Text style={styles.price}>Price: ${project.price}</Text>
        </View>
      </TouchableOpacity>

      {/* OWNER ACTIONS */}
      {isOwner && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
            <Ionicons name="create-outline" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
            <Ionicons name="trash-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
  },
  noImage: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  noImageText: {
    color: "#999",
  },
  textBox: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#666",
    marginVertical: 6,
  },
  price: {
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    gap: 10,
  },
  editBtn: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: "#F44336",
    padding: 8,
    borderRadius: 8,
  },
});
