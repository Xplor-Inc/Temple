import { ISearch } from "../Dto/ISearchDto";
import { IPagingResult } from "../Dto/Paging";
import IReceiptBook from "../Dto/ReceiptBooks/IReceiptBook";
import { IUserDto } from "../Dto/Users";
import IBaseStateEnity from "./IBaseStateEnity";

export default interface IReceiptBookState extends IBaseStateEnity {
	paging?: IPagingResult
	search?: ISearch
	books?: IReceiptBook[] | null
}