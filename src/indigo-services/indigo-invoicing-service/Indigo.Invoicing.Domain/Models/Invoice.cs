using Indigo.Invoicing.Domain.Entities;

namespace Indigo.Invoicing.Domain.Models
{
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public string? InvoiceNumber { get; set; }
        public string? Description { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }
        public float Amount { get; set; }
        public bool IsDeleted { get; set; }
        public Status Status { get; set; }
        public BankAccount BankAccount { get; set; } = new BankAccount();
        public Bank Bank { get; set; } = new Bank();
    }
}
