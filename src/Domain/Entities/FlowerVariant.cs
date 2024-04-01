namespace Enflorarte.CRM.Domain.Entities;

public class FlowerVariant : LookupEntity
{
    public int FlowerId { get; set; }
    public Flower Flower { get; set; } = null!;
}
