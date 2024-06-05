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
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        string? id = userInSession.Id;

        if (id is null)
        {
            return BadRequest("No hay usuario en sesión");
        }

        ApplicationUser? user = await userManager.FindByIdAsync(id);

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
    public async Task<List<IdentityRole>> GetRoles()
    {
        return await roleManager.Roles.ToListAsync();
    }

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
                user.Email ?? "noemail",
                roles.ToList()
            ));
        }

        return usersDtos;
    }

    [HttpPut("updateUser")]
    [Authorize(Roles = Roles.Administrator)]
    public async Task<ActionResult<UserDto>> UpdateUser(UpdateCommand request)
    {
        ApplicationUser? user = await userManager.FindByIdAsync(request.Id);
        if (user is null)
        {
            return NotFound("Usuario no encontrado");
        }

        if(request.UserName.Length < 3 || request.UserName.Length > 20)
        {
            return BadRequest("El nombre de usuario debe tener entre 3 y 20 caracteres");
        }

        if(request.Password.Length < 6)
        {
            return BadRequest("La contraseña mas de 6 caracters");
        }

        if(request.Email.Contains('@') == false)
        {
            return BadRequest("El correo electrónico no es válido");
        }

        await CheckDuplicateEmail(request.Email);
        await CheckDuplicateUsername(request.UserName);

        user.Email = request.Email;
        user.UserName = request.UserName;

        if (await userManager.CheckPasswordAsync(user, request.Password) )
        {
            user.UserName = request.UserName;
            user.PasswordHash = userManager.PasswordHasher.HashPassword(user, request.Password);
        }

        IdentityResult transactionResult = await userManager.UpdateAsync(user);
        if (!transactionResult.Succeeded)
        {
            return BadRequest(transactionResult.Errors);
        }

        IList<string> userRoles = await userManager.GetRolesAsync(user);
        foreach (var rol in userRoles)
        {
            await userManager.RemoveFromRoleAsync(user, rol);
        }

        IdentityResult roleResult = await userManager.AddToRolesAsync(user, request.Roles);
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

    [HttpDelete("deleteUser")]
    [Authorize(Roles = Roles.Administrator)]
    public async Task<ActionResult> DeleteUser(DeleteCommand request)
    {
        ApplicationUser? user = await userManager.FindByIdAsync(request.Id);

        if (user is null)
        {
            return NotFound("Usuario no encontrado");
        }

        IdentityResult transactionResult = await userManager.DeleteAsync(user);

        return transactionResult.Succeeded
            ? Ok()
            : BadRequest(transactionResult.Errors);
    }

    [HttpPost("createUser")]
    [Authorize(Roles = Roles.Administrator)]
    public async Task<ActionResult<UserDto>> Register(RegisterCommand request)
    {
        if(request.UserName.Length < 3 || request.UserName.Length > 20)
        {
            return BadRequest("El nombre de usuario debe tener entre 3 y 20 caracteres");
        }

        if(request.Password.Length < 6)
        {
            return BadRequest("La contraseña mas de 6 caracters");
        }

        if(request.Email.Contains('@') == false)
        {
            return BadRequest("El correo electrónico no es válido");
        }

        ApplicationUser user = await CreateUser(request);

        IdentityResult transactionResult = await userManager.CreateAsync(user, request.Password);

        if (!transactionResult.Succeeded)
        {
            return BadRequest(transactionResult.Errors);
        }

        IdentityResult roleResult = await userManager.AddToRolesAsync(user, request.Roles);
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

    public record UserDto(
        string Id,
        string UserName,
        string Email,
        List<string> Roles
    );

    public record DeleteCommand(string Id);

    public record UpdateCommand(
        string Id,
        string UserName,
        string Email,
        string Password,
        List<string> Roles
    );

    public record AllUserDto(
        string Id,
        string Email,
        string UserName,
        string Password,
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
}
