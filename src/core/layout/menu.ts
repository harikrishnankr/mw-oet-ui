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
    url: "/app/courses"
}, {
    icon: "",
    label: "Study Materials",
    access: [UserType.Admin],
    url: "/app/courses"
}, {
    icon: "",
    label: "Leaves",
    access: [UserType.Admin],
    url: "/app/courses"
}, {
    icon: "",
    label: "Slots",
    access: [UserType.Admin],
    url: "/app/courses"
}, {
    icon: "",
    label: "Notifications",
    access: [UserType.Admin],
    url: "/app/courses"
}, {
    icon: "",
    label: "Terms & Conditions",
    access: [UserType.Admin],
    url: "/app/courses"
}, {
    icon: "",
    label: "Leave Request",
    access: [UserType.Staff],
    url: "/app/courses"
}, {
    icon: "",
    label: "Bank Details",
    access: [UserType.Staff],
    url: "/app/courses"
}, {
    icon: "",
    label: "Upcoming Classes",
    access: [UserType.Staff],
    url: "/app/courses"
}, {
    icon: "",
    label: "Feedback Tracking",
    access: [UserType.Staff],
    url: "/app/courses"
}, {
    icon: "",
    label: "Upcoming Slots",
    access: [UserType.Student],
    url: "/app/courses"
}, {
    icon: "",
    label: "View Study Materials",
    access: [UserType.Student],
    url: "/app/courses"
}, {
    icon: "",
    label: "Feedback Listing",
    access: [UserType.Student],
    url: "/app/courses"
}];
