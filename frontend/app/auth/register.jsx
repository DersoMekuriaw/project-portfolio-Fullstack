// app/auth/register.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { registerUser } from "../../services/api";

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("developer"); // default role
  const [message, setMessage] = useState(""); // backend message

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
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

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleBtn, role === "developer" && styles.roleSelected]}
          onPress={() => setRole("developer")}
        >
          <Text
            style={
              role === "developer" ? styles.roleTextSelected : styles.roleText
            }
          >
            Developer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleBtn, role === "buyer" && styles.roleSelected]}
          onPress={() => setRole("buyer")}
        >
          <Text
            style={role === "buyer" ? styles.roleTextSelected : styles.roleText}
          >
            Buyer
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity  style={styles.btn}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
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
    color: "red", // error messages in red, success in green
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    marginBottom: 12,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  roleBtn: {
    borderWidth: 1,
    borderColor: "#555",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  roleSelected: {
    backgroundColor: "#555",
  },
  roleText: {
    color: "#555",
    fontWeight: "bold",
  },
  roleTextSelected: {
    color: "#fff",
    fontWeight: "bold",
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
  loginLink: {
    textAlign: "center",
    color: "#555",
    marginTop: 10,
  },
});