import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Picker,
  Button,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { UserContext } from "../Context";

const Trade = () => {
  const context = useContext(UserContext);
  const { userid } = context;
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("usd");
  const [selectTrade, setselectTrade] = useState("buy");
  const [quantity, setQuantity] = useState("");
  const [infoBalances, setInfoBalances] = useState({
    usd: "",
    btc: "",
  });
  const [status, setStatus] = useState(true);
  const [totalChange, setTotalChange] = useState();

  const balances = async () => {
    let obj = {
      user_id: userid,
    };

    let balanceuser = await axios({
      url: "http://localhost:3000/user/balance",
      method: "Post",
      data: obj,
    });
    let balUser = balanceuser.data.response;

    setInfoBalances({
      usd: balUser.usd,
      btc: balUser.btc,
    });
  };

  useEffect(() => {
    balances();
  }, [status]);

  useEffect(() => {
    calculate;
  }, [quantity]);

  const calculate = async () => {
    let price = await axios("http://localhost:3000/price_bitcon/price");
    let btcprice = price.data.response;

    if (selectedValue === "btc" && quantity !== "") {
      let info = parseFloat(quantity * btcprice);
      return setTotalChange(info);
    }
    if (selectedValue === "usd" && quantity !== "") {
      let info = parseFloat(quantity / btcprice);
      return setTotalChange(info);
    }
    alert("ingrese un valor para calcular");
  };

  const send = async () => {
    let cReceive = "";
    if (selectTrade === "buy") {
      setStatus(!status);
      if (selectedValue === "usd") cReceive = "btc";

      if (selectedValue === "btc") cReceive = "usd";

      const obj = {
        type: "buy",
        user_id: userid,
        csend: cReceive,
        creceive: selectedValue,
        asend: parseFloat(totalChange),
        areceive: parseFloat(quantity),
      };

      let data = await axios({
        url: "http://localhost:3000/transaction/buy",
        method: "Post",
        data: obj,
      });
      if (data.data.response) {
        setQuantity("");
        return alert("DONE");
      }
      return alert("FONDOS INSUFICIENTES");
    }

    if (selectTrade === "sell") {
      setStatus(!status);
      if (selectedValue === "usd") cReceive = "btc";
      if (selectedValue === "btc") cReceive = "usd";

      const obj = {
        type: "sell",
        user_id: userid,
        csend: selectedValue,
        creceive: cReceive,
        asend: parseFloat(quantity),
        areceive: parseFloat(totalChange),
      };

      let data = await axios({
        url: "http://localhost:3000/transaction/buy",
        method: "Post",
        data: obj,
      });
      if (data.data.response) {
        setQuantity("");
        return alert("Success");
      } else {
        return alert("FONDOS INSUFICIENTES");
      }
    }
  };

  return (
    <View>
      <Button
        color="#8a0000"
        title="Exit"
        onPress={() => navigation.navigate("Login")}
      />

      <View>
        <Text>TU BALANCE</Text>
        <Text>SALDO USD: {infoBalances.usd}</Text>
        <Text>SALDO BTC : {infoBalances.btc}</Text>
      </View>

      <View>
        <View style={styles.container}>
          <Text> TIPO DE OPERACION </Text>
          <Picker
            selectedValue={selectTrade}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue) => setselectTrade(itemValue)}
          >
            <Picker.Item label="COMPRAR" value="buy" />
            <Picker.Item label="VENDER" value="sell" />
          </Picker>
        </View>

        <View style={styles.container}>
          {selectTrade === "buy" ? (
            <Text> MONEDA A COMPRAR</Text>
          ) : (
            <Text> MONEDA A VENDER </Text>
          )}

          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="USD" value="usd" />
            <Picker.Item label="BTC" value="btc" />
          </Picker>
        </View>

        <View style={styles.container}>
          <TextInput
            placeholder="INGRESA CANTIDAD "
            onChangeText={setQuantity}
            value={quantity}
          />
          {selectTrade === "buy" ? (
            <Text> CUANTOS {selectedValue.toUpperCase()} QUIERO COMPRAR </Text>
          ) : (
            <Text> CUANTOS {selectedValue.toUpperCase()} QUIERO VENDER</Text>
          )}
        </View>

        <View style={styles.container}>
          {selectTrade === "buy" && <Text> DEBES TENER</Text>}

          {selectTrade === "sell" && <Text> RECIBIRAS </Text>}

          {totalChange ? (
            <Text>
              {totalChange}{" "}
              {selectedValue === "usd" ? (
                <Text> BTC </Text>
              ) : (
                <Text> USD </Text>
              )}
            </Text>
          ) : (
            <Text>PRESIONA CALCULAR </Text>
          )}

          <Button color="#8a0000" onPress={calculate} title="calculate" />
        </View>

        <Button color="#8a0000" title={selectTrade} onPress={send} />
      </View>
    </View>
  );
};

export default Trade;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
});
