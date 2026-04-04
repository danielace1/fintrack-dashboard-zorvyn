import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="insights" element={<Insights />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster containerClassName="lg:ml-40" />
    </>
  );
};

export default App;
