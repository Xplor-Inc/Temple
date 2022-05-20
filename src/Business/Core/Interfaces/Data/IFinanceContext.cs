namespace Temple.Core.Interfaces.Data;
public interface ITempleContext : IContext
{
    IQueryable<AccountRecovery> AccountRecoveries   { get; }
    IQueryable<ChangeLog>       ChangeLogs          { get; }
    IQueryable<Counter>         Counters            { get; }
    IQueryable<ReceiptBook>     ReceiptBooks        { get; }
    IQueryable<UserLogin>       UserLogins          { get; }
    IQueryable<User>            Users               { get; }
}