import { lazy } from 'react';
import { Route, Routes } from "react-router";
import { Loading } from './core/loading';

const HomeAsync = lazy(() => import("./pages/home"));
const NotFoundAsync = lazy(() => import("./pages/notFound"));
const StudentRegistration = lazy(() => import("./pages/studentRegistration"));
const AdminLoginAsync = lazy(() => import("./pages/auth/AdminLogin"));
const StudentLoginAsync = lazy(() => import("./pages/auth/StudentLogin"));
const StaffLoginAsync = lazy(() => import("./pages/auth/StaffLogin"));


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={ <Loading> <HomeAsync /> </Loading> }/>
          <Route path="/student/register" element={ <Loading> <StudentRegistration /> </Loading> } />
          <Route path="/admin/login" element={ <Loading> <AdminLoginAsync /> </Loading> }/>
          <Route path="/student/login" element={ <Loading> <StudentLoginAsync /> </Loading> }/>
          <Route path="/staff/login" element={ <Loading> <StaffLoginAsync /> </Loading> }/>
          <Route
              path="*"
              element={<Loading> <NotFoundAsync /> </Loading> }
          />
      </Routes>
    </div>
  );
}

export default App;
