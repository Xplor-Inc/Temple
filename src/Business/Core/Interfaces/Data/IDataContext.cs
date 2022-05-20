using Temple.Core.Models.Entities.Users;

namespace Temple.Core.Interfaces.Data;
public interface IDataContext<TUser> : IContext
        where TUser : User
{
    IQueryable<User>    Users   { get; }
}