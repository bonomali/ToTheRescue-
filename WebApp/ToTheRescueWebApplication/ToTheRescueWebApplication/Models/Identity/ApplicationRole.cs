using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace ToTheRescueWebApplication.Models
{
    public class ApplicationRole : IdentityRole
    {
        public string Description { get; set; }
        public async Task<IdentityResult> GenerateRoleAsync(RoleManager<ApplicationRole> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateAsync(this);
            // Add custom user claims here
            return userIdentity;
        }
    }
}