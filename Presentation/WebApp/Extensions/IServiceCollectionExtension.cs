using Temple.Core.Interfaces.Data;
using Temple.Core.Models.Configuration;
using Temple.Core.Models.Entities.Users;
using Temple.Core.Models.Security;
using Temple.WebApp.Utilities;

namespace Temple.WebApp.Extensions;
public static class IServiceCollectionExtension
{
    public static void AddCookieAuthentication(this IServiceCollection services, IConfigurationRoot configuration)
    {
        services.AddSingleton((sp) => configuration.GetSection("Authentication").GetSection("Cookie").Get<CookieAuthenticationConfiguration>());

        var cookieConfig    = configuration.GetSection("Authentication:Cookie").Get<CookieAuthenticationConfiguration>();
        var cookie          = new CookieBuilder()
        {
            Name        = cookieConfig.CookieName,
            SameSite    = SameSiteMode.Strict
        };
        var cookieEvents = new CookieAuthenticationEvents
        {
            OnRedirectToAccessDenied = context =>
            {
                context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                return Task.CompletedTask;
            },
            OnValidatePrincipal = PrincipalValidator.ValidateAsync
        };

        services.AddAuthentication(cookieConfig.AuthenticationScheme)
            .AddCookie(cookieConfig.AuthenticationScheme, options =>
            {
                options.Cookie = cookie;
                options.Events = cookieEvents;
            });
    }

    public static void AddContexts(this IServiceCollection services, string connectionString)
    {
        var loggerFactory = new Serilog.Extensions.Logging.SerilogLoggerFactory(Log.Logger, false);
        services.AddDbContext<TempleContext>(ServiceLifetime.Scoped);
        services.AddScoped((sp) => new TempleContext(connectionString, loggerFactory));
        services.AddScoped<DataContext<User>>((sp) => new TempleContext(connectionString, loggerFactory));
        services.AddScoped<IDataContext<User>>((sp) => new TempleContext(connectionString, loggerFactory));
        services.AddScoped<IContext>((sp) => new TempleContext(connectionString, loggerFactory));
        services.AddScoped<ITempleContext>((sp) => new TempleContext(connectionString, loggerFactory));
    }

    public static void AddConfigurationFiles(this IServiceCollection services, IConfigurationRoot configuration)
    {
        services.AddSingleton((sp) => configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>());
        services.AddSingleton((sp) => configuration.GetSection("StaticFileConfiguration").Get<StaticFileConfiguration>());
    }
}