﻿namespace Temple.WebApp.Models.Dtos.Accounts;

public class ResetPasswordWithEmail : ValidateEmailLinkDto
{
    public string Password { get; set; } = default!;
}