namespace Temple.SqlServer.Maps.Users;
public class UserMap : Map<User>
{
    public override void Configure(EntityTypeBuilder<User> entity)
    {
        entity
            .ToTable("Users");

        entity
            .Property(e => e.Address)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);

        entity
           .Property(e => e.ContactNo)
           .IsRequired()
           .HasMaxLength(StaticConfiguration.MOBILE_LENGTH);

        entity
           .HasIndex(e => new { e.EmailId, e.DeletedOn })
           .HasFilter("[DeletedOn] IS NULL")
           .IsUnique();

        entity
            .Property(e => e.EmailId)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.EMAIL_LENGTH);

        entity
            .Property(e => e.Gotra)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.NAME_LENGTH);

        entity
            .Property(e => e.Gender)
            .IsRequired();

        entity
            .Property(e => e.Village)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.NAME_LENGTH);

        entity
           .Property(e => e.ImagePath)
           .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);

        entity
             .Property(e => e.SecurityStamp)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);

        entity
            .Property(e => e.PasswordHash)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);

        entity
            .Property(e => e.PasswordSalt)
            .IsRequired()
            .HasMaxLength(StaticConfiguration.COMMAN_LENGTH);

        entity
            .Property(e => e.Role)
            .IsRequired();


        entity
            .HasOne(d => d.CreatedBy)
            .WithMany(p => p.UsersCreatedBy)
            .HasForeignKey(d => d.CreatedById)
            .OnDelete(DeleteBehavior.Restrict);

        entity
            .HasOne(d => d.DeletedBy)
            .WithMany(p => p.UsersDeletedBy)
            .HasForeignKey(d => d.DeletedById)
            .OnDelete(DeleteBehavior.Restrict);

        entity
            .HasOne(d => d.UpdatedBy)
            .WithMany(p => p.UsersUpdatedBy)
            .HasForeignKey(d => d.UpdatedById)
            .OnDelete(DeleteBehavior.Restrict);
    }
}