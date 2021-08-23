import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inicial: {
    backgroundColor: "black",
    height: "100%",
  },

  tinyLogo: {
    width: "100%",
    resizeMode: "stretch",
    height: "50%",
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
    height: 30,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 12,
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
    marginTop: 5,
  },

  button2: {
    alignItems: "center",
    marginLeft: "30%",
    marginRight: "30%",
    backgroundColor: "gray",
    borderRadius: 10,
    marginTop: 5,
  },

  texto: {
    fontSize: 20,
    color: "white",
  },
});
