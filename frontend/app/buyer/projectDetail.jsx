import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getProjectById } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://localhost:4000";

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await getProjectById(id);
      setProject(res.data);
    } catch (error) {
      console.log("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!project) {
    return (
      <View style={styles.center}>
        <Text>Project not found</Text>
      </View>
    );
  }

  const handleBack = async () => {
    try {
      const role = await AsyncStorage.getItem("role");
      console.log("User role:", role);

      if (role === "buyer") {
        router.replace("/buyer/home");
      } else if (role === "developer") {
        router.replace("/developer/dashboard");
      } else {
        router.replace("/");
      }
    } catch (error) {
      router.replace("/");
    }
  };



  return (
    <ScrollView style={styles.container}>
      {/* Back */}
      <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Image */}
      {project.screenshot ? (
        <Image
          source={{ uri: `${BASE_URL}${project.screenshot}` }}
          style={styles.image}
        />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>No Image Available</Text>
        </View>
      )}

      {/* Title */}
      <Text style={styles.title}>{project.title}</Text>

      {/* Developer */}
      <Text style={styles.developer}>
        by {project.developerId?.name || "Unknown Developer"}
      </Text>

      {/* Price */}
      <Text style={styles.price}>${project.price}</Text>

      {/* Description */}
      <Text style={styles.subTitle}>Description</Text>
      <Text style={styles.description}>{project.description}</Text>

      {/* Buy */}
      <TouchableOpacity style={styles.buyBtn}>
        <Text style={styles.buyText}>Buy Now</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    padding: 15,
  },
  backText: {
    fontSize: 16,
    fontWeight: "500",
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 15,
  },
  noImage: {
    height: 250,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#777",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
  developer: {
    paddingHorizontal: 15,
    color: "#555",
    marginVertical: 6,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 15,
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  buyBtn: {
    backgroundColor: "#333",
    marginHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buyText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});
