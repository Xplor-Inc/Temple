import { ISearch } from "../Dto/ISearchDto";
import { IPagingResult } from "../Dto/Paging";
import { IUserDto } from "../Dto/Users";
import IBaseStateEnity from "./IBaseStateEnity";

export default interface IUserState extends IBaseStateEnity {
	isUpdating: boolean
	paging: IPagingResult
	search: ISearch
	users: IUserDto[]
	user?: IUserDto
	receiptBookIssueUser?: IUserDto
}