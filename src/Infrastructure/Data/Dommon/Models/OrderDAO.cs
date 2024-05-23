using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class OrderDAO : BaseDAO<Order>, IOrderDAO
{
    public OrderDAO(ApplicationDbContext context) : base(context) { }

    public async Task<List<Order>> GetDayOrderAsync(DateTime day)
    {
        return await _context.Order
            .Where(a => a.OrderDate.Date == day.Date)
            .ToListAsync();
    }

    public async Task<List<Order>> GetWeekOrderAsync(DateTime week)
    {
        return await _context.Order
            .Where(a => a.OrderDate.Date >= week.Date && a.OrderDate.Date <= week.Date.AddDays(7))
            .ToListAsync();
    }

    public async Task<List<Order>> GetMonthOrderAsync(DateTime month)
    {
        return await _context.Order
            .Where(a => a.OrderDate.Date >= month.Date && a.OrderDate.Date <= month.Date.AddMonths(1))
            .ToListAsync();
    }

    public async Task AddAsync(Order entity)
    {
        var arrangements = await _context.Arrangement.Where(w => entity.Arrangement.Select(e => e.Id).Contains(w.Id)).ToListAsync();
        var responsibles = await _context.Responsible.Where(f => entity.Responsible.Select(e => e.Id).Contains(f.Id)).ToListAsync();
        var communicationTypes = await _context.CommunicationType.Where(a => entity.CommunicationType.Select(e => e.Id).Contains(a.Id)).ToListAsync();
        var branches = await _context.Branch.Where(a => entity.Branch.Select(e => e.Id).Contains(a.Id)).ToListAsync();
        var deliveryTypes = await _context.DeliveryType.Where(a => entity.DeliveryType.Select(e => e.Id).Contains(a.Id)).ToListAsync();
        var tags = await _context.Tag.Where(a => entity.Tags.Select(e => e.Id).Contains(a.Id)).ToListAsync();

        entity.Arrangement.Clear();
        entity.Responsible.Clear();
        entity.CommunicationType.Clear();
        entity.Branch.Clear();
        entity.DeliveryType.Clear();
        entity.Tags.Clear();

        foreach (var arrangement in arrangements)
        {
            entity.Arrangement.Add(arrangement);
        }

        foreach (var responsible in responsibles)
        {
            entity.Responsible.Add(responsible);
        }

        foreach (var communicationType in communicationTypes)
        {
            entity.CommunicationType.Add(communicationType);
        }

        foreach (var branch in branches)
        {
            entity.Branch.Add(branch);
        }

        foreach (var deliveryType in deliveryTypes)
        {
            entity.DeliveryType.Add(deliveryType);
        }
        
        foreach (var tag in tags)
        {
            entity.Tags.Add(tag);
        }

        await _context.Set<Order>().AddAsync(entity);
    }

    public async Task UpdateAsync(Order entity)
    {
        var existingEntity = await _context.Order
            .Include(a => a.Arrangement)
            .Include(a => a.Responsible)
            .Include(a => a.CommunicationType)
            .Include(a => a.Branch)
            .Include(a => a.DeliveryType)
            .Include(a => a.Tags)
            .SingleAsync(a => a.Id == entity.Id);

        existingEntity.DeliveryDate = entity.DeliveryDate;
        existingEntity.DeliveryFrom = entity.DeliveryFrom;
        existingEntity.DeliveryUntil = entity.DeliveryUntil;
        existingEntity.OrderDate = entity.OrderDate;
        existingEntity.PaymentStatus = entity.PaymentStatus;
        existingEntity.Address = entity.Address;
        existingEntity.CommandGenerated = entity.CommandGenerated;
        existingEntity.Description = entity.Description;
        existingEntity.ReferenceImage = entity.ReferenceImage;
        existingEntity.ResultImage = entity.ResultImage;
        existingEntity.OrderPrice = entity.OrderPrice;
        existingEntity.RealizationPrice = entity.RealizationPrice;
        existingEntity.ShippingPrice = entity.ShippingPrice;
        existingEntity.MoneyPaid = entity.MoneyPaid;
        existingEntity.IsPaid = entity.IsPaid;
        existingEntity.WasDelivered = entity.WasDelivered;
        existingEntity.RecipientName = entity.RecipientName;
        existingEntity.RecipientCellphoneNumber = entity.RecipientCellphoneNumber;

        existingEntity.Arrangement.Clear();
        existingEntity.Responsible.Clear();
        existingEntity.CommunicationType.Clear();
        existingEntity.Branch.Clear();
        existingEntity.DeliveryType.Clear();
        existingEntity.Tags.Clear();

        var arrangements = await _context.Arrangement.Where(w => entity.Arrangement.Select(e => e.Id).Contains(w.Id)).ToListAsync();
        var responsibles = await _context.Responsible.Where(f => entity.Responsible.Select(e => e.Id).Contains(f.Id)).ToListAsync();
        var communicationTypes = await _context.CommunicationType.Where(a => entity.CommunicationType.Select(e => e.Id).Contains(a.Id)).ToListAsync();
        var branches = await _context.Branch.Where(a => entity.Branch.Select(e => e.Id).Contains(a.Id)).ToListAsync();
        var deliveryTypes = await _context.DeliveryType.Where(a => entity.DeliveryType.Select(e => e.Id).Contains(a.Id)).ToListAsync();
        var tags = await _context.Tag.Where(a => entity.Tags.Select(e => e.Id).Contains(a.Id)).ToListAsync();

        foreach (var arrangement in arrangements)
        {
            existingEntity.Arrangement.Add(arrangement);
        }

        foreach (var responsible in responsibles)
        {
            existingEntity.Responsible.Add(responsible);
        }

        foreach (var communicationType in communicationTypes)
        {
            existingEntity.CommunicationType.Add(communicationType);
        }

        foreach (var branch in branches)
        {
            existingEntity.Branch.Add(branch);
        }

        foreach (var deliveryType in deliveryTypes)
        {
            existingEntity.DeliveryType.Add(deliveryType);
        }
        
        foreach (var tag in tags)
        {
            existingEntity.Tags.Add(tag);
        }

        await _context.SaveChangesAsync();
    }
}
