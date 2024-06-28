import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, View } from "react-native";
import Auth from "./src/components/profile/Auth";
import SplashScreen from "./src/screens/SplashScreen";
import MainStackNavigator from "./src/navigation/MainStackNavigation";
import {
  SessionProvider,
  useSession,
} from "./src/components/profile/SessionContext";

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!appReady) {
    return <SplashScreen />;
  }

  return (
    <SessionProvider>
      <NavigationContainer>
        <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
          <MainContent />
        </View>
      </NavigationContainer>
    </SessionProvider>
  );
}

const MainContent: React.FC = () => {
  const { session } = useSession();
  return session && session.user ? <MainStackNavigator /> : <Auth />;
};
