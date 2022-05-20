namespace Temple.WebApp.Models.Dtos.ReceiptBooks;

public class DonorDto
{
    public string?          Address         { get; set; }
    public int              Amount          { get; set; }
    public string?          ContactNo       { get; set; } 
    public string?          FathersName     { get; set; }
    public DateTimeOffset?  Date            { get; set; }
    public string?          Name            { get; set; }
    public Guid             ReceiptNo       { get; set; } 
    public string?          Remark          { get; set; }
    public string?          Village         { get; set; }
}
