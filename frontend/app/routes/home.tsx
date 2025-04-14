import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/profile");
  }, [navigate]);

  return null;
}

export default home;
