import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { AuthService } from "~/services/auth.service";
import { ConfigService } from "~/services/config.service";

const login = () => {
  return true;
};

function layout() {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkToken() {
      if (false) {
        navigate("/login");
      }
    }
    checkToken();
  }, [navigate]);
  return (
    <div>
      <Button
        onClick={() => {
          ConfigService.setToken("");
          navigate("/login");
        }}
        variant={"outline"}
        className="fixed right-2"
      >
        Kijelentkezés
      </Button>
      <Outlet />
    </div>
  );
}
export default layout;
