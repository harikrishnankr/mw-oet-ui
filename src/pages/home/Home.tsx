import React, { useEffect, useState } from "react";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import HeaderSection from "./HeaderSection";
import HomeCourses from "./HomeCourses";

export function Home() {

    const [isStickyHeader, setIsStickyHeader] = useState(false);
    const [selectedId, setSelectedId] = useState("#home");
    const linkIds = ['#home', '#courses', '#about-us', '#contact-us'];
    
    useEffect(() => {
        const handleScroll = (event: any) => {
            let scrollTop = event.srcElement.scrollTop, itemTranslate = Math.min(0, scrollTop/3 - 60);
            if (scrollTop > 75) {
                setIsStickyHeader(true);
            } else {
                setIsStickyHeader(false);
            }
            linkIds.forEach((id: string) => {
                const sectionOffset = (document.querySelector(id) as HTMLElement)?.offsetTop || 0;
                if ((sectionOffset - 178) <= scrollTop) {
                    setSelectedId(id);
                }
            });
        };
        window.removeEventListener('scroll', handleScroll, true);
        window.addEventListener('scroll', handleScroll, true);

        return () => {
            window.removeEventListener('scroll', handleScroll, true)
        };
    }, []);

    return (
        <>
            <HeaderSection isSticky={isStickyHeader} selectedId={selectedId}/>
            <HomeCourses />
            <AboutUs />
            <ContactUs />
            <Footer />
        </>
    );
}
