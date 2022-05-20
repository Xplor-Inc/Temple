import { memo, useEffect, useState } from "react"
import { FaBook } from "react-icons/fa"
import { toast } from "react-toastify"
import { API_END_POINTS } from "../../Components/Core/Constants/EndPoints"
import Role from "../../Components/Core/Constants/Enums/Role"
import { IResult } from "../../Components/Core/Dto/IResultObject"
import IReceiptBook from "../../Components/Core/Dto/ReceiptBooks/IReceiptBook"
import Donator from "../../Components/Core/Services/ReceiptBooks/Donator"
import { Loader } from "../../Components/Page/Loader"
import PopupWindow from "../../Components/Page/PopupWindow"
import { ToastError } from "../../Components/Page/ToastError"
import { Service } from "../../Components/Service"
import { Utility } from "../../Components/Service/Utility"
import { useAppSelector } from "../../ReduxStore/hooks"

interface IProps {
    books: IReceiptBook[]
}


const ReceiptBookList = ({ books}: IProps) => {
    debugger
    var temp = books;
    books[0].isLocked = false;
    const [cBook, setBook] = useState<IReceiptBook>()
    const [bookList, setBooks] = useState<IReceiptBook[]>(temp)
    const [isOpen, setIsOpen] = useState(false)
    const [receiveDate, setReceiveDate] = useState<Date | null>(new Date())
    const { role, currentUserId } = useAppSelector((state) => state.user)
    const [isLoading, setIsLoading] = useState(false);

    const closePopupAndRefresh = () => {
        setBook(undefined)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        debugger
        if (bookList) {
            bookList[index].isCollect = event.target.checked
            setBooks(bookList);
            setIsOpen(bookList.filter((book) => book.isCollect).length > 0)
            console.log('handleChange ', books)

        }
    }

    const receiveDonation = async (event: React.MouseEvent<HTMLButtonElement>) => {
        var collectionIds = [] as string[];
        bookList.filter((book) => book.isCollect).map((book) => collectionIds.push(book.uniqueId ?? ''))
        if (!receiveDate) {
            toast.error("Please select a date");
            return
        }
        var formData = {
            receiveDate: receiveDate,
            receiptIds : collectionIds
        }
        setIsLoading
        var response = await Service.Put<IResult<boolean>>(API_END_POINTS.RECEIPTBOOK_RECEIVE, formData)
        if (response.hasErrors) {
            toast.error(<ToastError errors={response.errors} />)
            setIsLoading(false);
            return;
        }
        setIsOpen(false)
        setReceiveDate(null)
        window.parent.postMessage(
            { type: "refresh-bookList" },
            "*"
        );

    }
    return (
        <>
            {isLoading && <Loader />}

            {isOpen && <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                    Total Receipts: {books?.filter((book) => book.isCollect).length}
                </div>
                <div className="col-md-4">
                    Total Amount: {Utility.Sum(books?.filter((book) => book.isCollect), 'amount')}
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-2"></div>
                <div className="col-md-4">
                    <input type="date" placeholder="Date" className="form-control"
                        value={receiveDate?.toISOString()} onChange={(e) => { setReceiveDate(e.target.valueAsDate) }} />
                </div>
                <div className="col-md-4">
                    <button type="button" className="btn btn-primary" onClick={receiveDonation}> Collect </button>
                </div>
            </div>}

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>SR #</th>
                            {role === Role.Admin && <th>Issued To</th>}
                            <th>Receipt No</th>
                            <th>Donor Name</th>
                            <th>Amount </th>
                            <th>Fathers Name </th>
                            <th>Village</th>
                            <th>Date </th>
                            <th>Address </th>
                            <th>Contact No </th>
                            <th>Last Login</th>
                            <th>Created On</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookList?.map((book, index) => {
                                return <tr key={Math.random()}>
                                    <td><span className="pe-2"> {index + 1}</span>
                                        {role === Role.Admin && !book.isLocked && book.name &&
                                            <input type="checkbox" checked={book.isCollect} onChange={(e) => handleChange(e, index)} />}
                                    </td>
                                    {role === Role.Admin && <td>{book.issuedToUser?.name}</td>}
                                    <td>{book.receiptNo}</td>
                                    <td>{book.name}</td>
                                    <td>{book.amount === 0 ? '' : book.amount}</td>
                                    <td>{book.fathersName}</td>
                                    <td>{book.village}</td>
                                    <td>{Utility.Format.DateTime_DD_MMM_YY_HH_MM_SS(book.date)}</td>
                                    <td>{book.address}</td>
                                    <td>{book.contactNo}</td>
                                    <td>{Utility.Format.DateTime_DD_MMM_YY_HH_MM_SS(book.receivedOn)}</td>
                                    <td>{Utility.Format.DateTime_DD_MMM_YY_HH_MM_SS(book.createdOn)}</td>
                                    <td>
                                        {currentUserId === book.issuedToUser?.uniqueId &&
                                            <FaBook size={'1.4rem'} className='svg-action ps-2' onClick={() => setBook(book)} />}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

                {cBook && cBook.receiptNo && cBook.receiptNo > 0 && <PopupWindow
                    heading={`Update Receipt Book: ${cBook.receiptNo}`}
                    onClose={closePopupAndRefresh}>
                    <Donator receiptId={cBook.uniqueId ?? ''}
                        onClose={closePopupAndRefresh}
                        donor={{
                            address: cBook.address,
                            amount: cBook.amount,
                            contactNo: cBook.contactNo,
                            fathersName: cBook.fathersName,
                            date: cBook.date,
                            name: cBook.name,
                            receiptNo: cBook.receiptNo,
                            remark: cBook.remark,
                            village: cBook.village
                        }} />
                </PopupWindow>}
            </div>
        </>
    )
}

export default (ReceiptBookList)