using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class FlowerVariantDAO : BaseDAO<FlowerVariant>, IFlowerVariantDAO
{
    public FlowerVariantDAO(ApplicationDbContext context) : base(context) { }

    public async Task<List<FlowerVariant>> GetByFlower(int flowerId) =>
        await _context.FlowerVariant.Where(x => x.FlowerId == flowerId).ToListAsync();
}
