import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashBoard,
  HomeLayout,
  HouseProfile,
  HelpRequests,
  HelpRequestDetails,
  Invoices,
  Leaders,
  Documents,
  ShiftsMangment,
  UserProfile,
  Login,
} from "./pages";

import ProtectedRoute from "./pages/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    // errorElement: <SinglePageError />,

    // Home Page

    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DashBoard />,
        // errorElement: <SinglePageError />,
      },

      {
        path: "houseProfile",
        element: <HouseProfile />,
        // errorElement: <SinglePageError />,
      },
      {
        path: "/helpRequests",
        element: <HelpRequests />,
        // errorElement: <SinglePageError />,
      },
      {
        path: "/helpRequests/:id",
        element: <HelpRequestDetails />,
      },
      {
        path: "/UserProfile/:id",
        element: <UserProfile />,
      },

      {
        path: "/invoices",
        element: <Invoices />,
        // errorElement: <SinglePageError />,
      },
      {
        path: "/notifications",
        element: <HouseProfile />,
        // errorElement: <SinglePageError />,
      },
      {
        path: "/Leaders",
        element: <Leaders />,
        // errorElement: <SinglePageError />,
      },
      {
        path: "/Documents",
        element: <Documents />,
        // errorElement: <SinglePageError />,
      },
      {
        path: "/Shifts",
        element: <ShiftsMangment />,
        // errorElement: <SinglePageError />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
]);

function App() {
  return (
    <>
      {/* Wrapping the application with QueryClientProvider to provide data via react-query */}
      {/* Making the pages rely on the route. */}
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
