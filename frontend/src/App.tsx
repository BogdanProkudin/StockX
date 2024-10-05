import { Route, Routes } from "react-router-dom";
import AuthUserPage from "./components/AuthUser/AuthUserPage";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<AuthUserPage />}></Route>
      </Routes>
      {/* <AuthUserPage /> */}
    </>
  );
}

export default App;
