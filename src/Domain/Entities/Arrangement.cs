namespace Enflorarte.CRM.Domain.Entities;

public class Arrangement : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public bool IsTemplate { get; set; } = true;
    public string[] Tags { get; set; } = Array.Empty<string>();
    public string[] Extras { get; set; } = Array.Empty<string>();
    public string ReferenceImage { get; set; } = string.Empty;
    public bool IsAvailable { get; set; } = true;

    public virtual ICollection<WrapperVariant> WrapperVariants { get; set; } = new List<WrapperVariant>();
    public virtual ICollection<FlowerVariant> FlowerVariants { get; set; } = new List<FlowerVariant>();
    public virtual ICollection<ArrangementType> ArrangementTypes { get; set; } = new List<ArrangementType>();

}
