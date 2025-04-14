import { Outlet } from "react-router";

function layout() {
  return (
    <div>
      <p>Layout</p>
      <Outlet />
    </div>
  );
}
export default layout;
