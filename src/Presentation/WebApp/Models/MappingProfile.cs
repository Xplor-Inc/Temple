using Temple.WebApp.Models.Dtos.Users;

namespace Temple.WebApp.Models;
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User,         UserDto>()
            .ReverseMap();
        
        CreateMap<ReceiptBook,  ReceiptBookDto>()
            .ReverseMap();
    }
}
