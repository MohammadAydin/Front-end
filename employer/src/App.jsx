import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashBoard,
  HomeLayout,
  HouseProfile,
  HelpRequests,
  HelpRequestDetails,
  ServiceRequestDetails,
  Invoices,
  Offers,
  Leaders,
  Documents,
  ShiftsMangment,
  UserProfile,
  Login,
  // PersonalInfo,
  ServiceRequestsDetails,
  Personal_info,
  Complate_personal_info,
  Signature,
  Phone_number,
  LocationInfo,
  AddLoaction,
  EditLocation,
  InvoiceDetails,
  Notifications,
  ReportTask,
  CoustomHelpRequest,
  AddJob,
  ViewJobs,
  Settings,
} from "./pages";
import ChangePassword from "./components/ChangePassword";

import ProtectedRoute from "./pages/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

// Initialize i18n
import "./i18n";

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
      // {
      //   index: true,
      //   element: <DashBoard />,
      // errorElement: <SinglePageError />,
      // },

      {
        // path: "houseProfile",
        index: true,

        element: <HouseProfile />,

        // errorElement: <SinglePageError />,
      },
      // {
      //   path: "personalInfo",
      //   element: <PersonalInfo />,
      //   // errorElement: <SinglePageError />,
      // },
      {
        path: "/Personal info",
        element: <Personal_info />,
      },
      {
        path: "Personal info/complate",
        element: <Complate_personal_info />,
      },
      {
        path: "documents",
        element: <Documents />,
      },
      {
        path: "Signature",
        element: <Signature />,
      },
      {
        path: "phone number",
        element: <Phone_number />,
      },
      { path: "locationInfo", element: <LocationInfo /> },
      {
        path: "addLoaction",
        element: <AddLoaction />,
      },
      {
        path: "addLoaction/:length",
        element: <AddLoaction />,
      },
      {
        path: "editLocation",
        element: <EditLocation />,
      },

      {
        path: "/helpRequests",
        element: <HelpRequests />,
        // errorElement: <SinglePageError />,
      },
      {
        path: "/coustomHelpRequest",
        element: <CoustomHelpRequest />,
        // errorElement: <SinglePageError />,
      },
      {
        path: "/add-job",
        element: <AddJob />,
      },
      {
        path: "/view-jobs",
        element: <ViewJobs />,
      },
      {
        path: "/helpRequests/:id",
        element: <HelpRequestDetails />,
      },
      {
        path: "/helpRequests/:jobId/service-request/:serviceRequestId",
        element: <ServiceRequestDetails />,
      },
      {
        path: "/serviceRequestsDetails",
        // path: "/serviceRequestsDetails/:idJop/:idServices/:task",
        element: <ServiceRequestsDetails />,
      },
      {
        path: "/reportTask/:id",
        element: <ReportTask />,
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
        path: "/invoiceDetails/:id",
        element: <InvoiceDetails />,
        // errorElement: <SinglePageError />,
      },
      {
        path: "/offers",
        element: <Offers />,
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
      {
        path: "/Notifications",
        element: <Notifications />,
        // errorElement: <SinglePageError />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/settings",
        element: <Settings />,
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
      <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
}

export default App;
