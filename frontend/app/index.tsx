// app/index.tsx → Beautiful public landing page using your brand (#333)
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function PublicHomePage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Optional Logo – replace with your real logo */}
     
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Sign in to continue or create a new account to get started.
      </Text>

      {/* Action Buttons – using your exact #333 brand color */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/auth/login")}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => router.push("/auth/register")}
          activeOpacity={0.8}
        >
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* Feature Highlights – subtle & clean */}
      <View style={styles.features}>
        <Text style={styles.featureText}>Secure & Private</Text>
        <Text style={styles.featureText}>Simple. Fast. Free.</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>© 2025 MyApp. All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 50,
    borderRadius: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#333", // Your brand primary
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 17,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 60,
  },
  loginButton: {
    backgroundColor: "#333", // Your brand color
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  signupButton: {
    backgroundColor: "transparent",
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#333",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  signupButtonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "700",
  },
  features: {
    gap: 10,
    marginBottom: 50,
  },
  featureText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  footerText: {
    color: "#aaa",
    fontSize: 13,
    position: "absolute",
    bottom: 40,
  },
});