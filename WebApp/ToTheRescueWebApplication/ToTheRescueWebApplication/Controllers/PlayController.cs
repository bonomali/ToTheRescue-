using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToTheRescueWebApplication.Repositories;
using ToTheRescueWebApplication.Code;
using ToTheRescueWebApplication.Models.Play;
using ToTheRescueWebApplication.Models;

namespace ToTheRescueWebApplication.Controllers
{
    public class PlayController : Controller
    {
        IDataEntityRepository<Map> _map;
        IDataEntityRepository<Sounds> _music;
        NodeDBRepository _node;
        ImageDBRepository _image;
        ProfileProgressDBRepository _progress;

        public PlayController()
        {
            _map = new MapDBRepository();
            _music = new SoundDBRepository();
            _node = new NodeDBRepository();
            _image = new ImageDBRepository();
            _progress = new ProfileProgressDBRepository();
        }
        // GET: Play
        public ActionResult Play()
        {            
            return View();
        }
        public ActionResult ShowMapImage(int mapID)
        {
            Map currentMap = _map.Get(mapID);  //get map from database
            Images image = _image.Get(currentMap.ImageID);  //get map image from database
            
            return File(image.Image, image.ImageName);
        }
        public ActionResult ShowAnimalImage(int profileID)
        {
            ProfileProgress prog = _progress.Get(profileID);  //get map from database
            Images image = _image.Get(prog.AnimalID);  //get map image from database

            return File(image.Image, image.ImageName);
        }
        public ActionResult LoadAudio(int mapID)
        {
            Map currentMap = _map.Get(mapID);  //get map from database
            Sounds audio = _music.Get(currentMap.SoundID);
            
            return base.File(audio.Sound, audio.SoundName);
        }
    }
}