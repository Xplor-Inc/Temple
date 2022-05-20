import Gender from "../../Constants/Enums/Gender";
import Role from "../../Constants/Enums/Role";
import AuditableDto  from "../AuditableDto";

export interface IUserDto extends AuditableDto {
    address?: string
    contactNo?: string
    emailId?: string;
    gotra?: string
    name?: string;
    gender?: Gender
    role?: Role
    isActive?: boolean
    imagePath?: string
    lastLoginDate?: Date | null;
    village?: string;
}