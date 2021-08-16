import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./components/Login";
import Home from "./components/Home";
import { UserContext } from "./Context";
import DetailsId from "./components/DetailsId";

const Stack = createStackNavigator();

export default function App() {
  const [userid, setUserid] = useState({});

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ userid, setUserid }}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={DetailsId} />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}
