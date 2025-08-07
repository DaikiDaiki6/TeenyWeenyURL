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
import NotFound from "../MainComponents/NotFound";
import MainLayout from "../MainComponents/MainLayout";
import EditUrl from "../LayoutComponents/EditUrl";

const rootRoute = createRootRoute({
  component: MainLayout,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginForm,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterForm,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});

const editUrlRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edit-url",
  component: EditUrl,
});


const shortUrlsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/short-urls",
  component: ShortUrlsProfile,
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
  notFoundRoute,
]);

export const router = createRouter({ routeTree });
