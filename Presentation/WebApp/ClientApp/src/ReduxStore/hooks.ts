import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import Role from '../Components/Core/Constants/Enums/Role'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export interface UserState {
    name: string
    image: string,
    isLoggedIn: boolean,
    role: Role,
    currentUserId:string
}
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector