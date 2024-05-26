using Enflorarte.CRM.Application.Common.Interfaces;
using Enflorarte.CRM.Domain.Constants;
using Enflorarte.CRM.Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Enflorarte.CRM.Web.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class AuthController(
        IUser userInSession, 
        UserManager<ApplicationUser> userManager, 
        RoleManager<IdentityRole> roleManager
    ) : ControllerBase
{
    public record UserDto(
        string Id,
        string UserName,
        string Email,
        List<string> Roles
    );
    
    public record RegisterCommand(
        string Email,
        string UserName,
        string Password,
        List<string> Roles
    );

    public record RemoveRoleToUserCommand(string Id, string Role);
    public record AddRoleToUserCommand(string Id, string Role);

    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        string? id = userInSession.Id;
        
        if (id is null)
        {
            return BadRequest("No hay usuario en sesión");
        }
        
        var user = await userManager.FindByIdAsync(id);
        
        if (user is null)
        {
            return NotFound("Usuario no encontrado");
        }
        
        IList<string> roles = await userManager.GetRolesAsync(user);

        UserDto userDto = new(
            user.Id,
            user.UserName ?? "Anonymous",
            user.Email ?? "noemail@noemail.com",
            roles.ToList()
        );
        
        return Ok(userDto);
    }
    
    [HttpGet("roles")]
    [Authorize(Roles = Roles.Administrator)]
    public async Task<List<IdentityRole>> GetRoles() =>
        await roleManager.Roles.ToListAsync();
    
    [HttpGet("users")]
    [Authorize(Roles = Roles.Administrator)]
    public async Task<List<UserDto>> GetUsers()
    {
        List<ApplicationUser> users = await userManager.Users.ToListAsync();
        
        List<UserDto> usersDtos = new();
        
        foreach (ApplicationUser user in users)
        {
            IList<string> roles = await userManager.GetRolesAsync(user);
            
            usersDtos.Add(new UserDto(
                user.Id,
                user.UserName ?? "Anonymous",
                user.Email ?? "noemail@noemail.com",
                roles.ToList()
            ));
        }
        
        return usersDtos;
    }
    
    [HttpPost("createUser")]
    [Authorize(Roles = Roles.Administrator)]
    public async Task<ActionResult<UserDto>> Register(RegisterCommand request)
    {
        ApplicationUser user = await CreateUser(request);

        IdentityResult transactionResult = await userManager.CreateAsync(user, request.Password);

        if (!transactionResult.Succeeded)
        {
            return BadRequest(transactionResult.Errors);
        }
        
        var roleResult = await userManager.AddToRolesAsync(user, request.Roles);
        if (!roleResult.Succeeded)
        {
            return BadRequest(roleResult.Errors);
        }

        UserDto userDto = new(
            user.Id,
            user.UserName ?? "Anonymous",
            user.Email ?? "noemail@noemail.com",
            request.Roles
        );

        return Ok(userDto);
    }
    
    [HttpPost("removeRoleToUser")]
    [Authorize(Roles = Roles.Administrator)]
    public async Task<ActionResult> RemoveRoleToUser(RemoveRoleToUserCommand request)
    {
        IdentityRole? role = await roleManager.FindByNameAsync(request.Role);

        if (role is null)
        {
            return NotFound("Rol no encontrado");
        }

        ApplicationUser? user = await userManager.FindByIdAsync(request.Id);

        if (user is null)
        {
            return NotFound("Usuario no encontrado");
        }

        IdentityResult? result = await userManager.RemoveFromRoleAsync(user, request.Role);

        return result.Succeeded
            ? Ok()
            : BadRequest(result.Errors);
    }
    
    [HttpPost("addRoleToUser")]
    [Authorize(Roles = Roles.Administrator)]
    public async Task<ActionResult> AddRoleToUser(AddRoleToUserCommand request)
    {
        IdentityRole? role = await roleManager.FindByNameAsync(request.Role);

        if (role is null)
        {
            return NotFound("Rol no encontrado");
        }

        ApplicationUser? user = await userManager.FindByIdAsync(request.Id);

        if (user is null)
        {
            return NotFound("Usuario no encontrado");
        }

        IdentityResult? transactionResult = await userManager.AddToRoleAsync(user, request.Role);

        return transactionResult.Succeeded
            ? Ok()
            : BadRequest(transactionResult.Errors);
    }

    private async Task<ApplicationUser> CreateUser(RegisterCommand request)
    {
        await CheckDuplicateEmail(request.Email);
        await CheckDuplicateUsername(request.UserName);

        return ApplicationUser.Create(request.Email, request.UserName);
    }

    private async Task CheckDuplicateEmail(string email)
    {
        bool existsWithGivenEmail = await userManager.FindByEmailAsync(email) is not null;
        if (existsWithGivenEmail)
        {
            throw new Exception("El correo electrónico ya está en uso");
        }
    }

    private async Task CheckDuplicateUsername(string userName)
    {
        bool existsWithGivenUsername = await userManager.FindByNameAsync(userName) is not null;
        if (existsWithGivenUsername)
        {
            throw new Exception("El nombre de usuario ya está en uso");
        }
    }
}
