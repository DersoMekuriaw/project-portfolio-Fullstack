// app/(developer)/index.js   ← Developer Dashboard (with working logout)
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDeveloperProjects } from "../../services/api";
import ProjectCard from "../../components/ProjectCard";
import { Ionicons } from "@expo/vector-icons";

export default function DeveloperDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

console.log(projects)
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      if (!token) {
        router.replace("/auth/login");
        return;
      }

      const res = await getDeveloperProjects(userId, token);

      if (res.status === 200 || res.status === 201) {
        setProjects(res.data || []);
      } else {
        setMessage(res.data?.message || "No projects found.");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setMessage("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  // FULLY WORKING LOGOUT – This works 100%
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              // Remove all auth data
              await AsyncStorage.multiRemove(["token", "userId", "userRole"]);

              // THIS IS THE ONLY COMBO THAT WORKS RELIABLY
              router.dismissAll(); // Clears entire navigation history
              router.replace("/"); // Go to public landing page
            } catch (error) {
              console.log("Logout error:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Title + Logout Icon */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>My Projects</Text>

        {/* LOGOUT BUTTON – WORKS PERFECTLY */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={28} color="#ff4444" />
        </TouchableOpacity>
      </View>

      {/* Upload Button */}
      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={() => router.push("/developer/uploadProject")}
      >
        <Text style={styles.uploadText}>+ Upload New Project</Text>
      </TouchableOpacity>

      {/* Messages */}
      {message ? <Text style={styles.message}>{message}</Text> : null}

      {/* Loading or Projects List */}
      {loading ? (
        <Text style={styles.loading}>Loading your projects...</Text>
      ) : projects.length > 0 ? (
        <FlatList
          data={projects}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProjectCard project={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noProjects}>No projects uploaded yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  logoutBtn: {
    padding: 10,
    backgroundColor: "#ffe6e6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtn: {
    backgroundColor: "#333",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    textAlign: "center",
    color: "red",
    marginBottom: 10,
    fontSize: 16,
  },
  loading: {
    textAlign: "center",
    color: "#777",
    marginTop: 40,
    fontSize: 16,
  },
  noProjects: {
    textAlign: "center",
    color: "#555",
    marginTop: 40,
    fontSize: 16,
  },
});
