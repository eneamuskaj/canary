import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./login";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
