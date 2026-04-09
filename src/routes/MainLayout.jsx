import { Outlet } from "react-router-dom";

import NavBar from "../components/navigation/NavBar";

function MainLayout() {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
