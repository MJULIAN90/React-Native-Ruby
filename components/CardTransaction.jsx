import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CardTransaction = ({ updated_at, type_transaction, creceive, id }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Details", { id })}
    >
      <Text>{updated_at.slice(0, 10)}</Text>
      <Text>{type_transaction} </Text>
      <Text>{creceive} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    borderWidth: 2,
    padding: 10,
    borderColor: "darkred",
    borderRadius: 10,
    backgroundColor: "rgb(223, 184, 184)",
  },
});

export default CardTransaction;
