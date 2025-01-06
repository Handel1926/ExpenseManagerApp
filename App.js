import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ManageExpense from "./screens/ManageExpense";
import AllExpense from "./screens/AllExpenses";
import RecentExpense from "./screens/RecentExpense";
import { GlobalStyles } from "./components/styles";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ButtomTabNavigation() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
      }}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpense}
        options={{
          title: "Recent Expenses",
          tabarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AllExpense"
        component={AllExpense}
        options={{
          title: "All Expenses",
          tabarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Expense History"
            component={ButtomTabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Manager" component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
