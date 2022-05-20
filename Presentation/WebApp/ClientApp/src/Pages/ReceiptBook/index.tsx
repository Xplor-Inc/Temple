import { Component, memo, useEffect, useState } from "react"
import { FaBook, FaEdit, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { API_END_POINTS } from "../../Components/Core/Constants/EndPoints";
import { IResult } from "../../Components/Core/Dto/IResultObject";
import { IUserDto } from "../../Components/Core/Dto/Users";
import { Service } from "../../Components/Service";
import { Utility } from "../../Components/Service/Utility";
import PageTitle from "../../Components/Navigation/PageTitle";
import { ToastError } from "../../Components/Page/ToastError";
import { Loader } from "../../Components/Page/Loader";
import { Paging } from "../../Components/Page/Paging";
import { SymenticBox } from "../../Components/Page/SymenticBox";
import IUserState from "../../Components/Core/States/IUserState";
import Gender from "../../Components/Core/Constants/Enums/Gender";
import Role from "../../Components/Core/Constants/Enums/Role";
import { PAGESIZE } from "../../Components/Core/Constants/ConfigurationData";
import { debug } from "console";
import IssueReceiptBook from "../../Components/Core/Services/ReceiptBooks/IssueReceiptBook";
import PopupWindow from "../../Components/Page/PopupWindow";
import IReceiptBook from "../../Components/Core/Dto/ReceiptBooks/IReceiptBook";
import IReceiptBookState from "../../Components/Core/States/IReceiptBookState";
import ReceiptBookList from "./ReceiptBookList";
import { useAppSelector } from "../../ReduxStore/hooks";

const ReceiptBook = () => {
    const [receiptBooks, setReceiptBook] = useState<IReceiptBookState>({ isLoading: true })
    const { role, currentUserId } = useAppSelector((state) => state.user)
    const getBookList = () => {
        Service.Get<IResult<IReceiptBook[]>>(`${API_END_POINTS.RECEIPTBOOK}`).then(response => {
            if (response.hasErrors) {
                toast.error(<ToastError errors={response.errors} />)
                return;
            }
            setReceiptBook({ ...receiptBooks, books: response.resultObject, isLoading: false })
        })
    }

    useEffect(() => {
        if (receiptBooks && receiptBooks.books && receiptBooks.books.length > 0)
            return;
        window.addEventListener(
            "message",
            (ev: MessageEvent<{ type: string; message: string }>) => {
                if (typeof ev.data !== "object") return;
                if (!ev.data.type) return;
                if (ev.data.type !== "refresh-bookList") return;
                getBookList();
            }
        );
        getBookList()
    }, [receiptBooks.books])
    
   
    return (
        <>
            {receiptBooks.isLoading && <Loader />}
            <PageTitle title="Manage Receipt Books" />
            <SymenticBox title="Manage Receipt Books">
                {receiptBooks.books && <ReceiptBookList books={receiptBooks.books}
                     />}
            </SymenticBox>
        </>
    )
}

export default (ReceiptBook)