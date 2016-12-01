using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ToTheRescueWebApplication
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "DeleteProfileRoute",
                url: "profile/delete/{email}/{profileIndex}",
                defaults: new { controller = "Profile", action = "ClickedDelete"}
            );

            routes.MapRoute(
                name: "CreateProfileRoute",
                url: "createNewProfile/{profileName}/{avatarIndex}",
                defaults: new { controller = "Profile", action = "CreateNewProfile"}
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Login", action = "Login", id = UrlParameter.Optional }
            );
        }
    }
}
