import { Route, Routes } from "react-router-dom";

import Auth from "./pages/Auth";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Auth />}></Route>
      </Routes>
      {/* <AuthUserPage /> */}
    </>
  );
}

export default App;
