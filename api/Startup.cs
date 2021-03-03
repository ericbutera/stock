using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using Microsoft.EntityFrameworkCore;
using stocklib.Models;
using stocklib.Interfaces;

namespace api
{
    public class Startup
    {
        readonly string _developmentOrigin = "_developmentOrigin";
        readonly string _prodOrigin = "_prodOrigin";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureCors(services);
            ConfigureDI(services);

            services.AddDbContext<StocklibContext>(opt => opt.UseSqlite(Configuration.GetConnectionString("sqlite")));

            services.AddControllers();
        }

        protected void ConfigureCors(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                // development can be less restrictive
                options.AddPolicy(name: _developmentOrigin, builder =>
                {
                    builder.WithOrigins(Configuration["uiUrl"])
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
        }

        /// <summary>
        /// Configure Dependency Injection
        /// </summary>
        /// <param name="services"></param>
        protected void ConfigureDI(IServiceCollection services)
        {
            // register generic repository
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var isDevelopment = env.IsDevelopment();

            if (isDevelopment)
                app.UseDeveloperExceptionPage();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(isDevelopment ? _developmentOrigin : _prodOrigin);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
