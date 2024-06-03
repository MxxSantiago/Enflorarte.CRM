using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Common;
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
public abstract class BaseController<TEntity, TService> : ControllerBase
    where TEntity : BaseEntity where TService : BaseService<TEntity>
{
    protected virtual string RolesForCommands => Roles.Administrator;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly TService _service;

    protected BaseController(TService service, 
        UserManager<ApplicationUser> userManager)
    {
        this._userManager = userManager;
        _service = service;
    }

    [HttpGet]
    public virtual async Task<ActionResult<IList<TEntity>>> GetAllAsync()
    {
        var entities = await _service.GetAllAsync();
        return Ok(entities);
    }

    [HttpGet("{id}")]
    public virtual async Task<ActionResult<TEntity>> GetAsync(int id)
    {
        var entity = await _service.GetAsync(id);
        if (entity == null)
        {
            return NotFound();
        }
        return Ok(entity);
    }

    [HttpPut("{id}")]
    public virtual async Task<ActionResult<TEntity>> PutAsync(int id, TEntity entity)
    {
        var authResult = await EvaluateRolesForCommands();
        
        if (!authResult)
        {
            return Unauthorized();
        }
        
        if (id != entity.Id)
        {
            return BadRequest();
        }

        try
        {
            await _service.UpdateAsync(entity);
        }
        catch (DbUpdateConcurrencyException)
        {
            var existingEntity = await _service.GetAsync(id);
            if (existingEntity == null)
            {
                return NotFound();
            }

            return Conflict("Data concurrency error. Please refresh and retry.");
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public virtual async Task<ActionResult<TEntity>> DeleteAsync(int id)
    {
        var authResult = await EvaluateRolesForCommands();
        
        if (!authResult)
        {
            return Unauthorized();
        }
        
        var entity = await _service.GetAsync(id);
        if (entity == null)
        {
            return NotFound();
        }

        await _service.DeleteAsync(id);

        return NoContent();
    }

    [HttpPost]
    public virtual async Task<ActionResult<int>> PostAsync(TEntity entity)
    {
        var authResult = await EvaluateRolesForCommands();
        
        if (!authResult)
        {
            return Unauthorized();
        }
        
        int entityId = await _service.AddAsync(entity);
        return Ok(entityId);
    }
    
    private async Task<bool> EvaluateRolesForCommands()
    {
        var roles = RolesForCommands.Split(',');
        var user = await _userManager.GetUserAsync(HttpContext.User);
        var userRoles = await _userManager.GetRolesAsync(user);
        return roles.Any(role => userRoles.Contains(role.Trim()));
    }
}
