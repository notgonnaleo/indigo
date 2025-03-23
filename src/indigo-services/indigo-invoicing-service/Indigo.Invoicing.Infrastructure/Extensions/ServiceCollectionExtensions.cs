using Indigo.Invoicing.Domain.Interfaces;
using Indigo.Invoicing.Infrastructure.Contexts;
using Indigo.Invoicing.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Indigo.Invoicing.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInvoicingDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<InvoicingDbContext>(options =>
            {
                options.UseNpgsql(
                    configuration.GetConnectionString("connection-string"),
                    npgsqlOptions => npgsqlOptions
                        .MigrationsAssembly("Indigo.Invoicing.Infrastructure")
                        .EnableRetryOnFailure(3)  // Add connection resiliency
                );
            });

            return services;
        }

        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IInvoiceRepository, InvoiceRepository>();
            return services;
        }
    }
} 