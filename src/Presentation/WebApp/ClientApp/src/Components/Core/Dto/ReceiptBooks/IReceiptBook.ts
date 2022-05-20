import IAuditableDto from "../AuditableDto";
import { IUserDto } from "../Users";

export default interface IReceiptBook extends IAuditableDto {
    address?: string
    amount: number;
    contactNo?: string
    fathersName?: string
    date?: Date|null
    isLocked: boolean;
    isCollect?: boolean;
    issuedToUserId: number;
    issuedOn: Date;
    name?: string
    receiptNo?: number;
    receivedByUserId: number | null;
    receivedOn: Date | null;
    remark?: string
    village?: string
    issuedToUser: IUserDto | null;
    receivedByUser: IUserDto | null;
}