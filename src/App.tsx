import { useEffect, useState } from "react";

function App() {
  const [expensesData, setExpensesData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://expenses-backend-mu.vercel.app/expenses",
        {
          headers: {
            "Content-Type": "application/json",
            Username: "Mark.Marks", // <--- TODO: use your name
          },
        }
      );

      const data = await response.json();
      setExpensesData(data);
    }

    fetchData();
  }, []);

  return <div>{expensesData ? JSON.stringify(expensesData) : null}</div>;
}

export default App;
