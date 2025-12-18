import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
const BASE_URL = "http://localhost:4000";

export default function ProjectCard({ project }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/buyer/projectDetail",
          params: { id: project._id },
        })
      }
    >
      {/* PROJECT IMAGE */}
      {project.screenshot && project.screenshot.length > 0 ? (
        <Image
          source={{ uri: `${BASE_URL}${project.screenshot}` }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}

      {/* TEXT SECTION */}
      <View style={styles.textBox}>
        <Text style={styles.title}>{project.title}</Text>

        <Text style={styles.description} numberOfLines={2}>
          {project.description}
        </Text>

        <Text style={styles.price}>Price: ${project.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  image: {
    width: "100%",
    height: 150,
  },
  noImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
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
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
