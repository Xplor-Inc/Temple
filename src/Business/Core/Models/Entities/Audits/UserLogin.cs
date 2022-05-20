namespace Temple.Core.Models.Entities.Audits;

public class UserLogin : Entity
{
    public new long?    CreatedById        { get; set; }
    public string       Email              { get; set; } = string.Empty;
    public bool         IsLoginSuccess     { get; set; }
    public bool         IsValidUser        { get; set; }
    public long?        UserId             { get; set; }

    public virtual User? User          { get; set; } 

}