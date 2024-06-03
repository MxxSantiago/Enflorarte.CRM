using Microsoft.AspNetCore.Identity;

namespace Enflorarte.CRM.Infrastructure.Identity;

public class ApplicationUser : IdentityUser
{
    public static ApplicationUser Create(string email, string userName)
    {
        return new ApplicationUser
        {
            Email = email,
            UserName = userName
        };
    }
}
