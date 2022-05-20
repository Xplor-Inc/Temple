import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { API_END_POINTS } from "../../Components/Core/Constants/EndPoints";
import { IResult } from "../../Components/Core/Dto/IResultObject";
import { IUserDto } from "../../Components/Core/Dto/Users";
import { Service } from "../../Components/Service";
import { Utility } from "../../Components/Service/Utility";
import PageTitle from "../../Components/Navigation/PageTitle";
import { updateProfileState } from '../../ReduxStore/userProfileSlice'
import { useAppDispatch } from "../../ReduxStore/hooks";
import { ToastError } from "../../Components/Page/ToastError";
import { Loader } from "../../Components/Page/Loader";

interface ProfileProps { isUpdating: boolean, isLoading: boolean, user?: IUserDto, image?: File }

const Profile = () => {
    const [profile, SetProfile] = useState<ProfileProps>({ isUpdating: false, isLoading: true, })

    const { isUpdating, isLoading, user } = profile;
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (user)
            return;

        Service.Get<IResult<IUserDto>>(`${API_END_POINTS.USER_PROFILE}`).then(response => {
            if (response.hasErrors) {
                toast.error(<ToastError errors={response.errors} />)
                SetProfile({ ...profile, isLoading: false })
                return;
            }
            if (response.resultObject) {
                SetProfile({ ...profile, isLoading: false, user: response.resultObject })
            }
            else {
                toast.info('Currently there is no data')
                SetProfile({ ...profile, isLoading: false })
            }
        })
    }, [user, profile])

    const updateProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { user } = profile;
        var errors = [];
        if (!Utility.Validate.String(user?.name)) {
            errors.push('Please enter name');
        }

        if (errors.length > 0) {
            toast.error(<ToastError errors={errors} />);
            return;
        }
        var formData = {
            uniqueId: user?.uniqueId,
            name: user?.name,
            emailId:user?.emailId
        };

        SetProfile({ ...profile, isLoading: true })
        var updateResponse = await Service.Put<IResult<IUserDto>>(`${API_END_POINTS.USER_PROFILE}/${user?.uniqueId}`, formData);

        if (updateResponse.hasErrors) {
            toast.error(<ToastError errors={updateResponse.errors} />);
            SetProfile({ ...profile, isLoading: false, isUpdating: false })
            return;
        }
        if (updateResponse.resultObject && updateResponse.resultObject.name) {
            dispatch(updateProfileState({ name: updateResponse.resultObject.name, image: updateResponse.resultObject.imagePath }))
            SetProfile({ ...profile, isLoading: false, isUpdating: false, user: updateResponse.resultObject })
            toast.success(`Profile updated successfully`);
        }
       
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        debugger
        if (e.currentTarget.files) {
            SetProfile({ ...profile, image: e?.currentTarget?.files[0] })
        }
    }

    const saveImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (profile.image && profile.image.size > 0) {

            const formData = new FormData();
            formData.append(
                "file",
                profile.image,
                profile.image.name
            );

            SetProfile({ ...profile, isLoading: true })
            var updateResponse = await Service.PostImage<IResult<IUserDto>>(API_END_POINTS.PROFILE_IMAGE, formData);

            if (updateResponse.hasErrors) {
                toast.error(<ToastError errors={updateResponse.errors} />);
                SetProfile({ ...profile, isLoading: false })
                return;
            }
            if (updateResponse.resultObject) {
                toast.success('Image updated successfully');
                dispatch(updateProfileState({ name: updateResponse.resultObject.name, image: updateResponse.resultObject.imagePath }))
                SetProfile({ ...profile, isLoading: false })
            }
        }
        else
            toast.error('Please select the Image');
    }

    return (
        <div className="card m-3">
            { isLoading && <Loader />  }
            <PageTitle title='Manage Users' />
            <h3 className="card-header">Create &amp; Manage User Accounts</h3>
            <div className="card-body">
                <form method="post">
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="formFile" className="form-label">Update profile image</label>
                            <input className="form-control" type="file" id="formFile" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="col-md-3" style={{ paddingTop: '30px' }}>
                            <button type="button" className="btn btn-outline-info" onClick={saveImage}> Upload</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <span>Last Name</span>
                            <input type="text" placeholder="Last Name" className="form-control"
                                disabled={!isUpdating}
                                value={user?.name}
                                onChange={(e) => { SetProfile({ ...profile, user: { ...user, name: e.target.value } }) }} />
                        </div>
                        <div className="col-md-3">
                            <span>Email Address</span>
                            <input type="text" placeholder="Email Address" className="form-control"
                                disabled={true}
                                value={user?.emailId}
                                onChange={(e) => { SetProfile({ ...profile, user: { ...user, emailId: e.target.value } }) }} />
                        </div>
                        <div className="col-md-3 button-pt">

                            {isUpdating ?
                                <button type="button" className="btn btn-outline-info" onClick={(e) => updateProfile(e)}> Update</button>
                                : <button type="button" className="btn btn-outline-danger ms-2"
                                    onClick={() => SetProfile({ ...profile, isUpdating: true })}> Edit</button>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile