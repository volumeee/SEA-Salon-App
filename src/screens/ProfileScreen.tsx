import { View, Text } from "react-native";
import React from "react";
import { Session } from "@supabase/supabase-js"; // Make sure you have this import
import { supabase } from "../services/supabase"; // Ensure you have access to supabase
import Profile from "../components/profile/Profile";

const ProfileScreen = () => {
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session ? <Profile session={session} /> : <Text>Loading...</Text>}
    </View>
  );
};

export default ProfileScreen;
