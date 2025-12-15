import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // backend messages

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please fill all fields!");
      return;
    }

    try {
      const res = await loginUser({ email, password });
      // backend should return { token, role, message }
      if (res.status === 200) {
        const { token, user, message: msg } = res.data;
        // Save everything you will need later
        await AsyncStorage.multiSet([
          ["token", token],
          ["role", user.role],
          ["userId", user.id], // ← THIS LINE WAS MISSING!!!
          ["user", JSON.stringify(user)], // ← Bonus: save full user (recommended)
        ]);

        console.log(res.data);

        setMessage(msg || "Login successful!");

        setTimeout(() => {
          if (user.role === "developer") {
            router.push("/developer/dashboard");
          } else if (user.role === "buyer") {
            router.push("/buyer/home");
          }
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Error during login. Try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.btn}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
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
    color: "#333", // brand primary
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
    fontSize: 16,
    color: "#333",
  },
  btn: {
    backgroundColor: "#333", // brand color
    padding: 15,
    borderRadius: 5,
    marginBottom: 12,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerLink: {
    textAlign: "center",
    color: "#555",
    marginTop: 10,
    fontSize: 14,
  },
});