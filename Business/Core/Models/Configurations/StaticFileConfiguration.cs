namespace Temple.Core.Models.Configuration;
public class StaticFileConfiguration
{
    public List<string> AllowedExtention    { get; set; } = new List<string>();
    public string       ProfileImageName    { get; set; } = string.Empty;
    public int          MaxFileSize         { get; set; }
    public string       RootFolder          { get; set; } = string.Empty;
    public string       SubFolder           { get; set; } = string.Empty;
    public Invoice?     Invoice             { get; set; }
}

public class Invoice
{
    public List<string> Type { get; set; } = new List<string>();
    public string       Path { get; set; } = string.Empty;
}