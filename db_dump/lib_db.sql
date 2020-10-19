CREATE DATABASE  IF NOT EXISTS `lib_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `lib_db`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lib_db
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `bookId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `year` varchar(45) DEFAULT NULL,
  `description` longtext,
  `isbn` varchar(45) DEFAULT NULL,
  `pages` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bookId`),
  UNIQUE KEY `idbooks_UNIQUE` (`bookId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Anna Karenina','Leo Tolstoy','1877','Anna Karenina tells of the doomed love affair between the sensuous and rebellious Anna and the dashing officer, Count Vronsky. Tragedy unfolds as Anna rejects her passionless marriage and must endure the hypocrisies of society. Set against a vast and richly textured canvas of nineteenth-century Russia, the novel\'s seven major characters create a dynamic imbalance, playing out the contrasts of city and country life and all the variations on love and family happiness. While previous versions have softened the robust, and sometimes shocking, quality of Tolstoy\'s writing, Pevear and Volokhonsky have produced a translation true to his powerful voice. This award-winning team\'s authoritative edition also includes an illuminating introduction and explanatory notes. Beautiful, vigorous, and eminently readable, this Anna Karenina will be the definitive text for generations to come. ','0143035002',864,'available'),(2,'Madame Bovary','Gustave Flaubert','1857','For daring to peer into the heart of an adulteress and enumerate its contents with profound dispassion, the author of Madame Bovary was tried for \"offenses against morality and religion.\" What shocks us today about Flaubert\'s devastatingly realized tale of a young woman destroyed by the reckless pursuit of her romantic dreams is its pure artistry: the poise of its narrative structure, the opulence of its prose (marvelously captured in the English translation of Francis Steegmuller), and its creation of a world whose minor figures are as vital as its doomed heroine. In reading Madame Bovary, one experiences a work that remains genuinely revolutionary almost a century and a half after its creation. ','9780679736363',432,'available'),(3,'War and Peace','Leo Tolstoy','1869','Epic in scale, War and Peace delineates in graphic detail events leading up to Napoleon\'s invasion of Russia, and the impact of the Napoleonic era on Tsarist society, as seen through the eyes of five Russian aristocratic families. ','1400079985',1225,'available'),(4,'The Great Gatsby','F. Scott Fitzgerald','1925','The novel chronicles an era that Fitzgerald himself dubbed the \"Jazz Age\". Following the shock and chaos of World War I, American society enjoyed unprecedented levels of prosperity during the \"roaring\" 1920s as the economy soared. At the same time, Prohibition, the ban on the sale and manufacture of alcohol as mandated by the Eighteenth Amendment, made millionaires out of bootleggers and led to an increase in organized crime, for example the Jewish mafia. Although Fitzgerald, like Nick Carraway in his novel, idolized the riches and glamor of the age, he was uncomfortable with the unrestrained materialism and the lack of morality that went with it, a kind of decadence. ','9780743273565',180,'available'),(5,'Lolita','Vladimir Nabokov','1955','The book is internationally famous for its innovative style and infamous for its controversial subject: the protagonist and unreliable narrator, middle aged Humbert Humbert, becomes obsessed and sexually involved with a twelve-year-old girl named Dolores Haze. ','9780679723165',317,'available'),(6,'Middlemarch','George Eliot','1872','Middlemarch: A Study of Provincial Life is a novel by George Eliot, the pen name of Mary Anne Evans, later Marian Evans. It is her seventh novel, begun in 1869 and then put aside during the final illness of Thornton Lewes, the son of her companion George Henry Lewes. During the following year Eliot resumed work, fusing together several stories into a coherent whole, and during 1871–72 the novel appeared in serial form. The first one-volume edition was published in 1874, and attracted large sales. Subtitled \"A Study of Provincial Life\", the novel is set in the fictitious Midlands town of Middlemarch during the period 1830–32. It has a multiple plot with a large cast of characters, and in addition to its distinct though interlocking narratives it pursues a number of underlying themes, including the status of women, the nature of marriage, idealism and self-interest, religion and hypocrisy, political reform, and education. The pace is leisurely, the tone is mildly didactic (with an authorial voice that occasionally bursts through the narrative), and the canvas is very broad. ','0141439548',880,'available'),(7,'The Adventures of Huckleberry Finn','Mark Twain','1884','Revered by all of the town\'s children and dreaded by all of its mothers, Huckleberry Finn is indisputably the most appealing child-hero in American literature. Unlike the tall-tale, idyllic world of Tom Sawyer, The Adventures of Huckleberry Finn is firmly grounded in early reality. From the abusive drunkard who serves as Huckleberry\'s father, to Huck\'s first tentative grappling with issues of personal liberty and the unknown, Huckleberry Finn endeavors to delve quite a bit deeper into the complexities — both joyful and tragic of life. ','099658482X',330,'available'),(8,'The Stories of Anton Chekhov','Anton Chekhov','2000','Anton Pavlovich Chekhov was a Russian short-story writer, playwright and physician, considered to be one of the greatest short-story writers in the history of world literature. His career as a dramatist produced four classics and his best short stories are held in high esteem by writers and critics. Chekhov practised as a doctor throughout most of his literary career: \"Medicine is my lawful wife,\" he once said, \"and literature is my mistress.\" ','9780553381009',496,'available'),(9,'In Search of Lost Time','Marcel Proust','1931','Swann\'s Way, the first part of A la recherche de temps perdu, Marcel Proust\'s seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work. The narrator recalls his childhood, aided by the famous madeleine; and describes M. Swann\'s passion for Odette. The work is incomparable. Edmund Wilson said \"[Proust] has supplied for the first time in literature an equivalent in the full scale for the new theory of modern physics.\" ','1857152506',3152,'available'),(10,'Hamlet ','William Shakespeare','1602','The Tragedy of Hamlet, Prince of Denmark, or more simply Hamlet, is a tragedy by William Shakespeare, believed to have been written between 1599 and 1601. The play, set in Denmark, recounts how Prince Hamlet exacts revenge on his uncle Claudius, who has murdered Hamlet\'s father, the King, and then taken the throne and married Gertrude, Hamlet\'s mother. The play vividly charts the course of real and feigned madness—from overwhelming grief to seething rage—and explores themes of treachery, revenge, incest, and moral corruption. ','0393640108',384,'available'),(11,'Moby Dick','Herman Melville','1851','First published in 1851, Melville\'s masterpiece is, in Elizabeth Hardwick\'s words, \"the greatest novel in American literature.\" The saga of Captain Ahab and his monomaniacal pursuit of the white whale remains a peerless adventure story but one full of mythic grandeur, poetic majesty, and symbolic power. Filtered through the consciousness of the novel\'s narrator, Ishmael, Moby-Dick draws us into a universe full of fascinating characters and stories, from the noble cannibal Queequeg to the natural history of whales, while reaching existential depths that excite debate and contemplation to this day. ','1853260088',544,'borrowed'),(12,'Don Quixote','Miguel de Cervantes',NULL,'Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper. He has become obsessed with books of chivalry, and believes their every word to be true, despite the fact that many of the events in them are clearly impossible. Quixano eventually appears to other people to have lost his mind from little sleep and food and because of so much reading. ',' 0142437239',1072,'available');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrowed_books`
--

DROP TABLE IF EXISTS `borrowed_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrowed_books` (
  `borrowedBookId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `bookId` int(11) DEFAULT NULL,
  `borrowDate` date DEFAULT NULL,
  `returnDate` date DEFAULT NULL,
  PRIMARY KEY (`borrowedBookId`),
  UNIQUE KEY `idbooks_borrowings_UNIQUE` (`borrowedBookId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrowed_books`
--

LOCK TABLES `borrowed_books` WRITE;
/*!40000 ALTER TABLE `borrowed_books` DISABLE KEYS */;
INSERT INTO `borrowed_books` VALUES (5,1,2,'2020-10-18','2020-10-25');
/*!40000 ALTER TABLE `borrowed_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourite_books`
--

DROP TABLE IF EXISTS `favourite_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourite_books` (
  `favouriteBookId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `bookId` int(11) DEFAULT NULL,
  PRIMARY KEY (`favouriteBookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourite_books`
--

LOCK TABLES `favourite_books` WRITE;
/*!40000 ALTER TABLE `favourite_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `favourite_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `libraryCardId` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `idusers_UNIQUE` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John','Doe','$2b$10$RL8KU0dIFsBWQiXFGjTxReUptPk1LZe0eUug1eyFf9NuXAgHD5qim','123456','client','Random Street 1, Random City','123-123-123','johndoe@mail.com'),(2,'Admin','Admin','$2b$10$lDyRWyiYyptXKyDSW7gPQOsFDMy5CWvUj7ZiDm/rO63HC9uT0EGR2',NULL,'librarian',NULL,NULL,'admin@mail.com'),(3,'Joan','Doe','$2b$10$RL8KU0dIFsBWQiXFGjTxReUptPk1LZe0eUug1eyFf9NuXAgHD5qim','999999','client','Random Street 2, Random ','456-456-456','joandoe@mail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-19  8:36:12
