import { lazy } from 'react';

const CourseAsync = lazy(() => import("./pages/course"));
const StudentsAsync = lazy(() => import("./pages/student"));
const BookingAsync = lazy(() => import("./pages/booking"));
const StaffAsync = lazy(() => import("./pages/staff"));
const StudyMaterialsAsync = lazy(() => import("./pages/studyMaterials"));
const TermsAndConditionAsync = lazy(() => import("./pages/termsAndCondition"));
const LeaveRequestsAsync = lazy(() => import("./pages/leaveRequests"));
const BankDetailsAsync = lazy(() => import("./pages/bankDetails"));
const ViewStudyMaterialsAsync = lazy(() => import("./pages/studyMaterials/ViewStudentStudyMaterial"));
const SlotsAsync = lazy(() => import("./pages/slots"));
const UpcomingSlotsAsync = lazy(() => import("./pages/slots/UpcomingSlots"));
const NotificationsAsync = lazy(() => import("./pages/notifications"));
const VideoPreviewAsync = lazy(() => import("./pages/studyMaterials/VideoPreview"));
const ResultAndTestimonialsAsync = lazy(() => import("./pages/resultAndTestimonials"));
const StudyAbroadBookingAsync = lazy(() => import("./pages/studyAbroad"));
const ImmigrationBookingAsync = lazy(() => import("./pages/Immigrations"));

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
}, {
    key: 9,
    path: "/app/view-study-materials",
    component: <ViewStudyMaterialsAsync />,
    private: true,
    lazy: true
}, {
    key: 10,
    path: "/app/leaves",
    component: <LeaveRequestsAsync />,
    private: true,
    lazy: true
}, {
    key: 11,
    path: "/app/slots",
    component: <SlotsAsync />,
    private: true,
    lazy: true
}, {
    key: 12,
    path: "/app/upcoming-slots",
    component: <UpcomingSlotsAsync />,
    private: true,
    lazy: true
}, {
    key: 13,
    path: "/app/notifications",
    component: <NotificationsAsync />,
    private: true,
    lazy: true
}, {
    key: 14,
    path: "/app/study-materials/video/:mediaId",
    component: <VideoPreviewAsync />,
    private: true,
    lazy: true
}, {
    key: 15,
    path: "/app/view-study-materials/video/:mediaId",
    component: <VideoPreviewAsync />,
    private: true,
    lazy: true
}, {
    key: 16,
    path: "/app/result-testimonials",
    component: <ResultAndTestimonialsAsync />,
    private: true,
    lazy: true
}, {
    key: 17,
    path: "/app/study-abroad-booking",
    component: <StudyAbroadBookingAsync />,
    private: true,
    lazy: true
}, {
    key: 18,
    path: "/app/immigration-booking",
    component: <ImmigrationBookingAsync />,
    private: true,
    lazy: true
}];
