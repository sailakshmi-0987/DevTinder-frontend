import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Body from "./Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./Feed";
import Connections from "./Connections";
import Requests from "./Requests";
import ProfilePage from "./ProfilePage";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";

import { BASE_URL } from "./utils/constants";

function App() {
    
  return (
    <>
    <Provider store={appStore}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Feed />}/>
          <Route path="login" element={<Login />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="connections" element={<Connections />}/>
          <Route path="requests" element={<Requests />}/>
          <Route path="profile/:id" element={<ProfilePage />}/>
          <Route path="/forget-password" element={<ForgetPassword />}/>
          
        </Route>
        <Route path="/reset-password/:token" element={<ResetPassword />}/>
      </Routes>
     </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
