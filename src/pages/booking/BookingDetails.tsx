import { Drawer } from "antd";
import moment from "moment";
import { DATE_FORMAT } from "../../core/constants/common";
import { getBaseDocumentEndPoint, isMobileDevice } from "../../core/utils";

interface IBookingDetails {
    details: any;
    courses: any[];
    isOpen: boolean;
    handleCancel?: (t?: any) => void;
}

export function BookingDetails({ details, courses, isOpen, handleCancel }: IBookingDetails) {
    const width = !isMobileDevice() ? 750 : window.innerWidth;
    const courseName = courses?.find(c => c.id === details?.courseType)?.name;
    const reArrange = details?.questions?.filter((q: any) => q.type === "rearrange") || [];
    const fillInTheBlanks = details?.questions?.filter((q: any) => q.type === "fillInTheBlanks") || [];
    const translate = details?.questions?.filter((q: any) => q.type === "translate") || [];
    const findMistake = details?.questions?.filter((q: any) => q.type === "findMistake") || [];

    return (
        <Drawer
            title={`${details?.fullName} - (${courseName})`}
            placement="right"
            width={width}
            visible={isOpen}
            getContainer={false}
            onClose={handleCancel}
        >
           <div className="container">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="mb-2 font-weight-bold">Full Name</div>
                        <div style={{ borderBottom: "1px dotted #555"}}>{details?.fullName}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="mb-2 font-weight-bold">Email</div>
                        <div style={{ borderBottom: "1px dotted #555"}}>{details?.email}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="mb-2 font-weight-bold">Phone Number</div>
                        <div style={{ borderBottom: "1px dotted #555"}}>{details?.phone}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="mb-2 font-weight-bold">Gender</div>
                        <div style={{ borderBottom: "1px dotted #555"}}>{details?.gender}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="mb-2 font-weight-bold">Date of Birth</div>
                        <div style={{ borderBottom: "1px dotted #555"}}>{moment(details?.dob).format(DATE_FORMAT)}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="mb-2 font-weight-bold">Hometown Address</div>
                        <div style={{ borderBottom: "1px dotted #555"}}>{details?.address}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="mb-2 font-weight-bold">Pincode</div>
                        <div style={{ borderBottom: "1px dotted #555"}}>{details?.pinCode}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="mb-2 font-weight-bold">Current Status</div>
                        <div style={{ borderBottom: "1px dotted #555"}}>{details?.currentStatus}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="mb-2 font-weight-bold">Job</div>
                        <div style={{ borderBottom: "1px dotted #555"}}>{details?.job || "-"}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="mb-2 font-weight-bold">Purpose of writing OET:</div>
                        <div style={{ borderBottom: "1px dotted #555"}}>{details?.purpose}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="mb-2 font-weight-bold">Which internet connection are you using</div>
                        <div style={{ borderBottom: "1px dotted #555"}}>{details?.internetConnection}</div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="mb-2 font-weight-bold">Rating</div>
                        <div style={{ borderBottom: "1px dotted #555"}}>{details?.englishRating}</div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <h6>
                            Please answer these questions without referring to the internet or asking anyone.
                            This part is very important for us to understand your level of English.
                        </h6>
                    </div>
                    <p className="ml-3 mb-2">Rearrange the words into a meaningful sentence.</p>
                    {
                        reArrange.map((q: any, idx: number) => (
                            <div className="col-md-12 mb-3" key={idx+1+"__reArrange"}>
                                <div className="mb-2 font-weight-bold">{idx+1}.{q?.question}</div>
                                <div style={{ borderBottom: "1px dotted #555"}}>{q?.answer}</div>
                            </div>
                        ))
                    }
                    <p className="ml-3 mb-2">Fill in the blanks.</p>
                    {
                        fillInTheBlanks.map((q: any, idx: number) => (
                            <div className="col-md-12 mb-3" key={idx+1+"__fillInTheBlanks"}>
                                <div className="mb-2 font-weight-bold">{idx+1}.{q?.question}</div>
                                <div style={{ borderBottom: "1px dotted #555"}}>{q?.answer}</div>
                            </div>
                        ))
                    }
                    <p className="ml-3 mb-2">Translate the given sentences into English.</p>
                    {
                        translate.map((q: any, idx: number) => (
                            <div className="col-md-12 mb-3" key={idx+1+"__translate"}>
                                <div className="mb-2 font-weight-bold">{idx+1}.{q?.question}</div>
                                <div style={{ borderBottom: "1px dotted #555"}}>{q?.answer}</div>
                            </div>
                        ))
                    }
                    <p className="ml-3 mb-2">Find the mistake in the sentence.</p>
                    {
                        findMistake.map((q: any, idx: number) => (
                            <div className="col-md-12 mb-3" key={idx+1+"__findMistake"}>
                                <div className="mb-2 font-weight-bold">{idx+1}.{q?.question}</div>
                                <div style={{ borderBottom: "1px dotted #555"}}>{q?.answer}</div>
                            </div>
                        ))
                    }
                    <div className="col-md-12 mb-3">
                        <div className="mb-2 font-weight-bold">Id Proof</div>
                        <div style={{ borderBottom: "1px dotted #555"}}>
                            <a href={getBaseDocumentEndPoint()+details?.idProof} target="_blank">{details?.idProof}</a>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    );
}
