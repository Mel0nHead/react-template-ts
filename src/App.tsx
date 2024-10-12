import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ExpensesTable from "./ExpensesTable";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ margin: "0 auto", maxWidth: 1000 }}>
        <h1>Expenses</h1>
        <ExpensesTable />
      </div>
    </QueryClientProvider>
  );
}

export default App;
