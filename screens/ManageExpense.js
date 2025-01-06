import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButtton from "../ui/IconButtton";
import { GlobalStyles } from "../components/styles";
import Button from "../ui/Button";

function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditting = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOption({
      title: isEditting ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditting]);

  function deleteExpense() {}

  return (
    <View style={styles.container}>
      <View>
        <Button></Button>
      </View>
      {isEditting && (
        <View style={styles.deleteContainer}>
          <IconButtton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpense}
          />{" "}
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
