namespace Temple.WebApp.Models.Dtos.Accounts;

public class LoginDto
{
    public string       EmailAddress  { get; set; } = default!;
    public string       Password      { get; set; } = default!;
}

