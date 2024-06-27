// App.tsx

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./src/services/supabase";
import Auth from "./src/components/profile/Auth";
import SplashScreen from "./src/screens/SplashScreen";
import MainStackNavigator from "./src/navigation/MainStackNavigation";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Tampilkan splash screen selama 3 detik
    const timer = setTimeout(() => {
      // Setelah 3 detik, atur appReady menjadi true
      setAppReady(true);
    }, 5000);

    return () => clearTimeout(timer); // Bersihkan timer jika komponen unmount
  }, []);

  useEffect(() => {
    // Periksa status autentikasi pengguna
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // Tampilkan splash screen selama aplikasi tidak siap
  if (!appReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        {session && session.user ? <MainStackNavigator /> : <Auth />}
      </View>
    </NavigationContainer>
  );
}
