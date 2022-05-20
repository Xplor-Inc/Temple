namespace Temple.WebApp.Models.Dtos.Users;
public class UserDto : AuditableDto
{
    #region Properties
    public string      Address     { get; set; } = string.Empty;
    public string      ContactNo   { get; set; } = string.Empty;
    public string      EmailId     { get; set; } = string.Empty;
    public string      Gotra       { get; set; } = string.Empty;
    public bool        IsActive    { get; set; }
    public string      Name        { get; set; } = string.Empty;
    public Gender      Gender      { get; set; }
    public UserRole    Role        { get; set; }
    public string      Village     { get; set; } = string.Empty;
    public string      ImagePath   { get; set; } = string.Empty;
    public DateTimeOffset?  LastLoginDate           { get; set; }

    #endregion Properties
}
