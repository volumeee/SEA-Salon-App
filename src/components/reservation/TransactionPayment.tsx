import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/id";
import { RootStackParamList } from "../../types/NavigationTypes";
import { useSession } from "../profile/SessionContext";
import { supabase } from "../../services/supabase";
import { StackNavigationProp } from "@react-navigation/stack";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("id");

type TransactionPaymentRouteProp = RouteProp<RootStackParamList, "Payment">;
type MainTabsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainTabs"
>;

const SuccessAlert = ({
  visible,
  onClose,
  message,
}: {
  visible: boolean;
  onClose: () => void;
  message: string;
}) => (
  <Modal transparent={true} animationType="fade" visible={visible}>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={require("../../../assets/2.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.modalTitle}>Success</Text>
        <Text style={styles.modalMessage}>{message}</Text>
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const ErrorAlert = ({
  visible,
  onClose,
  message,
}: {
  visible: boolean;
  onClose: () => void;
  message: string;
}) => (
  <Modal transparent={true} animationType="fade" visible={visible}>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={require("../../../assets/1.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.modalTitle}>Error</Text>
        <Text style={styles.modalMessage}>{message}</Text>
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>Try again</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const TransactionPayment = () => {
  const route = useRoute<TransactionPaymentRouteProp>();
  const { specialist, date } = route.params;
  const appointmentDate = dayjs(date);
  const { session } = useSession();
  const navigation = useNavigation<MainTabsNavigationProp>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const paymentMethods = ["PayPal", "Bank Transfer", "Cash On Delivery"];
  const accountNumbers = {
    PayPal: `${specialist.specialist_name}@example.com`,
    "Bank Transfer": "1234567890",
    "Cash On Delivery": "pay with exact money",
  };

  const handlePayNow = async () => {
    if (!selectedPaymentMethod) {
      setErrorMessage("Please select a payment method.");
      setIsErrorVisible(true);
      return;
    }

    const transactionData = {
      hair_specialist_id: specialist.id,
      t_specialist_name: specialist.specialist_name,
      t_specialist_categories: specialist.categories[0].categories_name,
      t_specialist_phone: specialist.specialist_phone,
      t_transaction_date: appointmentDate.toISOString(),
      t_payment_method: selectedPaymentMethod,
      t_amount_price: specialist.specialist_price,
      t_state_id: 11,
      customer_id: session?.user.id,
    };

    const { data, error } = await supabase
      .from("transaction")
      .insert([transactionData])
      .select();

    if (error) {
      console.error(error);
      setErrorMessage("Transaction failed. Please try again later.");
      setIsErrorVisible(true);
    } else {
      setIsSuccessVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}></View>
      <View style={styles.card}>
        <View style={styles.innerCard}>
          <View style={styles.header}>
            <View style={styles.specialistInfo}>
              <Image
                source={{ uri: specialist.profile_picture }}
                style={styles.profilePicture}
              />
              <View>
                <View style={styles.infoname}>
                  <Text style={styles.specialistName}>
                    {specialist.specialist_name}
                  </Text>
                  <Text style={styles.specialistCategories}>
                    {specialist.categories[0].categories_name}
                  </Text>
                </View>
                <Text style={styles.specialistPhone}>
                  {specialist.specialist_phone}
                </Text>
              </View>
            </View>
            <Text style={styles.voteAverage}>
              Rating: {specialist.vote_average.toFixed(1)}
            </Text>
          </View>
          <View style={styles.borderDashed}></View>
          <View style={styles.appointmentDetails}>
            <Text style={styles.detailText}>Appointment Date</Text>
            <Text style={styles.dateText}>
              {appointmentDate.format("DD MMMM YYYY, HH:mm [WIB]")}
            </Text>
          </View>
          <View style={styles.borderDashed}></View>
          <View style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            {paymentMethods.map((method, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paymentMethod,
                  selectedPaymentMethod === method &&
                    styles.selectedPaymentMethod,
                ]}
                onPress={() => setSelectedPaymentMethod(method)}
              >
                <Text
                  style={[
                    styles.paymentMethodText,
                    selectedPaymentMethod === method &&
                      styles.selectedPaymentMethodText,
                  ]}
                >
                  {method}
                </Text>
                {selectedPaymentMethod === method &&
                  (method === "PayPal" ||
                    method === "Bank Transfer" ||
                    method === "Cash On Delivery") && (
                    <Text style={styles.accountNumber}>
                      {accountNumbers[method]}
                    </Text>
                  )}
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.borderDashed}></View>
          <View style={styles.priceSection}>
            <Text style={styles.priceTitle}>Price</Text>
            <Text style={styles.priceText}>${specialist.specialist_price}</Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
          {session?.user && (
            <Text
              style={{ textAlign: "center", fontSize: 18, display: "none" }}
            >
              Welcome, {session.user.id}
            </Text>
          )}
        </View>
      </View>
      <SuccessAlert
        visible={isSuccessVisible}
        onClose={() => navigation.navigate("MainTabs")}
        message="Your payment was successful!"
      />
      <ErrorAlert
        visible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
        message={errorMessage}
      />
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
    height: "80%",
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
  voteAverage: {
    fontSize: 14,
    color: "#ff6347",
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
  paymentMethod: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 4,
  },
  selectedPaymentMethod: {
    backgroundColor: "#ff6347",
    borderColor: "#ff6347",
  },
  paymentMethodText: {
    fontSize: 14,
    color: "#333",
  },
  selectedPaymentMethodText: {
    color: "white",
  },
  accountNumber: {
    fontSize: 12,
    color: "#ffffff",
    marginTop: 4,
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
  payButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 8,
  },
  payButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 30,
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default TransactionPayment;
