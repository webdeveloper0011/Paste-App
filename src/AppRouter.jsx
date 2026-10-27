import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import frontendRoutes from "./frontend/FrontendRoutes";

const router = createBrowserRouter([
  ...frontendRoutes,
//   ...AdminRoutes
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;