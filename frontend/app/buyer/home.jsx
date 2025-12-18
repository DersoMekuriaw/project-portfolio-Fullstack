// app/(buyer)/index.tsx   ← Your BuyerHome screen
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  Pressable ,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProjectCard from "../../components/ProjectCard";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";

export default function BuyerHome() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const baseURL = "http://localhost:4000/api/projects";

 const fetchProjects = async () => {
   try {
     const token = await AsyncStorage.getItem("token");
     console.log("TOKEN:", token);

     const res = await axios.get(`${baseURL}/all`, {
       headers: { Authorization: `Bearer ${token}` },
     });

     console.log("RESPONSE:", res.data);

     setProjects(res.data);
     setFilteredProjects(res.data);
   } catch (error) {
     console.log("FETCH ERROR:", error.response?.data || error.message);
     Alert.alert("Error", "Failed to load projects");
   } finally {
     setLoading(false);
   }
 };


  useEffect(() => {
    fetchProjects();
  }, []);
  
  // LOGOUT FUNCTION
  const handleLogout = async () => {
    const isWeb = typeof window !== "undefined";

    let confirmLogout = true;

    if (isWeb) {
      confirmLogout = window.confirm("Are you sure you want to logout?");
    } else {
      // Mobile: use Alert.alert
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Logout",
            style: "destructive",
            onPress: async () => {
              await performLogout();
            },
          },
        ],
        { cancelable: true }
      );
      return; // exit, mobile handles separately
    }

    if (confirmLogout) {
      await performLogout();
    }
  };

  // Separate function to handle actual logout
  const performLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "userRole", "userId"]);

      if (typeof window !== "undefined") {
        window.location.href = "/";
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };




  const handleSearch = (text) => {
    setSearch(text);
    if (!text.trim()) {
      setFilteredProjects(projects);
      return;
    }
    const filtered = projects.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  return (
    <View style={styles.container}>
      {/* Header with Logout Button */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.header}>Explore Projects</Text>
          <Text style={styles.subHeader}>
            Buy high-quality code from developers
          </Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={28} color="#ff4444" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" />
        <TextInput
          placeholder="Search projects…"
          style={styles.searchInput}
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {/* Projects List */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0A81FF"
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={filteredProjects}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProjectCard project={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0A0A0A",
  },
  subHeader: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  logoutBtn: {
    padding: 8,
    backgroundColor: "#ffe6e6",
    borderRadius: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 18,
    elevation: 3,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
});
