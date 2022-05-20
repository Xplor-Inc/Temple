namespace Temple.SqlServer.Maps.Audits;
public class CounterMap : Map<Counter>
{
    public override void Configure(EntityTypeBuilder<Counter> entity)
    {
        entity
            .ToTable("Counters");

        entity
            .Property(e => e.Browser)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);

        entity
            .Property(e => e.Device)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);

        entity
            .Property(e => e.IPAddress)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);

        entity
            .Property(e => e.OS)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);
        
        entity
           .Property(e => e.Search)
           .IsRequired()
           .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);
        
        entity
            .Property(e => e.ServerName)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);

        entity
            .Property(e => e.Page)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);

        entity
            .Property(e => e.VisitorId)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);
    }
}