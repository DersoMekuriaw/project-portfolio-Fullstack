import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const home = () => {
  return (
    <View>
      {/* Header with Logout Button */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.header}>Explore Projects</Text>
          <Text style={styles.subHeader}>
            Buy high-quality code from developers
          </Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={28} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default home

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