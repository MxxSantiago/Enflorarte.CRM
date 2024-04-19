namespace Enflorarte.CRM.Domain.Entities;

public class FlowerVariant : LookupEntity
{
    public int FlowerId { get; set; }
    public virtual Flower? Flower { get; set; } = null!;
}
