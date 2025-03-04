import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-1315e-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const res = await axios.post(BACKEND_URL + "/expenses.json", expenseData);
  const id = res.data.name;
  return id;
}

export async function fetchExpense() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
