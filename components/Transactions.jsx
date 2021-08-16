import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../Context";
import axios from "axios";
import CardTransaction from "./CardTransaction";

const Transactions = () => {
  const context = useContext(UserContext);
  const { userid } = context;
  const navigation = useNavigation();

  const [state, setstate] = useState([]);

  const history = async () => {
    let obj = {
      user_id: userid,
    };

    let balanceuser = await axios({
      url: "http://localhost:3000/transaction/historyTransactions",
      method: "Post",
      data: obj,
    });
    setstate(balanceuser.data);
  };

  useEffect(() => {
    history();
  }, []);

  return (
    <View>
      <Button
        color="#8a0000"
        title="Exit"
        onPress={() => navigation.navigate("Login")}
      />

      {state.length === 0 ? (
        <Text style={styles.texto}>Usuario no posee transaciones</Text>
      ) : (
        <FlatList
          data={state}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <CardTransaction
              updated_at={item.updated_at}
              type_transaction={item.type_transaction}
              creceive={item.creceive}
              id={item.id}
            />
          )}
        />
      )}
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
  },
});
