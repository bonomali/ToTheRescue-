using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Repositories;
using ToTheRescueWebApplication.Code;

namespace ToTheRescueWebApplication.Controllers
{
    public class PlayController : Controller
    {
        IDataEntityRepository<Map> map;
        IDataEntityRepository<Sounds> music;
        NodeDBRepository node;

        public PlayController()
        {
            map = new MapDBRepository();
            music = new SoundDBRepository();
            node = new NodeDBRepository();
        }
        // GET: Play
        public ActionResult Play()
        {
            Map mapImage = new Map();
            Sounds backgroundMusic = new Sounds();
            List<Nodes> nodes = new List<Nodes>();

            mapImage = map.Get(3);
            backgroundMusic = music.Get(3);
            nodes = node.GetList(3);

            return View();
        }
    }
}