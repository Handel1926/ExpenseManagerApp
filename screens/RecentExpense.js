import { Text } from "react-native";
import ExpenesOutput from "../components/ExpenesOutput";

function RecentExpense() {
  return <ExpenesOutput expensePeriod={"Last 7 days"} />;
}

export default RecentExpense;
