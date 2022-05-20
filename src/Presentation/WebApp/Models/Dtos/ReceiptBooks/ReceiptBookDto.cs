using Temple.WebApp.Models.Dtos.Users;

namespace Temple.WebApp.Models.Dtos.ReceiptBooks;
public class ReceiptBookDto : AuditableDto
{
    public string?          Address         { get; set; }
    public int              Amount          { get; set; }
    public string?          ContactNo       { get; set; } 
    public string?          FathersName     { get; set; }
    public DateTimeOffset?  Date            { get; set; }
    public bool             IsLocked        { get; set; }
    public long             IssuedToId      { get; set; }
    public DateTimeOffset   IssuedOn        { get; set; }
    public string?          Name            { get; set; }
    public long             ReceiptNo       { get; set; }
    public long?            ReceivedById    { get; set; }
    public DateTimeOffset?  ReceivedOn      { get; set; }
    public string?          Remark          { get; set; }
    public string?          Village         { get; set; }

    #region Navigation Properties
    public virtual UserDto?    IssuedToUser    { get; set; }
    public virtual UserDto?    ReceivedByUser  { get; set; }

    #endregion
}
