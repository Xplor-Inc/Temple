using Temple.Core.Interfaces.Emails.EmailHandler;
using Temple.Core.Interfaces.Emails.Templates;
using Temple.Emails.Email;
using Emails.Templates;
using Microsoft.Extensions.DependencyInjection;

namespace Temple.Emails.Extensions.Middleware;
public static class IServiceColletionsStartup
{
    public static void AddEmailHandler(this IServiceCollection services)
    {
        services.AddScoped<IEmailHandler,           EmailHandler>();
        services.AddScoped<IHtmlTemplate,           HtmlTemplate>();
    }
}