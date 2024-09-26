import { useEffect, useState } from "react";

enum FetchStatus {
  Idle,
  Loading,
  Success,
  Error,
}

function App() {
  const [expensesData, setExpensesData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.Idle);

  useEffect(() => {
    async function fetchData() {
      setFetchStatus(FetchStatus.Loading);

      try {
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
        setFetchStatus(FetchStatus.Success);
      } catch (e) {
        setFetchStatus(FetchStatus.Error);
        console.log(e);
      }
    }

    fetchData();
  }, []);

  if (fetchStatus === FetchStatus.Loading || fetchStatus === FetchStatus.Idle) {
    return <b>Loading...</b>;
  }

  if (fetchStatus === FetchStatus.Error) {
    return <b>An error occurred. Please refresh the page and try again.</b>;
  }

  return (
    <div>
      {expensesData ? JSON.stringify(expensesData) : <b>No data was found</b>}
    </div>
  );
}

export default App;
