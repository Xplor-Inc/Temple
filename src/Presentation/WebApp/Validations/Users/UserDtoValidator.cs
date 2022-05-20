using Temple.Core.Constants;
using Temple.WebApp.Models.Dtos.Users;

namespace Temple.WebApp.Validations.Accounts;
public class UserDtoValidator : AbstractValidator<UserDto>
{
    public UserDtoValidator()
    {
        ValidatorOptions.Global.CascadeMode = CascadeMode.Stop;

        RuleFor(m => m.EmailId)
            .NotEmpty()
            .WithMessage("EmailAddress is required")
            .EmailAddress()
            .WithMessage("Invalid email address")
            .MaximumLength(StaticConfiguration.EMAIL_LENGTH)
            .WithMessage("Invalid emailAddress format");

        RuleFor(m => m.Name)
            .NotEmpty()
            .WithMessage("Name is required")
            .MaximumLength(StaticConfiguration.NAME_LENGTH)
            .WithMessage("FirstName is too long");

        RuleFor(m => m.Gender)
           .NotEmpty()
           .WithMessage("Gender is required");

        RuleFor(m => m.Role)
           .NotEmpty()
           .WithMessage("Role is required");

        RuleFor(m => m.Village)
            .NotEmpty()
            .WithMessage("Village is required")
            .MaximumLength(StaticConfiguration.NAME_LENGTH)
            .WithMessage("Village is too long");

        RuleFor(m => m.Gotra)
            .NotEmpty()
            .WithMessage("Gotra is required")
            .MaximumLength(StaticConfiguration.NAME_LENGTH)
            .WithMessage("Gotra is too long");

        RuleFor(m => m.Address)
            .NotEmpty()
            .WithMessage("Address is required")
            .MaximumLength(StaticConfiguration.COMMAN_LENGTH)
            .WithMessage("Address is too long");

        RuleFor(m => m.ContactNo)
            .NotEmpty()
            .WithMessage("ContactNo is required")
            .MaximumLength(StaticConfiguration.MOBILE_LENGTH)
            .WithMessage("ContactNo is too long");
    }
}