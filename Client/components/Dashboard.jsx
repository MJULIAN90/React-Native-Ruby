import React, { useState, useEffect } from "react";
import { styles } from "./../style/Dashboard";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { REACT_APP_API } from "@env";

const Dashboard = () => {
  const [state, setstate] = useState(false);
  const navigation = useNavigation();

  const api = async () => {
    let price = await axios.get(`${REACT_APP_API}/price_bitcon/price`);
    let priceApi = price.data.response;
    // = conversor("usd", priceApi.toString());
    setstate(priceApi);
  };

  useEffect(() => {
    var time = setInterval(api, 5000);
    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <View style={styles.inicio}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.salir}
      >
        <Text style={styles.textoSalir}>SALIR</Text>
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.texto}>PRECIO BTC </Text>
        {!state ? (
          <ActivityIndicator
            size="large"
            color="#f7ce21"
            style={{ paddingTop: 20 }}
          />
        ) : (
          <Text style={styles.texto}>{state} USD</Text>
        )}
      </View>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://img.freepik.com/vector-gratis/concepto-blockchain-moneda-criptografica-tecnologia-bitcoin_1017-30297.jpg?size=626&ext=jpg",
        }}
      />
    </View>
  );
};

export default Dashboard;
