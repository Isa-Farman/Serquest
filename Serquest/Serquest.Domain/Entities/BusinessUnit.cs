using System;
using System.Text.Json.Serialization;

namespace Serquest.Domain.Entities;

public class BusinessUnit
{
    public int Id { get; set; }

    [JsonPropertyName("businessUnit")]
    public string BusinessUnitCode { get; set; } = string.Empty;

    public string BusinessUnitName { get; set; } = string.Empty;
    public string AddressLine1 { get; set; } = string.Empty;
    public string TelephoneNumber { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime? CreatedOn { get; set; }
    public string? Logo { get; set; }
    public string? District { get; set; }
}