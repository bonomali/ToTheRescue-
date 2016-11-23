using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ToTheRescueWebApplication.Startup))]
namespace ToTheRescueWebApplication
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}