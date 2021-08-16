import React, { useContext, useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserContext } from "../Context";

const Login = () => {
  const context = useContext(UserContext);
  const { setUserid } = context;
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSumit = async () => {
    let response = await axios.post("http://localhost:3000/user/login", {
      username: user,
      password: password,
    });

    response = response.data.response;

    if (user !== "" && password !== "") {
      if (response === "clave inválida") return alert("CLAVE INVALIDAD");
      if (response === "usuario no existe") return alert("USUARIO NO EXISTE");
      if (typeof response === "number") {
        setUserid(response);
        setUser("");
        setPassword("");
        return navigation.navigate("Home", { data: response });
      }
    }

    alert("COMPLETE LOS CAMPOS");
  };
  return (
    <View>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://vitawallet.io/assets/vita_quote_logo_footer.png",
        }}
      />

      <View style={styles.container}>
        <TextInput
          style={styles.inputs}
          placeholder="USUARIO"
          value={user}
          onChangeText={setUser}
        />

        <TextInput
          style={styles.inputs}
          placeholder="CONTRASEÑA"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity onPress={handleSumit} style={styles.button}>
        <Text style={styles.texto}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 400,
    paddingBottom: 20,
  },
  inputs: {
    margin: 10,
    width: 160,
    height: 30,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 20,
    textAlign: "center",
    borderBottomColor: "blue",
  },
  tinyLogo: {
    width: "100%",
    resizeMode: "stretch",
    height: "50%",
    position: "absolute",
    marginTop: 120,
  },
  button: {
    alignItems: "center",
    marginLeft: "30%",
    marginRight: "30%",
    backgroundColor: "#0da7a3",
    borderRadius: 10,
  },

  texto: {
    fontSize: 25,
    color: "white",
  },
});
