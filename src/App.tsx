import React, { lazy } from 'react';
import { Route, Routes } from "react-router";
import { routes } from './AppRoutes';
import { Loading } from './core/loading';
import PrivateRoute from './core/PrivateRoute';

const ChoosePortalAsync = lazy(() => import("./pages/choosePortal"));
const HomeAsync = lazy(() => import("./pages/home"));
const NotFoundAsync = lazy(() => import("./pages/notFound"));
const StudentRegistration = lazy(() => import("./pages/studentRegistration"));
const AdminLoginAsync = lazy(() => import("./pages/auth/AdminLogin"));
const StudentLoginAsync = lazy(() => import("./pages/auth/StudentLogin"));
const StaffLoginAsync = lazy(() => import("./pages/auth/StaffLogin"));
const StudyAbroadAsync = lazy(() => import("./pages/studyAbroad"));
const LayoutWrapper = lazy(() => import("./core/layout"));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Loading> <ChoosePortalAsync /> </Loading>} />
        <Route path="/study-abroad" element={<Loading> <StudyAbroadAsync /> </Loading>} />
        <Route path="/online-academy" element={<Loading> <HomeAsync /> </Loading>} />
        <Route path="/student/register" element={<Loading> <StudentRegistration /> </Loading>} />
        <Route path="/admin/login" element={<Loading> <AdminLoginAsync /> </Loading>} />
        <Route path="/student/login" element={<Loading> <StudentLoginAsync /> </Loading>} />
        <Route path="/staff/login" element={<Loading> <StaffLoginAsync /> </Loading>} />
        <Route path="/app" element={<PrivateRoute lazy> <LayoutWrapper /> </PrivateRoute>}>
          {
            routes.map((route) => (
              <Route key={route.key} path={route.path} element={(
                <>
                  {
                    route.private ?
                      <PrivateRoute lazy>{route.component as React.ReactPortal}</PrivateRoute> :
                      <> {route.component} </>
                  }
                </>

              )} />
            ))
          }
        </Route>
        <Route
          path="*"
          element={<Loading> <NotFoundAsync /> </Loading>}
        />
      </Routes>
    </div>
  );
}

export default App;
