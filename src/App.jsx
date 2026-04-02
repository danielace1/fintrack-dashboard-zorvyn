import { Outlet } from "react-router";
import MainLayout from "./layout/MainLayout";

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default App;
