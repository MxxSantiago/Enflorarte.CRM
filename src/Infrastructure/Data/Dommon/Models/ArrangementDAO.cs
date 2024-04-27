using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class ArrangementDAO : BaseDAO<Arrangement>, IArrangementDAO
{
    public ArrangementDAO(ApplicationDbContext context) : base(context) { }
    
    public async Task AddAsync(Arrangement entity)
    {
        var wrapperVariants = await _context.WrapperVariant.Where(w => entity.WrapperVariants.Select(e => e.Id).Contains(w.Id)).ToListAsync();
        var flowerVariants = await _context.FlowerVariant.Where(f => entity.FlowerVariants.Select(e => e.Id).Contains(f.Id)).ToListAsync();
        var arrangementTypes = await _context.ArrangementType.Where(a => entity.ArrangementTypes.Select(e => e.Id).Contains(a.Id)).ToListAsync();

        entity.WrapperVariants.Clear();
        entity.FlowerVariants.Clear();
        entity.ArrangementTypes.Clear();

        foreach (var wrapperVariant in wrapperVariants)
        {
            entity.WrapperVariants.Add(wrapperVariant);
        }

        foreach (var flowerVariant in flowerVariants)
        {
            entity.FlowerVariants.Add(flowerVariant);
        }

        foreach (var arrangementType in arrangementTypes)
        {
            entity.ArrangementTypes.Add(arrangementType);
        }

        await _context.Set<Arrangement>().AddAsync(entity);
    }
}
