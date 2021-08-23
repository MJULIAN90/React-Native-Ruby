import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./../style/Register";
import axios from "axios";
import { REACT_APP_API } from "@env";

const Register = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSumit = async () => {
    if (password === password2) {
      let create = await axios.post(`/user/create`, {
        username: user,
        password: password,
      });

      if (create.data === "User Created") {
        alert("USUARIO CREADO");
        return navigation.navigate("Login");
      }
    }

    return alert("TU CONTRASEÑA DEBE TENER MINIMO 6 CARACTERES");
  };

  return (
    <View style={styles.inicial}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://github.com/andresf2448/Exchange-ProyectoFinal/raw/main/client/rocketXchange-logos/rocketXchange-logos_white.png",
        }}
      />

      <View style={styles.container}>
        <TextInput
          style={styles.inputs}
          placeholder="NUEVO USUARIO"
          value={user}
          onChangeText={setUser}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.inputs}
          placeholder="NUEVA CONTRASEÑA"
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.inputs}
          placeholder="CONFIRME LA CONTRASEÑA"
          value={password2}
          onChangeText={setPassword2}
        />
      </View>
      {password !== "" && password === password2 ? (
        <TouchableOpacity onPress={handleSumit} style={styles.button}>
          <Text style={styles.texto}>COMPLETAR</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={true}
          onPress={handleSumit}
          style={styles.button2}
        >
          <Text style={styles.texto}>COMPLETAR</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        <Text style={styles.texto}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
