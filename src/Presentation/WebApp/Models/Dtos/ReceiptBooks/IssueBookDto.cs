namespace Temple.WebApp.Models.Dtos.ReceiptBooks;

public class IssueBookDto
{
    public Guid IssuedTo    { get; set; }
    public int  From        { get; set; }
    public int  To          { get; set; }
}
