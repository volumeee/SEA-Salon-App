import React, { useState } from "react";
import { View, AppState, Text, ImageBackground } from "react-native";
import { Button, Input } from "@rneui/themed";
import { supabase } from "../../services/supabase";
import CustomAlert from "../other/CustomAlert";
import { useSession } from "./SessionContext";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { setSession } = useSession();

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  async function signInWithEmail() {
    if (!email || !password) {
      showAlert("Please fill in both email and password.");
      return;
    }
    if (!isValidEmail(email)) {
      showAlert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      showAlert(error.message);
    } else {
      console.log("Login successful. User session:", data.session);
      setSession(data.session);
      showAlert("Login successful!");
    }
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      if (error.message.includes("already registered")) {
        showAlert(
          "This email is already registered. Please use a different email or log in."
        );
      } else {
        showAlert(error.message);
      }
    } else if (!session) {
      showAlert("Please check your inbox for email verification!");
    }

    setLoading(false);
  }

  return (
    <ImageBackground
      source={require("../../../assets/xsplash.png")}
      className="flex-1 justify-center items-center"
      resizeMode="cover"
    >
      <View className="bg-white/70 p-6 rounded-xl w-4/5">
        <View className="flex-row justify-between mb-6">
          <Button
            title="Login"
            buttonStyle={{ backgroundColor: isLoginView ? "tomato" : "white" }}
            titleStyle={{ color: isLoginView ? "white" : "tomato" }}
            className="w-1/2"
            onPress={() => setIsLoginView(true)}
          />
          <Button
            title="Sign-up"
            buttonStyle={{ backgroundColor: !isLoginView ? "tomato" : "white" }}
            titleStyle={{ color: !isLoginView ? "white" : "tomato" }}
            className="w-1/2 ml-4"
            onPress={() => setIsLoginView(false)}
          />
        </View>

        {isLoginView ? (
          <>
            <View className="mb-4">
              <Input
                placeholder="Email"
                leftIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  size: 18,
                  style: { marginRight: 8 },
                }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize="none"
                inputContainerStyle={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}
              />
            </View>
            <View className="mb-4">
              <Input
                placeholder="Password"
                leftIcon={{
                  type: "font-awesome",
                  name: "unlock-alt",
                  size: 20,
                  style: { marginRight: 12 },
                }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
                autoCapitalize="none"
                inputContainerStyle={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}
              />
            </View>
            <Button
              title="Login"
              buttonStyle={{ backgroundColor: "tomato" }}
              className="w-full"
              onPress={() => signInWithEmail()}
              disabled={loading}
            />
          </>
        ) : (
          <>
            <View className="mb-4">
              <Input
                placeholder="Email"
                leftIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  size: 18,
                  style: { marginRight: 8 },
                }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize="none"
                inputContainerStyle={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}
              />
            </View>
            <View className="mb-4">
              <Input
                placeholder="Password"
                leftIcon={{
                  type: "font-awesome",
                  name: "unlock-alt",
                  size: 20,
                  style: { marginRight: 12 },
                }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
                autoCapitalize="none"
                inputContainerStyle={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}
              />
            </View>
            <Button
              title="Sign-up"
              buttonStyle={{ backgroundColor: "tomato" }}
              className="w-full"
              onPress={() => signUpWithEmail()}
              disabled={loading}
            />
          </>
        )}
      </View>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={handleAlertClose}
      />
    </ImageBackground>
  );
}
