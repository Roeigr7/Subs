import { useEffect } from "react";
import { useAuth } from "contexts/authContext";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [navigate, currentUser]);
  return children;
};

export default PublicRoute;
