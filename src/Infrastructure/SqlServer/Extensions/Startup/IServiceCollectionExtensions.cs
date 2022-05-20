using Temple.SqlServer.Repositories;
using Temple.Core.Interfaces.Data;

namespace Temple.SqlServer.Extensions;
public static class IServiceCollectionExtensions
{
    public static IServiceCollection AddSqlRepository(this IServiceCollection services)
    {
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        return services;
    }
}