import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import Dashboard from "../LayoutComponents/Dashboard";
import Profile from "../LayoutComponents/Profile";
import ShortUrlsProfile from "../LayoutComponents/ShortUrlsProfile";
import CreateShortcode from "../LayoutComponents/CreateShortcode";
import NotFound from "../MainComponents/NotFound";
import MainLayout from "../MainComponents/MainLayout";
import EditUrl from "../LayoutComponents/EditUrl";
import ProtectedRoute from "../Auth/ProtectedRoute";

const rootRoute = createRootRoute({
  component: MainLayout,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <ProtectedRoute requireAuth={false}>
      <LoginForm />
    </ProtectedRoute>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <ProtectedRoute requireAuth={false}>
      <RegisterForm />
    </ProtectedRoute>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute requireAuth={true}>
      <Dashboard />
    </ProtectedRoute>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <ProtectedRoute requireAuth={true}>
      <Profile />
    </ProtectedRoute>
  ),
});

const editUrlRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edit-url/$id",
  component: () => (
    <ProtectedRoute requireAuth={true}>
      <EditUrl />
    </ProtectedRoute>
  ),
});

const shortUrlsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/short-urls/$id",
  component: () => (
    <ProtectedRoute requireAuth={true}>
      <ShortUrlsProfile />
    </ProtectedRoute>
  ),
});

const createShortcodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/create",
  component: () => (
    <ProtectedRoute requireAuth={true}>
      <CreateShortcode />
    </ProtectedRoute>
  ),
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  registerRoute,
  dashboardRoute,
  profileRoute,
  editUrlRoute,
  shortUrlsRoute,
  createShortcodeRoute,
  notFoundRoute,
]);

export const router = createRouter({ routeTree });
