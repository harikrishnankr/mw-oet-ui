import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { PageWrapper } from "../../core/PageWrapper";
import { Results } from "./Results";
import { Testimonials } from "./Testimonials";

const { TabPane } = Tabs;

const TABS = [{
    title: "Results",
    key: "__results__"
}, {
    title: "Testimonials",
    key: "__testimonials__"
}];

export function ResultAndTestimonials() {
    const [activeKey, setActiveKey] = useState('__results__');

    const onTabChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    return (
        <PageWrapper title="Results and Testimonials" subTitle="Update Results And Testimonials">
            <Tabs onChange={onTabChange} activeKey={activeKey}>
                {TABS.map((tab) => (
                    <TabPane tab={tab.title} key={tab.key}>
                        {
                            tab.key === "__results__" ? <>
                                <Results />
                            </> : null
                        }
                        {
                            tab.key === "__testimonials__" ? <>
                                <Testimonials />
                            </> : null
                        }
                    </TabPane>
                ))}
            </Tabs>
        </PageWrapper>
    )
}