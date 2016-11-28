using System.Web.Mvc;
using Microsoft.Practices.Unity;
using Unity.Mvc5;
using System.Data.Entity;
using Microsoft.AspNet.Identity;
using ToTheRescueWebApplication.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using ToTheRescueWebApplication.Controllers;

namespace ToTheRescueWebApplication
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            
            // register all your components with the container here
            // it is NOT necessary to register your controllers
            
            // e.g. container.RegisterType<ITestService, TestService>();
            
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));

            //container.RegisterType<IDataEntityRepository<Profile>, ProfileDBRepository>();
            container.RegisterType<DbContext, ApplicationDbContext>(new HierarchicalLifetimeManager());
            container.RegisterType<UserManager<ApplicationUser>>(new HierarchicalLifetimeManager());
            container.RegisterType<IUserStore<ApplicationUser>, UserStore<ApplicationUser>>(new HierarchicalLifetimeManager());
            container.RegisterType<IRoleStore<ApplicationRole, string>, RoleStore<ApplicationRole>>(new HierarchicalLifetimeManager());
            container.RegisterType<LoginController>(new InjectionConstructor());
        }
    }
}