import { memo, useState } from "react";
import { toast } from "react-toastify";
import { ToastError } from "../../../Page/ToastError";
import { Service } from "../../../Service";
import { API_END_POINTS } from "../../Constants/EndPoints";
import { IResult } from "../../Dto/IResultObject";
import { IUserDto } from "../../Dto/Users";

interface IIssueReceiptBookProps {
    users: IUserDto[],
    issueTo?: string
}

const IssueReceiptBook = ({ issueTo, users }: IIssueReceiptBookProps) => {
    const [issueBook, setIssueBook] = useState({ issuedTo: issueTo, from: 0, to: 0 })
    const submit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        var errors = [];
        if (issueBook.issuedTo === '-1')
            errors.push('Select a user to issue book')
        if (issueBook.from < 1)
            errors.push('Enter from receipt book number')
        if (issueBook.to < issueBook.from)
            errors.push("Enter valid 'Till Receipt No' book number")

        if (errors.length > 0) {
            toast.error(<ToastError errors={errors} />)
            return;
        }
        var formData = {
            issuedTo: issueBook.issuedTo,
            from: issueBook.from,
            to: issueBook.to
        }
        var issueBookResponse = await Service.Post<IResult<boolean>>(API_END_POINTS.RECEIPTBOOK_ISSUE, formData);
        if (issueBookResponse.hasErrors) {
            toast.error(<ToastError errors={issueBookResponse.errors} />)
            return;
        }
        toast.success('Book issued successfuly');
    }
    return (
        <form method="post" onSubmit={submit}>
            <div className="row">
                {!issueTo &&
                    <div className="col-md-3">
                        <span>Vollunter</span>
                        <select className="form-control" value={issueBook.issuedTo}
                            onChange={(e) => { setIssueBook({ ...issueBook, issuedTo: e.target.value }) }} >
                            <option value="0"> Select Vollunter </option>
                            {users.map(user => {
                                return <option key={user.uniqueId} value={user.uniqueId}>{user.name}</option>
                            })}
                        </select>
                    </div>}
                <div className="col-md-3">
                    <span>From Receipt No</span>
                    <input type="number" placeholder="Email Address" className="form-control"
                        value={issueBook.from}
                        onChange={(e) => { setIssueBook({ ...issueBook, from: e.target.valueAsNumber }) }} />
                </div>
                <div className="col-md-3">
                    <span>Till Receipt No</span>
                    <input type="number" placeholder="Email Address" className="form-control"
                        value={issueBook.to}
                        onChange={(e) => { setIssueBook({ ...issueBook, to: e.target.valueAsNumber }) }} />
                </div>
                <div className="col-md-3 btn-single">
                    <button type="submit" className="text-white btn btn-info" onClick={submit}> Issue</button>

                </div>
            </div>
        </form>
    )
}

export default memo(IssueReceiptBook)