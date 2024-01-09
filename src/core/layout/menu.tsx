import { UserType } from "../constants/common";
import bookingImage from "../../assets/images/booking.svg";
import coursesImage from "../../assets/images/courses.svg";
import studentsImage from "../../assets/images/students.svg";
import staffImage from "../../assets/images/staff.svg";
import slotsImage from "../../assets/images/slots.svg";
import leavesImage from "../../assets/images/leaves.svg";
import notificationsImage from "../../assets/images/notifications.svg";
import termsAndConditionImage from "../../assets/images/termsAndConditions.svg";
import bankDetailsImage from "../../assets/images/bankDetails.svg";
import viewStudyMaterialsImage from "../../assets/images/viewStudyMaterials.svg";
import upcomingClassImage from "../../assets/images/upcomingClasses.svg";
import feedbackImage from "../../assets/images/feedback.svg";

export const MenuItems = [{
    icon: <img src={bookingImage} alt="ICON" className="side-menu-icon"/>,
    label: "Consultation Bookings",
    access: [UserType.Admin, UserType.Staff],
    url: "/app/consultation-booking"
},
{
    icon: <img src={bookingImage} alt="ICON" className="side-menu-icon"/>,
    label: "Service Requests",
    access: [UserType.Admin, UserType.Staff],
    url: "/app/service-requests"
},
{
    icon: <img src={slotsImage} alt="ICON" className="side-menu-icon"/>,
    label: "Events",
    access: [UserType.Admin],
    url: "/app/events"
}, 
{
    icon: <img src={slotsImage} alt="ICON" className="side-menu-icon"/>,
    label: "Results/Testimonials",
    access: [UserType.Admin],
    url: "/app/result-testimonials"
},
{
    icon: <img src={coursesImage} alt="ICON" className="side-menu-icon"/>,
    label: "Courses",
    access: [UserType.Admin],
    url: "/app/courses"
}, {
    icon: <img src={studentsImage} alt="ICON" className="side-menu-icon"/>,
    label: "Students",
    access: [UserType.Admin],
    url: "/app/students"
}, {
    icon: <img src={staffImage} alt="ICON" className="side-menu-icon"/>,
    label: "Staff",
    access: [UserType.Admin],
    url: "/app/staff"
}, {
    icon: <img src={leavesImage} alt="ICON" className="side-menu-icon"/>,
    label: "Leaves",
    access: [UserType.Admin],
    url: "/app/leaves"
}, {
    icon: <img src={slotsImage} alt="ICON" className="side-menu-icon"/>,
    label: "Slots",
    access: [UserType.Admin],
    url: "/app/slots"
}, {
    icon: <img src={notificationsImage} alt="ICON" className="side-menu-icon"/>,
    label: "Notifications",
    access: [UserType.Admin],
    url: "/app/notifications"
}, {
    icon: <img src={termsAndConditionImage} alt="ICON" className="side-menu-icon"/>,
    label: "Terms & Conditions",
    access: [UserType.Admin],
    url: "/app/terms-and-condition"
}, {
    icon: <img src={leavesImage} alt="ICON" className="side-menu-icon"/>,
    label: "Leave Request",
    access: [UserType.Staff],
    url: "/app/leave-requests"
}, {
    icon: <img src={bankDetailsImage} alt="ICON" className="side-menu-icon"/>,
    label: "Bank Details",
    access: [UserType.Staff],
    url: "/app/bank-details"
}, {
    icon: <img src={upcomingClassImage} alt="ICON" className="side-menu-icon"/>,
    label: "Upcoming Classes",
    access: [UserType.Staff],
    url: "/app/upcoming-classes"
}, {
    icon: <img src={feedbackImage} alt="ICON" className="side-menu-icon"/>,
    label: "Feedback Tracking",
    access: [UserType.Staff],
    url: "/app/feedback-tracking"
}, {
    icon: <img src={viewStudyMaterialsImage} alt="ICON" className="side-menu-icon"/>,
    label: "View Study Materials",
    access: [UserType.Student],
    url: "/app/view-study-materials"
}, {
    icon: <img src={slotsImage} alt="ICON" className="side-menu-icon"/>,
    label: "Upcoming Slots",
    access: [UserType.Student],
    url: "/app/upcoming-slots"
}];
