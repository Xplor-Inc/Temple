using Temple.Core.Models.Entities.Audits;

namespace Temple.SqlServer.Maps.Audits;
public class ChangeLogMap : Map<ChangeLog>
{
    public override void Configure(EntityTypeBuilder<ChangeLog> entity)
    {
        entity
            .ToTable("ChangeLogs");
    }
}