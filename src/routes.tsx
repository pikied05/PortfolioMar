import { createBrowserRouter, Navigate } from "react-router"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Category from "./pages/Category"
import Contact from "./pages/Contact"
import Projects from "./pages/Projects"
import ProjectDetail from "./pages/ProjectDetail"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "work/:slug", Component: Category },
      { path: "projects", Component: Projects },
      { path: "projects/:slug", Component: ProjectDetail },
      { path: "contact", Component: Contact },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
],{ basename: import.meta.env.BASE_URL })
