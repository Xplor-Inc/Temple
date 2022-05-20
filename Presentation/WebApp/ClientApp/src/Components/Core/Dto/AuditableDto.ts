export default interface IAuditableDto {
    uniqueId?: string;
    createdById?: string | null;
    createdOn?: Date | null;
    deletedById?: string | null;
    deletedOn?: Date | null;
    updatedById?: string | null;
    updatedOn?: Date | null;
}