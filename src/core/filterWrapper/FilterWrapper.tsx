import { Button, Drawer, Radio, Space } from "antd";
import DatePicker, { RangePickerProps } from "antd/lib/date-picker";
import React, { SyntheticEvent, useCallback, useMemo, useState } from "react";
import { isTabletDevice } from "../utils";
import FilterIcon from "../../assets/images/filter.png";
import "./FilterWrapper.scss";

export enum FilterType {
    RadioGroup = 1,
    DatePicker
}

export interface IFilterOptions {
    type: FilterType;
    radioOptions?: { label: string; value: string|number; }[];
    disabledDate?: RangePickerProps['disabledDate'];
    value: any;
    onChange: (t: any) => void;
    placeholder?: string;
    name: string;
    format?: string;
}

export const Filter = React.memo(function Filter(props: IFilterOptions) {
    const isTablet: boolean = isTabletDevice();
    const {
        type, radioOptions, onChange, value, placeholder, name, format, disabledDate
    } = props;

    const datePickerChange = (value: any) => {
        onChange && onChange({ target: { name, value} })
    };

    const getFilter = () => {
        switch(type) {
            case FilterType.RadioGroup:
                return (
                    <Radio.Group options={ radioOptions||[] } onChange={onChange}
                        value={value} optionType={ isTablet ? "default" : "button" }
                        name={name}
                    />
                );
            case FilterType.DatePicker:
                return (
                    <DatePicker placeholder={placeholder} name={name} format={format}
                        onChange={datePickerChange} value={value||null}
                        disabledDate={disabledDate} inputReadOnly
                    />
                );
        }
    };

    return (
        <>
            { getFilter() }
        </>
    )
});

export const FilterWrapper = React.memo(function FilterWrapper({ children }: { children: any }) {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const isTablet: boolean = useMemo(() => isTabletDevice(), []);
    const onDrawerClose = () => setDrawerOpen(false);

    const onOpenFilter = useCallback((e: SyntheticEvent)=> {
        e.preventDefault();
        setDrawerOpen(true);
    }, []);

    return (
        <div className="Filter__wrapper">
            {
                isTablet &&
                <>
                    <div className="Filter-icon__wrapper">
                        <a href="#" className="icon" onClick={onOpenFilter}>
                            <img src={FilterIcon} alt="Filter"/>
                            Filter
                        </a>
                    </div>
                    <Drawer
                        title="Filter"
                        placement="bottom"
                        onClose={onDrawerClose}
                        visible={isDrawerOpen}
                        key="bottom"
                        extra={
                            <Space>
                              <Button type="primary" onClick={onDrawerClose}>Done</Button>
                            </Space>
                        }
                    >
                        <Space direction={isTablet ? "vertical": "horizontal" } style={{ width: '100%' }}>
                            { children }
                        </Space>
                    </Drawer>
                </>
            }
            {
                !isTablet && <Space direction={isTablet ? "vertical": "horizontal" } style={{ width: '100%' }}>
                    { children }
                </Space>
            }
        </div>
    )
});
