namespace Temple.Core.Interfaces.Conductors.Accounts;
public interface IAccountConductor
{
    Result<bool>    ActivateAccount(string emailAddress, string link, string password);
    Result<User?>   Authenticate(string emailAddress, string password);
    Result<User?>   ChangePassword(long userId, string oldPassword, string newPassword);
    Result<User?>   CreateAccount(User user, long createdById);
    Result<User?>   IsActivationLinkValid(string emailAddress, string link);
    Result<bool>    ResetPasswordByEmailLink(string emailAddress, string link, string password);
    Result<bool>    ValidateEmailLink(string emailAddress, string link);
}