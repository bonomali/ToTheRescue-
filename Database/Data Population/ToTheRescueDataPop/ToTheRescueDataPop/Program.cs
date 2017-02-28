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
                ProductDB.WriteImage(1, "Avatars/Avatar1.png", "boyAvatar1");  //1
                ProductDB.WriteImage(1, "Avatars/Avatar2.png", "girlAvatar1"); //2
                ProductDB.WriteImage(1, "Avatars/Avatar3.png", "boyAvatar2"); //3

                ProductDB.WriteImage(1, "Avatars/Avatar4.png", "girAvatar2"); //4
                ProductDB.WriteImage(1, "Avatars/Avatar5.png", "boyAvatar3"); //5
                ProductDB.WriteImage(1, "Avatars/Avatar6.png", "girlAvatar3"); //6
                // 6 profiles

                ProductDB.WriteImage(2, "Animals/elephant.png", "elephant"); //7
                ProductDB.WriteImage(2, "Animals/giraffe.png", "giraffe"); //8
                ProductDB.WriteImage(2, "Animals/hippo.png", "hippo"); //9

                ProductDB.WriteImage(2, "Animals/monkey.png", "monkey"); //10
                ProductDB.WriteImage(2, "Animals/panda.png", "panda"); //11
                ProductDB.WriteImage(2, "Animals/parrot.png", "parrot"); //12

                ProductDB.WriteImage(2, "Animals/penguin.png", "penguin"); //13
                ProductDB.WriteImage(2, "Animals/pig.png", "pig"); //14
                ProductDB.WriteImage(2, "Animals/rabbit.png", "rabbit"); //15

                ProductDB.WriteImage(2, "ShinyAnimals/snake.png", "snake"); //16
                // 10 animals 

                ProductDB.WriteImage(2, "ShinyAnimals/elephant.png", "elephant"); //17
                ProductDB.WriteImage(2, "ShinyAnimals/giraffe.png", "giraffe"); //18
                ProductDB.WriteImage(2, "ShinyAnimals/hippo.png", "hippo"); //19
                ProductDB.WriteImage(2, "ShinyAnimals/monkey.png", "monkey"); //20
                ProductDB.WriteImage(2, "ShinyAnimals/panda.png", "panda"); //21
                ProductDB.WriteImage(2, "ShinyAnimals/parrot.png", "parrot"); //22
                ProductDB.WriteImage(2, "ShinyAnimals/penguin.png", "penguin"); //23
                ProductDB.WriteImage(2, "ShinyAnimals/pig.png", "pig"); //24
                ProductDB.WriteImage(2, "ShinyAnimals/rabbit.png", "rabbit"); //25
                ProductDB.WriteImage(2, "ShinyAnimals/snake.png", "snake"); //26
                //10 shiny animals 

                ProductDB.WriteImage(3, "Maps/Plains.jpg", "plains"); //27
                ProductDB.WriteImage(3, "Maps/Beach.jpg", "beach"); //28
                // 2 maps. 
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
            
            string file_path1 = "../../MiniGames/";
            string file_path2 = "/javascript/";

            //Write Mini Games
            ProductDB.WriteMiniGames(2, file_path1 + "AdditionMiniGame" + file_path2 + "AdditionMiniGame.js", "AdditionMiniGame", 3, 4);
            ProductDB.WriteMiniGames(1, file_path1 + "Alphabet_BubblePop" + file_path2 + "bubble.js", "AlphabetBubblePop", 1, 2);
            ProductDB.WriteMiniGames(1, file_path1 + "Alphabet_Tracing" + file_path2 + "alphabet_tracing.js", "AlphabetTracing", 1, 2);
            ProductDB.WriteMiniGames(1, file_path1 + "BeginningLetterSounds_Racing" + file_path2 + "racing.js", "BeginningLetterSoundsRacing", 3, 4);
            ProductDB.WriteMiniGames(1, file_path1 + "ColorSortingGame" + file_path2 + "ColorSortingGame.js", "ColorSortingGame", 1, 2);
            ProductDB.WriteMiniGames(2, file_path1 + "IdentifyShapeGame" + file_path2 + "IdentifyShapeGame.js", "IdentifyShapeGame", 1, 2);
            ProductDB.WriteMiniGames(1, file_path1 + "MosquitoSwat_LetterSounds" + file_path2 + "mosquitoswat.js", "MosquitoSwatLetterSounds", 3, 4);
            ProductDB.WriteMiniGames(2, file_path1 + "Number_Comparision" + file_path2 + "Number_Comparision.js", "NumberComparison", 3, 4);
            ProductDB.WriteMiniGames(2, file_path1 + "Number_ComparisonEZ" + file_path2 + "Number_ComparisionEZ.js", "NumberComparisonEZ", 2, 2);
            ProductDB.WriteMiniGames(2, file_path1 + "Number_Tracing" + file_path2 + "number_tracing.js", "NumberTracing", 1, 2);
            ProductDB.WriteMiniGames(1, file_path1 + "Shape_ColoringBook" + file_path2 + "colorbook.js", "ShapeColoringBook", 1, 2);
            ProductDB.WriteMiniGames(2, file_path1 + "SubtractionMiniGame" + file_path2 + "SubtractionMiniGame.js", "SubtractionMiniGame", 3, 4);
            ProductDB.WriteMiniGames(1, file_path1 + "Alphabet_Matching" + file_path2 + "Alphabet_Matching.js", "AlphabetMatching", 2, 3);
            ProductDB.WriteMiniGames(1, file_path1 + "Alphabet_Matching2" + file_path2 + "Alphabet_Matching2.js", "AlphabetMatching", 2, 3);
            ProductDB.WriteMiniGames(1, file_path1 + "Dino_SightWords" + file_path2 + "dino_sightwords.js", "DinoSightWords", 3, 3);
            ProductDB.WriteMiniGames(1, file_path1 + "RhymingMatch" + file_path2 + "rhyming_match.js", "RhymingMatch", 4, 4);
            ProductDB.WriteMiniGames(2, file_path1 + "Supah_Counting" + file_path2 + "supahcounting.js", "SupahCounting", 1, 2);
            ProductDB.WriteMiniGames(1, file_path1 + "TypingGame" + file_path2 + "TypingGame.js", "Typing", 2, 2);
            ProductDB.WriteMiniGames(2, file_path1 + "TangramGame" + file_path2 + "Tangram.js", "Tangram", 3, 4);
            ProductDB.WriteMiniGames(2, file_path1 + "Position_Vocabulary" + file_path2 + "positionvocabulary.js", "PositionVocabulary", 4, 4);
            ProductDB.WriteMiniGames(1, file_path1 + "SightWord_Maze" + file_path2 + "sightword_maze.js", "SightWordMaze", 4, 4);
            ProductDB.WriteMiniGames(1, file_path1 + "AlphabetSortingGame" + file_path2 + "AlphabetSortingGame.js", "AlphabetMatching", 1, 2);

            //Animals
            Console.WriteLine("Uploading Animals.");
            path = Path.Combine(Environment.CurrentDirectory, "Animals.sql");
            Console.WriteLine(path);
            ProductDB.WriteSQL(path); 
            
            //ProfileProgress
            Console.WriteLine("Uploading ProfileProgress.");
            path = Path.Combine(Environment.CurrentDirectory, "ProfileProgress.sql");
            Console.WriteLine(path);
            ProductDB.WriteSQL(path);
            
            Console.WriteLine("-----Done!-----");
        }
    }
}