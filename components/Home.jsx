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
      initialRouteName="Dashboard"
      tabBarOptions={{
        activeTintColor: "darkred",
      }}
    >
      <Tab.Screen
        name="DASHBOARD"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="information-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="TRANSACCIONES"
        component={Transactions}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="book-sharp"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="TRADE"
        component={Trade}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cash-sharp"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
