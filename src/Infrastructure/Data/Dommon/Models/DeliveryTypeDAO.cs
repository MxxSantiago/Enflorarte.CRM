using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class DeliveryTypeDAO : BaseDAO<DeliveryType>, IDeliveryTypeDAO
{
    public DeliveryTypeDAO(ApplicationDbContext context) : base(context) { }
}
