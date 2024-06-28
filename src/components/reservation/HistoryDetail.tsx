import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/NavigationTypes";
import StarRating from "react-native-star-rating-widget";
import { supabase } from "../../services/supabase";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/id";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("id");

type HistoryDetailRouteProp = RouteProp<RootStackParamList, "HistoryDetail">;

type Props = {
  route: HistoryDetailRouteProp;
};

const HistoryDetail = ({ route }: Props) => {
  const { transaction } = route.params;
  const [t_rating, setRating] = useState(0);
  const heightCard = transaction.t_state_id.status === "done" ? "60%" : "50%";

  useEffect(() => {
    async function fetchRating() {
      try {
        const { data, error } = await supabase
          .from("transaction")
          .select("t_rating")
          .eq("id", transaction.id)
          .single();

        if (error) {
          console.error("Error fetching rating:", error);
        } else {
          setRating(data.t_rating || 0);
        }
      } catch (error) {
        console.error("Error in fetchRating:", error);
      }
    }

    fetchRating();
  }, [transaction.id]);

  useEffect(() => {
    async function updateRating() {
      if (t_rating > 0) {
        try {
          const { data, error } = await supabase
            .from("transaction")
            .update({ t_rating })
            .eq("id", transaction.id);

          if (error) {
            console.error("Error updating rating:", error);
          } else {
            console.log("Rating updated successfully:", data);
          }
        } catch (error) {
          console.error("Error in updateRating:", error);
        }
      }
    }

    updateRating();
  }, [t_rating]);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}></View>
      <View style={[styles.card, { height: heightCard }]}>
        <View style={styles.innerCard}>
          <View style={styles.header}>
            <View style={styles.specialistInfo}>
              <Image
                source={{ uri: transaction.hair_specialist_id.profile_picture }}
                style={styles.profilePicture}
              />
              <View>
                <View style={styles.infoname}>
                  <Text style={styles.specialistName}>
                    {transaction.t_specialist_name}
                  </Text>
                  <Text style={styles.specialistCategories}>
                    {transaction.t_specialist_categories}
                  </Text>
                </View>
                <Text style={styles.specialistPhone}>
                  {transaction.t_specialist_phone}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.borderDashed}></View>
          <View style={styles.appointmentDetails}>
            <Text style={styles.detailText}>Transaction Date</Text>
            <Text style={styles.dateText}>
              {transaction.t_transaction_date
                ? dayjs(transaction.t_transaction_date).format(
                    "DD MMMM YYYY, HH:mm [WIB]"
                  )
                : ""}
            </Text>
          </View>
          <View style={styles.borderDashed}></View>
          <View style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <Text style={styles.paymentMethodText}>
              {transaction.t_payment_method}
            </Text>
          </View>
          <View style={styles.borderDashed}></View>
          <View style={styles.priceSection}>
            <Text style={styles.priceTitle}>Amount</Text>
            <Text style={styles.priceText}>${transaction.t_amount_price}</Text>
          </View>
          <View style={styles.footer}>
            <Text>Status: {transaction.t_state_id.status}</Text>
          </View>
          {transaction.t_state_id.status === "done" && (
            <View style={styles.ratingSection}>
              <StarRating rating={t_rating} onChange={setRating} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ff6347",
    opacity: 0.8,
  },
  card: {
    maxWidth: 360,
    width: "100%",
    backgroundColor: "#ff6347",
    borderRadius: 24,
    padding: 16,
  },
  innerCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoname: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  specialistInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  specialistName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  specialistCategories: {
    fontWeight: "normal",
    fontSize: 10,
    paddingHorizontal: 2,
    backgroundColor: "#ff6347",
    color: "white",
    borderRadius: 4,
    marginLeft: 4,
  },
  specialistPhone: {
    fontSize: 14,
    color: "#666",
  },
  borderDashed: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
    marginVertical: 8,
  },
  appointmentDetails: {
    alignItems: "center",
  },
  detailText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
  },
  paymentSection: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  paymentMethodText: {
    fontSize: 14,
    color: "#333",
  },
  priceSection: {
    alignItems: "center",
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6347",
  },
  footer: {
    alignItems: "center",
    marginTop: 16,
  },
  ratingSection: {
    marginTop: 16,
    alignItems: "center",
  },
});

export default HistoryDetail;
