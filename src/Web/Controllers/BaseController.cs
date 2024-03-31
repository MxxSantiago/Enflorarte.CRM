using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Enflorarte.CRM.Web.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public abstract class BaseController<TEntity, TService> : ControllerBase
    where TEntity : BaseEntity where TService : BaseService<TEntity>
{
    private readonly TService _service;

    protected BaseController(TService service)
    {
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
        var entity = await _service.GetAsync(id);
        if (entity == null)
        {
            return NotFound();
        }

        await _service.DeleteAsync(id);

        return NoContent();
    }

    [HttpPost]
    public virtual async Task<IActionResult> PostAsync(TEntity entity)
    {
        await _service.AddAsync(entity);
        return NoContent();
    }
}
