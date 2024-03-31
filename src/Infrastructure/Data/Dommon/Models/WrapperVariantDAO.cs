using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class WrapperVariantDAO : BaseDAO<WrapperVariant>, IWrapperVariantDAO
{
    public WrapperVariantDAO(ApplicationDbContext context) : base(context) { }

    public async Task<List<WrapperVariant>> GetByWrapperType(int wrapperTypeId) =>
        await _context.WrapperVariant.Where(x => x.WrapperId == wrapperTypeId).ToListAsync();
}
