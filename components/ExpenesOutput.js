import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "./styles";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2024-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2025-12-01"),
  },
  {
    id: "e3",
    description: "some bananas",
    amount: 5.99,
    date: new Date("2024-12-31"),
  },
  {
    id: "e4",
    description: "some bananas",
    amount: 5.99,
    date: new Date("2024-12-30"),
  },
  {
    id: "e5",
    description: "book",
    amount: 4.99,
    date: new Date("2024-12-31"),
  },
];

function ExpenesOutput({ expenses, expensePeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensePeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpenesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});
