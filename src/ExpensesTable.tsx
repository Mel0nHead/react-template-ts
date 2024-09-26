import { useEffect, useState } from "react";

enum FetchStatus {
  Idle,
  Loading,
  Success,
  Error,
}

interface Expense {
  id: string;
  date: string;
  merchant: string;
  amount: string;
  category: string;
  description: string;
  status: string;
}

function formatTimestamp(timestamp: string) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatAmount(amount: string) {
  return Number(amount).toLocaleString("en");
}

function ExpensesTable() {
  const [expensesData, setExpensesData] = useState<Expense[] | null>(null);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.Idle);

  useEffect(() => {
    async function fetchData() {
      setFetchStatus(FetchStatus.Loading);

      try {
        const response = await fetch(
          // TODO: should be an environment variable
          "https://expenses-backend-mu.vercel.app/expenses",
          {
            headers: {
              "Content-Type": "application/json",
              Username: "Alex.King",
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
      {expensesData ? (
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Merchant</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {expensesData.map((expense) => (
              <tr key={expense["id"]}>
                <td>{formatTimestamp(expense["date"])}</td>
                <td>{expense["merchant"]}</td>
                {/* TODO: probably a better way than to just hardcode '£' symbol */}
                <td>£{formatAmount(expense["amount"])}</td>
                <td className="text-capitalize">{expense["category"]}</td>
                <td className="text-capitalize">{expense["description"]}</td>
                <td className="text-capitalize">{expense["status"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <b>No data was found</b>
      )}
    </div>
  );
}

export default ExpensesTable;
