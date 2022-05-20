namespace Temple.WebApp.Models.Dtos.ReceiptBooks;

public class DepositVerifierDto
{
    public Guid[]           ReceiptIds  { get; set; }
    public DateTimeOffset   ReceiveDate { get; set; }
}
