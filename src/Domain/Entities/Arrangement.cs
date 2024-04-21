namespace Enflorarte.CRM.Domain.Entities;

public class Arrangement : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public bool IsTemplate { get; set; } = true;
    public string[] Tags { get; set; } = Array.Empty<string>();
    public string[] Extras { get; set; } = Array.Empty<string>();
    public string ReferenceImage { get; set; } = string.Empty;
    public bool IsAvailable { get; set; } = true;
    public int WrapperVariantId { get; set; }
    public virtual WrapperVariant? WrapperVariant { get; set; } = null!;
    public int FlowerVariantId { get; set; }
    public virtual FlowerVariant? FlowerVariant { get; set; } = null!;
    public int ArrangementTypeId { get; set; }
    public virtual ArrangementType? ArrangementType { get; set; } = null!;
}
