namespace Temple.WebApp.Validations.ReceiptBooks;

public class DonorDtoValidator : AbstractValidator<DonorDto>
{
    public DonorDtoValidator()
    {
        ValidatorOptions.Global.CascadeMode = CascadeMode.Stop;

        RuleFor(m => m.Address)
                .NotEmpty()
                .WithMessage("ReceiptId is required")
                .MaximumLength(StaticConfiguration.COMMAN_LENGTH)
                .WithMessage("Address must be less than {MaxLength} characters");

        RuleFor(m => m.Amount)
                .NotEmpty()
                .WithMessage("Amount is required");

        RuleFor(m => m.ContactNo)
                .NotEmpty()
                .WithMessage("ContactNo is required")
                .MaximumLength(StaticConfiguration.MOBILE_LENGTH)
                .WithMessage("ContactNo must be less than {MaxLength} characters");

        RuleFor(m => m.FathersName)
                .NotEmpty()
                .WithMessage("Fathers Name is required")
                .MaximumLength(StaticConfiguration.COMMAN_LENGTH)
                .WithMessage("FathersName must be less than {MaxLength} characters");

        RuleFor(m => m.Date)
                .NotEmpty()
                .WithMessage("Date is required");

        RuleFor(m => m.Name)
                .NotEmpty()
                .WithMessage("Name is required")
                .MaximumLength(StaticConfiguration.NAME_LENGTH)
                .WithMessage("Name must be less than {MaxLength} characters");

        RuleFor(m => m.ReceiptNo)
                .NotEmpty()
                .WithMessage("ReceiptNo is required");

        RuleFor(m => m.Remark)
                .MaximumLength(StaticConfiguration.COMMAN_LENGTH)
                .WithMessage("Remark must be less than {MaxLength} characters");

        RuleFor(m => m.Village)
                .NotEmpty()
                .WithMessage("Village is required")
                .MaximumLength(StaticConfiguration.NAME_LENGTH)
                .WithMessage("Village must be less than {MaxLength} characters");
    }
}
