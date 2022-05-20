namespace Temple.WebApp.Validations.ReceiptBooks;

public class DepositVerifierDtoValidator : AbstractValidator<DepositVerifierDto>
{
    public DepositVerifierDtoValidator()
    {
        ValidatorOptions.Global.CascadeMode = CascadeMode.Stop;

        RuleFor(m => m.ReceiptIds)
                .NotEmpty()
                .WithMessage("ReceiptId is required");

        RuleFor(m => m.ReceiveDate)
                .NotEmpty()
                .WithMessage("ReceiveDate is required")
                .LessThanOrEqualTo(DateTime.Now);
    }
}
