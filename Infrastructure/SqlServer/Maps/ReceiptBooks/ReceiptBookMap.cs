namespace Temple.SqlServer.Maps.ReceiptBooks;

public class ReceiptBookMap : Map<ReceiptBook>
{
    public override void Configure(EntityTypeBuilder<ReceiptBook> entity)
    {
        entity
            .ToTable("ReceiptBooks");

        entity
            .Property(e => e.Address)
            .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);

        entity
            .Property(e => e.ContactNo)
            .HasMaxLength(StaticConfiguration.MOBILE_LENGTH);

        entity
           .Property(e => e.FathersName)
           .HasMaxLength(StaticConfiguration.NAME_LENGTH);

        entity
           .Property(e => e.Name)
           .HasMaxLength(StaticConfiguration.NAME_LENGTH);

        entity
          .Property(e => e.ReceiptNo)
          .IsRequired();

        entity
          .Property(e => e.Remark)
          .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);

        entity
          .Property(e => e.Village)
          .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);
    }
}
