import { memo, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "../../../Page/Loader";
import { ToastError } from "../../../Page/ToastError";
import { Service } from "../../../Service";
import { Utility } from "../../../Service/Utility";
import { API_END_POINTS } from "../../Constants/EndPoints";
import { IResult } from "../../Dto/IResultObject";
import IDonatorDto from "../../Dto/ReceiptBooks/IDonatorDto";

interface IDonatorProps {
    receiptId: string,
    donor?:IDonatorDto
    onClose:()=>void
}
const Donator = ({ receiptId, donor, onClose }: IDonatorProps) => {
    const [donator, setDonator] = useState(donor);
    const [isLoading, setIsLoading] = useState(false);
    
    const submit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        var errors = [];
        if (!Utility.Validate.String(donator?.name)) {
            errors.push('Please enter name');
        }
        if (!Utility.Validate.String(donator?.fathersName)) {
            errors.push("Please enter father's name");
        }
        if (!Utility.Validate.String(donator?.village)) {
            errors.push('Please enter village');
        }
        if (!Utility.Validate.String(donator?.address)) {
            errors.push('Please enter address');
        }
        if (!Utility.Validate.String(donator?.contactNo)) {
            errors.push('Please enter contact number');
        }
        if (!donator?.amount) {
            errors.push('Please enter amount');
        }
        if (!donator?.date) {
            errors.push('Please enter date');
        }
        if (errors.length > 0) {
            toast.error(<ToastError errors={errors} />);
            return;
        }
        setIsLoading(true );
        var formData = {
            name: donator?.name,
            fathersName: donator?.fathersName,
            remark: donator?.remark,
            date: donator?.date,
            village: donator?.village,
            address: donator?.address,
            contactNo: donator?.contactNo,
            amount: donator?.amount,
            receiptNo: receiptId
        }
        var response = await Service.Put<IResult<IDonatorDto>>(`${API_END_POINTS.RECEIPTBOOK_ISSUE}/${receiptId}`, formData);

        if (response.hasErrors) {
            toast.error(<ToastError errors={response.errors} />)
            setIsLoading(false);
            return;
        }
        toast.success(`Donor ${donator?.name} updated succssfully`);
        setIsLoading(false);
        window.parent.postMessage(
            {
                type: "refresh-bookList",
            },
            "*"
        );
        onClose();
    }

    return (
        <form method="post" onSubmit={submit}>
            {isLoading && <Loader/>}
            <div className="row">
                <div className="col-md-4">
                    <span>Name</span>
                    <input type="text" placeholder="First Name" className="form-control"
                        value={donator?.name}
                        onChange={(e) => { setDonator({ ...donator, name: e.target.value } )}} />
                </div>
                <div className="col-md-4">
                    <span>Father's Name</span>
                    <input type="email" placeholder="Father's Name" className="form-control"
                        value={donator?.fathersName}
                        onChange={(e) => { setDonator({ ...donator, fathersName: e.target.value }) }} />
                </div>
                <div className="col-md-4">
                    <span>Village</span>
                    <input type="text" placeholder="Village/City name" className="form-control"
                        value={donator?.village}
                        onChange={(e) => { setDonator({ ...donator, village: e.target.value }) }} />
                </div>
                <div className="col-md-4">
                    <span>Address</span>
                    <input type="text" placeholder="Address" className="form-control"
                        value={donator?.address}
                        onChange={(e) => { setDonator({ ...donator, address: e.target.value }) }} />
                </div>
                <div className="col-md-4">
                    <span>Contact No</span>
                    <input type="text" placeholder="Contact No" className="form-control"
                        value={donator?.contactNo}
                        onChange={(e) => { setDonator({ ...donator, contactNo: e.target.value }) }} />
                </div>
                <div className="col-md-4">
                    <span>Amount</span>
                    <input type="number" placeholder="Amount" className="form-control"
                        value={donator?.amount}
                        onChange={(e) => { setDonator({ ...donator, amount: e.target.valueAsNumber }) }} />
                </div>
                <div className="col-md-4">
                    <span>Date</span>
                    <input type="date" placeholder="Date" className="form-control"
                        value={donator?.date?.toDateString()}
                        onChange={(e) => { setDonator({ ...donator, date: e.target.valueAsDate }) }} />
                </div>
                <div className="col-md-4">
                    <span>Remark</span>
                    <input type="text" placeholder="Remark" className="form-control"
                        value={donator?.remark}
                        onChange={(e) => { setDonator({ ...donator, remark: e.target.value }) }} />
                </div>
                <div className="col-md-4 text-end btn-single">
                    <button type="submit" className="text-white btn btn-info" onClick={submit}> Update</button>
                </div>
            </div>
        </form>
)
}

export default memo(Donator);