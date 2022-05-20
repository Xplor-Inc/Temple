using UAParser;
using Temple.Core.Interfaces.Utility;

namespace Temple.Core.Utilities;

public class UserAgentConductor : IUserAgentConductor
{
    public (string IpAddress, string OperatingSystem, string Browser, string Device) GetUserAgent(HttpContext context)
    {
        HttpRequest req = context.Request;
        string operatingSystem = string.Empty;
        string browser = string.Empty;
        string device = string.Empty;

        if (req.Headers.ContainsKey("User-Agent") && !string.IsNullOrWhiteSpace(req.Headers["User-Agent"]))
        {
            string userAgent = req.Headers["User-Agent"].ToString();

            var parsedUA    = Parser.GetDefault().Parse(userAgent);
            operatingSystem = $"{parsedUA.OS}";
            browser         = $"{parsedUA.UA}";
            device          = $"{parsedUA.Device}";
        }
        if (device == "Other" && operatingSystem.Contains("Windows")) device = "Desktop";

        string ipAddress = context.Connection.RemoteIpAddress?.ToString() ?? string.Empty;
        if (req.Headers.ContainsKey("X-Forwarded-For") && !string.IsNullOrWhiteSpace(req.Headers["X-Forwarded-For"]))
        {
            ipAddress = req.Headers["X-Forwarded-For"];
        }
        return (ipAddress, operatingSystem, browser, device);
    }
}
