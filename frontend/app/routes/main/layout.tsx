import { Outlet } from "react-router";

function layout() {
  return (
    <div>
      <p>Auth check leszek</p>
      <Outlet />
    </div>
  );
}
export default layout;
