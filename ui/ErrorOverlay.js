import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../components/styles";
import Button from "./Button";

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error occurred</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    margin: "auto",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  message: {
    fontSize: 14,
  },
});
