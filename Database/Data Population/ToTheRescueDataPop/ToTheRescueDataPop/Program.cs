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

                ProductDB.WriteImage(3, "Maps/Plains.png", "plains"); //27
                ProductDB.WriteImage(3, "Maps/Beach.png", "beach"); //28
                // 2 maps. 

                ProductDB.WriteImage(2, "Animals/BearNormal.png", "bear"); //29
                ProductDB.WriteImage(2, "Animals/ClownFishNormal.png", "clown fish"); //30
                ProductDB.WriteImage(2, "Animals/DogNormal.png", "dog"); //31
                ProductDB.WriteImage(2, "Animals/KillerWhaleNormal.png", "killer whale"); //32
                ProductDB.WriteImage(2, "Animals/CatNormal.png", "cat"); //33
                ProductDB.WriteImage(2, "Animals/PolarBearNormal.png", "polar bear"); //34

                ProductDB.WriteImage(2, "ShinyAnimals/BearShiny.png", "bear"); //35
                ProductDB.WriteImage(2, "ShinyAnimals/ClownFishShiny.png", "clown fish"); //36
                ProductDB.WriteImage(2, "ShinyAnimals/DogShiny.png", "dog"); //37
                ProductDB.WriteImage(2, "ShinyAnimals/KillerWhaleShiny.png", "killer whale"); ; //38
                ProductDB.WriteImage(2, "ShinyAnimals/CatShiny.png", "cat"); //39
                ProductDB.WriteImage(2, "ShinyAnimals/PolarBearShiny.png", "polar bear"); //40

                ProductDB.WriteImage(2, "Animals/NormalRhino.png", "rhino"); //41
                ProductDB.WriteImage(2, "Animals/CrabNormal.png", "crab"); //42
                ProductDB.WriteImage(2, "Animals/ButterflyNormal.png", "butterfly"); //43
                ProductDB.WriteImage(2, "Animals/LionNormal.png", "lion"); //44
                ProductDB.WriteImage(2, "Animals/SquirrelNormal.png", "squirrel"); //45
                ProductDB.WriteImage(2, "Animals/MeerkatNormal.png", "meerkat"); //46
                ProductDB.WriteImage(2, "Animals/CowNormal.png", "cow"); //47
                ProductDB.WriteImage(2, "Animals/FrogNormal.png", "frog"); //48


                ProductDB.WriteImage(2, "ShinyAnimals/RhinoShiny.png", "rhino"); //49
                ProductDB.WriteImage(2, "ShinyAnimals/CrabShiny.png", "crab"); //50
                ProductDB.WriteImage(2, "ShinyAnimals/ButterflyShiny.png", "butterfly"); //51
                ProductDB.WriteImage(2, "ShinyAnimals/LionShiny.png", "lion"); //52
                ProductDB.WriteImage(2, "ShinyAnimals/SquirrelShiny.png", "squirrel"); //53
                ProductDB.WriteImage(2, "ShinyAnimals/MeerkatShiny.png", "meerkat"); //54
                ProductDB.WriteImage(2, "ShinyAnimals/CowShiny.png", "cow"); //55
                ProductDB.WriteImage(2, "ShinyAnimals/FrogShiny.png", "frog"); //56

                ProductDB.WriteImage(3, "Maps/Ocean.png", "ocean"); //57,
                ProductDB.WriteImage(3, "Maps/RainForest.png", "rainforest"); //58, 
                ProductDB.WriteImage(3, "Maps/Mountain.png", "mountain"); //59,
            }

            if (soundIDList.Count == 0)
            {
                //Lake's animal sounds
                string[] soundArray = new string[] {
                    "bear", //1
                    "cat", //2
                    "dog", //3
                    "elephant", //4
                    "fish", //5
                    "giraffe", //6
                    "hippo", //7
                    "monkey", //8
                    "panda", //9
                    "parrot", //10
                    "penguin", //11
                    "pig", //12
                    "polarBear", //13
                    "rabbit", //14
                    "snake", //15
                    "whale", //16
                    "butterfly", //17
                    "cow", //18
                    "crab", //19
                    "frog", //20
                    "lion", //21
                    "meercat", //22
                    "rhino", //23
                    "squirrel" //24
                };
                for (int i = 0; i < soundArray.Length; i++)
                {
                    ProductDB.WriteSound(1, "AnimalSounds/" + soundArray[i] + ".m4a", soundArray[i]);
                }

                //ProductDB.WriteSound(1, "cat.mp3", "cat");
                //ProductDB.WriteSound(1, "chipmunk.mp3", "chipmunk");
                //ProductDB.WriteSound(1, "cow.mp3", "cow"); 

                //ProductDB.WriteSound(1, "dog.mp3", "dog");
                //ProductDB.WriteSound(1, "frog.mp3", "frog");
                //ProductDB.WriteSound(1, "horse.mp3", "horse"); 

                ProductDB.WriteSound(1, "TaDa.mp3", "tada"); //25
                //ProductDB.WriteSound(1, "lion.mp3", "lion"); 
                //ProductDB.WriteSound(1, "monkey.mp3", "monkey");
                //ProductDB.WriteSound(1, "rooster.mp3", "rooster"); 

                ProductDB.WriteSound(2, "MapAudio/plains.mp3", "plains"); //26
                ProductDB.WriteSound(2, "MapAudio/beach.mp3", "beach"); //27
                ProductDB.WriteSound(2, "MapAudio/ocean.mp3", "ocean"); //28
                ProductDB.WriteSound(2, "MapAudio/rainforest.mp3", "rainforest"); //29
                ProductDB.WriteSound(2, "MapAudio/mountain.mp3", "mountain"); //30
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
            ProductDB.WriteMiniGames(2, file_path1 + "Number_Comparison" + file_path2 + "Number_Comparison.js", "NumberComparison", 3, 4);
            ProductDB.WriteMiniGames(2, file_path1 + "Number_ComparisonEZ" + file_path2 + "Number_ComparisonEZ.js", "NumberComparisonEZ", 2, 2);
            ProductDB.WriteMiniGames(2, file_path1 + "Number_Tracing" + file_path2 + "number_tracing.js", "NumberTracing", 1, 2);
            ProductDB.WriteMiniGames(2, file_path1 + "Shape_ColoringBook" + file_path2 + "colorbook.js", "ShapeColoringBook", 1, 2);
            ProductDB.WriteMiniGames(2, file_path1 + "SubtractionMiniGame" + file_path2 + "SubtractionMiniGame.js", "SubtractionMiniGame", 3, 4);
            ProductDB.WriteMiniGames(1, file_path1 + "Alphabet_Matching" + file_path2 + "Alphabet_Matching.js", "AlphabetMatching", 2, 3);
            ProductDB.WriteMiniGames(1, file_path1 + "Alphabet_Matching2" + file_path2 + "Alphabet_Matching2.js", "AlphabetMatching", 2, 3);
            ProductDB.WriteMiniGames(1, file_path1 + "Dino_SightWords" + file_path2 + "dino_sightwords.js", "DinoSightWords", 3, 3);
            ProductDB.WriteMiniGames(1, file_path1 + "RhymingMatch" + file_path2 + "rhyming_match.js", "RhymingMatch", 4, 4);
            ProductDB.WriteMiniGames(2, file_path1 + "Supah_Counting" + file_path2 + "supahcounting.js", "SupahCounting", 1, 2);
            ProductDB.WriteMiniGames(1, file_path1 + "TypingGame" + file_path2 + "TypingGame.js", "Typing", 2, 2);
            ProductDB.WriteMiniGames(2, file_path1 + "TangramGame" + file_path2 + "TangramGame.js", "Tangram", 3, 4);
            ProductDB.WriteMiniGames(2, file_path1 + "Position_Vocabulary" + file_path2 + "positionvocabulary.js", "PositionVocabulary", 4, 4);
            ProductDB.WriteMiniGames(1, file_path1 + "SightWord_Maze" + file_path2 + "sightword_maze.js", "SightWordMaze", 4, 4);
            ProductDB.WriteMiniGames(1, file_path1 + "AlphabetSortingGame" + file_path2 + "AlphabetSortingGame.js", "AlphabetMatching", 1, 2);
            ProductDB.WriteMiniGames(1, file_path1 + "Opposites_Matching" + file_path2 + "opposites_matching.js", "OppositesMatching", 4, 4);
            ProductDB.WriteMiniGames(1, file_path1 + "Pairs_Matching" + file_path2 + "pairs_matching.js", "PairsMatching", 3, 4);
            ProductDB.WriteMiniGames(1, file_path1 + "Simon" + file_path2 + "Simon.js", "Simon", 3, 4);
            ProductDB.WriteMiniGames(1, file_path1 + "ISpyGame" + file_path2 + "ISpyGame.js", "ISpy", 1, 2);
            ProductDB.WriteMiniGames(2, file_path1 + "FishCounting" + file_path2 + "FishCounting.js", "FishCounting", 1, 2);

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