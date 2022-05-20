using Temple.Core.Interfaces.Utility.Security;

namespace Temple.SqlServer;
public static class TempleExtensions
{
    public static void AddInitialData(this TempleContext context, IEncryption encryption)
    {
        context.SeedUsers(encryption);
    }

    private static void SeedUsers(this TempleContext context, IEncryption encryption)
    {
        var id = 1;
        var salt = encryption.GenerateSalt();
        var user = new User
        {
            AccountActivateDate     = DateTimeOffset.Now,
            ActivationEmailSent     = true,
            Address                 = "Gawariya",
            ContactNo               = "1234567890",
            CreatedById             = id,
            CreatedOn               = DateTimeOffset.Now,
            EmailId                 = "test@app.com",
            Gender                  = Gender.Male,
            Gotra                   = "Mintava",
            Name                    = "Admin",
            ImagePath               = "no-image.jpg",
            IsAccountActivated      = true,
            IsActive                = true,
            PasswordHash            = encryption.GenerateHash("1qazxsw2",salt),
            PasswordSalt            = salt,
            Role                    = UserRole.Admin,
            SecurityStamp           = $"{Guid.NewGuid():N}",
            UniqueId                = Guid.NewGuid(),
            Village                 = "Gawariya"
        };

        if (!context.Users.Any())
        {
            context.Users.Add(user);
            context.SaveChanges();
        }
    }
}