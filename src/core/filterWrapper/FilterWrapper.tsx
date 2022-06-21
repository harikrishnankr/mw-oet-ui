import { Button, Drawer, Input, Radio, Select, Space, Tooltip } from "antd";
import DatePicker, { RangePickerProps } from "antd/lib/date-picker";
import React, { ChangeEventHandler, SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { isTabletDevice } from "../utils";
import FilterIcon from "../../assets/images/filter.png";
import InfoCircle from "../../assets/images/info-circle.svg";
import "./FilterWrapper.scss";

const { Option } = Select;

export enum FilterType {
    RadioGroup = 1,
    DatePicker,
    Input,
    Select
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
    label?: string;
    options?: { label: string; value: string|number; }[]
}

export const Filter = React.memo(function Filter(props: IFilterOptions) {
    const isTablet: boolean = isTabletDevice();
    const {
        type, radioOptions, onChange, value, placeholder, name, format, disabledDate, label, options
    } = props;
    const [remoteInputValue, setRemoteInputValue] = useState(value||"");

    useEffect(() => {
        if (type === FilterType.Input && value) {
            setRemoteInputValue(value||"");
        }
    }, [value]);

    const datePickerChange = (value: any) => {
        onChange && onChange({ target: { name, value} });
    };

    const onRemoteInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        type === FilterType.Select ? (onChange && onChange({ target: { name, value: e} })) : setRemoteInputValue(e?.target?.value)
    }, []);

    const getFilter = () => {
        switch(type) {
            case FilterType.RadioGroup:
                return (
                    <div className="Filter__field">
                        <label>{label}</label>
                        <Radio.Group options={ radioOptions||[] } onChange={onChange}
                            value={value} optionType={ isTablet ? "default" : "button" }
                            name={name}
                        />
                    </div>
                );
            case FilterType.DatePicker:
                return (
                    <div className="Filter__field">
                        <label>{label}</label>
                        <DatePicker placeholder={placeholder} name={name} format={format}
                            onChange={datePickerChange} value={value||null}
                            disabledDate={disabledDate} inputReadOnly
                        />
                    </div>
                );
            case FilterType.Input:
                return (
                    <div className="Filter__field">
                        <label>{label}</label>
                        <Input placeholder={placeholder} name={name} value={remoteInputValue}
                            onChange={onRemoteInputChange} onPressEnter={onChange} allowClear suffix={
                                <Tooltip title="Press Enter to Search">
                                    <img src={InfoCircle} alt="Info Circle"/>
                                </Tooltip>
                            }/>
                    </div>
                )
            case FilterType.Select:
                return (
                    <div className="Filter__field">
                        <label>{label}</label>
                        <Select value={value} style={{ minWidth: '150px' }} onChange={onRemoteInputChange} placeholder={placeholder}>
                            { options?.map((o, i) => <Option value={o.value} key={"_select_"+i} >{o.label}</Option>) }
                        </Select>
                    </div>
                )
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
