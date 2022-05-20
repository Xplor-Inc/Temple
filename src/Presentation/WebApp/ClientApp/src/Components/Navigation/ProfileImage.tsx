import { useAppSelector } from '../../ReduxStore/hooks';

export const ProfileImage = () => {
    const profile = useAppSelector(state => state.user);
    return (
        <img alt={profile.name} style={{ borderRadius: "50%", width: "21px" }} src="/images/hs.jpeg" title={profile.name} />
    )
}