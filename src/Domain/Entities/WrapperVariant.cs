namespace Enflorarte.CRM.Domain.Entities;

public class WrapperVariant : LookupEntity
{
    public int WrapperId { get; set; }
    public virtual Wrapper? Wrapper { get; set; } = null!;
}
