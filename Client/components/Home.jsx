import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from "./Dashboard";
import Transactions from "./Transactions";
import Trade from "./Trade";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="HOME"
      screenOptions={{
        activeTintColor: "black",
      }}
    >
      <Tab.Screen
        name="HOME"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="information-circle"
              color={"#black"}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="HISTORIAL"
        component={Transactions}
        options={{
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="book-sharp"
              color={"black"}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="OPERAR"
        component={Trade}
        options={{
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="cash-sharp"
              color={"#black"}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
