using Indigo.Invoicing.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Indigo.Invoicing.Infrastructure.Contexts
{
    public class InvoicingDbContext : DbContext
    {
        public InvoicingDbContext(DbContextOptions<InvoicingDbContext> options) : base(options)
        {
        }

        public DbSet<Bank> Banks { get; set; }
        public DbSet<BankAccount> BankAccounts { get; set; }
        public DbSet<Invoice> Invoices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Bank configuration
            modelBuilder.Entity<Bank>(entity =>
            {
                entity.HasKey(e => e.BankId);
                entity.Property(e => e.BankName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.BranchNumber).HasMaxLength(50);
                entity.HasQueryFilter(b => !b.IsDeleted);
            });

            // BankAccount configuration
            modelBuilder.Entity<BankAccount>(entity =>
            {
                entity.HasKey(e => e.BankAccountId);
                entity.Property(e => e.AccountNumber).IsRequired().HasMaxLength(50);
                entity.Property(e => e.AccountName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.BranchNumber).HasMaxLength(50);
                
                entity.HasOne(ba => ba.Bank)
                      .WithMany()
                      .HasForeignKey(ba => ba.BankId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Invoice configuration
            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.HasKey(e => e.InvoiceId);
                entity.Property(e => e.InvoiceNumber).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.Amount).HasColumnType("decimal(18,2)");
                
                entity.HasOne(i => i.Bank)
                      .WithMany()
                      .HasForeignKey(i => i.BankId)
                      .OnDelete(DeleteBehavior.Restrict);
                
                entity.HasOne(i => i.BankAccount)
                      .WithMany()
                      .HasForeignKey(i => i.BankAccountId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
