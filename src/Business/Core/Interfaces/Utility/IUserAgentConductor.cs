namespace Temple.Core.Interfaces.Utility;

public interface IUserAgentConductor
{
    (string IpAddress, string OperatingSystem, string Browser, string Device) GetUserAgent(HttpContext context);
}
