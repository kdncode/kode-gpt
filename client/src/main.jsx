import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./routes/homepage/Homepage";
import { DashboardPage } from "./routes/dashboard-page/dashboard-page";
import { ChatPage } from "./routes/chat-page/chat-page";
import { RootLayout } from "./layouts/root-layout/root-layout";
import { DashboardLayout } from "./layouts/dashboard-layout/dashboard-layout";
import { SignInPage } from "./routes/sign-in-page/Sign-in-page";
import { SignUpPage } from "./routes/sign-up-page/Sign-up-page";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
