import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Icon } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import Avatar from "./Avatar";
import { Input, Button } from "@rneui/themed"; // Assuming these are from your UI library
import { supabase } from "../../services/supabase";

export default function Profile({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [editing, setEditing] = useState(false);
  const [newFullName, setNewFullName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, full_name`)
        .eq("id", session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFullName(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username: newUsername || username,
        website: newWebsite || website,
        avatar_url: newAvatarUrl || avatarUrl,
        full_name: newFullName || fullName,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      } else {
        setUsername(updates.username);
        setWebsite(updates.website);
        setAvatarUrl(updates.avatar_url);
        setFullName(updates.full_name);
        setEditing(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex mt-10">
      <View className="items-center p-6">
        <Avatar size={120} url={avatarUrl} />
        <Text className="font-bold text-xl mt-3">{fullName}</Text>
        <Text className="font-normal text-base">@{username}</Text>
      </View>
      {!editing ? (
        <View className="flex-row justify-center px-10 gap-2">
          <TouchableOpacity
            className="flex-1 bg-[#ff6347] p-3 rounded-lg items-center justify-center mx-2"
            onPress={() => setEditing(true)}
          >
            <Text className="text-white font-bold text-sm">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 bg-[#ff6347] p-3 rounded-lg items-center justify-center mx-2 ${
              loading ? "bg-blue-500" : ""
            }`}
            onPress={() => supabase.auth.signOut()}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-sm">Logout</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <Modal visible={editing} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View className="mb-[50]">
              <Avatar
                size={200}
                url={newAvatarUrl || avatarUrl}
                uploadable={true}
                onUpload={setNewAvatarUrl}
              />
            </View>
            <Input
              label="Fullname"
              value={newFullName || fullName}
              onChangeText={(text) => setNewFullName(text)}
              labelStyle={{ fontSize: 14 }}
              style={{ fontSize: 14 }}
            />
            <Input
              label="Username"
              value={newUsername || username}
              onChangeText={(text) => setNewUsername(text)}
              labelStyle={{ fontSize: 14 }}
              style={{ fontSize: 14 }}
            />
            <Input
              label="Website"
              value={newWebsite || website}
              onChangeText={(text) => setNewWebsite(text)}
              labelStyle={{ fontSize: 14 }}
              style={{ fontSize: 14 }}
            />
            <View className="flex-row justify-between m-5">
              <TouchableOpacity
                className={`flex-1 bg-[#ff6347] p-3 rounded-lg items-center justify-center mx-2 ${
                  loading ? "bg-blue-500" : ""
                }`}
                onPress={updateProfile}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white font-bold text-sm">Update</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-[#ff6347] p-3 rounded-lg items-center justify-center mx-2"
                onPress={() => setEditing(false)}
              >
                <Text className="text-white font-bold text-sm">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <View className="p-6 mt-10">
        <MenuItem icon="history" text="Reservation History" />
        <MenuItem icon="group" text="Review" />
        <MenuItem icon="language" text="Language" />
        <MenuItem icon="support" text="Support" />
        <MenuItem icon="share" text="Share" />
        <MenuItem icon="info" text="About Us" />
      </View>
    </View>
  );
}

function MenuItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      }}
    >
      <Icon name={icon} type="material" size={20} />
      <Text className="ml-4 text-sm text-black">{text}</Text>
    </View>
  );
}
