import { Text } from "react-native";
import ExpenesOutput from "../components/ExpenesOutput";
import { useContext, useEffect } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpense() {
  const expensesCTX = useContext(ExpensesContext);

  return (
    <ExpenesOutput expenses={expensesCTX.expenses} expensePeriod="Total" />
  );
}

export default AllExpense;
