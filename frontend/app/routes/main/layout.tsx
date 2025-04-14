import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const login = () => {
  return true;
};

function layout() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!login()) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <Outlet />
    </div>
  );
}
export default layout;
