import React, { useContext, useEffect, useState } from "react";
import { styles } from "./../style/Transactions";
import { View, Text, Button, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../Context";
import axios from "axios";
import CardTransaction from "./CardTransaction";

const Transactions = () => {
  const context = useContext(UserContext);
  const { userid, transactionsH } = context;
  const navigation = useNavigation();

  const [state, setstate] = useState();

  const history = async () => {
    let obj = {
      user_id: userid,
    };

    let balanceUser = await axios({
      url: "http://localhost:3000/transaction/historyTransactions",
      method: "Post",
      data: obj,
    });

    setstate(balanceUser.data);
  };

  useEffect(() => {
    history();
  }, [transactionsH]);

  return (
    <View>
      <Button
        color="#0da7a3"
        borderColor="black"
        title="Exit"
        onPress={() => navigation.navigate("Login")}
      />

      {state && state.length === 0 ? (
        <Text style={styles.texto}>Usuario no posee transacciones</Text>
      ) : (
        <FlatList
          data={state}
          keyExtractor={({ id_transaction }) => id_transaction.toString()}
          renderItem={({ item }) => (
            <CardTransaction
              updatedAt={item.updatedAt}
              type_transaction={item.type_transaction}
              creceive={item.creceive}
              id={item.id_transaction}
            />
          )}
        />
      )}
    </View>
  );
};

export default Transactions;
