import { Text } from "react-native";
import ExpenesOutput from "../components/ExpenesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpense() {
  const expensesCTX = useContext(ExpensesContext);

  const recentExpenses = expensesCTX.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);

    return expense.date > date7daysAgo;
  });

  return (
    <ExpenesOutput
      expenses={recentExpenses}
      expensePeriod={"Last 7 days"}
      fallBackText={"No recent Expenses"}
    />
  );
}

export default RecentExpense;
