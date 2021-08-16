import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Dashboard = () => {
  const [state, setstate] = useState(false);
  const navigation = useNavigation();

  const api = async () => {
    let price = await axios.get("http://localhost:3000/price_bitcon/price");
    price = price.data.response;
    setstate(price);
  };

  setInterval(api, 3000);

  return (
    <View>
      <Button
        color="#8a0000"
        title="Exit"
        onPress={() => navigation.navigate("Login")}
      />

      <View style={styles.info}>
        <Text style={styles.texto}>PRECIO BTC</Text>
        {!state ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <Text style={styles.texto}>{state} </Text>
        )}
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
  },
  info: {
    marginTop: 200,
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
  },
});
