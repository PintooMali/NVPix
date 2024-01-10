import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import HomePage from "./Pages/HomePage.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import PlanPage from "./Pages/PlanPage.tsx";
import BrowsePage from "./Pages/BrowsePage.tsx";
import WatchPage from "./Pages/WatchPage.tsx";
import PrivateRoutes from "./utils/PrivateRoutes.tsx";
import PlansManagePage from "./Pages/PlansManagePage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/plans' element={<PrivateRoutes />}>
        <Route path='/plans' element={<PlanPage />} />
        <Route path='/plans/manage' element={<PlansManagePage />} />
      </Route>
      <Route path='/browse' element={<PrivateRoutes />}>
        <Route path='/browse' element={<BrowsePage />} />
        <Route path='/browse/watch/:id' element={<WatchPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
