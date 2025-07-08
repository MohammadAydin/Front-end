import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AuthContainer,
  Layout,
  ProtectedRoute,
  Personal_info,
  Complate_personal_info,
  Banking_info,
  Social_Security_and_Health_Insurance,
  JopRequest,
  Employment_data,
  Residence_info,
  Signature,
  Documents,
  LocationInfo,
  UserProfile,
  Phone_number,
  ReportTask,
  TasksDetails,
  TasksPage,
  AddLoaction,
  EditLocation,
  EditWorkaBilities,
  WorkingHours,
} from "./pages";
import LoginForm from "./components/FormAuth/LoginForm";
import RegisterForm from "./components/FormAuth/RegisterForm";
import { ToastContainer } from "react-toastify";
import VerifyEmailForm from "./components/FormAuth/VerifyEmailForm";
import PersonalinfoForm from "./components/FormAuth/PersonalinfoForm";
import ForgetPasswordForm from "./components/FormAuth/ForgetPasswordForm";
import ResetPasswordForm from "./components/FormAuth/ResetPasswordForm";
import ResetPassowrdPage from "./pages/ResetPassowrdPage";
import JobRequestDetails from "./pages/JobRequestDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <JopRequest />,
      },
      {
        path: "/tasksPage",
        element: <TasksPage />,
      },
      {
        path: "/taskDetails/:id",
        element: <TasksDetails />,
      },
      {
        path: "/reportTask/:id",
        element: <ReportTask />,
      },
      //  ---------------- Personal info Page --------------------
      {
        path: "/Personal info",
        element: <Personal_info />,
      },
      {
        path: "Personal info/complate",
        element: <Complate_personal_info />,
      },
      {
        path: "residence info",
        element: <Residence_info />,
      },
      {
        path: "banking info",
        element: <Banking_info />,
      },
      {
        path: "Social Insurance",
        element: <Social_Security_and_Health_Insurance />,
      },
      {
        path: "Employment data",
        element: <Employment_data />,
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
        path: "editLocation/:id/:title/:street1/:street2/:postal_code/:city/:country",
        element: <EditLocation />,
      },

      {
        path: "editWorkaBilities/:workable_distance",
        element: <EditWorkaBilities />,
      },
      {
        path: "jobRequestDetails/:id",
        element: <JobRequestDetails />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "working hours",
        element: <WorkingHours />,
      },
      // -------------------------------------------------------------
    ],
  },
  {
    path: "/AuthContainer",
    element: <AuthContainer />,
    children: [
      {
        index: true, // default route under /AuthContainer
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "verifyEmail/:email",
        element: <VerifyEmailForm />,
      },
      {
        path: "personalinfo",
        element: <PersonalinfoForm />,
      },
      {
        path: "forgetPassword",
        element: <ForgetPasswordForm />,
      },
    ],
  },
  {
    path: "/resetPassword",
    element: <ResetPassowrdPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
