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
    
    public async Task UpdateAsync(Arrangement entity)
    {
        var existingEntity = await _context.Arrangement
            .Include(a => a.WrapperVariants)
            .Include(a => a.FlowerVariants)
            .Include(a => a.ArrangementTypes)
            .SingleAsync(a => a.Id == entity.Id);
        
        existingEntity.Name = entity.Name;
        existingEntity.IsTemplate = entity.IsTemplate;
        existingEntity.Extras = entity.Extras;
        existingEntity.ReferenceImage = entity.ReferenceImage;
        existingEntity.IsAvailable = entity.IsAvailable;

        existingEntity.WrapperVariants.Clear();
        existingEntity.FlowerVariants.Clear();
        existingEntity.ArrangementTypes.Clear();

        var wrapperVariants = await _context.WrapperVariant.Where(w => entity.WrapperVariants.Select(e => e.Id).Contains(w.Id)).ToListAsync();
        var flowerVariants = await _context.FlowerVariant.Where(f => entity.FlowerVariants.Select(e => e.Id).Contains(f.Id)).ToListAsync();
        var arrangementTypes = await _context.ArrangementType.Where(a => entity.ArrangementTypes.Select(e => e.Id).Contains(a.Id)).ToListAsync();

        foreach (var wrapperVariant in wrapperVariants)
        {
            existingEntity.WrapperVariants.Add(wrapperVariant);
        }

        foreach (var flowerVariant in flowerVariants)
        {
            existingEntity.FlowerVariants.Add(flowerVariant);
        }

        foreach (var arrangementType in arrangementTypes)
        {
            existingEntity.ArrangementTypes.Add(arrangementType);
        }

        _context.Set<Arrangement>().Update(existingEntity);
    }
}
