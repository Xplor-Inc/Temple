using Temple.Core.Enumerations;

namespace Temple.WebApp.Extensions.Controllers;
public class TempleClaimsPrincipal
{
    public virtual UserRole    UserRole                { get; set; }
    public virtual long        UserId                  { get; set; }
}