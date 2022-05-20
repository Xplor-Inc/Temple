using Temple.Core.Conductors;
using Temple.Core.Conductors.Users;
using Temple.Core.Interfaces.Conductor;
using Temple.Core.Interfaces.Conductors.Accounts;
using Temple.Core.Interfaces.Conductors.Budget;
using Temple.Core.Interfaces.Domain.Reports;
using Temple.Core.Interfaces.Utility;
using Temple.Core.Interfaces.Utility.Security;
using Temple.Core.Utilities;
using Temple.Core.Utilities.Security;

namespace Temple.Core.Extensions.Middleware;
public static class IServiceColletionsStartup
{
    public static void AddUtilityResolver(this IServiceCollection services)
    {
        services.AddScoped<IAccountConductor,       AccountConductor>();
        services.AddScoped<IEncryption,             Encryption>();
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddScoped<IUserAgentConductor,     UserAgentConductor>();
        
        services.AddScoped(typeof(IRepositoryConductor<>), typeof(RepositoryConductor<>));
    }
}