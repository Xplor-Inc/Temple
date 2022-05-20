import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/Navigation/Layout';
import Login from './Pages/Account/Login';
import ForgetPassword from './Pages/Account/ForgetPassword';
import { ROUTE_END_POINTS } from './Components/Core/Constants/RouteEndPoints';
import PasswordRecovery from './Pages/Account/PasswordRecovery';
import ChangePassword from './Pages/Account/ChangePassword';
import Profile from './Pages/Profile';
import ReceiptBook from './Pages/ReceiptBook';
import Users from './Pages/Users';

const App = () => {

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path={ROUTE_END_POINTS.USERS} element={<Users />} />
                   <Route path={ROUTE_END_POINTS.RECEIPTBOOK} element={<ReceiptBook />} />
                    <Route path={ROUTE_END_POINTS.CHANGE_PASSWORD} element={<ChangePassword />} />
                    <Route path={ROUTE_END_POINTS.USER_PROFILE} element={<Profile />} />
                    <Route path={ROUTE_END_POINTS.LOGIN} element={<Login />} />
                    <Route path={ROUTE_END_POINTS.FORGET_PASSWORD} element={<ForgetPassword />} />
                    <Route path={`${ROUTE_END_POINTS.PASSWORD_RECOVERY}/:Id/:Guid/:EmailAddress`} element={<PasswordRecovery />} />
                    <Route path={`${ROUTE_END_POINTS.ACCOUNTACTIVATION}/:Id/:Guid/:EmailAddress`} element={<PasswordRecovery />} />

                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App;
