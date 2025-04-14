import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthService } from "~/services/auth.service";

const login = () => {
  return true;
};

function layout() {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkToken() {
      // if (await AuthService.verifyToken()) {
      //   navigate("/login");
      // }
      if (false) {
        navigate("/login");
      }
    }
    checkToken();
  }, [navigate]);
  return (
    <div>
      <Outlet />
    </div>
  );
}
export default layout;
