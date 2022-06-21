import { lazy } from 'react';

const CourseAsync = lazy(() => import("./pages/course"));
const StudentsAsync = lazy(() => import("./pages/student"));
const BookingAsync = lazy(() => import("./pages/booking"));
const StaffAsync = lazy(() => import("./pages/staff"));
const StudyMaterialsAsync = lazy(() => import("./pages/studyMaterials"));
const TermsAndConditionAsync = lazy(() => import("./pages/termsAndCondition"));
const LeaveRequestsAsync = lazy(() => import("./pages/leaveRequests"));
const BankDetailsAsync = lazy(() => import("./pages/bankDetails"));

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
}, {
    key: 4,
    path: "/app/staff",
    component: <StaffAsync />,
    private: true,
    lazy: true
}, {
    key: 5,
    path: "/app/study-materials",
    component: <StudyMaterialsAsync />,
    private: true,
    lazy: true
}, {
    key: 6,
    path: "/app/terms-and-condition",
    component: <TermsAndConditionAsync />,
    private: true,
    lazy: true
}, {
    key: 7,
    path: "/app/leave-requests",
    component: <LeaveRequestsAsync />,
    private: true,
    lazy: true
}, {
    key: 8,
    path: "/app/bank-details",
    component: <BankDetailsAsync />,
    private: true,
    lazy: true
}];
