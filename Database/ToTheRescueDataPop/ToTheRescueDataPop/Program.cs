using System;
using System.Collections.Generic;

namespace ToTheRescueDataPop
{   
    static class Program
    {
        [STAThread]
        static void Main()
        {
            // initialize data if no data exists
            List<int> imageIDList = ProductDB.GetImageIDList();
            List<int> dataImageIDList = ProductDB.GetDataImageIDList();
            List<int> soundIDList = ProductDB.GetSoundIDList();

            if (imageIDList.Count == 0)
            {
                // upload images
                ProductDB.WriteImage(1, "avatar1.jpg", "boyAvatar1");
                ProductDB.WriteImage(1, "avatar2.jpg", "girlAvatar1");
                ProductDB.WriteImage(1, "avatar3.jpg", "boyAvatar2");
         
                ProductDB.WriteImage(1, "avatar4.jpg", "girAvatar2");
                ProductDB.WriteImage(1, "avatar5.jpg", "boyAvatar3");
                ProductDB.WriteImage(1, "avatar6.jpg", "girlAvatar3");

                ProductDB.WriteImage(2, "animal1.jpg", "frog");
                ProductDB.WriteImage(2, "animal2.jpg", "elephant");
                ProductDB.WriteImage(2, "animal3.jpg", "dog");

                ProductDB.WriteImage(2, "animal4.jpg", "crab");
                ProductDB.WriteImage(2, "animal5.jpg", "joke");
                ProductDB.WriteImage(2, "animal6.jpg", "fish");

                ProductDB.WriteImage(2, "animal7.jpg", "cheetah");
                ProductDB.WriteImage(2, "animal8.jpg", "monkey");
                ProductDB.WriteImage(2, "animal9.jpg", "cow");

                ProductDB.WriteImage(2, "animal10.jpg", "zebra");
                ProductDB.WriteImage(2, "animal11.jpg", "rhino");
                ProductDB.WriteImage(2, "animal12.jpg", "hibbo");

                ProductDB.WriteImage(2, "animal13.jpg", "deer");
                ProductDB.WriteImage(2, "animal14.jpg", "polar_bear");
                ProductDB.WriteImage(2, "animal15.jpg", "mouse");

                ProductDB.WriteImage(2, "animal16.jpg", "badger");
                ProductDB.WriteImage(2, "animal17.jpg", "horse");
                ProductDB.WriteImage(2, "animal18.jpg", "seal");

                ProductDB.WriteImage(2, "animal19.jpg", "penguin");
                ProductDB.WriteImage(2, "animal20.jpg", "squid");

                ProductDB.WriteImage(3, "map1.jpg", "farm");
                ProductDB.WriteImage(3, "map2.jpg", "castle");
                ProductDB.WriteImage(3, "map3.jpg", "snow");

                ProductDB.WriteImage(3, "map4.jpg", "river");
                ProductDB.WriteImage(3, "map5.jpg", "beach");
                ProductDB.WriteImage(3, "map6.jpg", "desert");
                ProductDB.WriteImage(3, "map7.jpg", "pyramid");
            }

            if (dataImageIDList.Count == 0)
            {
                ProductDB.WriteMiniGameMedia(10, "circle.jpg", 0);
                ProductDB.WriteMiniGameMedia(10, "triangle.jpg", 0);
                ProductDB.WriteMiniGameMedia(10, "rectangle.jpg", 0);

                ProductDB.WriteMiniGameMedia(10, "octagon.jpg", 0);
                ProductDB.WriteMiniGameMedia(10, "rectangle.jpg", 0);
                ProductDB.WriteMiniGameMedia(10, "star.jpg", 0);

                ProductDB.WriteMiniGameMedia(10, "diamond.jpg", 0);
                ProductDB.WriteMiniGameMedia(10, "shaperecog_shapehunt.jpg", 0);
                ProductDB.WriteMiniGameMedia(10, "shush_shapehunt.mp3", 0);

                ProductDB.WriteMiniGameMedia(12, "sortingBear1.jpg", 2);
                ProductDB.WriteMiniGameMedia(12, "sortingBear2.jpg", 2);
                ProductDB.WriteMiniGameMedia(12, "sortingBear3.jpg", 2);
                ProductDB.WriteMiniGameMedia(12, "sortingBear4.jpg", 2);
                ProductDB.WriteMiniGameMedia(12, "TaDa.mp3", 0);

                ProductDB.WriteMiniGameMedia(1, "bubble.jpg", 1);
                ProductDB.WriteMiniGameMedia(1, "bubbles.jpg", 1);
                ProductDB.WriteMiniGameMedia(1, "bubblepop_underthesea.jpg", 0);
                ProductDB.WriteMiniGameMedia(1, "bubblepop.mp3", 0);
            }

            if (soundIDList.Count == 0)
            {
                // upload images
                ProductDB.WriteSound(1, "cat.mp3", "cat");
                ProductDB.WriteSound(1, "chipmunk.mp3", "chipmunk");
                ProductDB.WriteSound(1, "cow.mp3", "cow");

                ProductDB.WriteSound(1, "dog.mp3", "dog");
                ProductDB.WriteSound(1, "frog.mp3", "frog");
                ProductDB.WriteSound(1, "horse.mp3", "horse");

                ProductDB.WriteSound(1, "joke.mp3", "joke");
                ProductDB.WriteSound(1, "lion.mp3", "lion");
                ProductDB.WriteSound(1, "monkey.mp3", "monkey");
                ProductDB.WriteSound(1, "rooster.mp3", "rooster");

                ProductDB.WriteSound(2, "background1.mp3", "background1");
                ProductDB.WriteSound(2, "background2.mp3", "background2");
                ProductDB.WriteSound(2, "background3.mp3", "background3");

                ProductDB.WriteSound(2, "background4.mp3", "background4");
                ProductDB.WriteSound(2, "background5.mp3", "background5");  
            }
        }     
    }
}