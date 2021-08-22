import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inicial: {
    backgroundColor: "black",
    paddingBottom: 160,
  },

  tinyLogo: {
    width: "100%",
    resizeMode: "stretch",
    height: "52%",
    position: "absolute",
    marginTop: 90,
  },

  container: {
    alignItems: "center",
    marginTop: 400,
    paddingBottom: 20,
  },

  inputs: {
    margin: 10,
    width: 160,
    height: 40,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 20,
    textAlign: "center",
    borderBottomColor: "#f7ce21",
    color: "white",
  },

  button: {
    alignItems: "center",
    marginLeft: "30%",
    marginRight: "30%",
    backgroundColor: "#f7ce21",
    borderRadius: 10,
  },

  texto: {
    fontSize: 25,
    color: "black",
  },

  register: {
    marginTop: 5,
  },
});
