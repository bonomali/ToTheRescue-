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
                ProductDB.WriteImage(1, "avatar1.jpg");
                ProductDB.WriteImage(1, "avatar2.jpg");
                ProductDB.WriteImage(1, "avatar3.jpg");
         
                ProductDB.WriteImage(1, "avatar4.jpg");
                ProductDB.WriteImage(1, "avatar5.jpg");
                ProductDB.WriteImage(1, "avatar6.jpg");

                ProductDB.WriteImage(2, "animal1.jpg");
                ProductDB.WriteImage(2, "animal2.jpg");
                ProductDB.WriteImage(2, "animal3.jpg");

                ProductDB.WriteImage(2, "animal4.jpg");
                ProductDB.WriteImage(2, "animal5.jpg");
                ProductDB.WriteImage(2, "animal6.jpg");

                ProductDB.WriteImage(2, "animal7.jpg");
                ProductDB.WriteImage(2, "animal8.jpg");
                ProductDB.WriteImage(2, "animal9.jpg");

                ProductDB.WriteImage(2, "animal10.jpg");
                ProductDB.WriteImage(2, "animal11.jpg");
                ProductDB.WriteImage(2, "animal12.jpg");

                ProductDB.WriteImage(2, "animal13.jpg");
                ProductDB.WriteImage(2, "animal14.jpg");
                ProductDB.WriteImage(2, "animal15.jpg");

                ProductDB.WriteImage(2, "animal16.jpg");
                ProductDB.WriteImage(2, "animal17.jpg");
                ProductDB.WriteImage(2, "animal18.jpg");

                ProductDB.WriteImage(2, "animal19.jpg");
                ProductDB.WriteImage(2, "animal20.jpg");

                ProductDB.WriteImage(3, "map1.jpg");
                ProductDB.WriteImage(3, "map2.jpg");
                ProductDB.WriteImage(3, "map3.jpg");

                ProductDB.WriteImage(3, "map4.jpg");
                ProductDB.WriteImage(3, "map5.jpg");
                ProductDB.WriteImage(3, "map6.jpg");
                ProductDB.WriteImage(3, "map7.jpg");
            }

            if (dataImageIDList.Count == 0)
            {
                ProductDB.WriteDataImage(3, "circle.jpg", 1);
                ProductDB.WriteDataImage(3, "triangle.jpg", 1);
                ProductDB.WriteDataImage(3, "rectangle.jpg", 1);

                ProductDB.WriteDataImage(3, "octagon.jpg", 1);
                ProductDB.WriteDataImage(3, "rectangle.jpg", 1);
                ProductDB.WriteDataImage(3, "star.jpg", 1);

                ProductDB.WriteDataImage(3, "diamond.jpg", 1);
                ProductDB.WriteDataImage(4, "sortingBear1.jpg", 2);
                ProductDB.WriteDataImage(4, "sortingBear2.jpg", 2);
                ProductDB.WriteDataImage(4, "sortingBear3.jpg", 2);
                ProductDB.WriteDataImage(4, "sortingBear4.jpg", 2);
            }

            if (soundIDList.Count == 0)
            {
                // upload images
                ProductDB.WriteSound(1, "cat.mp3");
                ProductDB.WriteSound(1, "chipmunk.mp3");
                ProductDB.WriteSound(1, "cow.mp3");

                ProductDB.WriteSound(1, "dog.mp3");
                ProductDB.WriteSound(1, "frog.mp3");
                ProductDB.WriteSound(1, "horse.mp3");

                ProductDB.WriteSound(1, "joke.mp3");
                ProductDB.WriteSound(1, "lion.mp3");
                ProductDB.WriteSound(1, "monkey.mp3");
                ProductDB.WriteSound(1, "rooster.mp3");

                ProductDB.WriteSound(2, "background1.mp3");
                ProductDB.WriteSound(2, "background2.mp3");
                ProductDB.WriteSound(2, "background2.mp3");

                ProductDB.WriteSound(2, "background4.mp3");
                ProductDB.WriteSound(2, "background5.mp3");  
            }
        }     
    }
}