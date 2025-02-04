import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButtton from "../ui/IconButtton";
import { GlobalStyles } from "../components/styles";
import Button from "../ui/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForms from "../ManageExpense/ExpenseForms";

function ManageExpense({ route, navigation }) {
  const expenseCTX = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditting = !!editedExpenseId;

  const selectedExpense = expenseCTX.expenses.find((expense) => {
    return expense.id === editedExpenseId;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditting]);

  function deleteExpense(id) {
    expenseCTX.deleteExpense(id);
    navigation.goBack();
  }
  function cancleHandler() {
    navigation.goBack();
  }
  function confirmHandler(expenseData) {
    if (isEditting) {
      expenseCTX.updateExpense(editedExpenseId, expenseData);
    } else {
      expenseCTX.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForms
        submitButtonLabel={isEditting ? "Update" : "Add"}
        onCancle={cancleHandler}
        onSubmit={confirmHandler}
        selectedExpense={selectedExpense}
      />

      {isEditting && (
        <View style={styles.deleteContainer}>
          <IconButtton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={() => deleteExpense(editedExpenseId)}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
