import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("about", "./routes/about.tsx"),

  // a layout minden benne lévő route-on lerenderelődik.
  layout("./routes/auth/layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("register", "./routes/auth/register.tsx"),
  ]),

  ...prefix("concerts", [
    // Ez prefixeli, hogy a lent lévők mind concerts el kezdődik
    index("./routes/concerts/home.tsx"), // ez igy tehat a /concerts
    route(":city", "./routes/concerts/city.tsx"), // dinamikus utvonal /concerts/:city a :city-t megkapja parameterkent az oldal params kent
    route("trending", "./routes/concerts/trending.tsx"),
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
