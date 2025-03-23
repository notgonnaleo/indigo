using System.ComponentModel.DataAnnotations.Schema;

namespace Indigo.Invoicing.Domain.Entities
{
    [Table("Invoice")]
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public int BankId { get; set; }
        public int BankAccountId { get; set; }
        public string? InvoiceNumber { get; set; }
        public string? Description { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }
        public float Amount { get; set; }
        public bool IsVoid { get; set; }
        public int StatusId { get; set; }
        public bool IsDeleted { get; set; }

        [ForeignKey("BankId")]
        public virtual Bank Bank { get; set; } = new Bank();

        [ForeignKey("BankAccountId")] 
        public virtual BankAccount BankAccount { get; set; } = new BankAccount();
    }
    
}
