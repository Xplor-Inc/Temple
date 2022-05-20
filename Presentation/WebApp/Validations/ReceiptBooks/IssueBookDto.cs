namespace Temple.WebApp.Validations.ReceiptBooks;

public class IssueBookDtoValidator : AbstractValidator<IssueBookDto>
{
    public IssueBookDtoValidator()
    {
        ValidatorOptions.Global.CascadeMode = CascadeMode.Stop;

        RuleFor(m => m.IssuedTo)
                .NotEmpty()
                .WithMessage("IssuedTo is required");

        RuleFor(m => m.From)
                .NotEmpty()
                .WithMessage("From ReceiptNo is required")
                .GreaterThanOrEqualTo(1)
                .WithMessage("From ReceiptNo should be greater than 1");

        RuleFor(m => m.To)
                .NotEmpty()
                .WithMessage("To ReceiptNo is required")
                .GreaterThanOrEqualTo(m => m.From)
                .WithMessage("To ReceiptNo should be greater than From ReceiptNo");

    }
}
