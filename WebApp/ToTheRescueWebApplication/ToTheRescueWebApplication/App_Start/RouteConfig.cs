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

            //I need the extra / so I don't get routing information confused
            //when the user's email gets passed into the {email} parameter as
            //the last thing in the route
            routes.MapRoute(
                name: "DeleteProfileRoute",
                url: "profile/delete/{email}/",
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
