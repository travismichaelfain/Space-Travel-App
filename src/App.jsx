import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import MainLayout from "./routes/MainLayout.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";
import SpacecraftsLayout from "./routes/SpacecraftsLayout.jsx";
import AllSpacecraftsPage from "./pages/Spacecrafts/AllSpacecraftsPage.jsx";
import SpacecraftPage from "./pages/Spacecrafts/SpacecraftPage.jsx";
import SpacecraftUpdatePage from "./pages/Spacecrafts/SpacecraftUpdatePage.jsx";
import SpacecraftBuilderPage from "./pages/Spacecrafts/SpacecraftBuilderPage.jsx";
import PlanetsLayout from "./routes/PlanetsLayout.jsx";
import AllPlanetsPage from "./pages/Planets/AllPlanetsPage.jsx";
import PlanetPage from "./pages/Planets/PlanetPage.jsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";
import MissionStatusGate from "./routes/MissionStatusGate.jsx";
import MissionSuccessPage from "./pages/MissionOutcomePage/MissionSuccessPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <MissionStatusGate />,
    children: [
      {
        path: "/app",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "spacecrafts",
            element: <SpacecraftsLayout />,
            children: [
              {
                index: true,
                element: <AllSpacecraftsPage />,
              },
              {
                path: "details/:id",
                element: <SpacecraftPage />,
              },
              {
                path: "update/:id",
                element: <SpacecraftUpdatePage />,
              },
              {
                path: "build",
                element: <SpacecraftBuilderPage />,
              },
            ],
          },
          {
            path: "planets",
            element: <PlanetsLayout />,
            children: [
              {
                index: true,
                element: <AllPlanetsPage />,
              },
              {
                path: "details/:id",
                element: <PlanetPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/mission-success",
    element: <MissionSuccessPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
