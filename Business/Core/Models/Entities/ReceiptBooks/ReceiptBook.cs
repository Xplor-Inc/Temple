namespace Temple.Core.Models.Entities.ReceiptBooks;

public class ReceiptBook : Auditable
{
    public string?          Address         { get; set; }
    public int              Amount          { get; set; }
    public string?          ContactNo       { get; set; } 
    public string?          FathersName     { get; set; }
    public DateTimeOffset?  Date            { get; set; }
    public bool             IsLocked        { get; set; }
    public long             IssuedToUserId  { get; set; }
    public DateTimeOffset   IssuedOn        { get; set; }
    public string?          Name            { get; set; }
    public long             ReceiptNo       { get; set; }
    public long?            ReceivedByUserId{ get; set; }
    public DateTimeOffset?  ReceivedOn      { get; set; }
    public string?          Remark          { get; set; }
    public string?          Village         { get; set; }

    #region Navigation Properties
    public virtual User?    IssuedToUser    { get; set; }
    public virtual User?    ReceivedByUser  { get; set; }
    #endregion
}
