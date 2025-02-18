import { Text } from "react-native";
import ExpenesOutput from "../components/ExpenesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";
import LoadingOverlay from "../ui/LoadingOverlay";
import ErrorOverlay from "../ui/ErrorOverlay";

function RecentExpense() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesCTX = useContext(ExpensesContext);

  const recentExpenses = expensesCTX.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);

    return expense.date > date7daysAgo;
  });

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpense();
      } catch (error) {
        setError("Could not fetch expenses");
      }

      setIsFetching(false);
      expensesCTX.setExpenses(expenses);
    }

    getExpenses();
  }, []);

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
    <ExpenesOutput
      expenses={recentExpenses}
      expensePeriod={"Last 7 days"}
      fallBackText={"No recent Expenses"}
    />
  );
}

export default RecentExpense;
