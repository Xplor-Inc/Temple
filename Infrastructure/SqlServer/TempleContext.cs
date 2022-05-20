using Temple.Core.Interfaces.Data;
using Temple.SqlServer.Maps.Audits;
using Temple.SqlServer.Maps.ReceiptBooks;
using Temple.SqlServer.Maps.Users;

namespace Temple.SqlServer;
public class TempleContext : DataContext<User>, ITempleContext
{
    #region Properties
    public DbSet<AccountRecovery>   AccountRecoveries   { get; set; }
    public DbSet<Counter>           Counters            { get; set; }
    public DbSet<ReceiptBook>       ReceiptBooks        { get; set; }
    public DbSet<UserLogin>         UserLogins          { get; set; }
    #endregion

    #region Constructor
    public TempleContext(string connectionString, ILoggerFactory loggerFactory)
        : base(connectionString, loggerFactory)
    {
    }

    public TempleContext(IConnection connection, ILoggerFactory loggerFactory)
        : base(connection, loggerFactory)
    {
    }

    #endregion

    #region ITemple Implementation
    IQueryable<AccountRecovery>     ITempleContext.AccountRecoveries   => AccountRecoveries;
    IQueryable<ChangeLog>           ITempleContext.ChangeLogs          => ChangeLogs;
    IQueryable<Counter>             ITempleContext.Counters            => Counters;
    IQueryable<ReceiptBook>         ITempleContext.ReceiptBooks        => ReceiptBooks;
    IQueryable<UserLogin>           ITempleContext.UserLogins          => UserLogins;
    IQueryable<User>                ITempleContext.Users               => Users;

    #endregion

    public override void ConfigureMappings(ModelBuilder modelBuilder)
    {
        modelBuilder.AddMapping(new AccountRecoveryMap());
        modelBuilder.AddMapping(new ChangeLogMap());
        modelBuilder.AddMapping(new CounterMap());
        modelBuilder.AddMapping(new ReceiptBookMap());
        modelBuilder.AddMapping(new UserMap());
        modelBuilder.AddMapping(new UserLoginMap());

        base.ConfigureMappings(modelBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}