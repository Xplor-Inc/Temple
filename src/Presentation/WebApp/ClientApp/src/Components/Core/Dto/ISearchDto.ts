export class ISearch{
    fromDate?: Date  | null
    toDate?: Date  | null
    sortOrder?: string = "ASC"
    sortBy: string = "Name"
    skip: number = 0
    take: number = 20
    searchText?: string = ''
    userRole?: number
    includeDeleted?: boolean = false}