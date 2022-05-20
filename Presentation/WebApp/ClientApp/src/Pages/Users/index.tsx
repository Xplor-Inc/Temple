import { Component } from "react"
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


export default class Users extends Component<{}, IUserState>{

    constructor(props: {}) {
        super(props)

        this.state = {
            isUpdating: false,
            users: [],
            isLoading: true,
            paging: {
                nextDisabled: true,
                prevDisabled: true,
                text: {
                    from: 0,
                    to: 0,
                    count: 0
                },
                prevPage: this.prevPage,
                nextPage: this.nextPage
            },
            search: {
                sortBy: "Name",
                take: PAGESIZE,
                skip: 0,
            }
        }
    }

    async componentDidMount() {

        this.getUsers(0);
    }

    getUsers = async (skip: number) => {
        var s = this.state.search;
        var q = `?skip=${skip}&take=${s.take}&sortBy=${s.sortBy}&sortOrder=${s.sortOrder}`;
        if (Utility.Validate.String(s.searchText))
            q += `&searchText=${s.searchText}`;
        if (s.includeDeleted)
            q += `&includeDeleted=${s.includeDeleted}`;

        var response = await Service.Get<IResult<IUserDto[]>>(`${API_END_POINTS.USERS}${q}`);

        if (response.hasErrors) {
            toast.error(<ToastError errors={response.errors} />)
            this.setState({ isLoading: false });
            return;
        }
        if (response.resultObject) {
            var paging = Service.ApplyPaging(this.state.search.skip, response.rowCount, this.state.search.take);
            this.setState({
                isLoading: false,
                users: response.resultObject,
                paging: {
                    ...this.state.paging,
                    text: paging.text, nextDisabled: paging.nextDisabled,
                    prevDisabled: paging.prevDisabled
                }
            });

        }
        else {
            toast.info('Currently there is no data')
            this.setState({ isLoading: false });
        }
    }

    nextPage = async () => {
        var skip = this.state.search.skip + this.state.search.take;
        this.setState({ isLoading: true, search: { ...this.state.search, skip: skip } });
        this.getUsers(skip);
    }

    prevPage = async () => {
        var skip = this.state.search.skip - this.state.search.take;
        this.setState({ isLoading: true, search: { ...this.state.search, skip: skip } });
        this.getUsers(skip);
    }

    createUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        var errors = [];
        const user = this.state.user;
        if (!Utility.Validate.String(user?.name)) {
            errors.push('Please enter name');
        }
        if (!Utility.Validate.String(user?.emailId)) {
            errors.push('Please enter email address');
        }
        if (!user?.gender || user.gender.toString() === '0') {
            errors.push('Please select valid gender');
        }
        if (!user?.role || user.role.toString() === '0') {
            errors.push('Please select valid role');
        }
        if (!Utility.Validate.String(user?.village)) {
            errors.push('Please enter village');
        }
        if (!Utility.Validate.String(user?.gotra)) {
            errors.push('Please enter gotra');
        }
        if (!Utility.Validate.String(user?.address)) {
            errors.push('Please enter address');
        }
        if (!Utility.Validate.String(user?.contactNo)) {
            errors.push('Please enter contact number');
        }
        if (errors.length > 0) {
            toast.error(<ToastError errors={errors} />);
            return;
        }
        this.setState({ isLoading: true });
        var formData = {
            name: user?.name,
            emailId: user?.emailId,
            gender: user?.gender,
            role: user?.role,
            village: user?.village,
            gotra: user?.gotra,
            address: user?.address,
            contactNo: user?.contactNo
        }
        var response = {} as IResult<IUserDto | null>;
        if (this.state.isUpdating) {
            response = await Service.Put<IResult<IUserDto>>(`${API_END_POINTS.USERS}/${user?.uniqueId}`, formData);
        }
        else {
            response = await Service.Post<IResult<IUserDto>>(API_END_POINTS.USERS, formData);
        }

        if (response.hasErrors) {
            toast.error(<ToastError errors={response.errors} />)
            this.setState({
                isLoading: false
            })
            return;
        }
        toast.success(`User ${user?.name} ${this.state.isUpdating ? 'updated' : 'created'} succssfully`);
        this.setState({
            isLoading: false,
            isUpdating: false,
            user: this.resetUserObject()
        })
        this.getUsers(0);
    }

    resetUserObject = () => {
        return {
            ...this.state.user,
            name: '',
            emailId: '',
            village: '',
            gotra: '',
            address: '',
            contactNo: '',
            gender: undefined,
            role: undefined,
            uniqueId: ''
        } as IUserDto
    }

    deleteUser = async (e: React.MouseEvent<HTMLAnchorElement>, user: IUserDto) => {
        e.preventDefault();
        if (window.confirm(`Are you sure to delete ${user.name} ?`)) {


            this.setState({ isLoading: true })
            var updateResponse = await Service.Delete<IResult<boolean>>(`${API_END_POINTS.USERS}/${user.uniqueId}`, {});

            this.setState({ isLoading: false })
            if (updateResponse.hasErrors) {
                toast.error(<ToastError errors={updateResponse.errors} />);
                return;
            }
            this.getUsers(this.state.search.skip);
            toast.success(`User ${user.name} updated successfully`);
        }
    }

    editUser = async (e: React.MouseEvent<HTMLAnchorElement>, user: IUserDto) => {
        e.preventDefault();
        this.setState({ isUpdating: true, user: user });
    }

    updateUser = async (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, user: IUserDto) => {
        e.preventDefault();
        if (window.confirm(`Are you sure to  ${user.isActive ? "Block" : "Unblock"} ${user.name} ?`)) {

            var formData = user;
            formData.isActive = !user.isActive;
            this.setState({ isLoading: true })
            var updateResponse = await Service.Put<IResult<boolean>>(`${API_END_POINTS.USERS}/${user.uniqueId}`, formData);
            this.setState({
                isLoading: false
            })

            if (updateResponse.hasErrors) {
                toast.error(<ToastError errors={updateResponse.errors} />);
                return;
            }
            this.getUsers(this.state.search.skip);
            toast.success(`User ${user.name} ${user.isActive ? "Blocked" : "Unblocked"} successfully`);
        }
    }

    render() {
        const { isLoading, users, user, isUpdating, receiptBookIssueUser } = this.state
        return (
            <>
                {isLoading && <Loader />}
                <PageTitle title='Manage Users' />
                
                {receiptBookIssueUser && <PopupWindow heading={`Issue receipt book to ${receiptBookIssueUser.name}`} onClose={() => { this.setState({receiptBookIssueUser:undefined})}}>
                    <IssueReceiptBook users={users} issueTo={receiptBookIssueUser.uniqueId}/>
                </PopupWindow> }
                <SymenticBox title="Create &amp; Manage User Accounts">
                    <form method="post">
                        <div className="row">
                            <div className="col-md-3">
                                <span>Name</span>
                                <input type="text" placeholder="Name" className="form-control"
                                    value={user?.name}
                                    onChange={(e) => { this.setState({ user: { ...this.state.user, name: e.target.value } }) }} />
                            </div>
                            <div className="col-md-3">
                                <span>Email Address</span>
                                <input type="email" placeholder="Email Address" className="form-control"
                                    value={user?.emailId} disabled={isUpdating}
                                    onChange={(e) => { this.setState({ user: { ...this.state.user, emailId: e.target.value } }) }} />
                            </div>
                            <div className="col-md-3">
                                <span>Gender</span>
                                <select className="form-control" value={user?.gender}
                                    onChange={(e) => { this.setState({ user: { ...this.state.user, gender: parseInt(e.target.value) } }) }}                                >
                                    <option value="0"> Select Gender </option>
                                    <option value="1"> Male </option>
                                    <option value="2"> Female </option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <span>Role</span>
                                <select className="form-control" value={user?.role}
                                    onChange={(e) => { this.setState({ user: { ...this.state.user, role: parseInt(e.target.value) } }) }}                                >
                                    <option value="0"> Select Gender </option>
                                    <option value="1"> Admin </option>
                                    <option value="2"> Vollunter </option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <span>Village</span>
                                <input type="text" placeholder="Village/City name" className="form-control"
                                    value={user?.village}
                                    onChange={(e) => { this.setState({ user: { ...this.state.user, village: e.target.value } }) }} />
                            </div>
                            <div className="col-md-3">
                                <span>Gotra</span>
                                <input type="text" placeholder="Gotra" className="form-control"
                                    value={user?.gotra}
                                    onChange={(e) => { this.setState({ user: { ...this.state.user, gotra: e.target.value } }) }} />
                            </div>
                            <div className="col-md-3">
                                <span>Address</span>
                                <input type="text" placeholder="Address" className="form-control"
                                    value={user?.address}
                                    onChange={(e) => { this.setState({ user: { ...this.state.user, address: e.target.value } }) }} />
                            </div>
                            <div className="col-md-3">
                                <span>Contact No</span>
                                <input type="text" placeholder="Contact No" className="form-control"
                                    value={user?.contactNo}
                                    onChange={(e) => { this.setState({ user: { ...this.state.user, contactNo: e.target.value } }) }} />
                            </div>
                            <div className="col-md-12 text-end">
                                <button type="button" className={"text-white btn " + (isUpdating ? "btn-warning" : "btn-info")} onClick={(e) => this.createUser(e)}> {isUpdating ? "Update" : "Create"} User</button>
                                {isUpdating &&
                                    <button type="button" className="btn btn-danger ms-2"
                                        onClick={() => this.setState({
                                            isUpdating: false,
                                            user: this.resetUserObject()
                                        })}> Reset</button>}
                            </div>
                        </div>
                    </form>
                    <hr />
                    <div className="row">
                        {
                            users.length > 0 &&
                            <div className="text-end col-12 p-0">
                                <Paging {...this.state.paging} />
                            </div>
                        }
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>SR #</th>
                                    <th>Name</th>
                                    <th>Email Address</th>
                                    <th>Gender </th>
                                    <th>Role </th>
                                    <th>Village</th>
                                    <th>Gotra </th>
                                    <th>Address </th>
                                    <th>Contact No </th>
                                    <th>Last Login</th>
                                    <th>Created On</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => {
                                        return <tr key={user.uniqueId}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.emailId}</td>
                                            <td>{Gender[user.gender ?? 0]}</td>
                                            <td>{Role[user.role ?? 0]}</td>
                                            <td>{user.village}</td>
                                            <td>{user.gotra}</td>
                                            <td>{user.address}</td>
                                            <td>{user.contactNo}</td>
                                            <td>{Utility.Format.DateTime_DD_MMM_YY_HH_MM_SS(user.lastLoginDate)}</td>
                                            <td>{Utility.Format.DateTime_DD_MMM_YY_HH_MM_SS(user.createdOn)}</td>
                                            <td>
                                                <a href='/'
                                                    onClick={(e) => { this.updateUser(e, user) }}
                                                    title={user.isActive ? "Block User" : "Unblock User"}>
                                                    {
                                                        user.isActive ?
                                                            <FaToggleOn className='text-success' size='2rem' /> :
                                                            <FaToggleOff className='text-danger' size='2rem' />
                                                    }
                                                </a>
                                               
                                                <a href='#delete' className="text-danger ps-2" title='Delete User' onClick={(e) => this.deleteUser(e, user)}>
                                                    <FaTrash size={'1.4rem'} />
                                                </a>
                                              
                                                <a href="#edit" title='Edit' onClick={(e) => this.editUser(e, user)}
                                                    className="text-warning ps-2"                                                >
                                                    <FaEdit size={'1.4rem'} />
                                                </a>
                                                <FaBook size={'1.4rem'} className='svg-action ps-2' onClick={() => this.setState({ receiptBookIssueUser:user})}/>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </SymenticBox>
            </>
        )
    }
}