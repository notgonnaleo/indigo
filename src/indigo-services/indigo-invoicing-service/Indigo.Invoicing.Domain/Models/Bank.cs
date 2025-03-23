namespace Indigo.Invoicing.Domain.Models
{
    public class Bank
    {
        public int BankId { get; set; }
        public string BankName { get; set; } = "Not Provided";
        public string BranchNumber { get; set; } = string.Empty;
        public bool IsDeleted { get; set; }
    }
}
