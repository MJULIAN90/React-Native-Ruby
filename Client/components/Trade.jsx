import React, { useState, useEffect, useContext } from "react";
//import { conversorQuanti } from "../conversor/conversorQuanti";
//import { conversor } from "./../conversor/conversor";
import { styles } from "../style/Trade";
import { View, Picker, Button, TextInput, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { UserContext } from "../Context";

const Trade = () => {
  const context = useContext(UserContext);
  const { userid, setTransactionsH, transactionsH } = context;
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

    if (balanceuser) {
      let balUser = balanceuser.data;

      setInfoBalances({
        usd: balUser.usd,
        btc: balUser.btc,
      });
    }

    if (balanceuser.data === "Sin fondos") {
      setInfoBalances({
        usd: "0",
        btc: "0",
      });
    }
  };

  useEffect(() => {
    balances();
  }, []);

  useEffect(() => {
    calculate;
  }, [quantity]);

  const calculate = async () => {
    let price = await axios("http://localhost:3000/price_bitcon/price");
    let btcprice = price.data.response;

    if (selectedValue === "btc" && quantity !== "") {
      let info = parseFloat(quantity) * parseFloat(btcprice);

      return setTotalChange(info);
    }
    if (selectedValue === "usd" && quantity !== "") {
      let info = parseFloat(quantity) / parseFloat(btcprice);

      return setTotalChange(info);
    }
    alert("ingrese un valor para calcular");
  };

  const send = async () => {
    var quantityTotal = quantity;
    let cReceive = "";

    if (selectTrade === "buy") {
      setStatus(!status);
      if (selectedValue === "usd") cReceive = "btc";
      if (selectedValue === "btc") cReceive = "usd";

      const obj = {
        type_transaction: "buy",
        user_id: userid,
        csend: cReceive,
        creceive: selectedValue,
        asend: parseFloat(totalChange),
        areceive: parseFloat(quantityTotal),
      };

      let data = await axios({
        url: "http://localhost:3000/transaction/buy",
        method: "Post",
        data: obj,
      });

      if (data.data[0] === 1) {
        setQuantity("");
        setTotalChange("");
        balances();
        setTransactionsH(!transactionsH);
        return alert("TRANSACCIÓN EXISTOSA");
      }

      setTotalChange("");
      return alert("FONDOS INSUFICIENTES");
    }

    if (selectTrade === "sell") {
      setStatus(!status);
      if (selectedValue === "usd") cReceive = "btc";
      if (selectedValue === "btc") cReceive = "usd";

      const obj = {
        type_transaction: "sell",
        user_id: userid,
        csend: selectedValue,
        creceive: cReceive,
        asend: parseFloat(quantityTotal),
        areceive: parseFloat(totalChange),
      };

      let data = await axios({
        url: "http://localhost:3000/transaction/buy",
        method: "Post",
        data: obj,
      });

      if (data.data[0] === 1) {
        setQuantity("");
        setTotalChange("");
        balances();
        setTransactionsH(!transactionsH);
        return alert("TRANSACCIÓN EXITOSA");
      }
      setTotalChange("");
      return alert("FONDOS INSUFICIENTES");
    }
  };

  return (
    <View>
      <Button
        color="#0da7a3"
        title="SALIR"
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      />

      <View style={styles.balance}>
        <Text style={styles.negrita}>TU BALANCE</Text>
        <Text style={styles.negrita}>
          USD:{" "}
          {infoBalances.usd ? (
            <Text> {infoBalances.usd}</Text>
          ) : (
            <Text> Cargando ... </Text>
          )}
        </Text>
        <Text style={styles.negrita}>
          BTC:{" "}
          {infoBalances.btc ? (
            <Text> {infoBalances.btc}</Text>
          ) : (
            <Text> Cargando ... </Text>
          )}
        </Text>
      </View>

      <View>
        <View style={styles.container}>
          <Text style={styles.negrita}> TIPO DE OPERACION </Text>
          <Picker
            selectedValue={selectTrade}
            style={{ height: 50, width: 150, borderRadius: 7, borderWidth: 3 }}
            onValueChange={(itemValue) => setselectTrade(itemValue)}
          >
            <Picker.Item label="COMPRAR" value="buy" />
            <Picker.Item label="VENDER" value="sell" />
          </Picker>
        </View>

        <View style={styles.container}>
          {selectTrade === "buy" ? (
            <Text style={styles.negrita}> MONEDA A COMPRAR</Text>
          ) : (
            <Text style={styles.negrita}> MONEDA A VENDER </Text>
          )}

          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150, borderRadius: 7, borderWidth: 3 }}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="USD" value="usd" />
            <Picker.Item label="BTC" value="btc" />
          </Picker>
        </View>

        <View style={styles.container}>
          <TextInput
            placeholder="INGRESA CANTIDAD "
            style={{ textAlign: "center", borderWidth: 1.0, borderRadius: 5 }}
            onChangeText={setQuantity}
            value={quantity}
          />
          {selectTrade === "buy" ? (
            <Text style={styles.negrita1}>
              ¿CUÁNTOS {selectedValue.toUpperCase()} DESEA COMPRAR? INGRESA LA
              CANTIDAD EN FORMATO DE MONEDA INTERNACIONAL
            </Text>
          ) : (
            <Text style={styles.negrita1}>
              ¿CUÁNTOS {selectedValue.toUpperCase()} DESEA VENDER? INGRESA LA
              CANTIDAD EN FORMATO DE MONEDA INTERNACIONAL
            </Text>
          )}
        </View>

        <View style={styles.container}>
          {selectTrade === "buy" && (
            <Text style={styles.negrita}> DEBES TENER . . .</Text>
          )}

          {selectTrade === "sell" && (
            <Text style={styles.negrita}> RECIBIRÁS </Text>
          )}

          {totalChange ? (
            <Text>
              <Text style={styles.negrita}>
                {selectedValue === "usd"
                  ? ("btc", totalChange)
                  : ("usd", totalChange)}
              </Text>
              {selectedValue === "usd" ? (
                <Text style={styles.negrita}> BTC </Text>
              ) : (
                <Text style={styles.negrita}> USD </Text>
              )}
            </Text>
          ) : (
            <Text style={styles.negrita}>
              PRESIONA CALCULAR PARA PODER OPERAR
            </Text>
          )}

          <Button color="#0da7a3" onPress={calculate} title="calcular" />
        </View>

        {totalChange && infoBalances.btc !== "0" ? (
          <Button color="#0da7a3" title={selectTrade} onPress={send} />
        ) : (
          <Button disabled={true} color="#0da7a3" title={selectTrade} />
        )}
      </View>
    </View>
  );
};

export default Trade;
