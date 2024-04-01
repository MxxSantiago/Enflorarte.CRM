using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class FlowerDAO : BaseDAO<Flower>, IFlowerDAO
{
    public FlowerDAO(ApplicationDbContext context) : base(context) { }
}
