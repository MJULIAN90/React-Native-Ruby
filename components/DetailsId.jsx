import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const DetailsId = ({ route }) => {
  const navigation = useNavigation();
  const [state, setstate] = useState();
  console.log("aca route ", route.params.id);

  let info = async () => {
    let obj = {
      id: route.params.id,
    };

    let transacitionId = await axios({
      url: "http://localhost:3000/transaction/Transaction",
      method: "Post",
      data: obj,
    });
    setstate([transacitionId.data]);
    console.log([transacitionId.data]);
  };

  useEffect(() => {
    info();
  }, []);

  return (
    <View>
      <Button
        color="#8a0000"
        title="VOLVER"
        onPress={() => navigation.navigate("Home")}
      />

      {state ? (
        <View>
          {state.map((item, i) => {
            const {
              id,
              areceive,
              asend,
              created_at,
              creceive,
              csend,
              type_transaction,
            } = item;

            return (
              <View key={i}>
                <Text>ID TRANSATION : {id} </Text>
                <Text>FECHA DE TRANSACION : {created_at.slice(0, 10)}</Text>
                <Text>TIPO DE TRANSACION :{type_transaction}</Text>
                <Text>MONEDA ENVIADA :{csend}</Text>
                <Text>CANTIDAD ENVIADA :{asend}</Text>
                <Text>MONEDA RECIBIDA:{creceive}</Text>
                <Text>CANTIDAD RECIVIDAD :{areceive} </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <ActivityIndicator size="large" color="#00ff00" />
      )}
    </View>
  );
};

export default DetailsId;
