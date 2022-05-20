using Temple.Core.Constants;
using Temple.Core.Models.Entities.Users;

namespace Temple.SqlServer.Maps.Users;
public class AccountRecoveryMap : Map<AccountRecovery>
{
    public override void Configure(EntityTypeBuilder<AccountRecovery> entity)
    {
        entity
            .ToTable("AccountRecoveries");

        entity
            .Property(e => e.ResetLink)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);
    }
}