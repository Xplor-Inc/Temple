export class API_END_POINTS  {
    static readonly LOGIN               = '/api/1.0/account/authenticate'
    static readonly LOGOUT              = '/api/1.0/account/logout'
    static readonly CHANGE_PASSWORD     = "/api/1.0/account/changepassword"
    static readonly FORGET_PASSWORD     = "/api/1.0/accountrecovery/forgetpassword"
    static readonly RESET_PASSWORD      = "/api/1.0/accountrecovery/resetpassword"
    static readonly USERS               = "/api/1.0/users"
    static readonly USER_PROFILE        = "/api/1.0/users/profile"
    static readonly PROFILE_IMAGE       = "/dynamic/images/profile"
    static readonly ACCOUNTACTIVATION   = '/api/1.0/accountrecovery/accountactivation'
    static readonly RECEIPTBOOK         = "/api/1.0/receiptbooks"
    static readonly RECEIPTBOOK_ISSUE   = "/api/1.0/receiptbooks/issue"
    static readonly RECEIPTBOOK_RECEIVE = "/api/1.0/receiptbooks/receive"

}