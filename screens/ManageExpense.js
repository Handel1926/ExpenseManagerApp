import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButtton from "../ui/IconButtton";
import { GlobalStyles } from "../components/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForms from "../ManageExpense/ExpenseForms";
import { storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../ui/LoadingOverlay";
import ErrorOverlay from "../ui/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
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

  async function deleteExpense(id) {
    expenseCTX.deleteExpense(id);
    setIsFetching(true);
    try {
      await deleteExpense(id);
      navigation.goBack();
    } catch (error) {
      setError("Failed to delete expense");
      setIsFetching(false);
    }
  }
  function cancleHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsFetching(true);
    try {
      if (isEditting) {
        expenseCTX.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCTX.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Couldn't save data please check your Network and try again");
      setIsFetching(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
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
