import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DetailsPage } from "./pages/DetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/photos/:photo_id",
    Component: DetailsPage,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
