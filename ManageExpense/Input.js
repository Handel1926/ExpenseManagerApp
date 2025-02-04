import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../components/styles";

function Input({ label, invalid, textInputConfig }) {
  let inputStyle = [styles.input];

  if (textInputConfig && textInputConfig.multiLine) {
    inputStyle.push(styles.inpuMuliLine);
  }
  if (invalid) {
    inputStyle.push(styles.invalidInput);
  }
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyle} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
    minWidth: "50%",
  },
  inpuMuliLine: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
