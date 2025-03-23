using System.ComponentModel.DataAnnotations.Schema;

namespace Indigo.Invoicing.Domain.Entities
{
    public class BankAccount
    {
        public int BankAccountId { get; set; }
        public int BankId { get; set; }
        public string BranchNumber { get; set; } = string.Empty;
        public string AccountNumber { get; set; } = string.Empty;
        public string AccountName { get; set; } = "Not Provided";
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        [ForeignKey("BankId")]
        public virtual Bank Bank { get; set; } = new Bank();
    }
}
