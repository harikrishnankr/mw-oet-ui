import { lazy } from 'react';

const CourseAsync = lazy(() => import("./pages/course"));
const StudentsAsync = lazy(() => import("./pages/student"));
const BookingAsync = lazy(() => import("./pages/booking"));

export const routes = [{
    key: 1,
    path: "/app/courses",
    component: <CourseAsync />,
    private: true,
    lazy: true
}, {
    key: 2,
    path: "/app/students",
    component: <StudentsAsync />,
    private: true,
    lazy: true
}, {
    key: 3,
    path: "/app/booking",
    component: <BookingAsync />,
    private: true,
    lazy: true
}];
