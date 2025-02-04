import { StyleSheet, Text, View, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { getFormattedDate } from "../util/date";
import { GlobalStyles } from "../components/styles";

function ExpenseForms({
  submitButtonLabel,
  onCancle,
  onSubmit,
  selectedExpense,
}) {
  const [input, setInputValue] = useState({
    amount: {
      value: selectedExpense ? selectedExpense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: selectedExpense ? getFormattedDate(selectedExpense.date) : "",
      isValid: true,
    },
    description: {
      value: selectedExpense ? selectedExpense.description : "",
      isValid: true,
    },
  });
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValue((preVal) => {
      return {
        ...preVal,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseDataObject = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };

    const amountIsValid =
      !isNaN(expenseDataObject.amount) && expenseDataObject.amount > 0;
    const dateIsValid = expenseDataObject.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseDataObject.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //Alert.alert("Invalid input", "Please check your input values");

      setInputValue((curinput) => {
        return {
          amount: { value: curinput.amount.value, isValid: amountIsValid },
          date: { value: curinput.date.value, isValid: dateIsValid },
          description: {
            value: curinput.description.value,
            isValid: descriptionIsValid,
          },
        };
      });

      return;
    }

    onSubmit(expenseDataObject);
  }
  const formIsInvalidalid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label={"Amount"}
          invalid={!input.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: input.amount.value,
          }}
        />
        <Input
          label={"Date"}
          invalid={!input.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: input.date.value,
          }}
        />
      </View>
      <Input
        label={"Description"}
        invalid={!input.description.isValid}
        textInputConfig={{
          multiLine: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: input.description.value,
        }}
      />
      {formIsInvalidalid && (
        <Text style={styles.errorText}>
          Invalid input values please check your Data
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button style={styles.buttonStyle} mode={"flat"} onPress={onCancle}>
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForms;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
