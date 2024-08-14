import { Navigate } from "react-router-dom";

const ErrorPage = () => {

  if (localStorage.getItem("walletAddress")) {
    return <Navigate to="/chat" replace />;
  } else {
    return <Navigate to="/" replace />;
    
  }
};

export default ErrorPage;
