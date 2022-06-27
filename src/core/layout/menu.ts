import { UserType } from "../constants/common";

export const MenuItems = [{
    icon: "",
    label: "Booking",
    access: [UserType.Admin],
    url: "/app/booking"
}, {
    icon: "",
    label: "Courses",
    access: [UserType.Admin],
    url: "/app/courses"
}, {
    icon: "",
    label: "Students",
    access: [UserType.Admin],
    url: "/app/students"
}, {
    icon: "",
    label: "Staff",
    access: [UserType.Admin],
    url: "/app/staff"
}, {
    icon: "",
    label: "Study Materials",
    access: [UserType.Admin],
    url: "/app/study-materials"
}, {
    icon: "",
    label: "Leaves",
    access: [UserType.Admin],
    url: "/app/leaves"
}, {
    icon: "",
    label: "Slots",
    access: [UserType.Admin],
    url: "/app/slots"
}, {
    icon: "",
    label: "Notifications",
    access: [UserType.Admin],
    url: "/app/notifications"
}, {
    icon: "",
    label: "Terms & Conditions",
    access: [UserType.Admin],
    url: "/app/terms-and-condition"
}, {
    icon: "",
    label: "Leave Request",
    access: [UserType.Staff],
    url: "/app/leave-requests"
}, {
    icon: "",
    label: "Bank Details",
    access: [UserType.Staff],
    url: "/app/bank-details"
}, {
    icon: "",
    label: "Upcoming Classes",
    access: [UserType.Staff],
    url: "/app/upcoming-classes"
}, {
    icon: "",
    label: "Feedback Tracking",
    access: [UserType.Staff],
    url: "/app/feedback-tracking"
}, {
    icon: "",
    label: "View Study Materials",
    access: [UserType.Student],
    url: "/app/view-study-materials"
}, {
    icon: "",
    label: "Upcoming Slots",
    access: [UserType.Student],
    url: "/app/upcoming-slots"
}, {
    icon: "",
    label: "Feedback Listing",
    access: [UserType.Student],
    url: "/app/feedback-listing"
}];
