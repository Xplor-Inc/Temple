namespace Temple.Core.Models.Entities.Audits;

public class Counter : Entity
{
    public string           Browser         { get; set; } = string.Empty;
    public new long?        CreatedById     { get; set; }
    public string           Device          { get; set; } = string.Empty;
    public string           IPAddress       { get; set; } = string.Empty;
    public DateTimeOffset?  LastVisit       { get; set; }
    public string           OS              { get; set; } = string.Empty;
    public string           Page            { get; set; } = string.Empty;
    public string           Search          { get; set; } = string.Empty;
    public string           ServerName      { get; set; } = string.Empty;
    public string           VisitorId       { get; set; } = string.Empty;
}

