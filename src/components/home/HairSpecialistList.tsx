import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { supabase } from "../../services/supabase";

// Define a type for the hair specialist data
interface HairSpecialist {
  id: number;
  specialist_name: string;
  specialist_phone: string;
  specialist_price: string;
  profile_picture: string;
}

const HairSpecialistList = ({ categoryId }: { categoryId: number | null }) => {
  const [hairSpecialists, setHairSpecialists] = useState<HairSpecialist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHairSpecialists();
  }, [categoryId]);

  const fetchHairSpecialists = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("hair_specialist")
        .select(
          "id, specialist_name, specialist_phone, specialist_price, profile_picture"
        );

      if (categoryId !== null) {
        query = query.eq("categories_id", categoryId);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
        return;
      }

      setHairSpecialists(data);
    } catch (error) {
      console.error("Error fetching hair specialists:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderHairSpecialistItem = ({ item }: { item: HairSpecialist }) => (
    <View style={styles.specialistCard}>
      <Text style={styles.name}>{item.specialist_name}</Text>
      <Text style={styles.phone}>Phone: {item.specialist_phone}</Text>
      <Text style={styles.price}>Price: {item.specialist_price}</Text>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{ uri: item.profile_picture }}
          style={styles.profileImage}
        />
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#ff6347" />;
  }

  return (
    <FlatList
      data={hairSpecialists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderHairSpecialistItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  specialistCard: {
    backgroundColor: "#ffefd5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 16,
    color: "#666",
  },
  price: {
    fontSize: 16,
    color: "#666",
  },
  imageContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default HairSpecialistList;
