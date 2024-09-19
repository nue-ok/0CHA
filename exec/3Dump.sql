CREATE DATABASE  IF NOT EXISTS `health` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `health`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 13.124.57.45    Database: health
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `alarms`
--

DROP TABLE IF EXISTS `alarms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `event_type` enum('follow','like','comment') NOT NULL,
  `is_read` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `users_alarms_user_id_FK_idx` (`user_id`),
  KEY `users_alarms_event_id_FK_idx` (`event_id`),
  CONSTRAINT `users_alarms_event_id_FK2` FOREIGN KEY (`event_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_alarms_user_id_FK2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alarms`
--

LOCK TABLES `alarms` WRITE;
/*!40000 ALTER TABLE `alarms` DISABLE KEYS */;
/*!40000 ALTER TABLE `alarms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_likes`
--

DROP TABLE IF EXISTS `exercise_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `exercise_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `exercise_my_user_user_idx_FK_idx` (`user_id`),
  KEY `exercises_exercise_likes_exercise_id_FK_idx` (`exercise_id`),
  CONSTRAINT `exercises_exercise_likes_exercise_id_FK` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`),
  CONSTRAINT `users_exercise_likes_user_id_FK2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_likes`
--

LOCK TABLES `exercise_likes` WRITE;
/*!40000 ALTER TABLE `exercise_likes` DISABLE KEYS */;
INSERT INTO `exercise_likes` VALUES (4,54,1),(5,55,1),(6,56,27),(7,56,103),(8,56,163),(9,53,2),(10,53,70),(11,53,113);
/*!40000 ALTER TABLE `exercise_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercises` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(50) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises` VALUES (1,'바벨 불가리안 스플릿 스쿼트','Barbell Bulgarian Split Squat은 주로 하체 근력을 강화하는 운동입니다. 이 운동은 한쪽 발을 뒤에 놓고(대개 벤치나 높은 곳에 발을 올려 놓음), 다른 쪽 다리로 스쿼트를 수행하는 방식으로, 바벨을 어깨에 짊어지고 수행합니다. 이 운동은 주로 대퇴사두근(앞 허벅지), 햄스트링(뒷 허벅지), 둔근(엉덩이)을 타겟으로 하며, 균형 감각과 코어 근육의 활성화에도 도움이 됩니다. 한쪽 다리씩 교대로 수행하여 양쪽 하체를 균형 있게 발달시킬 수 있습니다.','하체','/home/ubuntu/images/exercise/Barbell Bulgarian split squat.gif'),(2,'바벨 프론트 박스 스쿼트','Barbell Front Box Squat은 하체 근력을 강화하는 운동으로, 특히 대퇴사두근(앞 허벅지)에 중점을 둡니다. 이 운동은 바벨을 앞쪽 어깨에 걸친 상태에서 수행되며, 뒤에 놓인 박스나 벤치에 엉덩이를 내리면서 앉았다 일어나는 동작으로 진행됩니다. 이 운동은 일반적인 스쿼트보다 무릎과 둔근의 활성화가 더 높으며, 박스를 이용함으로써 앉는 깊이를 일정하게 유지할 수 있어 자세 교정에도 도움이 됩니다. 또한, 안정성을 높여 무게를 안전하게 다루는 데 유리한 점이 있습니다.','하체','/home/ubuntu/images/exercise/Barbell front box squat.gif'),(3,'바벨 슈러그','Barbell Shrug은 승모근(upper trapezius)과 어깨 주변 근육을 강화하는 운동입니다. 이 운동은 바벨을 양손으로 잡고 어깨를 들어 올리는 동작으로 수행됩니다. 바벨을 사용하여 수행하는 Shrug은 중량을 쉽게 조절할 수 있어 근육의 힘과 크기를 효과적으로 늘리는 데 도움이 됩니다. 승모근의 발달은 어깨의 모양과 상체의 균형을 유지하는 데 중요하며, 이 운동을 통해 상체의 안정성과 힘을 기를 수 있습니다.','어깨','/home/ubuntu/images/exercise/Barbell shrug.gif'),(4,'바벨 프론트 스쿼트','Barbell Front Squat은 하체 근육, 특히 대퇴사두근(앞 허벅지)을 타겟으로 하는 운동입니다. 이 운동은 바벨을 앞쪽 어깨에 얹고 스쿼트를 수행하는 동작으로, 바벨이 앞쪽에 위치함으로써 상체를 더 세워야 하며, 이는 코어와 상체 근육의 개입을 증가시킵니다. Front Squat은 하체 근력과 안정성을 강화하는 데 효과적이며, 전통적인 Back Squat보다 무릎과 발목의 움직임이 더 중요하게 작용합니다. 운동을 통해 하체의 균형 발달과 코어 강화에 큰 도움이 됩니다.','하체','/home/ubuntu/images/exercise/Barbell front squat.gif'),(5,'바벨 사이드 런지','Barbell Side Lunge는 하체 근육을 강화하는 운동으로, 특히 대퇴사두근(앞 허벅지), 햄스트링(뒷 허벅지), 엉덩이 근육(둔근), 그리고 내전근(허벅지 안쪽 근육)을 타겟으로 합니다. 이 운동은 바벨을 어깨에 짊어지고 옆으로 한 발씩 내딛으며 런지를 수행하는 동작입니다. 이 측면 런지는 다리의 안정성과 균형을 개선하는 데 도움이 되며, 다양한 방향에서 근육을 자극하여 하체의 전체적인 강화를 도와줍니다. 특히 스포츠나 일상 생활에서의 측면 움직임을 강화하는 데 유용한 운동입니다.','하체','/home/ubuntu/images/exercise/Barbell side lunge.gif'),(6,'바벨 오버헤드 프레스','Behind-the-Neck Barbell Overhead Press는 어깨 근육, 특히 삼각근을 타겟으로 하는 운동입니다. 이 운동은 바벨을 목 뒤로 내린 상태에서 시작하여, 팔을 위로 뻗어 바벨을 머리 위로 들어 올리는 동작을 포함합니다. 이 운동은 어깨 전체를 자극하며, 특히 전면 삼각근과 후면 삼각근에 집중된 자극을 줄 수 있습니다. 하지만, 이 운동은 어깨의 가동 범위가 제한된 사람에게는 부상을 유발할 수 있으므로 적절한 기술과 유연성이 필요합니다. 일반적으로 어깨의 유연성과 근력을 모두 향상시키는 데 효과적이지만, 정확한 자세로 수행하는 것이 중요합니다.','어깨','/home/ubuntu/images/exercise/Behind the neck barbell overhead press.gif'),(7,'벤트 니 오블리크 브이 업','Bent-Knee Oblique V-Up은 복근, 특히 복사근(obliques)을 타겟으로 하는 운동입니다. 이 운동은 옆으로 누운 상태에서 시작하여, 무릎을 구부린 채 상체와 하체를 동시에 들어 올리며 몸을 \'V\'자 모양으로 만드는 동작입니다. 이때 주로 측면 복근을 강화하는 데 집중됩니다. 운동 강도를 조절하기 위해 무릎을 구부리거나 펴는 방식으로 난이도를 조정할 수 있으며, 전반적인 코어 안정성 향상에도 도움이 됩니다.','기타','/home/ubuntu/images/exercise/Bent knee oblique v up.gif'),(8,'벤트 오버 바벨 리버스 레이즈','Bent-Over Barbell Reverse Raise는 후면 삼각근(rear deltoids)과 승모근(upper trapezius)을 타겟으로 하는 어깨 운동입니다. 이 운동은 바벨을 양손에 들고 상체를 앞으로 굽힌 상태에서 팔을 뒤로 들어 올리는 동작으로 수행됩니다. 이 동작은 주로 어깨의 후면 근육을 강화하고, 상체의 균형을 잡아주는 역할을 합니다. 특히, 앉아서 또는 서서 상체를 숙인 자세에서 수행하며, 정확한 자세와 적절한 무게 선택이 중요합니다. 이 운동은 어깨의 전체적인 발달을 위해 필수적인 요소로 여겨집니다.','어깨','/home/ubuntu/images/exercise/Bent Over Barbell Reverse Raise (Shoulders).gif'),(9,'벤치 딥스','Bent-Knee Bench Dip은 삼두근(triceps)을 타겟으로 하는 운동입니다. 이 운동은 벤치를 이용하여 수행되며, 무릎을 구부린 상태에서 팔로 체중을 지탱하며 상체를 올리고 내리는 동작으로 이루어집니다. 이 운동은 삼두근 외에도 어깨와 가슴 근육을 보조적으로 사용하며, 체중을 이용한 저항 운동으로 삼두근의 근력을 강화하는 데 효과적입니다. 다리를 구부린 상태에서 수행하면 다리를 펴고 하는 딥보다 난이도가 낮아 초보자에게 적합한 운동입니다.','가슴','/home/ubuntu/images/exercise/Bent knee bench dip.gif'),(10,'케이블 힙 앱덕션','Cable Hip Abduction은 고관절 주변 근육을 강화하는 운동으로, 특히 엉덩이 외측 근육(중둔근, 소둔근)을 타겟으로 합니다. 이 운동은 케이블 머신을 사용하여 한쪽 다리를 몸의 옆쪽으로 벌리는 동작으로 수행됩니다. 엉덩이 근육의 발달은 균형 유지와 하체의 안정성에 매우 중요하며, 특히 운동 시 무릎이나 발목 부상의 예방에 도움을 줍니다. 또한, 이 운동은 다리의 움직임과 고관절의 가동 범위를 향상시키는 데 유용합니다. Cable Hip Abduction은 피트니스에서 균형 잡힌 하체 발달을 위해 자주 사용되는 운동입니다.','하체','/home/ubuntu/images/exercise/Cable hip abduction.gif'),(11,'케이블 슈러그 백','Cable Shrug Back은 주로 승모근(Trapezius)을 타겟으로 하는 등 운동입니다. 이 운동은 케이블 머신을 사용하여 어깨를 위로 들어 올리는 Shrug 동작을 수행하는데, 특히 승모근의 상부와 중간부를 강화하는 데 효과적입니다. \"Back\"이라는 명칭은 일반적인 Shrug 동작에서 승모근을 더 깊이 자극하기 위해 상체를 약간 뒤로 기울여 수행하는 변형된 형태일 가능성이 있습니다. 이 운동은 어깨의 안정성과 상체의 강화를 돕고, 승모근의 모양과 크기를 발달시키는 데 중요한 역할을 합니다.','어깨','/home/ubuntu/images/exercise/Cable Shrug Back.gif'),(12,'케이블 원 암 리버스 그립 트라이셉스 푸시 다운','Cable One-Arm Reverse-Grip Triceps Push-Down은 삼두근(triceps)을 타겟으로 하는 운동입니다. 이 운동은 케이블 머신을 사용하여 한 손으로 바를 잡고, 손바닥이 위를 향하는 리버스 그립(reverse grip)으로 삼두근을 수축시켜 바를 아래로 누르는 동작을 수행합니다. 리버스 그립은 삼두근의 긴두를 보다 집중적으로 자극하며, 운동 시 팔꿈치의 움직임을 최소화하여 삼두근의 활성화를 극대화합니다. 이 운동은 한쪽 팔씩 개별적으로 수행하므로, 각 팔의 근력을 균형 있게 발달시키는 데 도움이 됩니다.','팔','/home/ubuntu/images/exercise/Cable one arm reverse grip triceps push down.gif'),(13,'페이스 풀','이 운동은 케이블 머신을 사용하여 후면 삼각근(rear deltoids)과 상부 등의 근육을 강화하는 동작입니다. \"Horizontal Row\" 동작을 통해 팔을 수평으로 당겨 어깨의 후면 근육과 견갑골 주위의 근육을 타겟으로 합니다. 이 운동은 상체의 후면부를 발달시키고, 특히 어깨의 균형 잡힌 근육 발달에 중요한 역할을 합니다. 다른 근육과의 균형을 맞추기 위해 필수적인 운동으로, 어깨의 안정성과 모양을 개선하는 데 도움이 됩니다.','어깨','/home/ubuntu/images/exercise/Cable Standing Rear Delt Horizontal Row.gif'),(14,'덤벨 데드리프트','덤벨을 사용하여 수행하는 데드리프트는 전신을 강화하는 데 매우 효과적인 운동입니다. 이 운동은 대퇴사두근, 햄스트링, 둔근, 그리고 척추기립근(등 근육)을 주요 타겟으로 하며, 무게를 바닥에서 들어 올리는 동안 전신의 근력을 요구합니다. 덤벨을 사용할 경우, 바벨 데드리프트보다 유연하게 수행할 수 있으며, 양손의 독립적인 움직임을 통해 근육의 불균형을 교정하는 데 도움이 됩니다. 이 운동은 전신의 근력과 함께 코어 안정성을 향상시키는 중요한 역할을 합니다.','하체','/home/ubuntu/images/exercise/Dumbbell deadlift.gif'),(15,'덤벨 불가리안 스플릿 스쿼트','이 운동은 덤벨을 양손에 들고 한쪽 다리로만 수행하는 스플릿 스쿼트입니다. 주로 대퇴사두근, 햄스트링, 둔근을 타겟으로 하며, 하체의 균형성과 근력을 발달시키는 데 매우 효과적입니다. 한쪽 다리씩 교대로 수행하여 하체의 좌우 근력 균형을 맞추는 데 도움이 되며, 코어 근육의 안정성도 요구되어 전신적으로 유익한 운동입니다. 이 운동은 다리를 번갈아 가며 수행하는 동작으로, 운동 중 코어와 균형 감각을 동시에 강화할 수 있습니다.','하체','/home/ubuntu/images/exercise/Dumbbell one leg split squat.gif'),(16,'케틀벨 원암 프레스','이 운동은 케틀벨을 사용하여 무릎을 꿇은 상태에서 수행하는 어깨 프레스 동작입니다.  \"Bottoms Up\" 방식으로 케틀벨을 잡아 불안정한 상태를 만들기 때문에, 어깨 근육뿐만 아니라 손목, 팔, 그리고 코어 근육의 안정성을 요구합니다. 무릎을 꿇은 상태에서 수행하면 코어가 더욱 활성화되어 상체의 균형과 근력을 강화하는 데 도움이 됩니다. 이 운동은 어깨와 코어의 협응 능력을 높이고, 전반적인 상체 안정성을 개선하는 데 효과적입니다.','어깨','/home/ubuntu/images/exercise/Kettlebell Kneeling One Arm Bottoms Up Press.gif'),(17,'레터럴 레그 레이즈','Lateral Leg Raises는 다리를 옆으로 들어 올리는 동작으로, 주로 고관절 외전근과 엉덩이 근육을 강화하는 운동입니다. 이 운동은 엉덩이와 허벅지 외측 근육을 타겟으로 하며, 고관절의 가동성을 높이고 다리의 외측 근력을 강화하는 데 도움을 줍니다. 옆으로 누워서 하거나 서서 균형을 잡으며 수행할 수 있으며, 특히 하체의 안정성과 균형 감각을 향상시키는 데 효과적입니다.','하체','/home/ubuntu/images/exercise/Lateral leg raises.gif'),(18,'마운틴 클라이머','Mountain Climbers는 전신을 사용하여 빠르게 무릎을 가슴 쪽으로 끌어당기는 유산소 운동입니다. 주로 코어, 다리, 팔 근육을 강화하며 심박수를 높여 유산소 운동 효과를 극대화합니다. 이 운동은 전신의 지구력을 기르고, 동시에 심장과 폐의 기능을 강화하여 체력 향상에 크게 기여합니다. 짧은 시간에 많은 칼로리를 소모할 수 있어 체중 감량과 심폐 지구력 향상에 매우 효과적인 운동입니다.','기타','/home/ubuntu/images/exercise/Mountain Climbers.gif'),(19,'오블리크 크런치','Oblique Crunches는 주로 측면 복근(복사근)을 타겟으로 하는 운동입니다. 바닥에 누운 상태에서 몸을 비틀어 상체를 들어 올리며, 옆구리 근육을 강화하는 동작을 수행합니다. 이 운동은 복부의 측면 근육을 발달시키는 데 효과적이며, 허리 라인을 정리하고 코어 근육의 균형을 맞추는 데 도움이 됩니다. 규칙적인 수행은 복근의 전체적인 발달과 더불어 허리의 안정성을 높이는 데 유익합니다.','기타','/home/ubuntu/images/exercise/Oblique Crunches.gif'),(20,'원 레그 푸시 업','One-leg Push-Up은 한 다리를 들어 올린 상태에서 수행하는 푸시업으로, 가슴 근육과 팔의 삼두근을 타겟으로 합니다. 기본 푸시업보다 더 높은 난이도와 균형 감각을 요구하며, 동시에 코어 근육의 활성화를 필요로 합니다. 이 운동은 상체의 근력을 강화하는 동시에 몸의 균형을 유지하는 능력을 향상시키며, 코어와 하체의 협응력을 높이는 데도 효과적입니다.','가슴','/home/ubuntu/images/exercise/One leg push up.gif'),(21,'레이즈드 니 워킹','Raised Knee Walking은 무릎을 높게 들어 올리며 걷는 운동으로, 하체의 고관절 굴근과 대퇴사두근을 주로 자극합니다. 이 운동은 보폭을 크게 유지하며 무릎을 높이 들어 올려 걸으며 수행하며, 하체 근육의 유연성과 근력을 강화합니다. 동시에 코어를 안정시키는 역할도 하여 균형 감각을 향상시키고, 다리와 골반의 움직임을 개선하는 데 효과적입니다.','하체','/home/ubuntu/images/exercise/Raised knee walking.gif'),(22,'리버스 그립 트라이셉스 푸시다운','Reverse Grip Triceps Pushdown은 케이블 머신을 사용하여 삼두근(triceps)을 강화하는 운동입니다. 손바닥이 위를 향한 상태로 바를 잡고, 팔꿈치를 굽힌 상태에서 바를 아래로 눌러 삼두근을 자극합니다. 일반적인 푸시다운과 달리 리버스 그립을 사용하면 삼두근의 긴두를 더욱 강하게 자극할 수 있습니다. 이 운동은 팔의 후면 근육을 발달시키는 데 매우 효과적이며, 삼두근의 모양과 강도를 높이는 데 도움이 됩니다.','팔','/home/ubuntu/images/exercise/Reverse Grip Triceps Pushdown.gif'),(23,'시티드 벤트 오버 투 암 덤벨 킥백','Seated Bent-Over Two-Arm Dumbbell Kickback은 삼두근을 타겟으로 하는 운동입니다. 앉은 상태에서 상체를 앞으로 기울이고, 양손에 덤벨을 잡은 채 팔을 뒤로 펴면서 삼두근을 수축시킵니다. 이 운동은 삼두근의 전체 길이를 자극하여 팔의 후면 근육을 강화하며, 덤벨을 사용하여 양손의 균형을 맞추고 근육의 발달을 도모합니다. 상체를 기울인 자세로 수행하기 때문에 삼두근뿐만 아니라 등과 코어의 안정성도 함께 향상됩니다.','팔','/home/ubuntu/images/exercise/Seated bent over two arm dumbbell kickback.gif'),(24,'시티드 덤벨 오버헤드 프레스','Seated Dumbbell Overhead Press는 덤벨을 사용하여 어깨 근육을 강화하는 운동입니다. 앉은 상태에서 덤벨을 양손으로 들어 올리며, 삼각근(shoulders)과 상부 승모근(upper trapezius)을 주로 타겟으로 합니다. 이 운동은 어깨의 크기와 힘을 키우는 데 효과적이며, 덤벨을 사용하기 때문에 양쪽 어깨의 균형 잡힌 발달에 도움이 됩니다. 또한, 앉은 자세에서 수행함으로써 하체의 개입을 최소화하고 상체의 근력과 안정성을 더욱 집중적으로 강화할 수 있습니다.','어깨','/home/ubuntu/images/exercise/Seated dumbbell overhead press.gif'),(25,'시티드 덤벨 오버헤드 트라이셉스 익스텐션','Seated Dumbbell Overhead Triceps Extension은 삼두근(triceps)을 타겟으로 하는 운동입니다. 이 운동은 앉은 자세에서 덤벨을 양손으로 잡고 머리 위로 들어 올린 후, 팔꿈치를 구부려 덤벨을 뒤로 내리며 삼두근을 수축시키는 동작으로 이루어집니다. 이 운동은 삼두근의 전체 길이를 자극하며, 팔의 후면 근육을 강화하는 데 효과적입니다. 정확한 자세를 유지하며 수행하면 팔꿈치의 안정성과 삼두근의 발달에 큰 도움이 됩니다.','팔','/home/ubuntu/images/exercise/Seated dumbbell overhead triceps extension.gif'),(26,'사이드 플랭크 힙 앱덕션','Side Plank Hip Abduction은 코어와 하체 근육을 동시에 강화하는 운동입니다. 이 운동은 측면 플랭크 자세에서 상체를 지탱한 후, 위쪽 다리를 들어 올리는 동작을 포함합니다. 이 동작은 복사근(obliques)과 고관절 외전근을 집중적으로 자극하며, 특히 엉덩이 근육을 강화합니다. 이 운동은 균형 감각을 향상시키고 코어의 안정성을 높이는 데 효과적입니다. 또한, 골반 주변의 근력을 강화하여 허리와 하체의 부상을 예방하는 데 도움을 줍니다.','기타','/home/ubuntu/images/exercise/Side plank hip abduction.gif'),(27,'스쿼트','Squat은 기본적인 하체 근력 운동으로, 대퇴사두근(quadriceps), 햄스트링(hamstrings), 둔근(glutes)을 주요 타겟으로 합니다. 이 운동은 전신의 안정성과 균형을 요구하며, 하체 근육을 전반적으로 강화하는 데 매우 효과적입니다. 스쿼트는 다양한 변형 동작을 통해 더욱 폭넓게 활용될 수 있으며, 하체 근력과 기능성 운동의 기초를 다지는 데 필수적인 운동입니다. 무게를 추가하여 수행할 경우 전신의 근력 향상과 함께 심폐 기능도 강화할 수 있습니다.','하체','/home/ubuntu/images/exercise/Squat.gif'),(28,'스태빌리트 볼 브이 패스','Stability Ball V-Pass는 스테빌리티 볼을 사용하여 복근을 강화하는 운동입니다. 이 운동은 바닥에 누운 상태에서 다리와 상체를 동시에 들어 올려 몸을 \'V\'자 모양으로 만들고, 볼을 다리와 손 사이에서 교차로 전달하는 동작을 포함합니다. 이 운동은 복직근(rectus abdominis)과 복사근(obliques)을 타겟으로 하며, 코어의 안정성을 높이는 데 효과적입니다. 스테빌리티 볼을 사용함으로써 운동의 난이도가 증가하고, 균형 감각과 전신의 협응력을 향상시킬 수 있습니다.','기타','/home/ubuntu/images/exercise/Stability ball V pass.gif'),(29,'스티빌리티 볼 월 스쿼트','Stability Ball Wall Squat은 스테빌리티 볼을 사용하여 벽을 등 뒤에 두고 수행하는 스쿼트 변형 운동입니다. 이 운동은 대퇴사두근, 햄스트링, 둔근을 강화하며, 스테빌리티 볼을 사용하여 허리를 보호하면서 스쿼트를 보다 안전하게 수행할 수 있게 해줍니다. 벽과 볼 사이에서 몸을 지지하면서 수행하기 때문에 무릎 관절에 가해지는 부담이 줄어들어, 초보자나 재활 운동으로 적합합니다. 하체 근력 향상과 함께 전신의 안정성을 길러주는 좋은 운동입니다.','하체','/home/ubuntu/images/exercise/Stability ball wall squat.gif'),(30,'스탠딩 힙 앱덕션','Standing Hip Abduction은 서 있는 자세에서 다리를 옆으로 들어 올리며 고관절 외전 근육을 강화하는 운동입니다. 주로 엉덩이 근육(중둔근, 소둔근)을 타겟으로 하며, 고관절의 가동성을 높이고 다리의 외측 근육을 발달시키는 데 효과적입니다. 이 운동은 다리의 움직임과 고관절의 안정성을 개선하는 데 도움을 주며, 균형 감각을 향상시키는 데도 유익합니다. 균형을 유지하기 위해 코어 근육의 협응도 요구되어 전신적으로도 좋은 운동입니다.','어깨','/home/ubuntu/images/exercise/Standing Hip Abduction.gif'),(31,'스탠딩 트라이셉스 바벨 익스텐션','Standing Tricep Extensions with a Barbell은 삼두근(triceps)을 타겟으로 하는 운동입니다. 이 운동은 바벨을 머리 뒤에 위치시킨 후 팔꿈치를 구부려 바벨을 위로 들어 올리는 동작으로 구성됩니다. 삼두근의 전체 길이를 자극하여 팔의 후면 근육을 강화하며, 상체의 안정성을 유지하면서 팔 근육의 모양과 힘을 발달시킵니다. 서서 수행하기 때문에 코어 근육도 함께 사용되어 상체의 균형과 힘을 강화하는 데 도움을 줍니다.','팔','/home/ubuntu/images/exercise/Standing Tricep Extensions with a Barbell.gif'),(32,'딥스','Triceps Dip은 삼두근을 주로 타겟으로 하는 체중 운동입니다. 벤치나 평행봉을 사용하여 팔로 체중을 지탱하고 상체를 위아래로 움직이며 삼두근을 강화합니다. 이 운동은 삼두근 외에도 어깨와 가슴 근육을 보조적으로 사용하며, 팔의 후면 근육을 발달시키는 데 매우 효과적입니다. 체중을 이용해 수행하므로 난이도를 조절할 수 있고, 상체 근력을 강화하는 중요한 운동 중 하나입니다.','팔','/home/ubuntu/images/exercise/Triceps dip.gif'),(33,'케이블 푸쉬 다운','Triceps Rope Push-Down은 케이블 머신에 연결된 로프를 사용하여 삼두근을 타겟으로 하는 운동입니다. 이 운동은 팔꿈치를 고정한 상태에서 로프를 아래로 당기며 삼두근을 수축시키는 동작으로 이루어집니다. 로프를 사용하면 손목의 움직임을 조절할 수 있어 삼두근의 다양한 부분을 더욱 효율적으로 자극할 수 있습니다. 이 운동은 삼두근의 모양과 힘을 발달시키는 데 매우 효과적이며, 다른 팔 운동과 함께 삼두근의 전체적인 발달을 도모할 수 있습니다.','팔','/home/ubuntu/images/exercise/Triceps rope push-down.gif'),(34,'프론트 스쿼트','Zercher Squat은 바벨을 팔꿈치 안쪽에 고정하고 수행하는 스쿼트 변형 운동입니다. 이 운동은 대퇴사두근(quadriceps), 햄스트링(hamstrings), 둔근(glutes)을 주로 타겟으로 하며, 동시에 코어와 상체 근육의 안정성을 요구합니다. 바벨의 위치가 일반적인 스쿼트보다 몸의 앞쪽에 위치하여 상체가 세워진 자세를 유지해야 하며, 이는 코어 근육의 강화를 도와줍니다. Zercher Squat은 전체적인 하체 근력을 키우는 데 매우 효과적이며, 균형과 근력의 발전에 중요한 역할을 합니다.','하체','/home/ubuntu/images/exercise/Zercher squat.gif'),(35,'스미스 머신 슈러그','스미스 머신 슈러그는 승모근을 강화하는 운동입니다. 이 운동은 바벨을 사용해 어깨를 들어 올리는 동작을 통해, 어깨와 목 사이의 승모근을 타겟으로 합니다. 승모근은 상체의 상부 근육 중 하나로, 이 근육을 강화하면 어깨와 목 주변의 안정성을 높이고, 어깨의 모양을 개선하는 데 도움이 됩니다. 스미스 머신을 사용함으로써 바벨의 움직임을 안정적으로 조절할 수 있어, 초보자부터 숙련자까지 모두에게 적합한 운동입니다. 이 운동은 어깨의 근육 발달뿐만 아니라, 다른 근육들과의 균형을 맞추기 위해 필수적인 역할을 하며, 어깨의 안정성과 힘을 향상시키는 데 중요한 기여를 합니다.','어깨','/home/ubuntu/images/exercise/Smith machine shrug.gif'),(36,'트랩 바 데드리프트','Trap bar 데드리프트는 트랩 바(헥스 바)를 사용하여 하체와 전신을 강화하는 운동입니다. 바의 중앙에 서서 양손으로 손잡이를 잡고, 무릎과 엉덩이를 굽혀 바를 들어 올리는 동작을 수행합니다. 이 운동은 대퇴사두근, 햄스트링, 둔근 등 하체 근육을 주로 타겟으로 하며, 일반 바벨 데드리프트보다 허리에 부담이 덜해 안전합니다. 전신의 근력과 안정성을 향상시키고, 특히 무거운 중량을 다루기에 적합한 운동입니다.','하체','/home/ubuntu/images/exercise/Trap bar deadlift.gif'),(37,'덤벨 스텝업','덤벨 스텝업(Dumbbell Step-Up)은 하체 근력을 강화하는 운동으로, 특히 대퇴사두근(허벅지 앞쪽), 둔근(엉덩이), 햄스트링(허벅지 뒤쪽)을 타겟으로 합니다. 양손에 덤벨을 들고, 한쪽 발을 벤치나 박스 위에 올린 후, 체중을 실어 몸을 들어 올리며 반대쪽 발을 따라 올립니다. 그런 다음, 처음 발을 내리면서 시작 자세로 돌아옵니다. 이 운동은 균형감과 하체 근력을 동시에 향상시키며, 운동 강도를 조절하기 쉬워 다양한 피트니스 수준에 적합합니다.','하체','/home/ubuntu/images/exercise/Dumbbell step-up.gif'),(38,'바벨 원레그 힙 쓰러스트','바벨 원레그 힙 쓰러스트(Barbell One-Leg Hip Thrust)는 둔근(엉덩이)과 햄스트링을 타겟으로 하는 운동입니다. 벤치에 등 상부를 기댄 상태에서 한쪽 발을 바닥에 두고, 반대쪽 다리는 공중에 들며 바벨을 골반 위에 위치시킵니다. 지지하는 다리의 힘으로 엉덩이를 들어 올려 몸이 직선이 되도록 하고, 천천히 내려 시작 자세로 돌아옵니다. 이 운동은 둔근의 강화와 하체의 근력 균형을 잡는 데 효과적이며, 코어 안정성도 향상시킵니다.','하체','/home/ubuntu/images/exercise/Barbell one-leg hip thrust.gif'),(39,'바벨 힙 쓰러스트','바벨 힙 쓰러스트(Barbell Hip Thrust)는 둔근(엉덩이)을 집중적으로 강화하는 운동입니다. 벤치에 등 상부를 기댄 상태에서 바벨을 골반 위에 놓고, 무릎을 굽힌 채 발을 바닥에 고정합니다. 엉덩이를 들어 올려 몸이 직선이 되도록 하고, 천천히 내려 시작 자세로 돌아옵니다. 이 운동은 둔근의 크기와 힘을 향상시키는 데 매우 효과적이며, 하체의 근력과 코어 안정성도 함께 강화됩니다. 엉덩이와 하체를 더욱 탄탄하게 만드는 데 도움이 됩니다.','하체','/home/ubuntu/images/exercise/Barbell hip thrust.gif'),(40,'힙 쓰러스트','웨이티드 원레그 힙 쓰러스트(Weighted One-Leg Hip Thrust)는 한쪽 다리로 수행하는 둔근 강화 운동입니다. 벤치에 등 상부를 기댄 상태에서 한쪽 발은 바닥에, 다른 쪽 다리는 공중에 들고 덤벨이나 바벨을 골반 위에 올립니다. 지지하는 다리의 힘으로 엉덩이를 들어 올려 몸이 직선이 되도록 한 후 천천히 내려옵니다. 이 운동은 둔근과 햄스트링을 집중적으로 타겟팅하며, 코어와 하체의 균형을 개선하고 강화하는 데 효과적입니다.','하체','/home/ubuntu/images/exercise/Weighted one-leg hip thrust.gif'),(41,'페이스 풀 로우','스탠딩 케이블 리어 델트 로우(Standing Cable Rear Delt Row with Rope)는 후면 삼각근(Rear Deltoids)과 상부 등의 근육을 강화하는 운동입니다. 케이블 머신에 장착된 로프를 양손으로 잡고, 어깨너비로 발을 벌리고 서서 시작합니다. 팔을 곧게 유지한 채, 팔꿈치를 약간 구부리면서 로프를 몸쪽으로 당깁니다. 이때 어깨를 뒤로 쥐어짜듯이 움직여 후면 삼각근과 견갑골 주변 근육을 수축시키고, 천천히 원위치로 돌아옵니다. 이 운동은 후면 어깨 근육과 상부 등 근육의 발달에 도움이 되며, 상체의 균형을 개선합니다.','어깨','/home/ubuntu/images/exercise/Standing cable rear delt row with rope.gif'),(42,'덤벨 W-프레스','덤벨 W-프레스(Dumbbell W-Press)는 어깨의 전반적인 근력을 강화하는 운동입니다. 양손에 덤벨을 잡고, 팔꿈치를 90도 굽힌 상태로 덤벨을 어깨 높이에서 시작합니다. 덤벨을 위로 밀어 올리면서 팔꿈치가 몸쪽으로 모이도록 하여 ‘W’ 모양을 만듭니다. 팔을 완전히 펴면서 덤벨을 위로 올린 후, 천천히 시작 자세로 돌아옵니다. 이 운동은 어깨의 전면, 측면, 후면 근육을 균형 있게 발달시키고, 어깨의 안정성과 힘을 향상시키는 데 도움이 됩니다.','어깨','/home/ubuntu/images/exercise/Dumbbell w-press.gif'),(43,'케이블 프론트 레이즈','케이블 프론트 레이즈(Cable Front Raise)는 어깨의 전면 삼각근을 강화하는 운동입니다. 케이블 머신의 하단에 부착된 핸들을 양손으로 잡고, 손바닥이 아래를 향하도록 합니다. 어깨너비로 발을 벌리고, 등과 허리를 곧게 유지한 채, 팔을 곧게 펴면서 케이블 핸들을 앞쪽으로 천천히 들어 올립니다. 팔이 수평에 도달하면 잠시 멈춘 후, 천천히 시작 위치로 돌아옵니다. 이 운동은 어깨 전면 근육을 집중적으로 발달시키며, 어깨의 힘과 안정성을 향상시키는 데 효과적입니다.','어깨','/home/ubuntu/images/exercise/Cable front raise.gif'),(44,'케이블 원암 프론트 레이즈','케이블 원암 프론트 레이즈(Cable One-Arm Front Raise)는 어깨의 전면 삼각근을 집중적으로 강화하는 운동입니다. 케이블 머신의 하단에 부착된 핸들을 한 손으로 잡고, 팔을 곧게 펴서 시작합니다. 몸을 약간 앞으로 기울이고, 팔을 천천히 앞으로 들어 올려 수평이 될 때까지 올립니다. 팔을 완전히 펴고 엘보우를 고정한 상태로 유지하며, 천천히 시작 위치로 돌아옵니다. 이 운동은 어깨 전면 근육을 강화하고, 어깨의 안정성과 균형을 향상시키는 데 효과적입니다.','어깨','/home/ubuntu/images/exercise/Cable one-arm front raise.gif'),(45,'스태빌리티 볼 디클라인 푸쉬업','스태빌리티 볼 디클라인 푸쉬업(Stability Ball Decline Push-Up)은 가슴과 삼두근을 강화하는 운동입니다. 스태빌리티 볼 위에 발을 올리고, 손은 바닥에 위치시키며 몸을 일직선으로 유지합니다. 팔꿈치를 구부려 몸을 아래로 내리고, 가슴이 바닥에 가까워질 때까지 내려간 후, 팔을 곧게 펴면서 몸을 다시 밀어 올립니다. 이 운동은 가슴, 삼두근, 어깨의 근력을 향상시키며, 동시에 코어의 안정성을 높이는 데 도움이 됩니다.','가슴','/home/ubuntu/images/exercise/Stability ball decline push-up.gif'),(46,'원암 덤벨 로우','벤트오버 덤벨 로우(Bent-Over Dumbbell Row)는 상부 등 근육을 강화하는 운동입니다. 두 손에 덤벨을 들고 무릎을 약간 굽히며 허리를 곧게 펴고 상체를 앞으로 기울입니다. 덤벨을 팔꿈치를 몸 쪽으로 당기면서 상체의 뒤쪽으로 당겨 가슴 쪽으로 덤벨을 끌어올립니다. 팔꿈치를 몸에 붙이고, 등 근육을 조이면서 덤벨을 천천히 내려 시작 위치로 돌아옵니다. 이 운동은 상부 등, 후면 삼각근, 그리고 팔 뒤쪽 근육을 효과적으로 발달시키며, 상체의 힘과 자세를 개선하는 데 도움이 됩니다.','등','/home/ubuntu/images/exercise/Bent-over dumbbell row.gif'),(47,'바벨 로우','벤트오버 바벨 로우(Bent-Over Barbell Row)는 상부 등과 후면 삼각근을 강화하는 운동입니다. 두 발을 어깨너비로 벌리고 무릎을 약간 굽힌 상태에서 허리를 곧게 펴고 상체를 앞으로 기울입니다. 바벨을 어깨너비로 잡고 팔을 곧게 펴서 시작합니다. 팔꿈치를 몸 쪽으로 당기면서 바벨을 복부 쪽으로 끌어올립니다. 상체의 뒤쪽 근육을 수축시키면서 바벨을 천천히 내려 시작 위치로 돌아옵니다. 이 운동은 등 근육의 두께를 증가시키고, 상체의 힘과 안정성을 향상시키는 데 효과적입니다.','등','/home/ubuntu/images/exercise/Bent-over barbell row.gif'),(48,'원암 덤벨 프리처 컬','원암 덤벨 프리처 컬(One-Arm Dumbbell Preacher Curl)은 이두근을 집중적으로 강화하는 운동입니다. 프리처 벤치에 한 팔을 올리고, 덤벨을 한 손으로 잡고 팔을 완전히 펴 시작합니다. 팔꿈치를 벤치에 고정한 상태에서 덤벨을 천천히 올려 이두근을 수축시키고, 다시 천천히 내리면서 시작 자세로 돌아옵니다. 이 운동은 이두근의 수축을 극대화하고, 팔 근육의 모양과 힘을 개선하는 데 효과적입니다.','팔','/home/ubuntu/images/exercise/One-arm dumbbell preacher curl.gif'),(49,'덤벨 원암 리버스 리스트 컬','덤벨 원암 리버스 리스트 컬(Dumbbell One-Arm Reverse Wrist Curl)은 전완근을 강화하는 운동입니다. 벤치에 팔꿈치를 올리고 손목이 벤치에서 떨어지도록 팔을 앞으로 내밀어 시작합니다. 덤벨을 한 손으로 잡고 손목을 천천히 아래로 내린 후, 손목을 위로 들어 올려 덤벨을 수축시킵니다. 손목을 완전히 펴면서 시작 위치로 돌아옵니다. 이 운동은 전완근의 힘과 지구력을 향상시키고, 손목의 안정성을 개선하는 데 효과적입니다.','팔','/home/ubuntu/images/exercise/Dumbbell one-arm reverse wrist curl.gif'),(50,'비하인드 더 백 바벨 리스트 컬','비하인드-더-백 바벨 리스트 컬(Behind-the-Back Barbell Wrist Curl)은 전완근을 집중적으로 강화하는 운동입니다. 바벨을 엉덩이 뒤쪽에서 잡고, 손바닥이 뒤쪽을 향하도록 합니다. 팔꿈치를 고정한 채로 팔을 앞쪽으로 내밀어 바벨이 허리 뒤쪽에 위치하게 합니다. 손목을 천천히 아래로 내린 후, 손목을 위로 들어 바벨을 수축시킵니다. 이 운동은 손목과 전완근의 힘을 증가시키고, 손목의 안정성을 개선하는 데 효과적입니다.','팔','/home/ubuntu/images/exercise/Behind-the-back barbell wrist curl.gif'),(51,'시티드 바벨 리스트 컬','시티드 바벨 리스트 컬(Seated Barbell Wrist Curl)은 전완근을 강화하는 운동입니다. 벤치에 앉아 팔꿈치를 무릎에 고정하고 바벨을 손바닥이 위를 향하도록 잡습니다. 팔을 완전히 펴고 손목을 바닥 쪽으로 내린 후, 손목을 위로 들어 바벨을 수축시킵니다. 손목을 완전히 펴면서 바벨을 천천히 내려 시작 자세로 돌아옵니다. 이 운동은 손목과 전완근의 힘을 향상시키고, 전완근의 지구력을 증가시키는 데 효과적입니다.','팔','/home/ubuntu/images/exercise/Seated barbell wrist curl.gif'),(52,'바벨 리버스 컬','바벨 리버스 컬(Barbell Reverse Curl)은 전완근과 상부 이두근을 강화하는 운동입니다. 어깨너비로 바벨을 잡고 손바닥이 아래를 향하도록 하여 팔을 곧게 펴 시작합니다. 팔꿈치를 몸에 고정한 채로 손목을 위로 들어 바벨을 올리고, 이두근과 전완근이 수축되도록 합니다. 바벨을 천천히 원위치로 내리면서 시작 자세로 돌아옵니다. 이 운동은 전완근과 이두근의 힘을 개선하고, 팔의 전체적인 근력과 모양을 향상시키는 데 효과적입니다.','팔','/home/ubuntu/images/exercise/Barbell reverse curl.gif'),(53,'EZ 바 리버스 컬','EZ 바 리버스 컬(EZ Bar Reverse Curl)은 전완근과 상부 이두근을 강화하는 운동입니다. EZ 바를 손바닥이 아래를 향하도록 잡고 어깨너비로 벌립니다. 팔꿈치를 몸에 가까이 유지하면서 손목을 위로 들어 바벨을 올립니다. 이두근과 전완근이 수축되도록 하며, 바를 천천히 원위치로 내립니다. EZ 바의 곡선은 손목에 가해지는 부담을 줄여주며, 전완근의 힘과 이두근의 모양을 개선하는 데 효과적입니다.','팔','/home/ubuntu/images/exercise/EZ bar reverse curl.gif'),(54,'클로즈 그립 벤치프레스','바벨 JM 프레스(Barbell JM Press)는 가슴과 삼두근을 강화하는 운동입니다. 바벨을 어깨너비보다 약간 넓게 잡고, 벤치에 눕습니다. 바벨을 가슴 위로 들어 올린 후, 팔꿈치를 약간 굽혀 바벨을 이마 쪽으로 내립니다. 팔꿈치를 고정한 채로 삼두근의 힘으로 바벨을 위로 밀어 올립니다. 이 운동은 삼두근의 하부를 집중적으로 자극하며, 가슴과 삼두근의 전반적인 근력과 모양을 개선하는 데 효과적입니다.','팔','/home/ubuntu/images/exercise/Barbell JM press.gif'),(55,'바벨 스컬 크러셔','바벨 스컬 크러셔(Barbell Skull Crusher)는 삼두근을 집중적으로 강화하는 운동입니다. 벤치에 눕고, 바벨을 어깨너비보다 약간 넓게 잡습니다. 팔을 곧게 펴서 바벨을 가슴 위로 들고, 팔꿈치를 굽혀 바벨을 이마 쪽으로 천천히 내립니다. 팔꿈치를 고정한 상태에서 삼두근의 힘으로 바벨을 위로 밀어 올려 시작 자세로 돌아옵니다. 이 운동은 삼두근의 전체적인 발달을 촉진하고, 팔의 힘과 근육의 모양을 개선하는 데 효과적입니다.','팔','/home/ubuntu/images/exercise/Barbell skull crusher.gif'),(56,'케이블 컬','케이블 컬(Cable Curl)은 이두근을 강화하는 운동입니다. 케이블 머신의 하단에 부착된 핸들을 양손으로 잡고, 손바닥이 위를 향하도록 합니다. 팔꿈치를 몸에 붙이고, 팔을 완전히 펴서 시작합니다. 팔꿈치를 고정한 채로 손목을 위로 들어 핸들을 끌어올립니다. 이두근이 수축되는 느낌을 유지하며, 천천히 원위치로 돌아옵니다. 케이블의 지속적인 저항 덕분에 이두근을 효과적으로 발달시키고, 팔의 힘과 모양을 개선하는 데 유용합니다.','팔','/home/ubuntu/images/exercise/Cable curl.gif'),(57,'덤벨 컬','덤벨 컬(Dumbbell Curl)은 이두근을 강화하는 기본적인 운동입니다. 양손에 덤벨을 잡고 팔꿈치를 몸에 붙인 채로 팔을 곧게 펴서 시작합니다. 팔꿈치를 고정한 상태에서 덤벨을 천천히 위로 들어올려 이두근을 수축시킵니다. 손목을 고정하고, 이두근이 완전히 수축되었을 때 잠시 멈춘 후, 덤벨을 천천히 원위치로 내립니다. 이 운동은 이두근의 전반적인 발달을 촉진하며, 팔의 힘과 모양을 개선하는 데 효과적입니다.','팔','/home/ubuntu/images/exercise/Dumbbell curl.gif'),(58,'덤벨 리버스 컬','덤벨 리버스 컬(Dumbbell Reverse Curl)은 전완근과 상부 이두근을 강화하는 운동입니다. 양손에 덤벨을 잡고, 손바닥이 아래를 향하도록 합니다. 팔꿈치를 몸에 붙인 채로 팔을 곧게 펴서 시작합니다. 팔꿈치를 고정한 상태에서 손목을 위로 들어 덤벨을 올리면서 전완근과 이두근을 수축시킵니다. 덤벨을 천천히 원위치로 내리면서 시작 자세로 돌아옵니다. 이 운동은 전완근의 힘을 향상시키고, 팔의 전체적인 근력과 모양을 개선하는 데 효과적입니다.','팔','/home/ubuntu/images/exercise/Dumbbell reverse curl.gif'),(59,'덤벨 해머 프리처 컬','덤벨 해머 프리처 컬(Dumbbell Hammer Preacher Curl)은 이두근과 전완근을 강화하는 운동입니다. 프리처 벤치에 앉아 한 손에 덤벨을 잡고, 팔꿈치를 벤치에 올립니다. 손바닥이 서로를 향하도록 덤벨을 잡고, 팔꿈치를 고정한 채로 덤벨을 위로 들어 올려 이두근을 수축시킵니다. 덤벨을 천천히 원위치로 내리면서 시작 자세로 돌아옵니다. 이 운동은 이두근의 길이와 전완근의 힘을 동시에 강화하고, 팔의 전체적인 모양을 개선하는 데 효과적입니다.','팔','/home/ubuntu/images/exercise/Dumbbell hammer preacher curl.gif'),(60,'EZ 바 컬','EZ 바 컬(EZ Bar Curl)은 이두근을 효과적으로 강화하는 운동입니다. EZ 바를 어깨너비로 잡고, 손목이 자연스럽게 굽혀지도록 바를 잡습니다. 팔꿈치를 몸에 붙인 채 팔을 완전히 펴서 시작합니다. 팔꿈치를 고정한 상태에서 손목을 위로 들어 바를 올리며 이두근을 수축시킵니다. 바를 천천히 원위치로 내리면서 시작 자세로 돌아옵니다. EZ 바의 곡선은 손목에 가해지는 부담을 줄여주며, 이두근의 전체적인 발달을 촉진하고 팔의 힘과 모양을 개선하는 데 효과적입니다.','팔','/home/ubuntu/images/exercise/EZ bar curl.gif'),(61,'클로즈 그립 EZ 바 컬','클로즈-그립 EZ 바 컬(Close-Grip EZ Bar Curl)은 이두근의 발달을 집중적으로 지원하는 운동입니다. EZ 바를 손목이 자연스럽게 굽혀지도록 잡고, 손은 어깨너비보다 좁게 위치시킵니다. 팔꿈치를 몸에 붙이고 팔을 완전히 펴서 시작 자세를 취합니다. 팔꿈치를 고정한 상태에서 손목을 위로 들어 바를 올리며 이두근을 수축시킵니다. 바를 천천히 원위치로 내리면서 시작 자세로 돌아옵니다. 좁은 그립은 이두근의 긴 머리와 삼두근의 참여를 증가시켜, 이두근의 모양과 힘을 더욱 효과적으로 개선하는 데 도움이 됩니다.','팔','/home/ubuntu/images/exercise/Close-grip EZ bar curl.gif'),(62,'스위스 볼 라잉 트라이셉스 익스텐션','스위스 볼 라잉 트라이셉스 익스텐션(Swiss Ball Lying Triceps Extension)은 삼두근을 강화하는 운동입니다. 스위스 볼 위에 등을 대고 눕고, 두 발은 바닥에 고정합니다. 양손에 덤벨을 잡고 팔꿈치를 90도로 굽힌 상태에서 시작합니다. 팔꿈치를 고정하고, 덤벨을 천천히 머리 위로 펴서 삼두근을 수축시킵니다. 덤벨을 원위치로 천천히 내리면서 팔꿈치를 굽혀 시작 자세로 돌아옵니다. 이 운동은 삼두근의 전반적인 발달과 안정성을 향상시키며, 코어 근육의 균형을 동시에 강화하는 데 효과적입니다.','팔','/home/ubuntu/images/exercise/Swiss Ball Lying Triceps Extension.gif'),(63,'더티 독','더티 독(Dirty Dog)은 엉덩이와 엉덩이의 외회전 근육을 강화하는 운동입니다. 네 발로 기어가는 자세에서 시작합니다. 손과 무릎이 바닥에 닿고, 허리는 곧게 유지합니다. 한쪽 다리를 옆으로 들어 올리면서 엉덩이를 수축시키고, 다리를 가능한 한 높이 들어 올립니다. 잠시 유지한 후, 천천히 다리를 원위치로 내립니다. 양쪽 다리를 번갈아 가며 수행합니다. 이 운동은 둔근의 전반적인 발달을 촉진하고, 엉덩이의 안정성을 개선하는 데 효과적입니다.','하체','/home/ubuntu/images/exercise/Dirty Dog.gif'),(64,'사이드 라잉 클램 힙','사이드 라이잉 클램 힙(Side Lying Clam Hips)은 엉덩이와 엉덩이 외회전근을 강화하는 운동입니다. 바닥에 옆으로 누워 무릎을 구부리고 발을 서로 맞닿게 합니다. 팔은 몸 앞에 두거나 머리 아래에 배치합니다. 상단 무릎을 가능한 한 높이 들어 올리면서 엉덩이 외회전근을 수축시키고, 발은 서로 붙인 상태를 유지합니다. 잠시 유지한 후, 천천히 무릎을 원위치로 내립니다. 이 운동은 둔근의 외측과 엉덩이의 안정성을 강화하는 데 효과적입니다.','하체','/home/ubuntu/images/exercise/Side Lying Clam Hips.gif'),(65,'데드 버그','데드 버그(Dead Bug)는 코어 안정성을 강화하고 복부 근육을 발달시키는 운동입니다. 바닥에 누워 무릎을 90도로 굽히고 발은 바닥에서 떨어지게 합니다. 양팔은 천장을 향해 곧게 뻗습니다. 한쪽 팔과 반대쪽 다리를 천천히 바닥 쪽으로 내리면서 복부를 긴장시키고, 허리가 바닥에서 떨어지지 않도록 유지합니다. 팔과 다리를 다시 시작 위치로 천천히 올립니다. 양쪽 팔과 다리를 번갈아 가며 반복합니다. 이 운동은 코어 근육의 힘과 균형을 개선하고, 복부의 안정성을 높이는 데 효과적입니다.','기타','/home/ubuntu/images/exercise/Dead Bug.gif'),(66,'런지','런지(Lunge)는 하체 근육을 강화하는 기본적인 운동입니다. 발을 어깨너비로 벌리고 서서, 한쪽 발을 앞으로 크게 내딛습니다. 이때 두 무릎이 90도로 굽히면서 뒷다리는 거의 바닥에 닿을 정도로 내려갑니다. 앞쪽 발에 체중을 실고 엉덩이와 허벅지 근육을 사용해 몸을 다시 일으키면서 시작 자세로 돌아옵니다. 양쪽 다리를 번갈아 가며 반복합니다. 이 운동은 대퇴사두근, 햄스트링, 둔근을 강화하고 하체의 균형과 안정성을 개선하는 데 효과적입니다.','하체','/home/ubuntu/images/exercise/Lunge.gif'),(67,'익스터널 숄더 로테이션','익스터널 숄더 로테이션 (External shoulder rotation)이 운동은 어깨의 외회전을 강화하는 운동입니다. 케이블이나 밴드를 사용하여 팔꿈치를 몸에 고정한 상태에서 팔을 바깥쪽으로 돌려 어깨의 외회전 근육을 활성화시킵니다. 어깨의 안정성과 회전근개 강화에 매우 효과적입니다.','어깨','/home/ubuntu/images/exercise/익스터널 숄더 로테이션.gif'),(68,'케이블 익스터널 숄더 로테이션','케이블 익스터널 숄더 로테이션 (Cable external shoulder rotation)케이블을 사용하여 어깨의 외회전을 강화하는 운동입니다. 케이블을 잡고 팔꿈치를 몸에 고정한 채로 바깥쪽으로 돌리면서 어깨의 외회전 근육을 강화합니다. 특히 회전근개 부상을 예방하는 데 유용합니다.','어깨','/home/ubuntu/images/exercise/케이블 익스터널 숄더 로테이션.gif'),(69,'인터널 숄더 로테이션','인터널 숄더 로테이션 (Internal shoulder rotation)어깨의 내회전을 강화하는 운동입니다. 케이블이나 밴드를 이용하여 팔꿈치를 몸에 고정한 상태에서 팔을 안쪽으로 돌려 어깨의 내회전 근육을 활성화시킵니다. 어깨의 전반적인 안정성을 높이는 데 도움이 됩니다.','어깨','/home/ubuntu/images/exercise/인터널 숄더 로테이션.gif'),(70,'덤벨 스콧 프레스','덤벨 스콧 프레스 (Dumbbell Scott press)덤벨을 사용하여 스콧 벤치에서 진행하는 어깨 프레스 운동입니다. 덤벨을 어깨 높이에서 시작하여 머리 위로 올려 어깨의 전반적인 근력을 강화합니다. 특히 삼각근과 상완 이두근을 강화하는 데 효과적입니다.','어깨','/home/ubuntu/images/exercise/덤벨 스콧 프레스.gif'),(71,'바벨 프론트 슈러그','바벨 프론트 슈러그 (Barbell Front shrugs)바벨을 사용하여 승모근을 강화하는 운동입니다. 바벨을 잡고 어깨를 들어올려 승모근을 수축시키고, 천천히 원위치로 돌아옵니다. 목과 어깨의 상부 근육을 발달시키는 데 유용합니다.','어깨','/home/ubuntu/images/exercise/바벨 프론트 슈러그.gif'),(72,'머신 시티드 카프 레이즈','머신 시티드 카프 레이즈 (Machine seated calf raise)머신을 사용하여 종아리 근육을 강화하는 운동입니다. 앉은 자세에서 발볼을 지지대에 올리고 발끝을 위로 들어올려 종아리 근육을 수축시킵니다. 하체의 안정성과 종아리 근육 발달에 효과적입니다.','하체','/home/ubuntu/images/exercise/머신 시티드 카프 레이즈.gif'),(73,'그립리스 슈러그','그립리스 슈러그 (Gripless shrug)바벨이나 덤벨을 사용하지 않고 승모근을 강화하는 운동입니다. 손을 자유롭게 두고 어깨를 들어올려 승모근을 수축시킵니다. 그립의 제한 없이 승모근을 집중적으로 발달시킬 수 있습니다.','어깨','/home/ubuntu/images/exercise/그립리스 슈러그.gif'),(74,'바벨 런지','바벨 런지 (Barbell lunge)바벨을 어깨에 얹고 런지 자세를 취하여 하체 근육을 강화하는 운동입니다. 한 발을 앞으로 내딛고 무릎을 굽히면서 허벅지와 엉덩이 근육을 자극합니다. 하체의 힘과 균형을 발달시키는 데 유용합니다.','하체','/home/ubuntu/images/exercise/바벨 런지.gif'),(75,'사이드 플랭크','사이드 플랭크 (Side plank)옆으로 누워 몸을 지지하는 운동으로, 코어 근육을 강화합니다. 팔꿈치와 발을 지지하여 몸을 일직선으로 유지하며, 옆구리 근육을 강화하고 균형을 향상시킵니다.','기타','/home/ubuntu/images/exercise/사이드 플랭크.gif'),(76,'푸쉬업','푸쉬업 (Push-ups)가슴, 삼두근, 어깨 근육을 강화하는 기본적인 체중 운동입니다. 손을 어깨 너비로 벌리고 팔을 굽혀 가슴을 바닥에 가깝게 내린 후 다시 밀어올려 원위치로 돌아옵니다. 상체 전반의 근력을 발달시키는 데 효과적입니다.','가슴','/home/ubuntu/images/exercise/푸쉬업.gif'),(77,'디클라인 덤벨 플라이','디클라인 덤벨 플라이 (Decline dumbbell fly)디클라인 벤치에서 덤벨을 사용하여 가슴 근육을 강화하는 운동입니다. 덤벨을 양손에 들고 가슴을 열면서 팔을 옆으로 펼친 후, 다시 모아줍니다. 특히 가슴 하부 근육을 집중적으로 발달시키는 데 유용합니다.','가슴','/home/ubuntu/images/exercise/디클라인 덤벨 플라이.gif'),(78,'덤벨 슈러그','덤벨 슈러그 (Dumbbell shrug)덤벨을 사용하여 승모근을 강화하는 운동입니다. 덤벨을 잡고 어깨를 들어올려 승모근을 수축시킨 후 천천히 원위치로 돌아옵니다. 어깨 상부와 목 근육 발달에 효과적입니다.','어깨','/home/ubuntu/images/exercise/덤벨 슈러그.gif'),(79,'딥 스모 시트','딥 스모 시트 (Deep sumo seat)하체의 전반적인 근력을 강화하는 운동으로, 스모 스쿼트 자세에서 깊게 앉아 엉덩이와 허벅지 근육을 집중적으로 자극합니다. 하체 근육의 발달과 안정성 향상에 매우 유용합니다.','하체','/home/ubuntu/images/exercise/딥 스모 시트.gif'),(80,'언더 그립 바벨 로우','인클라인 바벨 로잉 (Incline barbell rowing)인클라인 벤치에서 바벨을 사용하여 등 근육을 강화하는 운동입니다. 바벨을 가슴 쪽으로 당기며 등 전체를 수축시킵니다. 상부 및 중부 등 근육을 발달시키는 데 효과적입니다.','등','/home/ubuntu/images/exercise/인클라인 바벨 로잉.gif'),(81,'바벨 슈러그','바벨 슈러그 (Barbell shrug)바벨을 사용하여 승모근을 강화하는 운동입니다. 바벨을 잡고 어깨를 들어올려 승모근을 수축시킨 후 천천히 원위치로 돌아옵니다. 목과 어깨의 상부 근육을 집중적으로 발달시킬 수 있습니다.','어깨','/home/ubuntu/images/exercise/바벨 슈러그.gif'),(82,'백 익스텐션','백 익스텐션 (Back extension)허리를 강화하는 운동으로, 특히 허리와 척추 기립근을 강화하는 데 효과적입니다. 벤치에 엎드려 상체를 들어 올리며 허리 근육을 수축시킵니다. 척추의 안정성을 높이고 허리 근육을 강화하는 데 유용합니다.','기타','/home/ubuntu/images/exercise/백 익스텐션.gif'),(83,'풀업','풀업 (Pull-up)체중을 이용하여 등 근육을 강화하는 운동입니다. 바를 잡고 몸을 위로 당겨 턱이 바 위로 올라오도록 합니다. 광배근을 포함한 상체 전반의 근력을 발달시키는 데 매우 효과적입니다.','등','/home/ubuntu/images/exercise/풀업.gif'),(84,'덤벨 런지','덤벨 런지 (Dumbbell lunge)덤벨을 양손에 들고 런지 자세를 취하여 하체 근육을 강화하는 운동입니다. 한 발을 앞으로 내딛고 무릎을 굽히면서 허벅지와 엉덩이 근육을 자극합니다. 균형과 하체 근력을 강화하는 데 유용합니다.','하체','/home/ubuntu/images/exercise/덤벨 런지.gif'),(85,'시티드 로우','시티드 케이블 로우 (Seated cable row)케이블 머신을 사용하여 등을 강화하는 운동입니다. 앉은 자세에서 케이블을 가슴 쪽으로 당기며 등 근육을 수축시킵니다. 상부 및 중부 등 근육 발달에 효과적입니다.','등','/home/ubuntu/images/exercise/시티드 케이블 로우.png'),(86,'라잉 바이셉스 컬','라잉 바이셉스 컬 (Lying biceps curls)누운 자세에서 이두근을 강화하는 운동입니다. 덤벨을 양손에 들고 팔꿈치를 몸에 고정한 채로 덤벨을 위로 들어올려 이두근을 수축시킵니다. 이두근의 전반적인 발달과 팔의 모양을 개선하는 데 효과적입니다.','하체','/home/ubuntu/images/exercise/라잉 바이셉스 컬.png'),(87,'시티드 레그 컬','시티드 레그 컬 (Seated leg curl)머신을 사용하여 햄스트링을 강화하는 운동입니다. 앉은 자세에서 다리를 굽혀 햄스트링을 수축시킵니다. 허벅지 뒤쪽 근육을 집중적으로 발달시키는 데 유용합니다.','하체','/home/ubuntu/images/exercise/시티드 레그 컬.png'),(88,'EZ 바 컬','EZ 바 컬 (EZ bar curl)EZ 바를 사용하여 이두근을 강화하는 운동입니다. 팔꿈치를 몸에 고정한 채로 EZ 바를 들어올려 이두근을 수축시킵니다. 손목에 무리가 덜 가며, 이두근의 발달에 효과적입니다.','팔','/home/ubuntu/images/exercise/EZ 바 컬.png'),(89,'덤벨 벤트오버 래터럴 레이즈','덤벨 벤트오버 래터럴 레이즈 (Dumbbell bent-over lateral raise)덤벨을 사용하여 어깨 후면을 강화하는 운동입니다. 상체를 앞으로 기울이고 덤벨을 옆으로 들어 어깨 후면을 수축시킵니다. 후면 삼각근을 집중적으로 발달시키는 데 유용합니다.','어깨','/home/ubuntu/images/exercise/덤벨 벤트오버 래터럴 레이즈.gif'),(90,'아이소메트릭 와이퍼','아이소메트릭 와이퍼 (Isometric wiper)가슴과 코어를 강화하는 아이소메트릭 운동입니다. 몸을 일직선으로 유지하며, 다리를 좌우로 움직여 코어 근육을 강화합니다. 특히 코어의 안정성과 가슴 근육의 발달에 효과적입니다.','가슴','/home/ubuntu/images/exercise/아이소메트릭 와이퍼.gif'),(91,'버티컬 레그 크런치','버티컬 레그 크런치 (Vertical leg crunch)코어를 강화하는 운동으로, 누운 자세에서 다리를 수직으로 들어올린 채로 상체를 들어 복근을 수축시킵니다. 특히 하복부 근육을 집중적으로 자극하는 데 유용합니다.','기타','/home/ubuntu/images/exercise/버티컬 레그 크런치.png'),(92,'시티드 덤벨 오버헤드 프레스','시티드 덤벨 오버헤드 프레스 (Seated dumbbell overhead press)덤벨을 사용하여 어깨 근육을 강화하는 운동입니다. 앉은 자세에서 덤벨을 어깨 높이에서 시작하여 머리 위로 들어 올려 삼각근을 발달시킵니다. 어깨 전반의 근력을 강화하는 데 효과적입니다.','어깨','/home/ubuntu/images/exercise/시티드 덤벨 오버헤드 프레스.gif'),(93,'벤트 오버 투암 덤벨 로우','벤트 오버 투암 덤벨 로우 (Bent-over two-arm dumbbell row)덤벨을 사용하여 등 근육을 강화하는 운동입니다. 상체를 앞으로 기울인 자세에서 덤벨을 가슴 쪽으로 당기며 등 근육을 수축시킵니다. 특히 상부 및 중부 등 근육을 발달시키는 데 유용합니다.','등','/home/ubuntu/images/exercise/벤트 오버 투암 덤벨 로우.gif'),(94,'스태빌리티 볼 잭나이프','스태빌리티 볼 잭나이프 (Stability ball jackknife)스태빌리티 볼을 사용하여 코어를 강화하는 운동입니다. 팔로 몸을 지지하고 다리를 스태빌리티 볼 위에 올린 후, 무릎을 가슴 쪽으로 당겨 코어를 수축시킵니다. 코어의 안정성과 균형을 향상시키는 데 효과적입니다.','기타','/home/ubuntu/images/exercise/스태빌리티 볼 잭나이프.gif'),(95,'케틀벨 스윙','케틀벨 스윙 (Kettlebell swing)케틀벨을 사용하여 전신을 강화하는 운동입니다. 케틀벨을 다리 사이로 뒤로 스윙한 후, 엉덩이와 다리 힘으로 케틀벨을 앞으로 스윙하여 전신 근육을 활성화시킵니다. 하체와 코어, 그리고 심폐 기능을 동시에 강화하는 데 효과적입니다.','하체','/home/ubuntu/images/exercise/케틀벨 스윙.gif'),(96,'덤벨 포워드 런지','덤벨 포워드 런지 (Dumbbell forward-leaning lunge)덤벨을 들고 상체를 약간 앞으로 기울인 런지 자세를 취하여 하체 근육을 강화하는 운동입니다. 허벅지와 엉덩이 근육을 집중적으로 자극하며, 균형과 하체의 안정성을 강화하는 데 유용합니다.','하체','/home/ubuntu/images/exercise/덤벨 포워드 런지.gif'),(97,'스태빌리티 볼 푸쉬업','스태빌리티 볼 푸쉬업 (Stability ball push-up)스태빌리티 볼을 사용하여 가슴과 코어를 강화하는 푸쉬업입니다. 손을 스태빌리티 볼 위에 올리고 푸쉬업을 진행하여 균형과 근력을 동시에 발달시킵니다. 특히 코어와 가슴 근육의 안정성 향상에 효과적입니다.','가슴','/home/ubuntu/images/exercise/스태빌리티 볼 푸쉬업.gif'),(98,'덤벨 벤치 프레스','덤벨 벤치 프레스 (Dumbbell bench press)덤벨을 사용하여 가슴 근육을 강화하는 운동입니다. 벤치에 누워 덤벨을 가슴 위로 들어 올려 가슴 근육을 수축시킵니다. 가슴 근육의 전반적인 발달과 상체 근력을 강화하는 데 유용합니다.','가슴','/home/ubuntu/images/exercise/덤벨 벤치 프레스.png'),(99,'시티드 벤트 오버 래터럴 레이즈','시티드 벤트 오버 래터럴 레이즈 (Seated bent-over lateral raise)앉은 자세에서 상체를 앞으로 기울이고 덤벨을 옆으로 들어 어깨 후면을 강화하는 운동입니다. 후면 삼각근을 집중적으로 발달시키는 데 효과적입니다.','어깨','/home/ubuntu/images/exercise/시티드 벤트 오버 래터럴 레이즈.gif'),(100,'레버 벤트 오버 로우','레버 벤트 오버 로우 (Lever Bent over Row)레버 머신을 사용하여 등 근육을 강화하는 운동입니다. 상체를 앞으로 기울인 자세에서 레버를 당겨 등 근육을 수축시킵니다. 상부 및 중부 등 근육 발달에 유용합니다.','등','/home/ubuntu/images/exercise/레버 벤트 오버 로우.gif'),(101,'라잉 싱글 스트레이트 레그 힙 익스텐션','라잉 싱글 스트레이트 레그 힙 익스텐션 (Lying single straight-leg hip extension)누운 자세에서 다리를 펴고 엉덩이를 들어올려 엉덩이 근육을 강화하는 운동입니다. 한 다리를 들어올려 힙 근육을 집중적으로 자극하며, 엉덩이와 하체의 안정성을 강화하는 데 효과적입니다.','기타','/home/ubuntu/images/exercise/라잉 싱글 스트레이트 레그 힙 익스텐션.png'),(102,'바이시클 크런치','바이시클 크런치 (Bicycle crunch)누운 자세에서 자전거 페달을 밟는 듯한 움직임으로 복근을 강화하는 운동입니다. 복근을 꼬면서 상체와 하체를 동시에 사용하여 복근 전체를 발달시키는 데 유용합니다.','기타','/home/ubuntu/images/exercise/바이시클 크런치.gif'),(103,'데드리프트','바벨 데드리프트 (Barbell deadlift)바벨을 사용하여 전신을 강화하는 운동입니다. 바벨을 바닥에서 들어올리며 하체와 등 근육을 동시에 자극합니다. 전신 근력 향상과 함께 하체와 허리의 근력을 강화하는 데 효과적입니다.','등','/home/ubuntu/images/exercise/바벨 데드리프트.gif'),(104,'언더 그립 바벨 로우','언더핸드 예티스 로우 (Underhand Yates row)바벨을 언더핸드 그립으로 잡고 상체를 앞으로 기울인 상태에서 바벨을 당겨 등 근육을 강화하는 운동입니다. 특히 하부 등 근육을 집중적으로 발달시키는 데 유용합니다.','등','/home/ubuntu/images/exercise/언더핸드 예티스 로우.gif'),(105,'싯업','싯업 (Sit-up)누운 자세에서 상체를 일으켜 복근을 강화하는 기본적인 운동입니다. 복근을 수축시켜 상체를 들어올리고 다시 천천히 내려 복근을 강화합니다. 복부의 전반적인 근력 향상에 효과적입니다.','기타','/home/ubuntu/images/exercise/싯업.gif'),(106,'프론트 프랭크','프론트 프랭크 (Front plank)코어 근육을 강화하는 정적 운동으로, 팔꿈치와 발가락을 지지하여 몸을 일직선으로 유지합니다. 코어와 복부 근육의 안정성을 높이는 데 매우 효과적입니다.','기타','/home/ubuntu/images/exercise/프론트 프랭크.png'),(107,'얼터네이팅 덤벨 프론트 레이즈','Alternating Dumbbell Front Raise (얼터네이팅 덤벨 프론트 레이즈)는 어깨의 전면 삼각근을 강화하는 운동입니다. 덤벨을 번갈아 가며 앞쪽으로 들어 올려 어깨의 전반적인 근력을 증가시킵니다. 양손에 덤벨을 들고, 한쪽 팔씩 어깨 높이까지 올렸다가 천천히 내립니다.','어깨','/home/ubuntu/images/exercise/Alternating dumbbell front raise.gif'),(108,'바벨 와이드 그립 업라이트 로우','Barbell Wide-Grip Upright Row (바벨 와이드 그립 업라이트 로우)는 넓은 그립으로 바벨을 당겨 어깨의 측면과 상부를 자극하는 운동입니다. 팔꿈치를 어깨 높이까지 올려 어깨 근육을 강화하고, 근육의 밸런스를 맞추는 데 효과적입니다.','어깨','/home/ubuntu/images/exercise/Barbell wide-grip upright row.gif'),(109,'케이블 트라이셉스 킥백','Cable Triceps Kickback (케이블 트라이셉스 킥백)은 케이블을 사용하여 삼두근(팔 뒤쪽)을 강화하는 운동입니다. 팔꿈치를 몸에 고정한 상태에서 팔을 뒤로 펴 삼두근을 수축시키며, 팔 뒤쪽의 근육을 강화합니다.','팔','/home/ubuntu/images/exercise/Cable triceps kickback.gif'),(110,'클로즈 그립 푸쉬 업','Close-Grip Push-Up (클로즈 그립 푸쉬 업)은 손을 좁게 위치시켜 삼두근과 가슴을 집중적으로 자극하는 푸쉬업입니다. 팔꿈치를 몸 옆으로 붙이며 푸쉬업을 수행하여 삼두근을 효과적으로 강화합니다.','팔','/home/ubuntu/images/exercise/Close-grip push-up.gif'),(111,'볼 레그 레이즈 크런치','Crunch with Stability Ball Leg Raise (볼 레그 레이즈 크런치)는 복부와 하복부를 동시에 강화하는 운동입니다. 스테빌리티 볼을 다리 사이에 끼우고, 상체를 들어 올리는 크런치와 다리를 들어 올리는 레그 레이즈를 병행하여 복부의 근력을 집중적으로 자극합니다.','기타','/home/ubuntu/images/exercise/Crunch with stability ball leg raise.gif'),(112,'델토이드 레이즈','Deltoid Raise (델토이드 레이즈)는 어깨의 삼각근 전체를 강화하는 운동입니다. 덤벨을 양손에 들고, 팔을 양옆으로 들어 어깨 높이까지 올려 어깨의 측면과 후면을 자극합니다.','어깨','/home/ubuntu/images/exercise/Deltoid Raise.gif'),(113,'덤벨 아놀드 프레스','Dumbbell Arnold Press (덤벨 아놀드 프레스)는 어깨 전면과 측면을 동시에 강화하는 복합 운동입니다. 덤벨을 어깨 앞에서 시작하여 머리 위로 밀어 올리며 손바닥을 바깥쪽으로 돌려 어깨 근육을 효과적으로 자극합니다.','어깨','/home/ubuntu/images/exercise/Dumbbell Arnold Press.gif'),(114,'사이드 레터럴 레이즈','Dumbbell Lateral Raise (덤벨 레터럴 레이즈)는 어깨의 측면 삼각근을 강화하는 운동입니다. 덤벨을 양손에 들고, 팔을 양옆으로 들어 어깨 높이까지 올려 어깨의 폭을 넓히는 데 도움이 됩니다.','어깨','/home/ubuntu/images/exercise/Dumbbell lateral raise.gif'),(115,'행잉 레그레이즈','Hanging Leg Raise (행잉 레그레이즈)는 매달린 상태에서 다리를 들어 올려 하복부를 강화하는 운동입니다. 바에 매달린 상태에서 다리를 곧게 펴거나 굽혀서 들어 올리며 하복부와 엉덩이 근육을 자극합니다.','기타','/home/ubuntu/images/exercise/Hanging leg raise.gif'),(116,'하이 리버스 플랭크','High Reverse Plank (하이 리버스 플랭크)은 몸을 일자로 유지하면서 엉덩이와 하체를 강화하는 운동입니다. 손과 발을 바닥에 대고 엉덩이를 들어 올려 몸이 일직선이 되도록 유지하며, 코어와 하체의 힘을 강화합니다.','기타','/home/ubuntu/images/exercise/High reverse plank.gif'),(117,'힙 트러스트','Hip Thrust (힙 트러스트)는 엉덩이 근육을 강화하는 운동으로, 힙을 들어 올리는 동작을 통해 하체를 자극합니다. 상체를 벤치에 놓고 바벨을 엉덩이 위에 두고 엉덩이를 최대한 들어 올린 후 천천히 내립니다.','하체','/home/ubuntu/images/exercise/hip thrust.gif'),(118,'인클라인 덤벨 플라이','Incline Dumbbell Fly (인클라인 덤벨 플라이)는 상체를 기울인 상태에서 덤벨을 양손에 들고 팔을 벌렸다가 모아주는 운동입니다. 이 운동은 상부 가슴 근육을 집중적으로 자극하며, 가슴의 전체적인 모양을 개선하는 데 도움을 줍니다. 인클라인 벤치에 누워 팔을 넓게 벌리고 덤벨을 천천히 모아 가슴 근육의 수축을 느끼며 수행합니다.','가슴','/home/ubuntu/images/exercise/Incline dumbbell fly.gif'),(119,'레그프레스','Leg Press (레그프레스)는 하체를 강화하는 기본 운동입니다. 레그프레스 머신에서 발판을 밀어내며 대퇴사두근과 엉덩이 근육을 강화합니다.','하체','/home/ubuntu/images/exercise/LEG PRESS.gif'),(120,'어시스트 머신 클로즈 풀업','Machine-Assisted Close Neutral-Grip Pull-Up (어시스트 머신 클로즈 풀업)은 클로즈 그립으로 어시스트 머신을 사용하여 등과 팔의 근육을 강화하는 운동입니다. 중량을 조절하여 자신에게 맞는 난이도로 등 근육과 팔의 힘을 증가시킵니다.','등','/home/ubuntu/images/exercise/Machine-assisted close neutral-grip pull-up.gif'),(121,'원암 덤벨 벤트오버 레터럴 레이즈','One-Arm Dumbbell Bent-Over Lateral Raise (원암 덤벨 벤트오버 레터럴 레이즈)는 몸을 앞으로 기울이고 한쪽 팔씩 들어 올려 어깨 후면을 강화하는 운동입니다. 덤벨을 사용하여 어깨 후면과 상부의 근육을 자극합니다.','어깨','/home/ubuntu/images/exercise/One-arm dumbbell bent-over lateral raise.gif'),(122,'인클라인 와이드 업라이트 로우','Prone Incline Wide-Grip Upright Row (인클라인 와이드 업라이트 로우)는 인클라인 벤치에서 넓은 그립으로 바벨을 당겨 등 상부와 어깨 측면을 자극하는 운동입니다. 팔꿈치를 어깨 높이까지 올려 근육의 강도를 증가시킵니다.','등','/home/ubuntu/images/exercise/Prone incline wide-grip upright row.gif'),(123,'러시안 트위스트','Russian Twists (러시안 트위스트)는 복부와 옆구리 근육을 강화하는 회전 운동입니다. 앉은 자세에서 상체를 뒤로 기울이고, 양손에 덤벨이나 메디슨 볼을 들고 좌우로 회전하여 복부 측면을 자극합니다.','기타','/home/ubuntu/images/exercise/Russian Twists.gif'),(124,'시티드 얼터네이트 덤벨 프론트 레이즈','Seated Alternating Dumbbell Front Raise (시티드 얼터네이트 덤벨 프론트 레이즈)는 앉은 상태에서 팔을 번갈아가며 들어 올려 어깨 전면을 강화하는 운동입니다. 안정된 자세에서 어깨의 힘을 집중적으로 활용할 수 있습니다.','어깨','/home/ubuntu/images/exercise/Seated alternating dumbbell front raise.gif'),(125,'시티드 덤벨 프론트 레이즈','Seated Dumbbell Front Raise (시티드 덤벨 프론트 레이즈)는 앉은 상태에서 양팔을 동시에 앞쪽으로 들어 올리는 운동입니다. 어깨 전면을 강화하고 안정성을 높이는 데 효과적입니다.','어깨','/home/ubuntu/images/exercise/Seated dumbbell front raise.gif'),(126,'시티드 덤벨 오버헤드 프레스','Seated Dumbbell Overhead Press (시티드 덤벨 오버헤드 프레스)는 앉은 상태에서 덤벨을 머리 위로 밀어 어깨를 강화하는 운동입니다. 어깨의 전반적인 힘을 증가시키고, 안정성 향상에 도움을 줍니다.','어깨','/home/ubuntu/images/exercise/Seated dumbbell overhead press.gif'),(127,'숄더 프레스','Shoulder Press (숄더 프레스)는 어깨 전반을 강화하는 기본적인 운동입니다. 덤벨이나 바벨을 어깨 높이에서 시작하여 머리 위로 밀어 어깨 근육의 힘과 크기를 증가시킵니다.','어깨','/home/ubuntu/images/exercise/Shoulder Press.gif'),(128,'스미스 머신 벤트 니 굿모닝','Smith Machine Bent-Knee Good Morning (스미스 머신 벤트 니 굿모닝)은 하체와 하부 등 근육을 강화하는 운동입니다. 스미스 머신을 사용하여 바벨을 어깨 위에 놓고 무릎을 살짝 굽힌 상태에서 상체를 앞으로 기울입니다. 하체와 허리의 근육을 자극하며, 허리의 안정성과 하체의 힘을 증가시키는 데 도움이 됩니다.','등','/home/ubuntu/images/exercise/Smith machine bent-knee good morning.gif'),(129,'스위스 볼 롤아웃','Swiss Ball Rollout (스위스 볼 롤아웃)은 코어를 강화하는 운동으로, 스위스 볼을 사용하여 복부와 하체를 자극합니다. 무릎을 바닥에 대고 스위스 볼 위에 손을 대고 상체를 앞으로 밀어 복부를 수축시킵니다.','기타','/home/ubuntu/images/exercise/Swiss Ball Rollout.gif'),(130,'테이트 프레스','Tate Press (테이트 프레스)는 삼두근을 강화하는 덤벨 운동입니다. 팔꿈치를 굽힌 상태에서 덤벨을 가슴 쪽으로 내리고 삼두근을 수축시키며 들어 올리는 동작으로, 삼두근의 힘과 크기를 증가시킵니다.','팔','/home/ubuntu/images/exercise/Tate press.gif'),(131,'트위스트 크런치','Twisting Crunch (트위스트 크런치)는 복부의 측면 근육을 강화하는 크런치 운동입니다. 상체를 들어 올릴 때 몸통을 좌우로 비틀어 옆구리 근육에 자극을 줍니다.','기타','/home/ubuntu/images/exercise/Twisting crunch.gif'),(132,'트위스트 힙 익스텐션','Twisting Hip Extension (트위스트 힙 익스텐션)은 엉덩이와 하체를 강화하며 동시에 몸통을 비틀어 코어를 자극하는 운동입니다. 엎드린 자세에서 한쪽 다리씩 들어 올리며 상체를 비틀어 엉덩이와 하체의 근육을 강화하고, 코어의 안정성을 높이는 데 효과적입니다.','하체','/home/ubuntu/images/exercise/Twisting hip extension.gif'),(133,'버티컬 레그 크런치','Vertical Leg Crunch (버티컬 레그 크런치)는 하복부를 집중적으로 자극하는 크런치 운동입니다. 다리를 수직으로 들어 올리고 상체를 들어 올려 복부를 수축시킵니다.','기타','/home/ubuntu/images/exercise/Vertical leg crunch.gif'),(134,'웨이트 프론트 레이즈','Weighted Front Raise (웨이트 프론트 레이즈)는 덤벨이나 바벨을 사용하여 팔을 앞쪽으로 들어 올리는 운동입니다. 어깨 전면의 근력을 강화하고, 보다 강한 어깨를 만들기 위한 기본 운동입니다.','어깨','/home/ubuntu/images/exercise/Weighted Front Raise.gif'),(135,'덤벨 박스 스쿼트','덤벨 박스 스쿼트 (Dumbbell Box Squat)는 덤벨을 들고 박스나 벤치 앞에서 스쿼트를 하는 운동입니다. 이 운동은 대퇴사두근과 대둔근을 주로 타겟으로 하며, 협력 근육으로는 대내전근과 가자미근이 작용합니다. 엉덩이를 뒤로 밀며 스쿼트를 하여 하체와 허리의 안정성을 높이는 데 효과적입니다. 무릎 문제를 가진 사람들에게도 적합하며, 초보자에게는 권장되지 않습니다.','하체','/home/ubuntu/images/exercise/Dumbbell Bench Squat.gif'),(136,'힙 레이즈','힙 레이즈(Hip Raise)는 주로 오르비탈 코어 근육을 타겟으로 하는 무산소, 칼리스테닉 운동입니다. 주된 타겟 근육은 복직근이며, 보조 근육으로는 외복사근과 대내전근이 작용합니다. 이 운동은 장비 없이 체중을 이용하여 수행됩니다. 바닥에 등을 대고 눕고, 손바닥을 바닥에 대고 팔을 펼쳐 초기 자세를 취합니다. 엉덩이를 들어 올리면서 무릎 각도를 유지하며, 복근이 완전히 수축될 때까지 들었다가 1초간 멈춥니다. 엉덩이와 다리를 천천히 내리며 숨을 내쉬고 반복합니다.','기타','/home/ubuntu/images/exercise/Hip Raise.gif'),(137,'리버스 크런치','리버스 크런치(Reverse Crunch)는 주로 복직근을 타겟으로 하는 고립 운동입니다. 보조 근육으로는 외복사근과 장요근이 작용합니다. 이 운동은 하체를 들어 올려 복부를 수축시키며 복근을 강화합니다. 허리를 바닥에 밀착시켜 지지한 상태에서, 엉덩이를 들어 올리며 복부를 수축합니다. 운동 중에는 천천히 움직이며, 모멘텀을 사용하지 않도록 주의해야 합니다.','기타','/home/ubuntu/images/exercise/Reverse Crunch.gif'),(138,'피스톨 스쿼트 투 박스','피스톨 스쿼트 투 박스(Pistol Squat to Box)는 주로 대퇴사두근을 타겟으로 하는 복합 운동입니다. 보조 근육으로는 대둔근, 햄스트링, 비복근, 그리고 코어 근육이 작용합니다. 이 운동은 한쪽 다리로 스쿼트를 하여 균형과 안정성을 향상시키며, 하체 근력을 강화하는 데 효과적입니다. 박스를 사용하여 운동의 난이도를 조절할 수 있으며, 스쿼트 동작 중에 하체와 코어의 협응을 요구합니다.','하체','/home/ubuntu/images/exercise/Pistol Squat to Box.gif'),(139,'사이드 런지 스트레치','사이드 런지 스트레치(Side Lunge Stretch)는 주로 대퇴사두근, 내전근, 그리고 둔근을 타겟으로 하는 운동입니다. 이 운동은 하체의 유연성을 증가시키고, 균형과 안정성을 향상시키는 데 도움이 됩니다. 몸의 한쪽 무릎을 굽히며, 반대쪽 다리는 똑바로 유지하면서 스트레칭을 수행합니다. 자세를 유지하며 균형을 잡는 것이 중요하며, 무릎이 발끝을 넘어가지 않도록 주의해야 합니다.','하체','/home/ubuntu/images/exercise/Side Lunge Stretch.gif'),(140,'크런치 (손 머리 위로)','크런치(손 머리 위로)는 주로 복직근을 타겟으로 하는 고립 운동입니다. 이 운동은 복부의 근력을 강화하는 데 효과적입니다. 손을 머리 위로 올려두고 크런치를 수행하면 상체를 들어 올릴 때 복부에 더 큰 긴장을 가할 수 있어, 복근의 근력을 더욱 효과적으로 자극할 수 있습니다.','기타','/home/ubuntu/images/exercise/Crunch(Hands Overhead).gif'),(141,'니링 케이블 크런치','니링 케이블 크런치(Kneeling Cable Crunch)는 주로 복직근을 타겟으로 하는 고립 운동입니다. 보조 근육으로는 외복사근이 작용합니다. 이 운동은 무릎을 꿇고 케이블을 이용해 상체를 구부리며 복근을 수축시키는 동작으로, 복부 근력을 강화하는 데 효과적입니다. 엉덩이를 고정한 상태에서 로프를 아래로 당겨 복부를 수축하며, 허리를 둥글게 만듭니다.','기타','/home/ubuntu/images/exercise/Kneeling Cable Crunch.gif'),(142,'크런치 (팔 곧게)','크런치(팔 곧게)는 주로 복직근을 타겟으로 하는 고립 운동입니다. 이 운동은 복근을 강화하기 위해 팔을 곧게 펴서 상체를 들어 올리며 수행됩니다. 팔을 곧게 펴고 상체를 들어 올리면서 복부에 더 큰 긴장을 가해, 복근의 근력을 더욱 효과적으로 자극할 수 있습니다.','기타','/home/ubuntu/images/exercise/Crunch(Arms Straight).gif'),(143,'바닥 크런치','바닥 크런치(Crunch Floor)는 주로 복직근을 타겟으로 하는 고립 운동입니다. 이 운동은 바닥에 누워서 상체를 들어 올려 복근을 강화하는 동작으로 이루어집니다. 다리를 굽히고 어깨 너비로 벌려 발바닥이 바닥에 완전히 닿도록 하며, 손은 머리 옆이나 가슴 위에 놓습니다. 복부를 수축하며 상체를 들어 올리고, 천천히 원래 자세로 돌아옵니다.','기타','/home/ubuntu/images/exercise/Crunch Floor.gif'),(144,'프로그 크런치','프로그 크런치(Frog Crunch)는 주로 복직근을 타겟으로 하는 고립 운동입니다. 보조 근육으로는 내복사근과 외복사근이 작용합니다. 이 운동은 다리를 개구리 자세로 벌리고 상체를 들어 올려 복근을 강화하는 동작으로 구성됩니다. 다리를 편안하게 두고, 허리를 바닥에 밀착시킨 상태에서 상체를 들어 올려 복근을 효과적으로 자극할 수 있습니다.','기타','/home/ubuntu/images/exercise/Frog Crunch.gif'),(145,'머신 백 익스텐션','머신 백 익스텐션(Machine Back Extension)은 주로 척추 기립근을 타겟으로 하는 고립 운동입니다. 이 운동은 허리를 펴는 동작을 통해 척추 기립근을 강화하는 데 효과적입니다. 운동 중에는 엉덩이를 고정하고, 허리의 굴곡과 신전을 통해 척추 기립근을 단독으로 작용시키는 것이 중요합니다.','하체','/home/ubuntu/images/exercise/Machine Back Extension.gif'),(146,'버드 독','버드 독(Bird Dog)은 주로 척추 기립근과 복근을 타겟으로 하는 복합 운동입니다. 이 운동은 몸의 안정성과 균형을 향상시키며, 코어 근육을 강화하는 데 효과적입니다. 네 발로 엎드린 자세에서 한쪽 팔과 반대쪽 다리를 동시에 들어 올려 신체의 정렬을 유지하고, 복근과 등을 동시에 자극합니다.','기타','/home/ubuntu/images/exercise/Bird Dog.gif'),(147,'내로우 랫풀다운','케이블 레터럴 풀다운(Cable Lateral Pulldown)은 주로 광배근을 타겟으로 하는 복합 운동입니다. 이 운동은 케이블 머신에 로프를 부착하여 팔을 아래로 당기면서 상체와 코어를 강화하는 데 효과적입니다. 팔을 로프를 사용하여 바깥쪽으로 당기면서 풀다운을 수행하면, 등 근육을 더 깊이 자극할 수 있습니다.','등','/home/ubuntu/images/exercise/Cable Lateral Pulldown.gif'),(148,'원레그 하이퍼익스텐션','원레그 하이퍼익스텐션(One-Leg Hyperextension)은 주로 햄스트링과 척추 기립근을 타겟으로 하는 복합 운동입니다. 보조 근육으로는 대둔근과 대내전근이 작용합니다. 이 운동은 하이퍼익스텐션 벤치에서 한쪽 다리로 수행하며, 허리와 엉덩이를 굽혔다가 펴면서 하체와 등의 근력을 강화합니다. 난이도를 높이려면 팔을 머리 위로 올리거나 무게판을 들 수 있습니다.','등','/home/ubuntu/images/exercise/One-Leg Hyperextension.gif'),(149,'머신 시티드 힙 어브덕션','머신 시티드 힙 어브덕션(Machine Seated Hip Abduction)은 주로 둔근을 타겟으로 하는 고립 운동입니다. 보조 근육으로는 중둔근, 소둔근, 대둔근, 이상근, 외폐쇄근이 작용합니다. 이 운동은 힙 어브덕션 머신을 사용하여 다리를 벌리는 동작으로, 둔근의 근력을 강화하는 데 효과적입니다. 자세에 따라 중둔근이나 대둔근의 자극을 더 강조할 수 있습니다.','하체','/home/ubuntu/images/exercise/Machine Seated Hip Abduction.gif'),(150,'디클라인 싯업','디클라인 싯업(Decline Sit-up)은 주로 복직근을 타겟으로 하는 복합 운동입니다. 보조 근육으로는 외복사근, 장요근, 대퇴직근 등이 작용합니다. 디클라인 벤치에서 상체를 들어 올리는 동작을 통해 복근을 강화합니다. 이 운동은 허리와 엉덩이를 굽히고 펴는 동작을 반복하며 수행됩니다. 난이도를 높이기 위해 체중을 추가할 수 있습니다.','기타','/home/ubuntu/images/exercise/Decline Sit-up.gif'),(151,'엘베티카 볼 힙 레이즈','엘베티카 볼 힙 레이즈(Hip Raises on Swiss Ball)는 주로 둔근과 햄스트링을 타겟으로 하는 복합 운동입니다. 이 운동은 스위스 볼을 사용하여 엉덩이를 들어 올리는 동작을 통해 하체 근력을 강화하고 코어의 안정성을 향상시킵니다. 스위스 볼의 불안정한 표면이 코어 근육을 더 효과적으로 자극하며, 균형을 유지하는 데 도움을 줍니다.','하체','/home/ubuntu/images/exercise/Hip Raises on Swiss Ball.gif'),(152,'백런지','백런지(Back Lunges)는 주로 대퇴사두근과 둔근을 타겟으로 하는 복합 운동입니다. 이 운동은 다리를 뒤로 내딛어 런지를 수행하며, 하체의 근력과 균형을 향상시키는 데 효과적입니다. 무릎과 발끝이 일직선을 이루도록 주의하며, 중심을 잡고 동작을 천천히 수행하는 것이 중요합니다.','하체','/home/ubuntu/images/exercise/Back Lunges.gif'),(153,'더블 케이블 프론트 레이즈','더블 케이블 프론트 레이즈(Double Cable Front Raise)는 주로 전면 삼각근을 타겟으로 하는 고립 운동입니다. 이 운동은 양쪽 케이블을 사용해 팔을 앞으로 들어 올리면서 어깨 근육을 강화하는 데 효과적입니다. 케이블의 저항을 통해 운동의 강도를 조절할 수 있으며, 안정된 자세를 유지하며 천천히 수행하는 것이 중요합니다.','어깨','/home/ubuntu/images/exercise/Double Cable Front Raise.gif'),(154,'바벨 업라이트 로우','바벨 업라이트 로우(Barbell Upright Row)는 주로 승모근과 어깨 근육(특히 측면 삼각근)을 타겟으로 하는 복합 운동입니다. 이 운동은 바벨을 잡고 몸 앞에서 위로 당기면서 수행하며, 어깨와 목 주변의 근력을 강화하는 데 효과적입니다. 바벨을 들어 올릴 때 팔꿈치가 어깨 높이까지 올라가도록 하고, 무리하지 않도록 적절한 무게를 사용하는 것이 중요합니다.','어깨','/home/ubuntu/images/exercise/Barbell Upright Row.gif'),(155,'프론트 덤벨 레이즈','프론트 덤벨 레이즈(Front Dumbbell Raise)는 주로 전면 삼각근을 타겟으로 하는 고립 운동입니다. 이 운동은 덤벨을 이용해 팔을 앞으로 들어 올리면서 어깨의 전면 근육을 강화하는 데 효과적입니다. 적절한 자세를 유지하며, 팔을 어깨 높이까지 천천히 들어 올리는 것이 중요하며, 상체가 흔들리지 않도록 주의해야 합니다.','어깨','/home/ubuntu/images/exercise/Front Dumbbell Raise.gif'),(156,'라잉 덤벨 원암 리어 래터럴 레이즈','라잉 덤벨 원암 리어 래터럴 레이즈(Lying Dumbbell One-Arm Rear Lateral Raise)는 주로 후면 삼각근을 타겟으로 하는 고립 운동입니다. 이 운동은 한쪽 팔로 덤벨을 들고 몸을 옆으로 누운 상태에서 팔을 뒤쪽으로 들어 올리며 어깨 후면의 근력을 강화하는 데 효과적입니다. 이 운동을 통해 어깨의 균형을 잡고 상체의 안정성을 높일 수 있습니다.','어깨','/home/ubuntu/images/exercise/Lying Dumbbell One-Arm Rear Lateral Raise.gif'),(157,'덤벨 킥백','덤벨 킥백(Dumbbell Kickback)은 주로 삼두근을 타겟으로 하는 고립 운동입니다. 이 운동은 덤벨을 들고 상체를 앞으로 기울인 상태에서 팔을 뒤로 펴며 삼두근을 강화하는 데 효과적입니다. 팔꿈치를 고정하고, 팔을 완전히 펴는 것이 중요합니다. 덤벨 킥백은 삼두근의 정의를 높이고, 팔 뒤쪽의 근육을 효과적으로 발달시킬 수 있는 운동입니다.','팔','/home/ubuntu/images/exercise/Dumbbell Kickback.gif'),(158,'덤벨 원암 트라이셉스 익스텐션','덤벨 원암 트라이셉스 익스텐션(Dumbbell One-Arm Triceps Extension)은 주로 삼두근을 타겟으로 하는 고립 운동입니다. 이 운동은 덤벨을 한 손으로 머리 위로 들어 올려 삼두근을 강화하는 동작으로 구성됩니다. 팔꿈치를 고정하고, 팔의 상부는 움직이지 않도록 하여 삼두근에 집중적인 자극을 줄 수 있습니다.','팔','/home/ubuntu/images/exercise/Dumbbell One-Arm Triceps Extension.gif'),(159,'바이시클 크런치','바이시클 크런치(Bicycle Crunch)는 주로 복직근과 외복사근을 타겟으로 하는 복합 운동입니다. 이 운동은 바닥에 누워 자전거를 타는 듯한 동작을 하며 복근과 측면 복근을 강화하는 데 효과적입니다. 한쪽 무릎을 가슴 쪽으로 당기면서 반대쪽 팔꿈치를 맞닿게 하여 복부의 회전력을 이용해 운동합니다.','기타','/home/ubuntu/images/exercise/Bicycle Crunch.gif'),(160,'머신 플라이','머신 플라이(Machine Fly)는 주로 대흉근 하부를 타겟으로 하는 고립 운동입니다. 보조 근육으로는 대흉근 상부, 상완이두근 단두, 소흉근, 전거근이 작용합니다. 이 운동은 플라이 머신을 사용하여 팔을 벌렸다 모으면서 가슴 근육을 강화합니다. 어깨를 내회전시키고 팔꿈치를 약간 굽힌 상태로 움직임을 느리게 조절하여 수행하는 것이 중요합니다.','가슴','/home/ubuntu/images/exercise/Machine Fly.gif'),(161,'덤벨 플라이','덤벨 플라이(Dumbbell Fly)는 주로 대흉근 상부를 타겟으로 하는 고립 운동입니다. 보조 근육으로는 대흉근 상부, 전면 삼각근, 상완이두근 단두가 작용합니다. 이 운동은 덤벨을 이용해 팔을 아치 형태로 벌렸다 모으는 동작을 통해 가슴 근육을 강화합니다. 팔꿈치를 약간 굽히고, 어깨를 내회전시켜 가슴 근육에 집중적인 자극을 줄 수 있습니다.','가슴','/home/ubuntu/images/exercise/Dumbbell Fly.gif'),(162,'디클라인 덤벨 벤치 프레스','디클라인 덤벨 벤치 프레스(Decline Dumbbell Bench Press)는 주로 대흉근 하부를 타겟으로 하는 복합 운동입니다. 보조 근육으로는 대흉근 상부, 삼두근, 전면 삼각근이 작용하며, 상완이두근이 동적 안정근으로 참여합니다. 이 운동은 덤벨을 사용해 가슴 근육을 강화하며, 팔꿈치를 약간 몸쪽으로 모아 어깨에 가해지는 압력을 줄입니다.','가슴','/home/ubuntu/images/exercise/Decline Dumbbell Bench Press.gif'),(163,'벤치 프레스','바벨 벤치 프레스(Barbell Bench Press)는 주로 대흉근을 타겟으로 하는 복합 운동입니다. 보조 근육으로는 삼두근과 전면 삼각근이 작용합니다. 이 운동은 바벨을 이용해 가슴 근육을 강화하며, 팔꿈치를 몸 쪽으로 모아 어깨에 가해지는 압력을 줄이도록 주의합니다. 벤치에 누워 바벨을 들어 올리고, 다시 천천히 가슴으로 내리며 운동을 반복합니다.','가슴','/home/ubuntu/images/exercise/Barbell Bench Press.gif'),(164,'덤벨 원암 오버헤드 프레스','덤벨 원암 오버헤드 프레스 (Dumbbell one-arm overhead press)는 어깨 근육을 강화하는 운동으로, 덤벨을 한 손에 들고 어깨 높이에서 시작하여 팔을 완전히 펴서 머리 위로 들어 올립니다. 이 운동은 어깨의 안정성과 힘을 향상시키며, 특히 전면과 측면의 근육을 효과적으로 발달시킵니다. 덤벨을 천천히 시작 위치로 돌아오면서 어깨 근육에 집중합니다.','어깨','/home/ubuntu/images/exercise/Dumbbell one-arm overhead press.gif'),(165,'시트 바벨 오버헤드 프레스','시트 바벨 오버헤드 프레스는 앉은 자세에서 바벨을 어깨 높이에서 시작하여 머리 위로 들어 올리며 어깨 근육을 강화합니다. 상체를 안정적으로 유지하며 바벨을 들어 올리면, 어깨와 삼두근이 동시에 발달됩니다.','어깨','/home/ubuntu/images/exercise/Seated barbell overhead press.gif'),(166,'바벨 오버헤드 프레스','바벨 오버헤드 프레스는 서서 바벨을 어깨 높이에서 머리 위로 들어 올리는 운동으로, 어깨와 상체 근육을 전반적으로 강화합니다. 자세를 유지하며 바벨을 천천히 들어 올려 어깨와 상체의 근력을 향상시킵니다.','어깨','/home/ubuntu/images/exercise/Barbell overhead press.gif'),(167,'덤벨 시트 리버스 그립 집중 컬','덤벨 시트 리버스 그립 집중 컬은 덤벨을 사용하여 앉은 자세에서 리버스 그립으로 팔을 굽혀 이두근을 집중적으로 단련하는 운동입니다. 팔꿈치를 고정한 상태로 덤벨을 천천히 들어 올려, 이두근의 발달과 근력을 강화합니다.','팔','/home/ubuntu/images/exercise/Dumbbell Seated Revers grip Concentration Curl.gif'),(168,'덤벨 킥백','덤벨 킥백은 덤벨을 들고 운동 볼 위에서 팔을 뒤로 밀어 삼두근을 강화하는 운동입니다. 팔꿈치를 고정하고 천천히 움직여 삼두근에 집중하며, 팔을 완전히 펴서 근육을 수축합니다.','팔','/home/ubuntu/images/exercise/Dumbbell Kickbacks on Exercise Ball.gif'),(169,'랫풀 다운','와이드 프론트 그립 라트 풀다운은 라트 풀다운 머신에서 와이드 그립으로 바를 잡고 몸 쪽으로 당겨 등의 넓은 근육을 강화합니다. 상체를 안정적으로 유지하며 바를 천천히 당겨 등 근육의 수축을 느낍니다.','등','/home/ubuntu/images/exercise/wide front grip lat pull downs.gif'),(170,'덤벨 로우','투 암 덤벨 로우즈는 덤벨을 양손에 들고 상체를 앞으로 숙인 상태에서 덤벨을 몸 쪽으로 당겨 등 근육을 강화하는 운동입니다. 등 근육을 수축하며 덤벨을 천천히 들어 올려 등의 근력을 향상시킵니다.','등','/home/ubuntu/images/exercise/two arm dumbbell rows.gif'),(171,'케이블 크로스오버','케이블 크로스오버는 케이블 머신에서 손잡이를 잡고 팔을 교차시키며 가슴 근육을 강화하는 운동입니다. 팔을 벌리고 가슴 중앙에서 수축을 느끼며 운동을 수행하여 가슴 근육을 발달시킵니다.','가슴','/home/ubuntu/images/exercise/Cable crossovers.gif'),(172,'레그 익스텐션','레그 익스텐션은 레그 익스텐션 머신에서 발목 패드를 밀어 대퇴사두근을 강화하는 운동입니다. 무릎을 완전히 펴고 대퇴사두근의 수축을 유지하면서 천천히 시작 위치로 돌아갑니다.','하체','/home/ubuntu/images/exercise/Leg Extension.gif'),(173,'싱글 레그 글룻 브리지','싱글 레그 글룻 브리지는 바닥에 누워 한쪽 다리를 들어 올리고 엉덩이를 들어 올려 둔근을 강화하는 운동입니다. 균형을 유지하며 엉덩이와 하체 근육을 발달시키는 데 효과적입니다.','하체','/home/ubuntu/images/exercise/Single leg glute bridge.gif'),(174,'스파이더 크롤 푸쉬 업','스파이더 크롤 푸쉬 업은 스파이더 크롤 동작과 푸쉬 업을 결합한 전신 운동으로, 팔꿈치를 굽혀 몸을 낮추고 다시 팔을 펴며 시작 자세로 돌아옵니다. 전신 근력을 강화하는 데 효과적입니다.','기타','/home/ubuntu/images/exercise/Spider Crawl Push up.gif'),(175,'클린 데드리프트','바벨 클린 데드리프트는 바벨을 바닥에서 들어 올린 후, 몸을 세우고 다시 내려놓는 동작을 반복합니다. 이 운동은 전신 근력과 파워를 강화하는 데 효과적입니다.','기타','/home/ubuntu/images/exercise/Barbell Clean Deadlift.gif'),(176,'바벨 클린 프레스','바벨 클린 프레스는 바벨을 바닥에서 들어 올린 후 머리 위로 밀어 올리는 운동입니다. 전신 근력을 균형 있게 발달시키며 상체와 하체의 파워를 동시에 강화합니다.','기타','/home/ubuntu/images/exercise/Barbell Clean and Press.gif'),(177,'밴드 트위스트','밴드 트위스트는 밴드를 사용해 상체를 회전시키며 측면과 등의 근육을 강화합니다. 밴드를 잡고 몸통을 돌리며 복사근과 등 근육을 발달시킵니다.','등','/home/ubuntu/images/exercise/Band twist (up down).gif'),(178,'키저 트위스트','키저 트위스트는 키저 머신을 사용해 상체를 회전시키며 측면과 등 근육을 강화합니다. 기계의 저항을 이용해 부드럽게 상체를 회전시킵니다.','등','/home/ubuntu/images/exercise/Keiser twist (down up).gif'),(179,'프리덤 밴드 푸시다운','프리덤 밴드 푸시다운은 프리덤 밴드를 잡고 팔을 아래로 밀어 삼두근을 강화하는 운동입니다. 팔꿈치를 고정하고 밴드를 밀어내며 삼두근의 수축을 유지합니다.','팔','/home/ubuntu/images/exercise/Freedom Band Pushdown.gif'),(180,'프리텀 풀 어파트','프리덤 풀 어파트는 프리덤 밴드를 양손으로 잡고 팔을 벌려 등 근육을 강화합니다. 밴드를 당기며 어깨와 등의 근육을 수축시키고 균형 있게 발달시킵니다.','등','/home/ubuntu/images/exercise/Freedom Pull Apart.gif'),(181,'무릎 꿇고 한 팔 당기기','무릎 꿇고 한 팔 당기기는 무릎을 꿇고 한 팔로 밴드를 당겨 등을 단련하는 운동입니다. 한쪽 팔을 사용해 등 근육을 집중적으로 강화하며 정확한 동작을 유지합니다.','등','/home/ubuntu/images/exercise/kneeling one arm pulldown.gif'),(182,'하이 플라이','하이 플라이는 케이블이나 덤벨을 사용해 가슴 상부를 타겟으로 팔을 벌려 가슴 근육을 강화합니다. 팔을 교차하며 가슴의 상부 근육을 효과적으로 단련합니다.','가슴','/home/ubuntu/images/exercise/high fly.gif'),(183,'벤트 오버 힙 익스텐션','벤트 오버 힙 익스텐션은 상체를 앞으로 숙이고 다리를 뒤로 들어 올려 엉덩이와 허벅지 근육을 강화하는 운동입니다. 엉덩이를 수축시키며 다리 근력을 향상시킵니다.','하체','/home/ubuntu/images/exercise/bent over hip extension.gif'),(184,'앵클 - 도슬 플렉션','앵클 - 도스럴 플렉션은 발목의 도스럴 플렉션 동작을 통해 발목과 하체 근육을 강화하는 운동입니다. 발목을 위로 들어 올려 유연성과 근력을 강화합니다.','하체','/home/ubuntu/images/exercise/Ankle-Dorsal Flexion.gif'),(185,'바닥 다리 올리기','바닥 다리 올리기는 바닥에 누워 다리를 번갈아 들어 올려 복근과 다리 근육을 강화하는 운동입니다. 다리를 천천히 들어 올리고 내리며 복근을 수축시킵니다.','기타','/home/ubuntu/images/exercise/Alternate Lying Floor Leg Raise.gif'),(186,'카폴 오버 리어 래터럴 레이즈','카폴 오버 리어 래터럴 레이즈는 카폴을 사용해 리어 래터럴 레이즈 동작을 수행해 등의 근육을 강화하는 운동입니다. 어깨와 등 근육을 균형 있게 발달시킵니다.','등','/home/ubuntu/images/exercise/Capol over rear lateral raise.gif'),(187,'인클라인 벤치 프레스','인클라인 바벨 벤치 프레스는 인클라인 벤치에서 바벨을 사용해 가슴 상부 근육을 집중적으로 강화하는 운동입니다. 바벨을 가슴 쪽으로 내렸다가 밀어 올리며 가슴 상부를 강화합니다.','가슴','/home/ubuntu/images/exercise/Incline barbell bench press.gif'),(188,'디클라인 벤치 프레스','디클라인 바벨 벤치 프레스는 디클라인 벤치에서 바벨을 사용해 가슴 하부 근육을 강화하는 운동입니다. 바벨을 가슴 쪽으로 내렸다가 천천히 밀어 올립니다.','가슴','/home/ubuntu/images/exercise/Decline barbell bench press.gif'),(189,'어시스터드 친 업','어시스트 친 업은 어시스트 머신을 사용해 친업 동작을 지원하며 등의 근육을 강화하는 운동입니다. 바를 당겨 턱이 바에 닿을 때까지 몸을 당깁니다.','등','/home/ubuntu/images/exercise/Assisted Chin up.gif'),(190,'글룻 브리지 온 플로어','글룻 브리지 온 플로어는 바닥에 누워 엉덩이를 들어 올려 둔근을 강화하는 운동입니다. 무릎을 굽히고 엉덩이를 들어 올려 둔근과 하체 근육을 강화합니다.','하체','/home/ubuntu/images/exercise/Glute Bridge on floor.gif'),(191,'푸쉬 업(무릎 보조)','푸쉬 업(무릎 보조)은 무릎을 대고 푸쉬 업 동작을 수행해 가슴 근육을 강화하는 운동입니다. 초보자에게 적합하며, 무릎을 대고 팔을 펴면서 상체를 밀어 올립니다.','가슴','/home/ubuntu/images/exercise/Push up (on knees).gif'),(192,'푸쉬 업(볼 보조)','푸쉬 업(보수 볼 보조)는 보수 볼을 사용해 불안정한 상태에서 푸쉬 업을 수행해 가슴과 코어 근육을 강화하는 운동입니다. 보수 볼 위에서 팔을 굽혀 몸을 낮추고 다시 밀어 올립니다.','가슴','/home/ubuntu/images/exercise/Push up (bosu ball).gif'),(193,'케틀벨 터키식 들어올리기 (스쿼트 스타일)','케틀벨 터키식 들어올리기 (스쿼트 스타일)은 케틀벨을 사용해 터키식 스쿼트 스타일로 일어나면서 전신을 강화하는 운동입니다. 케틀벨을 머리 위로 든 상태에서 천천히 일어나고, 다시 누워서 반복합니다.','기타','/home/ubuntu/images/exercise/Kettlebell Turkish Get Up (Squat style).gif'),(194,'웨이티드 라이잉 넥 플렉션','웨이티드 라이잉 넥 플렉션은 헤드 하네스를 착용하고 누운 자세에서 목을 플렉션하여 목 근육을 강화하는 운동입니다. 목의 전면 근육을 단련하고 강화하는 데 효과적입니다.','기타','/home/ubuntu/images/exercise/Weighted Lying Neck Flexion (with head harness).gif'),(195,'웨이티드 라이잉 넥 익스텐션','웨이티드 라이잉 넥 익스텐션은 헤드 하네스를 착용하고 누운 자세에서 목을 익스텐션하여 근력을 강화하는 운동입니다. 목의 후면 근육을 강화하고 목의 안정성을 높이는 데 도움을 줍니다.','기타','/home/ubuntu/images/exercise/Weighted Lying Neck Extension (with head harness).gif'),(196,'덤벨 큐번 로우테이션','덤벨 큐번 로테이션은 덤벨을 사용해 어깨 관절의 회전력을 강화하는 운동입니다. 어깨의 안정성과 유연성을 향상시키며 회전근을 강화합니다.','어깨','/home/ubuntu/images/exercise/Dumbbell Cuban rotation.gif'),(197,'라이잉 덤벨 리어 래터럴 레이즈','라이잉 덤벨 리어 래터럴 레이즈는 덤벨을 들고 누운 상태에서 어깨 뒤쪽 근육을 강화하는 운동입니다. 상체를 안정적으로 유지하며 어깨 뒤쪽을 발달시킵니다.','어깨','/home/ubuntu/images/exercise/Lying dumbbell rear lateral raise.gif');
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed_interactions`
--

DROP TABLE IF EXISTS `feed_interactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed_interactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `feed_id` int NOT NULL,
  `interaction_type` enum('like','comment') NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `users_feed_interactions_user_id_FK_idx` (`user_id`),
  KEY `feeds_feed_interactions_feed_id_FK_idx` (`feed_id`),
  CONSTRAINT `feeds_feed_interactions_feed_id_FK_idx` FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_feed_interactions_feed` FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_feed_interactions_user_id_FK2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed_interactions`
--

LOCK TABLES `feed_interactions` WRITE;
/*!40000 ALTER TABLE `feed_interactions` DISABLE KEYS */;
INSERT INTO `feed_interactions` VALUES (1,53,2,'like',NULL,'2024-08-15 14:29:54');
/*!40000 ALTER TABLE `feed_interactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeds`
--

DROP TABLE IF EXISTS `feeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feeds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `routine_id` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `content` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_idx_idx` (`user_id`),
  KEY `routines_feeds_routine_id_FK_idx` (`routine_id`),
  CONSTRAINT `routines_feeds_routine_id_FK` FOREIGN KEY (`routine_id`) REFERENCES `routines` (`id`),
  CONSTRAINT `users_feeds_user_id_FK2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeds`
--

LOCK TABLES `feeds` WRITE;
/*!40000 ALTER TABLE `feeds` DISABLE KEYS */;
INSERT INTO `feeds` VALUES (2,53,21,'/home/ubuntu/images/feed/53-2-.jpeg','제 어깨 보고 가세요','2024-08-15 14:29:51',NULL);
/*!40000 ALTER TABLE `feeds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `follower_id` int NOT NULL,
  `followed_id` int NOT NULL,
  `followed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `follow_user_user_idx_to_FK_idx` (`followed_id`),
  KEY `users_follows_follower_id_FK2` (`follower_id`),
  CONSTRAINT `users_follows_followed_id_FK2` FOREIGN KEY (`followed_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_follows_follower_id_FK2` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inbody_records`
--

DROP TABLE IF EXISTS `inbody_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inbody_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `height` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `body_water` double DEFAULT NULL,
  `protein` double DEFAULT NULL,
  `mineral` double DEFAULT NULL,
  `body_fat` double DEFAULT NULL,
  `muscle_mass` double DEFAULT NULL,
  `muscle_body` double DEFAULT NULL,
  `muscle_left_arm` double DEFAULT NULL,
  `muscle_right_arm` double DEFAULT NULL,
  `muscle_left_leg` double DEFAULT NULL,
  `muscle_right_leg` double DEFAULT NULL,
  `bmi` double DEFAULT NULL,
  `body_fat_percent` double DEFAULT NULL,
  `measured_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `inbody_user_user_idx_FK_idx` (`user_id`),
  CONSTRAINT `users_inbody_records_user_id_FK2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inbody_records`
--

LOCK TABLES `inbody_records` WRITE;
/*!40000 ALTER TABLE `inbody_records` DISABLE KEYS */;
/*!40000 ALTER TABLE `inbody_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_details`
--

DROP TABLE IF EXISTS `item_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `detail_type` enum('like','image') NOT NULL,
  `user_id` int DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `origin_name` varchar(100) DEFAULT NULL,
  `save_name` varchar(100) DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `items_item_details_item_id_FK_idx` (`item_id`),
  KEY `users_item_details_user_id_FK_idx` (`user_id`),
  CONSTRAINT `fk_item` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `items_item_details_item_id_FK` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `users_item_details_user_id_FK2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_details`
--

LOCK TABLES `item_details` WRITE;
/*!40000 ALTER TABLE `item_details` DISABLE KEYS */;
INSERT INTO `item_details` VALUES (1,1,'image',53,'/home/ubuntu/images/item/53-1-0.jpg','2.jpg','53-1-0.jpg','2024-08-15 12:18:46'),(2,1,'like',53,NULL,NULL,NULL,'2024-08-15 12:18:51'),(3,2,'image',53,'/home/ubuntu/images/item/53-2-0.png','100.png','53-2-0.png','2024-08-15 12:20:11'),(4,2,'like',53,NULL,NULL,NULL,'2024-08-15 12:20:20'),(5,3,'image',53,'/home/ubuntu/images/item/53-3-0.jpg','1.jpg','53-3-0.jpg','2024-08-15 12:23:03'),(6,3,'image',53,'/home/ubuntu/images/item/53-3-1.jpg','3.jpg','53-3-1.jpg','2024-08-15 12:23:03'),(7,3,'like',53,NULL,NULL,NULL,'2024-08-15 12:23:05'),(8,3,'like',55,NULL,NULL,NULL,'2024-08-15 13:15:58'),(9,2,'like',55,NULL,NULL,NULL,'2024-08-15 13:17:18'),(10,1,'like',55,NULL,NULL,NULL,'2024-08-15 13:17:40'),(11,4,'image',53,'/home/ubuntu/images/item/53-4-0.webp','1a.webp','53-4-0.webp','2024-08-15 15:06:35'),(12,5,'image',53,'/home/ubuntu/images/item/53-5-0.webp','1b.webp','53-5-0.webp','2024-08-15 15:07:33'),(13,4,'like',53,NULL,NULL,NULL,'2024-08-15 15:07:36'),(14,5,'like',53,NULL,NULL,NULL,'2024-08-15 15:07:37'),(15,6,'image',53,'/home/ubuntu/images/item/53-6-0.webp','1c.webp','53-6-0.webp','2024-08-15 15:09:01'),(16,6,'image',53,'/home/ubuntu/images/item/53-6-1.webp','1d.webp','53-6-1.webp','2024-08-15 15:09:01'),(17,6,'image',53,'/home/ubuntu/images/item/53-6-2.webp','2.webp','53-6-2.webp','2024-08-15 15:09:01'),(18,6,'like',53,NULL,NULL,NULL,'2024-08-15 15:09:07');
/*!40000 ALTER TABLE `item_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `price` int NOT NULL,
  `is_sold` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `district` varchar(20) DEFAULT NULL,
  `si_gun_gu` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `market_user_user_idx_idx` (`user_id`),
  CONSTRAINT `users_items_user_id_FK2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,53,'중고 기구 처분합니다.','헬스장을 폐업하게 되어 중고기구 여러 개를 처분합니다. 가격은 기구 하나에 15만원이구요. 네고는 없습니다. 감사합니다.',150000,0,'2024-08-15 12:18:46',NULL,'대전광역시','동구'),(2,53,'바벨 팝니다.','제가 쓰기에는 너무 넓어서 바벨 처분합니다. 바벨 넓게 잡고 쓰시는 분들이 사시면 좋을 것 같습니다. 한 번 밖에 사용 안 한 바벨입니다.',30000,0,'2024-08-15 12:20:11',NULL,'대전광역시','동구'),(3,53,'홈 짐 구성품들 팝니다.','홈 짐 구성품들 팝니다. 마누라 해외출장 간 사이에 처남이랑 같이 홈짐 만들고 싶어서 샀는데 마누라한테 걸리고 쫓겨날 뻔 했습니다. 환불 기간도 지나서 싸게 내놓습니다. ㅜㅜ 이거 팔아서 맛있는거 사주면서 달래줘야겠습니다...',500000,0,'2024-08-15 12:23:03',NULL,'대전광역시','동구'),(4,53,'윗몸일으키기 기구','정가 9만원에 주고 샀는데 이번에 이사를 가게 돼서 판매합니다. 산지 6개월 밖에 되지 않았습니다.',30000,0,'2024-08-15 15:06:35',NULL,'대전광역시','동구'),(5,53,'허벅지 스트레칭','상태가 막 좋지는 않지만 아직 쓸만 합니다. 새 기구를 사게 되어 이렇게 판매합니다.',10000,0,'2024-08-15 15:07:33',NULL,'대전광역시','동구'),(6,53,'스텝퍼','스텝퍼 판매합니다. 아버지 생신 선물로 사드렸는데 동생이 더 좋은 걸 사드렸네요ㅜㅜ 말 좀 하고 사지.... 정가대비 40프로 쌉니다. 구매하시면 악력기도 드리고 있습니다',120000,0,'2024-08-15 15:09:01',NULL,'대전광역시','동구');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `room_id` int NOT NULL,
  `message` text NOT NULL,
  `send_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `users_messages_sender_id_FK_idx` (`sender_id`),
  KEY `chats_messages_chat_id_FK_idx` (`room_id`),
  CONSTRAINT `chats_messages_room_id_FK` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_messages_sender_id_FK2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,55,1,'안녕하세요 ','2024-08-15 13:16:08'),(2,55,1,'올려놓으신 홈짐이 너무 좋아보여서 거래한번 해보고 싶어서 연락드려요','2024-08-15 13:17:03'),(3,53,1,'아 네 안녕하세요~ ','2024-08-15 15:02:56'),(4,53,1,'혹시 지역이 어디신가요?','2024-08-15 15:03:02');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_member`
--

DROP TABLE IF EXISTS `oauth_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) DEFAULT NULL,
  `oauth_server_id` varchar(255) NOT NULL,
  `oauth_server` enum('KAKAO') NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `is_sign` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `oauth_id_unique` (`oauth_server_id`,`oauth_server`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_member`
--

LOCK TABLES `oauth_member` WRITE;
/*!40000 ALTER TABLE `oauth_member` DISABLE KEYS */;
INSERT INTO `oauth_member` VALUES (1,'문범수','3662797681','KAKAO','munbeumsu@hanmail.net',12,1),(2,'상천','3663597096','KAKAO','pswlove22@nate.com',NULL,0);
/*!40000 ALTER TABLE `oauth_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user1_id` int NOT NULL,
  `user2_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `users_chats_user1_id_FK_idx` (`user1_id`),
  KEY `users_chats_user2_id_FK_idx` (`user2_id`),
  CONSTRAINT `users_rooms_user1_id_FK2` FOREIGN KEY (`user1_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_rooms_user2_id_FK2` FOREIGN KEY (`user2_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,55,53,'2024-08-15 13:16:04');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routine_details`
--

DROP TABLE IF EXISTS `routine_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routine_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `routine_id` int NOT NULL,
  `exercise_id` int NOT NULL,
  `sequence` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `routines_routine_details_routine_id_FK_idx` (`routine_id`),
  KEY `exercise_routine_details_exercise_id_FK_idx` (`exercise_id`),
  CONSTRAINT `exercise_routine_details_exercise_id_FK` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`),
  CONSTRAINT `routines_routine_details_routine_id_FK3` FOREIGN KEY (`routine_id`) REFERENCES `routines` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routine_details`
--

LOCK TABLES `routine_details` WRITE;
/*!40000 ALTER TABLE `routine_details` DISABLE KEYS */;
INSERT INTO `routine_details` VALUES (1,1,103,1),(2,1,147,2),(3,1,169,3),(4,1,85,4),(5,2,170,1),(6,2,84,2),(7,2,57,3),(8,2,157,4),(9,3,169,1),(10,3,98,2),(11,3,84,3),(12,3,127,4),(13,4,103,1),(14,4,163,2),(15,4,27,3),(16,5,127,1),(17,5,163,2),(18,5,169,3),(19,5,85,4),(20,5,119,5),(21,5,172,3),(70,15,1,1),(71,15,3,2),(72,15,5,3),(76,16,1,1),(77,16,2,2),(78,16,27,3),(103,20,5,1),(104,20,9,2),(105,20,13,3),(112,22,103,1),(113,22,147,2),(114,22,169,3),(115,22,85,4),(122,24,27,1),(123,24,103,2),(124,24,163,3),(128,25,57,1),(129,25,58,2),(130,25,60,3);
/*!40000 ALTER TABLE `routine_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routine_sets`
--

DROP TABLE IF EXISTS `routine_sets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routine_sets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `routine_detail_id` int NOT NULL,
  `sequence` int NOT NULL,
  `weight` int NOT NULL,
  `count` int NOT NULL,
  `is_complete` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `routine_details_routine_sets_routine_detail_id_FK_idx` (`routine_detail_id`),
  CONSTRAINT `routine_details_routine_sets_routine_detail_id_FK3` FOREIGN KEY (`routine_detail_id`) REFERENCES `routine_details` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=290 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routine_sets`
--

LOCK TABLES `routine_sets` WRITE;
/*!40000 ALTER TABLE `routine_sets` DISABLE KEYS */;
INSERT INTO `routine_sets` VALUES (10,1,1,80,8,1),(11,1,2,90,5,1),(12,1,3,100,3,1),(13,2,1,30,20,1),(14,2,2,30,20,1),(15,2,3,30,20,1),(16,3,1,40,15,1),(17,3,2,40,15,1),(18,3,3,40,15,1),(19,4,1,35,12,1),(20,4,2,35,12,1),(21,4,3,35,12,1),(22,5,1,10,20,1),(23,5,2,10,20,1),(24,5,3,10,20,1),(25,6,1,10,20,1),(26,6,2,10,20,1),(27,6,3,10,20,1),(28,7,1,10,10,1),(29,7,2,10,10,1),(30,7,3,10,10,1),(31,8,1,10,10,1),(32,8,2,10,10,1),(33,8,3,10,10,1),(34,9,1,20,10,1),(35,9,2,20,10,1),(36,9,3,20,10,1),(37,10,1,10,10,1),(38,10,2,10,10,1),(39,10,3,10,10,1),(40,11,1,10,10,1),(41,11,2,10,10,1),(42,11,3,10,10,1),(43,12,1,20,10,1),(44,12,2,20,10,1),(45,12,3,20,10,1),(46,13,1,100,5,1),(47,13,2,100,5,1),(48,13,3,100,5,1),(49,14,1,80,5,1),(50,14,2,80,5,1),(51,14,3,80,5,1),(52,15,1,100,5,1),(53,15,2,100,5,1),(54,15,3,100,5,1),(55,16,1,30,15,1),(56,16,2,30,15,1),(57,16,3,30,15,1),(58,17,1,40,10,1),(59,17,2,40,10,1),(60,17,3,40,10,1),(61,18,1,30,10,1),(62,18,2,30,10,1),(63,18,3,30,10,1),(64,19,1,30,10,1),(65,19,2,30,10,1),(66,19,3,30,10,1),(67,20,1,60,10,1),(68,20,2,60,10,1),(69,20,3,60,10,1),(70,21,1,30,10,1),(71,21,2,30,10,1),(72,21,3,30,10,1),(170,70,1,35,5,1),(171,70,2,34,5,1),(172,70,3,33,5,1),(173,71,1,23,5,1),(174,71,2,23,5,1),(175,71,3,23,5,1),(176,72,1,12,5,1),(177,72,2,23,5,1),(178,72,3,23,5,1),(182,76,1,20,10,1),(183,77,1,30,10,1),(184,78,1,20,10,1),(209,103,1,30,5,0),(210,103,2,30,5,0),(211,104,1,40,5,0),(212,104,2,40,10,0),(213,104,3,40,15,0),(214,105,1,30,5,0),(215,105,2,30,5,0),(216,105,3,30,5,0),(233,112,1,80,8,1),(234,112,2,90,5,1),(235,112,3,100,3,1),(236,113,1,30,20,1),(237,113,2,30,20,1),(238,113,3,30,20,1),(239,114,1,40,15,1),(240,114,2,40,15,1),(241,114,3,40,15,1),(242,115,1,35,12,1),(243,115,2,35,12,1),(244,115,3,35,12,1),(263,122,1,10,3,1),(264,122,2,15,2,0),(265,122,3,20,1,1),(266,123,1,10,1,1),(267,123,2,20,3,1),(268,123,3,30,5,1),(269,124,1,20,5,1),(270,124,2,30,3,1),(271,124,3,40,1,0),(281,128,1,30,10,1),(282,128,2,30,10,1),(283,128,3,40,8,1),(284,129,1,30,10,1),(285,129,2,40,8,1),(286,129,3,25,10,1),(287,130,1,60,10,1),(288,130,2,60,12,1),(289,130,3,60,12,1);
/*!40000 ALTER TABLE `routine_sets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routines`
--

DROP TABLE IF EXISTS `routines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `sum_volume` double DEFAULT '0',
  `sum_time` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_upload` tinyint DEFAULT '0',
  `is_complete` tinyint DEFAULT '0',
  `completed_at` timestamp NULL DEFAULT NULL,
  `is_like` tinyint NOT NULL DEFAULT '0',
  `due_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_routines_user_id_FK_idx` (`user_id`),
  CONSTRAINT `users_routines_user_id_FK2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routines`
--

LOCK TABLES `routines` WRITE;
/*!40000 ALTER TABLE `routines` DISABLE KEYS */;
INSERT INTO `routines` VALUES (1,1,'맛있는 등운동',1,1,'2024-08-09 15:10:29',1,1,'2024-08-09 15:10:29',0,'2024-08-10'),(2,1,'집에서도 하는 덤벨운동',1,1,'2024-08-10 15:10:29',1,1,'2024-08-10 15:10:29',0,'2024-08-11'),(3,1,'초심자 추천루틴',1,1,'2024-08-11 15:10:29',1,1,'2024-08-11 15:10:29',0,'2024-08-12'),(4,1,'사부님 저도 강해지고 싶어요',1,1,'2024-08-12 15:10:29',1,1,'2024-08-12 15:10:29',0,'2024-08-13'),(5,1,'전국 추천루틴',1,1,'2024-08-13 15:10:29',1,1,'2024-08-13 15:10:29',0,'2024-08-14'),(15,54,'나만의 루틴1',1145,32,'2024-08-15 03:43:34',0,1,'2024-08-15 03:44:08',1,'2024-08-15'),(16,55,'테스트',700,90,'2024-08-15 04:10:36',0,1,'2024-08-15 04:13:05',0,'2024-08-15'),(20,53,'해방의 날',NULL,0,'2024-08-15 05:26:10',0,0,NULL,0,'2024-08-15'),(21,53,'해방의 날',1950,22,'2024-08-15 05:28:34',1,1,'2024-08-15 05:28:59',0,'2024-08-15'),(22,56,'ANSMOON 1',NULL,0,'2024-08-15 05:29:30',0,0,NULL,1,'2024-08-19'),(24,56,'3대 운동',460,10,'2024-08-15 05:34:17',0,1,'2024-08-15 05:34:29',0,'2024-08-15'),(25,53,'이두삼두호날두',3830,10,'2024-08-15 06:13:13',0,1,'2024-08-15 06:13:24',1,'2024-08-16');
/*!40000 ALTER TABLE `routines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(10) NOT NULL,
  `nickname` varchar(15) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `birth` date NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `gender` tinyint DEFAULT NULL,
  `height` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `district` varchar(20) DEFAULT NULL,
  `si_gun_gu` varchar(20) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `fcm_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin','admin','admin','1998-01-08','/home/ubuntu/images/profile/0-0-.png',1,175.5,70,'충청남도','천안시','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzI0MzM0MTA0LCJpYXQiOjE3MjM3MjkzMDR9.Sjp99On6OVwukO-K1EeFlpsMBrOXEOB70qZ5sOQLs8I',NULL),(50,'wlsdud6221@gmail.com','test1234!','디버깅계정','debug','01099999999','1918-01-18','/home/ubuntu/images/profile/0-0-.png',0,180,200,'대구광역시','달서구','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1MCIsImV4cCI6MTcyNDMzNDUwMCwiaWF0IjoxNzIzNzI5NzAwfQ.A2zcadBqo7xDqQBpRzSkLWjD1fBMphFA0NEzGLmurlk',NULL),(53,'bhwoo1001@naver.com','test1234!','복현우','Iamzzang','01072987900','1999-09-30','/home/ubuntu/images/profile/53-53-.jpg',0,181.5,82.1,'대전광역시','동구','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1MyIsImV4cCI6MTcyNDMyOTA1OCwiaWF0IjoxNzIzNzI0MjU4fQ.bteqpmS74qOxSVKD9MZ8_Yox12Uo--NGhtu8nPEZ3Ec',NULL),(54,'pswlove38@naver.com','test1234!','박상천','sangch__','01035935474','2002-01-07','/home/ubuntu/images/profile/0-0-.png',0,178,82,'대전광역시','유성구','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NCIsImV4cCI6MTcyNDMzMTE2OCwiaWF0IjoxNzIzNzI2MzY4fQ.lIGNFuw0f98oQ9JhSDr1ALFE-nsJ2j03A2XmMPFCQ08',NULL),(55,'hslee0912@naver.com','hsle09!@','이현석','hslee0912','01088518452','1981-09-12','/home/ubuntu/images/profile/0-0-.png',0,183,98,'서울특별시','동작구','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NSIsImV4cCI6MTcyNDMzMTk5NywiaWF0IjoxNzIzNzI3MTk3fQ.JauQITeVagKDgf_51d69-0B2Gh-eiwWNN6nbw6YZT_0',NULL),(56,'munbeumsu@hanmail.net','tkachdtk1!','문범수','ANSMOON','01036417754','1998-06-13','/home/ubuntu/images/profile/56-56-.jpg',0,187,82,'대전광역시','유성구','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NiIsImV4cCI6MTcyNDMzODcxNCwiaWF0IjoxNzIzNzMzOTE0fQ.4oGd5Do_zn-6t1YjcSEX45ci-2tMR7Q7DMKuwS4yhAE',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'health'
--

--
-- Dumping routines for database 'health'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  0:42:52
