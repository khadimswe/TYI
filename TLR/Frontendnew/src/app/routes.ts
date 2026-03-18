import { createBrowserRouter } from "react-router";
import { Login } from "./components/login";
import { SignUp } from "./components/sign-up";
import { Home } from "./components/home";
import { Tag } from "./components/tag";
import { Ranks } from "./components/ranks";
import { Social } from "./components/social";
import { Messages } from "./components/messages";
import { Map } from "./components/map";
import { Profile } from "./components/profile";
import { Settings } from "./components/settings";
import { Notifications } from "./components/notifications";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/sign-up",
    Component: SignUp,
  },
  {
    path: "/map",
    Component: Map,
  },
  {
    path: "/tag",
    Component: Tag,
  },
  {
    path: "/ranks",
    Component: Ranks,
  },
  {
    path: "/social",
    Component: Social,
  },
  {
    path: "/messages",
    Component: Messages,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/settings",
    Component: Settings,
  },
  {
    path: "/notifications",
    Component: Notifications,
  },
]);