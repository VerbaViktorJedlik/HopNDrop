import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),

  // a layout minden benne lévő route-on lerenderelődik.
  layout("./routes/globalLayout.tsx", [
    layout("./routes/main/layout.tsx", [
      route("pickup", "./routes/main/pickup.tsx"),
      route("send", "./routes/main/send.tsx"),
      route("profile", "./routes/main/profile.tsx"),
    ]),
    route("login", "./routes/auth/login.tsx"),
    route("register", "./routes/auth/register.tsx"),
    route("tracker", "./routes/main/tracker.tsx"),
  ]),

  ...prefix("tutorial", [
    layout("./routes/tutorial/layout.tsx", [
      index("./routes/tutorial/home.tsx"),
      route("components", "./routes/tutorial/components.tsx"),
      route("props", "./routes/tutorial/props.tsx"),
      route("useState", "./routes/tutorial/useState.tsx"),
      route("conditionRender", "./routes/tutorial/conditionRender.tsx"),
      route("list", "./routes/tutorial/list.tsx"),
      route("useStateObject", "./routes/tutorial/useStateObject.tsx"),
      route("useEffect", "./routes/tutorial/useEffectComponent.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
