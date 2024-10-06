import { Route, Routes } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";

import "./scss/styles.scss";
function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      {/* <AuthUserPage /> */}
    </>
  );
}

export default App;
