﻿using Temple.Core.Constants;
using Temple.WebApp.Models.Dtos.Accounts;

namespace Temple.WebApp.Validations.Accounts;

public class ResetPasswordWithEmailValidator : AbstractValidator<ResetPasswordWithEmail>
{
    public ResetPasswordWithEmailValidator()
    {
        ValidatorOptions.Global.CascadeMode = CascadeMode.Stop;

        RuleFor(m => m.EmailId)
            .NotEmpty()
            .WithMessage("EmailAddress is required")
            .EmailAddress()
            .WithMessage("Invalid email address")
            .MaximumLength(StaticConfiguration.EMAIL_LENGTH)
            .WithMessage("Invalid emailAddress format");

        RuleFor(m => m.Resetlink)
           .NotEmpty()
           .WithMessage("Resetlink is required");

        RuleFor(m => m.Password)
                .NotEmpty()
                .WithMessage("Password is required")
                .MinimumLength(StaticConfiguration.PASSWORD_MIN_LENGTH)
                .WithMessage("Invalid password format")
                .MaximumLength(StaticConfiguration.PASSWORD_MAX_LENGTH)
                .WithMessage("Invalid password format");
    }
}
