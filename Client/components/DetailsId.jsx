import React, { useEffect, useState } from "react";
import { styles } from "./../style/DetailsId";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { REACT_APP_API } from "@env";

const DetailsId = ({ route }) => {
  const navigation = useNavigation();
  const [state, setstate] = useState();

  let info = async () => {
    let obj = {
      id: route.params.id,
    };

    let transacitionId = await axios({
      url: `${REACT_APP_API}/transaction/Transaction`,
      method: "Post",
      data: obj,
    });

    setstate([transacitionId.data]);
  };

  useEffect(() => {
    info();
  }, []);

  return (
    <View style={styles.inicio}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.salir}
      >
        <Text style={styles.textoSalir}>VOLVER</Text>
      </TouchableOpacity>
      {state ? (
        <View>
          {state.map((item, i) => {
            const {
              id_transaction,
              areceive,
              asend,
              createdAt,
              creceive,
              csend,
              type_transaction,
            } = item;

            return (
              <View style={styles.container} key={i}>
                <Text style={styles.infoII}>ID TRANSACION:</Text>
                <Text style={styles.infoI}>{id_transaction}</Text>
                <Text style={styles.infoII}>FECHA DE TRANSACION:</Text>
                <Text style={styles.infoI}>{createdAt.slice(0, 10)}</Text>
                <Text style={styles.infoII}>TIPO DE TRANSACION:</Text>
                <Text style={styles.infoI}>
                  {type_transaction.toUpperCase()}
                </Text>
                <Text style={styles.infoII}>MONEDA ENVIADA:</Text>
                <Text style={styles.infoI}>{csend.toUpperCase()}</Text>
                <Text style={styles.infoII}>CANTIDAD ENVIADA:</Text>
                <Text style={styles.infoI}>{(csend, asend)}</Text>
                <Text style={styles.infoII}>MONEDA RECIBIDA:</Text>
                <Text style={styles.infoI}>{creceive.toUpperCase()}</Text>
                <Text style={styles.infoII}>CANTIDAD RECIBIDA:</Text>
                <Text style={styles.infoI}>{(creceive, areceive)}</Text>
              </View>
            );
          })}
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0da7a3" />
      )}
    </View>
  );
};

export default DetailsId;
