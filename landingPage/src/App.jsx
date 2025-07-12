import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import Impressum from "./pages/Impressum ";
import Datenschutzerklärung from "./pages/Datenschutzerklärung";

const router = createBrowserRouter([
  {
    path: "/landing",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "Impressum", element: <Impressum /> },
      { path: "Datenschutzerklärung", element: <Datenschutzerklärung /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
