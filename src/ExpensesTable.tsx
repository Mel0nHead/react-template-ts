import { useQuery } from "@tanstack/react-query";

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
  const { isPending, error, data } = useQuery({
    queryKey: ["expensesData"],
    queryFn: () =>
      fetch(import.meta.env.VITE_API_ENDPOINT, {
        headers: {
          "Content-Type": "application/json",
          Username: "Mark.Marks",
        },
      }).then((res) => res.json()),
  });

  if (isPending) {
    return <b>Loading...</b>;
  }

  if (error) {
    return <b>An error occurred: {error.message}</b>;
  }

  return (
    <div>
      {data?.length ? (
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
            {data.map((expense: Expense) => (
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
