using System;
using System.Collections.Generic;
using System.IO;

namespace ToTheRescueDataPop
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            // initialize data if no data exists
            List<int> soundIDList = ProductDB.GetSoundIDList();
            List<int> imageIDList = ProductDB.GetImageIDList();

            Console.WriteLine("Uploading Images.");
            if (imageIDList.Count == 0)
            {
                // upload images
                ProductDB.WriteImage(1, "avatar1.png", "boyAvatar1");
                ProductDB.WriteImage(1, "avatar2.png", "girlAvatar1");
                ProductDB.WriteImage(1, "avatar3.png", "boyAvatar2");

                ProductDB.WriteImage(1, "avatar4.png", "girAvatar2");
                ProductDB.WriteImage(1, "avatar5.png", "boyAvatar3");
                ProductDB.WriteImage(1, "avatar6.png", "girlAvatar3");

                ProductDB.WriteImage(2, "animal1.png", "frog");
                ProductDB.WriteImage(2, "animal2.png", "elephant");
                ProductDB.WriteImage(2, "animal3.png", "dog");

                ProductDB.WriteImage(2, "animal4.png", "crab");
                ProductDB.WriteImage(2, "animal5.png", "joke");
                ProductDB.WriteImage(2, "animal6.png", "fish");

                ProductDB.WriteImage(2, "animal7.png", "cheetah");
                ProductDB.WriteImage(2, "animal8.png", "monkey");
                ProductDB.WriteImage(2, "animal9.png", "cow");

                ProductDB.WriteImage(2, "animal10.png", "zebra");
                ProductDB.WriteImage(2, "animal11.png", "rhino");
                ProductDB.WriteImage(2, "animal12.png", "hibbo");

                ProductDB.WriteImage(2, "animal13.png", "deer");
                ProductDB.WriteImage(2, "animal14.png", "polar_bear");
                ProductDB.WriteImage(2, "animal15.png", "mouse");

                ProductDB.WriteImage(2, "animal16.png", "badger");
                ProductDB.WriteImage(2, "animal17.png", "horse");
                ProductDB.WriteImage(2, "animal18.png", "seal");

                ProductDB.WriteImage(2, "animal19.png", "penguin");
                ProductDB.WriteImage(2, "animal20.png", "squid");

                ProductDB.WriteImage(3, "map1.jpg", "farm");
                ProductDB.WriteImage(3, "map2.jpg", "castle");
                ProductDB.WriteImage(3, "map3.jpg", "snow");

                ProductDB.WriteImage(3, "map4.jpg", "river");
                ProductDB.WriteImage(3, "map5.jpg", "beach");
                ProductDB.WriteImage(3, "map6.jpg", "desert");
                ProductDB.WriteImage(3, "map7.jpg", "pyramid");
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

            string path;
            //users
            Console.WriteLine("Uploading Users.");
            path = Path.Combine(Environment.CurrentDirectory, "AspNetUsers.sql");
            Console.WriteLine(path);
            ProductDB.WriteSQL(path);
            
            //profiles
            Console.WriteLine("Uploading Profiles.");
            path = Path.Combine(Environment.CurrentDirectory, "Profiles.sql");
            Console.WriteLine(path);
            ProductDB.WriteSQL(path);
            //maps
            Console.WriteLine("Uploading Maps.");
            path = Path.Combine(Environment.CurrentDirectory, "Maps.sql");
            Console.WriteLine(path);
            ProductDB.WriteSQL(path);
            //nodes
            Console.WriteLine("Uploading Nodes.");
            path = Path.Combine(Environment.CurrentDirectory, "Nodes.sql");
            Console.WriteLine(path);
            ProductDB.WriteSQL(path);
            
            //gamecategories
            //Console.WriteLine("Uploading GameCategories.");
            //path = Path.Combine(Environment.CurrentDirectory, "GameCategories.sql");
            //Console.WriteLine(path);
            //ProductDB.WriteSQL(path);
            
            //minigames
            //Console.WriteLine("Uploading Minigames.");
            //path = Path.Combine(Environment.CurrentDirectory, "Minigames.sql");
            //Console.WriteLine(path);
            //ProductDB.WriteSQL(path);
            
            string file_path = "../../MiniGames/AdditionMiniGame/javascript/";
            //Write Mini Games
            ProductDB.WriteMiniGames(2, file_path + "AdditionMiniGame.js", "AdditionMiniGame", 3, 4);
            ProductDB.WriteMiniGames(1, file_path + "bubble.js", "AlphabetBubblePop", 1, 2);
            ProductDB.WriteMiniGames(1, file_path + "alphabet_tracing.js", "AlphabetTracing", 1, 2);
            ProductDB.WriteMiniGames(1, file_path + "racing.js", "BeginningLetterSoundsRacing", 3, 4);
            ProductDB.WriteMiniGames(1, file_path + "ColorSortingGame.js", "ColorSortingGame", 1, 2);
            ProductDB.WriteMiniGames(2, file_path + "IdentifyShapeGame.js", "IdentifyShapeGame", 1, 2);
            ProductDB.WriteMiniGames(1, file_path + "mosquitoswat.js", "MosquitoSwatLetterSounds", 3, 4);
            ProductDB.WriteMiniGames(2, file_path + "Number_Comparision.js", "NumberComparison", 3, 4);
            ProductDB.WriteMiniGames(2, file_path + "number_tracing.js", "NumberTracing", 1, 2);
            ProductDB.WriteMiniGames(1, file_path + "colorbook.js", "ShapeColoringBook", 1, 2);
            ProductDB.WriteMiniGames(2, file_path + "SubtractionMiniGame.js", "SubtractionMiniGame", 3, 4);
            
            //Animals
            Console.WriteLine("Uploading Animals.");
            path = Path.Combine(Environment.CurrentDirectory, "Animals.sql");
            Console.WriteLine(path);
            ProductDB.WriteSQL(path); 
            //ProfileAnimals
            Console.WriteLine("Uploading ProfileAnimals.");
            path = Path.Combine(Environment.CurrentDirectory, "ProfileAnimals.txt");
            Console.WriteLine(path);
            ProductDB.WriteSQL(path);
            //ProfileProgress
            Console.WriteLine("Uploading ProfileProgress.");
            path = Path.Combine(Environment.CurrentDirectory, "ProfileProgress.sql");
            Console.WriteLine(path);
            ProductDB.WriteSQL(path);
            //ProfileProgressHistory
            Console.WriteLine("Uploading ProfileProgressHistory.");
            path = Path.Combine(Environment.CurrentDirectory, "ProfileProgressHistory.sql");
            Console.WriteLine(path);
            ProductDB.WriteSQL(path);
            
            Console.WriteLine("-----Done!-----");
        }
    }
}