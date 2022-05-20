namespace Temple.Core.Models.Entities.Users;
public class User : Auditable
{
    #region User Properties
    public string      Address     { get; set; } = string.Empty;
    public string      ContactNo   { get; set; } = string.Empty;
    public string      EmailId     { get; set; } = string.Empty;
    public string      Gotra       { get; set; } = string.Empty;
    public string      Name        { get; set; } = string.Empty;
    public Gender      Gender      { get; set; }
    public UserRole    Role        { get; set; }
    public string      Village     { get; set; } = string.Empty;
    public string      ImagePath   { get; set; } = string.Empty;

    #endregion End User Properties

    #region Auth Properties
    public DateTimeOffset?  AccountActivateDate     { get; set; }
    public bool             ActivationEmailSent     { get; set; }
    public bool             IsAccountActivated      { get; set; }
    public bool             IsActive                { get; set; }
    public DateTimeOffset?  LastLoginDate           { get; set; }
    public DateTimeOffset?  PasswordChangeDate      { get; set; }
    public string           PasswordHash            { get; set; } = string.Empty;
    public string           PasswordSalt            { get; set; } = string.Empty;
    public string           SecurityStamp           { get; set; } = string.Empty;

    #endregion End Auth Properties

    #region Virtual Users

    public virtual List<User>?       UsersCreatedBy          { get; set; }
    public virtual List<User>?       UsersDeletedBy          { get; set; }
    public virtual List<User>?       UsersUpdatedBy          { get; set; }
    #endregion

}