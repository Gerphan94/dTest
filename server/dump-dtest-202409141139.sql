-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: dtest
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `casetype`
--

DROP TABLE IF EXISTS `casetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `casetype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `casetype`
--

/*!40000 ALTER TABLE `casetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `priority`
--

DROP TABLE IF EXISTS `priority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `priority` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `priority`
--

LOCK TABLES `priority` WRITE;
/*!40000 ALTER TABLE `priority` DISABLE KEYS */;
INSERT INTO `priority` VALUES (1,'Low'),(2,'Medium'),(3,'High'),(4,'Critical');
/*!40000 ALTER TABLE `priority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rmtask`
--

DROP TABLE IF EXISTS `rmtask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rmtask` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `case_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `case_id` (`case_id`),
  CONSTRAINT `fk_rmtask_case_id` FOREIGN KEY (`case_id`) REFERENCES `testcase` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rmtask`
--

/*!40000 ALTER TABLE `rmtask` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `run`
--

DROP TABLE IF EXISTS `run`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `run` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `assigned_to` int DEFAULT NULL,
  `completed_date` datetime DEFAULT NULL,
  `is_actived` tinyint NOT NULL DEFAULT '1',
  `is_completed` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `created_by` (`created_by`),
  KEY `assigned_to` (`assigned_to`),
  CONSTRAINT `fk_run_assigned_to` FOREIGN KEY (`assigned_to`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_run_create_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_run_project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `run`
--

/*!40000 ALTER TABLE `run` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `runcase`
--

DROP TABLE IF EXISTS `runcase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `runcase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status_id` int DEFAULT '1',
  `assigned_to` int DEFAULT NULL,
  `case_id` int DEFAULT NULL,
  `run_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `status_id` (`status_id`),
  KEY `assign_to` (`assigned_to`),
  KEY `case_id` (`case_id`),
  KEY `run_id` (`run_id`),
  CONSTRAINT `fk_rundetail_assign_to` FOREIGN KEY (`assigned_to`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_rundetail_case_id` FOREIGN KEY (`case_id`) REFERENCES `testcase` (`id`),
  CONSTRAINT `fk_rundetail_run_id` FOREIGN KEY (`run_id`) REFERENCES `run` (`id`),
  CONSTRAINT `fk_rundetail_status_id` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `runcase`
--

/*!40000 ALTER TABLE `runcase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `sort` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `fk_section_project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,'Danh sách bệnh nhân','des',0,3,1),(2,'Tờ điều trị','',0,3,2),(3,'Thêm mới','',0,3,3),(4,'Toa thuốc ra viện','',0,3,NULL),(5,'Diễn biến bệnh','',0,3,4),(6,'Dự trù thường quy','',0,3,5),(7,'Xuất tủ trực','',0,3,6),(8,'Toa mẫu','',6,3,NULL),(9,'Toa cũ','',6,3,NULL),(10,'Quản lý toa mẫu','',8,3,NULL),(11,'Sử dụng toa mẫu','',8,3,NULL),(12,'Ngưng thuốc','',0,3,NULL),(13,'Chẩn đoán','',5,3,NULL),(14,'Thuốc pha tiêm','',6,3,NULL),(15,'Đánh STT kháng sinh','',6,3,NULL),(16,'Thuốc Đa liều','',6,3,NULL),(17,'Booking tồn kho','',6,3,NULL),(18,'Y lệnh đặc biệt','',0,3,NULL),(19,'Dự trù máu','',0,3,NULL),(20,'Tổng kết chuyển khoa/ra viện','',0,3,NULL),(21,'Tổng kết Chuyển khoa','',20,3,NULL),(22,'Tổng kết ra viện','',20,3,NULL),(23,'Chỉ định dịch vụ','',0,3,8),(24,'Dấu sinh tồn','',5,3,NULL),(25,'Mẫu/ Gói CLS','',23,3,NULL),(26,'CLS cũ','',23,3,NULL),(27,'Sync dữ liệu xuống Hsoft','',19,3,NULL),(28,'Y lệnh đặc biệt','',18,3,NULL),(29,'Y lệnh đặc biệt khác','',18,3,NULL),(30,'Điều kiện Khám BHYT','',23,3,NULL),(31,'Điều kiện Khám BHYT','',19,3,NULL),(32,'Điều kiện Khám BHYT','',18,3,NULL),(33,'Điều kiện khám BHYT','',6,3,NULL),(34,'Toa cũ','',4,3,NULL),(35,'Sync dữ liệu Hsoft','',6,3,NULL),(36,'Copy tờ điều trị','',0,3,NULL),(37,'Copy Y lệnh thuốc','',36,3,NULL),(38,'Copy Chỉ định dịch vụ','',36,3,NULL),(39,'Copy Dự trù máu','',36,3,NULL),(40,'Copy Y lệnh đặc biệt','',36,3,NULL),(41,'Thêm mới Dự trù máu','',3,3,NULL);
LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Untested'),(2,'Passed'),(3,'Failed'),(4,'Blocked'),(5,'Retest');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `project_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `fk_tag_project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testcase`
--

DROP TABLE IF EXISTS `testcase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testcase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `casetype_id` int DEFAULT NULL,
  `priority_id` int DEFAULT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `precondition` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `step` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `expectation` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estimate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sort` int DEFAULT NULL,
  `created_by` int NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int NOT NULL,
  `updated_date` datetime DEFAULT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `section_id` int NOT NULL,
  `uat` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `section_id` (`section_id`),
  KEY `casetype_id` (`casetype_id`),
  KEY `priority_id` (`priority_id`),
  KEY `create_by` (`created_by`),
  KEY `update_by` (`updated_by`),
  CONSTRAINT `fk_testcase_casetype_id` FOREIGN KEY (`casetype_id`) REFERENCES `casetype` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_testcase_create_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_testcase_priority_id` FOREIGN KEY (`priority_id`) REFERENCES `priority` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_testcase_section_id` FOREIGN KEY (`section_id`) REFERENCES `section` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_testcase_update_by` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=253 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testcase`
--

-08-27 11:12:26',1,'2024-08-27 11:12:26',1,15,0),(45,'Copy Tờ điều trị có thuốc kháng sinh',1,2,'','','','','0',NULL,1,'2024-08-27 11:12:31',1,'2024-08-27 11:12:31',1,15,0),(46,'Tìm thuốc, hiển thị thuốc tồn khả dụng = 0',1,2,'','','','','0',NULL,1,'2024-08-27 11:15:08',1,'2024-08-27 11:15:08',1,17,0),(47,'Thêm thuốc xuống lưới Số lượng vượt tồn khả dụng',1,2,'','','','','0',NULL,1,'2024-08-27 11:15:29',1,'2024-08-27 11:15:29',1,17,0),(48,'Lưu phiếu dự trù, thuốc hết tồn',1,2,'','','','','0',NULL,1,'2024-08-27 11:15:52',1,'2024-08-27 11:15:52',1,17,0),(49,'Lưu thuốc trừ tồn khả dụng',1,2,'','','','','0',NULL,1,'2024-08-27 11:16:06',1,'2024-08-27 11:16:06',1,17,0),(50,'Cập nhật lại phiếu, tăng số lượng',1,2,'','','','','0',NULL,1,'2024-08-27 11:16:22',1,'2024-08-27 11:16:22',1,17,0),(51,'Cập nhật lại phiếu, giảm số lượng',1,2,'','','','','0',NULL,1,'2024-08-27 11:16:33',1,'2024-08-27 11:16:33',1,17,0),(52,'Xóa thuốc trên lưới,',1,2,'','','','','0',NULL,1,'2024-08-27 11:16:47',1,'2024-08-27 11:16:47',1,17,0),(53,'Hủy cả phiếu dự trù',1,2,'','','','','0',NULL,1,'2024-08-27 11:16:59',1,'2024-08-27 11:16:59',1,17,0),(54,'Lưu phiếu tồn về 0 trên 2 máy (2 máy, 2 trình duyệt mở cùng lúc)',1,2,'','','','','0',NULL,1,'2024-08-27 11:17:58',1,'2024-08-27 11:17:58',1,17,0),(55,'Thêm thành công Dịch vụ',1,2,'','','','Thêm thành công Dịch vụ','0',NULL,2,'2024-08-27 13:29:24',2,'2024-08-28 16:11:31',1,23,0),(56,'Xóa thành công dịch vụ',1,2,'','','','','0',NULL,2,'2024-08-27 13:29:32',2,'2024-08-27 13:29:32',1,23,0),(57,'Thêm dịch vụ đổi Đối tượng',1,2,'','','','','0',NULL,2,'2024-08-27 13:30:06',2,'2024-08-27 13:30:06',1,23,0),(58,'Bệnh nhân có BHYT, thêm dịch vụ BHYT không chi trả',1,2,'','','','','0',NULL,2,'2024-08-27 13:30:23',2,'2024-08-27 13:30:23',1,23,0),(59,'Bệnh nhân Không BHYT, thêm Dịch vụ đối tượng = BHYT',1,2,'','','','','0',NULL,2,'2024-08-27 13:30:49',2,'2024-08-27 13:30:49',1,23,0),(60,'Thêm Dịch vụ BHYT chênh lệch',1,2,'','','','','0',NULL,2,'2024-08-27 13:31:07',2,'2024-08-27 13:31:07',1,23,0),(61,'Xóa dịch vụ có BHYT chênh lệch',1,2,'','','','','0',NULL,2,'2024-08-27 13:31:23',2,'2024-08-27 13:31:23',1,23,0),(62,'Xóa dịch vụ, sau đó thêm lại chính dịch vụ đó',1,2,'','','','','0',NULL,2,'2024-08-27 13:31:55',2,'2024-08-27 13:31:55',1,23,0),(63,'Xóa dịch vụ đã thực hiện',1,2,'','','','','0',NULL,2,'2024-08-27 13:32:18',2,'2024-08-27 13:32:18',1,23,0),(64,'Thêm dịch vụ đã tồn tại trên lưới',1,2,'','','','','0',NULL,2,'2024-08-27 13:32:49',2,'2024-08-27 13:32:49',1,23,0),(65,'Lưu dịch vụ bắt buộc mẫu bệnh phẩm, không chọn bệnh phẩm',1,2,'','','','','0',NULL,2,'2024-08-27 13:37:17',2,'2024-08-27 13:37:17',1,23,0),(66,'Lưu dịch vụ bắt buộc mẫu bệnh phẩm, có chọn bệnh phẩm',1,2,'','','','','0',NULL,2,'2024-08-27 13:37:30',2,'2024-08-27 13:37:30',1,23,0),(67,'Thêm dịch vụ với SL > 1',1,2,'','','','','0',NULL,2,'2024-08-27 13:37:57',2,'2024-08-27 13:37:57',1,23,0),(68,'Chỉ định mới phát sinh Số phiếu',1,2,'','','','','0',NULL,2,'2024-08-27 13:39:31',2,'2024-08-27 13:39:31',1,23,0),(69,'Chỉ định dịch vụ đã có phát sinh số phiếu trong ngày, chưa có dịch vụ nào thực hiện',1,2,'','','','','0',NULL,2,'2024-08-27 13:39:55',2,'2024-08-27 13:41:33',1,23,0),(70,'Chỉ định dịch vụ đã có phát sinh số phiếu trong ngày, chỉ có 1 Dịch vụ đã thực hiệnh',1,2,'','','','','0',NULL,2,'2024-08-27 13:40:58',2,'2024-08-27 13:40:58',1,23,0),(71,'Chỉ định dịch vụ đã có phát sinh số phiếu trong ngày, tất cả dịch vụ đã thực hiện',1,2,'','','','','0',NULL,2,'2024-08-27 13:42:50',2,'2024-08-27 13:42:50',1,23,0),(72,'Thêm dịch vụ BHYT khi User thao tác là Bác sĩ không có quyền duyệt BHYT',1,2,'','','','','0',NULL,2,'2024-08-27 14:00:05',2,'2024-08-27 14:00:05',1,23,0),(73,'Thêm dịch vụ BHYT khi User thao tác là Bác sĩ có quyền duyệt BHYT',1,2,'','','','','0',NULL,2,'2024-08-27 14:00:11',2,'2024-08-27 14:00:11',1,23,0),(74,'Cập nhật lại Dịch vụ, đối tượng của dịch vụ',1,2,'','','','','0',NULL,2,'2024-08-27 14:03:19',2,'2024-08-27 14:03:19',1,23,0),(75,'Chỉ định dịch vụ, đổi lại \"Ngày dự kiến\"',1,2,'','','','','0',NULL,2,'2024-08-27 14:04:33',2,'2024-08-27 14:04:33',1,23,0),(76,'Thêm thành công túi máu',1,2,'','','','Thêm thành công túi máu','0',NULL,2,'2024-08-28 08:42:16',2,'2024-08-28 08:42:16',1,19,0),(77,'Xóa thành công túi máu',1,2,'','','','Xóa thành công túi máu','0',NULL,2,'2024-08-28 08:42:25',2,'2024-08-28 08:42:25',1,19,0),(78,'Thêm thành công túi máu SL > 1',1,2,'','','','Thêm thành công và hiển thị nhiều dòng với Số lượng = 1','0',NULL,2,'2024-08-28 08:42:37',2,'2024-08-28 08:42:37',1,19,0),(79,'Thêm túi máu vào Dự trù máu đã có',1,2,'','','','Thêm thành công','0',NULL,2,'2024-08-28 08:43:07',2,'2024-08-28 08:43:07',1,19,0),(80,'Xóa tất cả túi máu',1,2,'','','','Xóa thành công túi máu','0',NULL,2,'2024-08-28 08:43:35',2,'2024-08-28 08:43:35',1,19,0),(81,'Thêm túi máu đổi Đối tượng',1,2,'','','','Thêm thành công khi đổi đối tượng','0',NULL,2,'2024-08-28 08:47:18',2,'2024-08-28 08:47:18',1,19,0),(82,'Thêm Túi máu BN Thu phí chọn Đối tượng = BHYT',1,2,'','','','Chặn, hiển thị cảnh báo','0',NULL,2,'2024-08-28 08:47:41',2,'2024-08-28 08:47:41',1,19,0),(83,'Thêm túi máu BHYT Bác sĩ không có quyền duyệt BH',1,2,'','','','Chặn và hiển thị cảnh báo','0',NULL,2,'2024-08-28 08:48:19',2,'2024-08-28 08:48:19',1,19,0),(84,'Thêm túi máu A và 3 Túi máu B, xóa 2 túi máu B',1,2,'','','','Xóa thành công','0',NULL,2,'2024-08-28 08:49:06',2,'2024-08-28 08:49:06',1,19,0),(85,'Thêm túi máu A >> túi máu B >> xóa túi máu B',1,2,'','','','Xóa thành công túi máu','0',NULL,2,'2024-08-28 08:49:31',2,'2024-08-28 08:49:31',1,19,0),(86,'Sync dữ liệu túi máu xuống Hsoft',1,2,'','','','Hiển thị thông tin túi máu dưới Hsoft','0',NULL,2,'2024-08-28 09:49:04',2,'2024-08-28 09:49:04',1,27,0),(87,'Sync dữ liệu túi máu BHYT - có chênh lệch xuống Hsoft',1,2,'','','','Sync thành công, 1 dòng BHYT và 1 dòng Chênh lệch','0',NULL,2,'2024-08-28 09:49:24',2,'2024-08-28 09:49:24',1,27,0),(88,'Thời gian lãnh máu dự kiến',1,2,'','','','Sync thành công Thời gian dự kiến','0',NULL,2,'2024-08-28 09:49:54',2,'2024-08-28 09:49:54',1,27,0),(89,'Sync Số lần, Nhóm máu ABO, Rh',1,2,'','','','Sync thành công Số lần, nhóm máu ABO, Rh','0',NULL,2,'2024-08-28 09:50:18',2,'2024-08-28 09:50:18',1,27,0),(90,'Sync Ghi chú',1,2,'','','','Sync thành công Ghi chú','0',NULL,2,'2024-08-28 09:51:44',2,'2024-08-28 09:51:44',1,27,0),(91,'Điều chỉnh \'Thời gian lãnh máu dự kiến\' lớn hơn ngày hiện tại',1,2,'','','','Cho phép điều chỉnh','0',NULL,2,'2024-08-28 09:54:41',2,'2024-08-28 09:54:41',1,19,0),(92,'Điều chỉnh \'Thời gian lãnh máu dự kiến\" nhỏ hơn ngày hiện tại',1,2,'','','','Không cho phép chọn và lưu ngày nhỏ hơn ngày Y lệnh','0',NULL,2,'2024-08-28 09:54:54',2,'2024-08-28 09:54:54',1,19,0),(93,'Lưu Dự trù máu Số lượng lẻ (0.5, 1.5, ...)',1,1,'','','','Sau khi lưu auto trả về số chẵn','0',NULL,2,'2024-08-28 09:56:27',2,'2024-08-28 11:32:51',1,19,0),(94,'Sync Số lần, Nhóm máu ABO, Rh khi cập nhật lại Dự trù máu',1,2,'','','','Sync thành công Số lần, Nhóm máu ABO, Rh,','0',NULL,2,'2024-08-28 11:32:31',2,'2024-08-28 11:32:31',1,27,0),(95,'Cập nhật Dự trù máu, đổi sang túi máu khác',1,2,'','','','Chặn, Disable khi cập nhật','0',NULL,2,'2024-08-28 15:19:18',2,'2024-08-28 15:19:18',1,19,0),(96,'Cập nhật Dự trù máu, đổi sang Đối tượng khác',1,2,'','','','Chặn, disable khi cập nhật','0',NULL,2,'2024-08-28 15:19:33',2,'2024-08-28 15:19:33',1,19,0),(97,'Cập nhật Dự trù máu, đổi \'Thời gian lãnh máu dự kiến\'',1,2,'','','','Cập nhật thành công','0',NULL,2,'2024-08-28 15:20:02',2,'2024-08-28 15:20:02',1,19,0),(98,'Cập nhật Dự trù máu, đổi Nhóm máu ABO, Rh',1,2,'','','','Cập nhật thành công','0',NULL,2,'2024-08-28 15:20:24',2,'2024-08-28 15:20:24',1,19,0),(99,'Bác sĩ (Không duyệt BHYT), chọn button \"Thêm\" lần đầu',1,2,'','','','','0',NULL,2,'2024-08-29 09:58:27',2,'2024-08-29 09:58:27',1,30,0),(100,'Bác sĩ (Không duyệt BHYT), chọn button \"Thêm\" lần thứ 2 trở đi',1,2,'','','','','0',NULL,2,'2024-08-29 09:58:48',2,'2024-08-29 09:58:48',1,30,0),(101,'Chọn \'Xác nhận\' ở Form Xác nhận/Hủy \"Bác sĩ không đủ điều kiện thăm khám BHYT\"',1,2,'','','','','0',NULL,2,'2024-08-29 09:59:38',2,'2024-08-29 09:59:38',1,30,0),(102,'Chọn \'Hủy\' ở Form Xác nhận/Hủy \"Bác sĩ không đủ điều kiện thăm khám BHYT\"s',1,2,'','','','','0',NULL,2,'2024-08-29 10:00:31',2,'2024-08-29 10:33:06',1,30,0),(103,'Bác sĩ (Không duyệt BHYT) - Đổi lại đối tượng sang BHYT sau khi đã thêm vào lưới Danh sách',1,2,'','','','','0',NULL,2,'2024-08-29 10:19:30',2,'2024-08-29 10:23:16',1,30,0),(104,'Danh sách Dịch vụ đã có, thêm dịch vụ BHYT và nhấn \'Hủy\' ở Form \"Xác nhận/Hủy\"',1,2,'','','','','0',NULL,2,'2024-08-29 10:20:14',2,'2024-08-29 10:20:14',1,30,0),(105,'Bác sĩ (Không duyệt BHYT) - Sử dụng Mẫu CLS có Dịch vụ BH',1,2,'','','','','0',NULL,2,'2024-08-29 10:21:44',2,'2024-08-29 10:32:01',1,30,0),(106,'Bác sĩ (Không duyệt BHYT) - Sử dụng CLS cũ có Dịch vụ BHYT (Case CLS cũ của bác sĩ khác chỉ định)',1,2,'','','','','0',NULL,2,'2024-08-29 10:22:22',2,'2024-08-29 10:22:22',1,30,0),(107,'Bác sĩ (Có duyệt BHYT) - chọn button \'Thêm\' lần đầu',1,2,'','','','','0',NULL,2,'2024-08-29 10:23:47',2,'2024-08-29 10:23:47',1,30,0),(108,'Bác sĩ (Có duyệt BHYT) - Đổi lại đối tượng BHYT sau khi đã thêm vào lưới Danh sách',1,2,'','','','','0',NULL,2,'2024-08-29 10:24:18',2,'2024-08-29 10:24:18',1,30,0),(109,'Bác sĩ (Có duyệt BHYT) - sử dụng toa mẫu và toa cũ',1,2,'','','','','0',NULL,2,'2024-08-29 10:24:33',2,'2024-08-29 10:24:33',1,30,0),(110,'Bác sĩ (Không duyệt BHYT), chọn button \"Thêm\" lần đầu',1,2,'','','','Hiển thị form xác nhận \"Bác sĩ không đủ điều kiện thăm khám BHYT\"','0',NULL,2,'2024-08-29 13:51:53',2,'2024-08-29 14:10:33',1,31,0),(111,'Bác sĩ (Không duyệt BHYT), chọn button \"Thêm\" lần thứ 2 trở đi',1,2,'','','','Sẽ mặc định Đối tượng = Đối tượng dịch vụ đầu tiền','0',NULL,2,'2024-08-29 13:51:56',2,'2024-08-29 14:10:58',1,31,0),(112,'Chọn \'Xác nhận\' ở Form Xác nhận/Hủy \"Bác sĩ không đủ điều kiện thăm khám BHYT\"',1,2,'','','','Auto chuyển về Thu phí','0',NULL,2,'2024-08-29 14:06:46',2,'2024-08-29 14:11:16',1,31,0),(113,'Danh sách Dịch vụ đã có, thêm túi máu BHYT và nhấn \'Hủy\' ở Form \"Xác nhận/Hủy\"',1,2,'','','','','0',NULL,2,'2024-08-29 14:08:41',2,'2024-08-29 14:08:41',1,31,0),(114,'Bác sĩ (Có duyệt BHYT) - chọn button \'Thêm\' lần đầu',1,2,'','','','Thêm bình thường đối với đối tượng BHYT','0',NULL,2,'2024-08-29 14:09:14',2,'2024-08-29 14:12:02',1,31,0),(115,'Bác sĩ (Có duyệt BHYT) - Đổi lại đối tượng BHYT sau khi đã thêm vào lưới Danh sách',1,2,'','','','Đổi bình thường ','0',NULL,2,'2024-08-29 14:09:21',2,'2024-08-29 14:12:19',1,31,0),(116,'Bác sĩ (Không duyệt BHYT) - Nhập thuốc, chọn button \'Thêm\'',1,2,'','','','','0',NULL,2,'2024-08-29 14:23:19',2,'2024-08-29 14:23:19',1,33,0),(117,'Chọn \'Xác nhận\' tại form xác nhận \"Bác sĩ không đủ điều kiện thăm khám BHYT\"',1,2,'','','','Auto chuyển về Thu phí','0',NULL,2,'2024-08-29 14:24:33',2,'2024-08-29 14:27:18',1,33,0),(118,'Bác sĩ (Không duyệt BHYT) - Sau khi thêm thuốc đầu tiên xuống lưới',1,2,'','','','Đối tượng thuốc Mặc định = Đối tượng thuốc đầu tiên','0',NULL,2,'2024-08-29 14:26:34',2,'2024-08-29 14:27:07',1,33,0),(119,'Bác sĩ (Không duyệt BHYT) - Trên lưới danh sách đã thêm, đổi lại đối tượng về BHYT ',1,2,'','','','','0',NULL,2,'2024-08-29 14:28:10',2,'2024-08-29 14:28:10',1,33,0),(120,'Bác sĩ (Có duyệt BHYT) - Thêm thuốc BHYT',1,2,'','','','','0',NULL,2,'2024-08-29 14:29:38',2,'2024-08-29 14:29:38',1,33,0),(121,'Bác sĩ (Có duyệt BHYT) - Đổi đối tượng sang BHYT',1,2,'','','','','0',NULL,2,'2024-08-29 14:29:55',2,'2024-08-29 14:29:55',1,33,0),(122,'Vào màn hình danh sách toa cũ',1,2,'','','','Hiển thị danh sách toa cũ','0',NULL,2,'2024-08-30 14:10:26',2,'2024-09-04 08:19:11',1,34,0),(123,'Chọn, sử dụng được toa cũ',1,2,'','','','Chọn, sử dụng được toa cũ','0',NULL,2,'2024-08-30 14:10:42',2,'2024-09-04 08:19:25',1,34,0),(124,'Kiểm tra STT khi sử dụng toa cũ',1,2,'','','','STT thuốc hiển thị đúng theo STT của toa cũ','0',NULL,2,'2024-08-30 14:10:59',2,'2024-08-31 08:21:17',1,34,0),(125,'Dùng toa cũ, load đúng đường dùng (thuốc 1 đường dùng và nhiều đường dùng)',1,2,'','','','Load đúng đường dùng, có thể đổi đường dùng','0',NULL,2,'2024-08-30 14:11:35',2,'2024-09-04 08:19:59',1,34,0),(126,'Dùng toa cũ, load đúng đối tượng thuốc',1,2,'','','','Load đúng đối tượng thuốc toa cũ','0',NULL,2,'2024-08-30 14:11:55',2,'2024-09-04 08:18:26',1,34,0),(127,'Dùng toa cũ load đúng Số lượng S/Tr/C/T',1,2,'','','','Load đúng Số lượng S/Tr/C/T và Số lượng tổng','0',NULL,2,'2024-08-30 14:13:02',2,'2024-08-31 08:34:35',1,34,0),(128,'Số toa cũ load đúng Số ngày',1,2,'','','','Load đúng số ngày toa cũ  chọn đầu tiên','0',NULL,2,'2024-08-30 14:13:23',2,'2024-09-04 08:18:02',1,34,0),(129,'Dùng toa cũ load ghi chú',1,2,'','','','Load đúng ghi chú của toa cũ','0',NULL,2,'2024-08-30 14:13:55',2,'2024-08-31 08:21:04',1,34,0),(130,'Đổi đường dùng khi dùng toa cũ',1,2,'','','','Với thuốc nhiều đường dùng, có thể đổi sang đường dùng khác','0',NULL,2,'2024-08-30 14:16:07',2,'2024-08-31 08:20:41',1,34,0),(131,'Dùng toa cũ có thuốc hết tồn khả dụng',1,2,'','','','Vẫn load và khi lưu sẽ báo hết tồn','0',NULL,2,'2024-08-30 14:16:47',2,'2024-09-04 08:20:22',1,34,0),(132,'Dùng toa cũ có thuốc đánh STT kháng sinh',1,2,'','','','Các thuốc kháng sinh sẽ enable ô \'Số ngày\' , default = 0','0',NULL,2,'2024-08-30 14:19:05',2,'2024-08-31 08:18:26',1,34,0),(133,'Thêm thành công toa thuốc ra viện',1,2,'','','','Thêm thành công thuốc ra viện','0',NULL,2,'2024-08-30 14:54:46',2,'2024-09-04 08:20:36',1,4,0),(134,'Xóa thuốc trong toa ra viện',1,2,'','','','Xóa thành công toa thuốc ra viện','0',NULL,2,'2024-08-30 14:55:42',2,'2024-09-04 08:20:46',1,4,0),(135,'Xóa tất cả các thuốc trong toa ra viện',1,2,'','','','Xóa thành công, và xóa y lệnh toa ra viện','0',NULL,2,'2024-08-30 14:55:59',2,'2024-09-04 08:21:00',1,4,0),(136,'Thêm thuốc đổi đối tượng thuốc',1,2,'','','','Thêm và đổi được đối tượng','0',NULL,2,'2024-08-30 14:58:16',2,'2024-09-04 08:21:14',1,4,0),(137,'Bệnh nhân BHYT, thêm thuốc BHYT không chi trả',1,2,'','','','Hiển thị Popup thuốc BHYT không thanh toán, chọn \"Xác nhận\" auto chuyển về thu phí','0',NULL,2,'2024-08-30 14:58:42',2,'2024-09-04 08:21:50',1,4,0),(138,'Thêm thuốc Số lượng tính toán theo Số ngày',1,2,'','','','Số lượng tính toán theo số ngày','0',NULL,2,'2024-08-30 14:59:50',2,'2024-09-04 08:22:13',1,4,0),(139,'Thêm thuốc Số lượng S/Tr/C/T lẻ (0.5, 1.5,...) và Số lượng tính toán theo Số ngày',1,2,'','','','Thêm được số lẻ, số ngày tính theo số lẻ (Không làm tròn)','0',NULL,2,'2024-08-30 15:00:28',2,'2024-09-04 08:22:34',1,4,0),(140,'Thêm thuốc nhiều đường dùng, đổi đường dùng',1,2,'','','','Đổi được đường dùng','0',NULL,2,'2024-08-30 15:00:56',2,'2024-09-04 08:22:46',1,4,0),(141,'Thêm thuốc, nhập thông tin Ghi chú',1,2,'','','','Nhập được thông tin ghi chú','0',NULL,2,'2024-08-30 15:02:09',2,'2024-09-04 08:23:04',1,4,0),(142,'Thêm thuốc, thuốc kháng sinh',1,2,'','','','Hiển thị STT thuốc đánh dấu kháng sinh','0',NULL,2,'2024-08-30 15:03:09',2,'2024-09-04 08:23:22',1,4,0),(143,'Đổi lại đối tượng trên lưới Danh sách đã thêm',1,2,'','','','Đổi được sang đối tượng khác','0',NULL,2,'2024-08-30 15:06:35',2,'2024-09-04 08:23:31',1,4,0),(144,'Đổi lại \'Cách dùng\' trên lưới Danh sách đã thêm',1,2,'','','','Đổi được cách dùng','0',NULL,2,'2024-08-30 15:07:14',2,'2024-09-04 08:23:52',1,4,0),(145,'Cập nhật lại Số lượng S/Tr/C/T (bao gồm SL lẻ) trên lưới Danh sách đã thêm',1,2,'','','','Cập nhật thành công','0',NULL,2,'2024-08-30 15:07:42',2,'2024-09-04 08:24:12',1,4,0),(146,'Thêm thành công túi máu SL > 1',1,2,'','','','Thêm thành công và hiển thị nhiều dòng với Số lượng = 1','0',NULL,2,'2024-08-31 08:03:13',2,'2024-08-31 08:03:13',1,19,0),(147,'Lưu thành công Dự trù thường quy',1,2,'','','','Lưu thành công dự trù thường quy','0',NULL,2,'2024-09-04 09:52:14',2,'2024-09-04 10:18:26',1,6,0),(148,'Xóa Thuốc trong dự trù thường quy',1,2,'','','','Xóa thành công thuốc trong Danh sách','0',NULL,2,'2024-09-04 09:52:26',2,'2024-09-04 10:18:42',1,6,0),(149,'Xóa tất cả thuốc dự trù thường quy',1,2,'','','','Xóa tất cả các thuốc, xóa thông tin phiếu dự trù','0',NULL,2,'2024-09-04 09:52:39',2,'2024-09-04 10:19:07',1,6,0),(150,'Thêm thuốc, không chọn Giờ BD',1,2,'','','','Khi không chọn Giờ BD, Thời gian dùng thuốc sẽ EMPTY','0',NULL,2,'2024-09-04 09:53:34',2,'2024-09-04 10:19:35',1,6,0),(151,'Thêm thuốc chọn Giờ BD',1,2,'','','','Khi chọn Giờ BD thì Thời gian dùng thuốc sẽ tính theo công thức','0',NULL,2,'2024-09-04 09:53:47',2,'2024-09-04 10:20:07',1,6,0),(152,'Thêm thuốc đổi đường dùng thuốc',1,2,'','','','Đổi được đối tượng thuốc khi thêm','0',NULL,2,'2024-09-04 09:54:04',2,'2024-09-04 10:36:32',1,6,0),(153,'Thêm thuốc nhập Tốc độ, liều dùng',1,2,'','','','Nhập và thêm thành công xuống lưới danh sách','0',NULL,2,'2024-09-04 09:54:51',2,'2024-09-04 10:47:50',1,6,0),(154,'Thêm thuốc đổi lại Cách dùng',1,2,'','','','Có thể đổi được đường dùng với thuốc nhiều cách dùng','0',NULL,2,'2024-09-04 09:55:17',2,'2024-09-04 10:48:28',1,6,0),(155,'Thêm thuốc Kháng sinh - để mặc định Số ngày',1,2,'','','','','0',NULL,2,'2024-09-04 09:55:30',2,'2024-09-04 09:55:48',1,6,0),(156,'Thêm thuốc kháng sinh - sửa Số ngày',1,2,'','','','','0',NULL,2,'2024-09-04 09:56:03',2,'2024-09-04 09:56:03',1,6,0),(157,'Thêm thuốc Đa liều - để mặc định tích',1,2,'','','','','0',NULL,2,'2024-09-04 09:56:18',2,'2024-09-04 13:07:10',0,6,0),(158,'Thêm thuốc Đa liều - bỏ tích đa liều',1,2,'','','','','0',NULL,2,'2024-09-04 09:56:28',2,'2024-09-04 13:06:12',0,6,0),(159,'Thêm thuốc đổi đối tượng thuốc',1,2,'','','','','0',NULL,2,'2024-09-04 09:57:58',2,'2024-09-04 09:57:58',1,6,0),(160,'Thêm thuốc bệnh nhân BHYT, thuốc BHYT có chi trả',1,2,'','','','','0',NULL,2,'2024-09-04 09:58:40',2,'2024-09-04 09:58:40',1,6,0),(161,'Thêm thuốc bệnh nhân BHYT, thuốc BHYT không chi trả',1,2,'','','','','0',NULL,2,'2024-09-04 09:58:55',2,'2024-09-04 09:58:55',1,6,0),(162,'Trên lưới Danh sách thuốc, đổi lại đường dùng',1,2,'','','','','0',NULL,2,'2024-09-04 10:13:48',2,'2024-09-04 10:13:48',1,6,0),(163,'Trên lưới Danh sách thuốc, Đổi lại Giờ BĐ',1,2,'','','','Đổi thành công, Thời gian dùng thuốc và cách dùng reload theo','0',NULL,2,'2024-09-04 10:14:05',2,'2024-09-04 10:43:16',1,6,0),(164,'Trên lưới Danh sách thuốc, Đổi lại Liều dùng, tốc độ, ghi chú',1,2,'','','','Đổi thành công, Cách dùng reload theo','0',NULL,2,'2024-09-04 10:15:53',2,'2024-09-04 10:54:14',1,6,0),(165,'Trên lưới Danh sách thuốc, nhập lại Cách dùng',1,2,'','','','Nhập được cách dùng','0',NULL,2,'2024-09-04 10:16:04',2,'2024-09-04 10:55:12',1,6,0),(166,'Trên lưới Danh sách thuốc, tích và bỏ tích checkbox Đa liều',1,2,'','','','','0',NULL,2,'2024-09-04 10:16:28',2,'2024-09-04 10:16:28',1,6,0),(167,'Trên lưới Danh sách thuốc, nhập Ngày dùng thuốc kháng sinh',1,2,'','','','','0',NULL,2,'2024-09-04 10:16:38',2,'2024-09-04 10:16:38',1,6,0),(168,'Trên lưới Danh sách thuốc, Đổi lại STT thuốc',1,2,'','','','Đổi thành công STT và thuốc sắp xếp theo STT tăng dần','0',NULL,2,'2024-09-04 10:17:11',2,'2024-09-04 10:55:36',1,6,0),(169,'Trên lưới Danh sách thuốc, đổi lại Số lần/ngày, giờ BD không nhập',1,2,'','','','Đổi thành công, Thời gian dùng thuốc không thay đổi, Cách dùng reload theo','0',NULL,2,'2024-09-04 10:18:01',2,'2024-09-04 10:59:29',1,6,0),(170,'Trên lưới Danh sách thuốc, đổi lại Số lần/ngày, giờ BD có nhập',1,2,'','','','Đổi thành công, Thời gian dùng thuốc hiển thị theo Số lần. Cách dùng Reload theo','0',NULL,2,'2024-09-04 10:58:51',2,'2024-09-04 11:00:17',1,6,0),(171,'Lưu \'Tổng kết bệnh án\' khi Tình trạng ra viện bị trống',1,2,'','','','Chặn lưu và hiển thị cảnh báo','0',NULL,2,'2024-09-04 14:33:22',2,'2024-09-04 14:33:35',1,22,0),(172,'Ký/ hủy ký tổng kết bệnh án',1,2,'','','','Ký/ hủy ký thành công','0',NULL,2,'2024-09-04 14:37:34',2,'2024-09-04 14:38:51',1,22,0),(173,'Vào chức năng \"Tổng kết bệnh án\" khi đã ký',1,2,'','','','Chặn vào chức năng và hiển thị thông báo','0',NULL,2,'2024-09-04 14:37:46',2,'2024-09-04 14:38:31',1,22,0),(174,'Vào chức năng \"Tổng kết bệnh án\" khi đã hủy ký',1,2,'','','','Vào chức năng bình thường','0',NULL,2,'2024-09-04 14:38:04',2,'2024-09-04 14:38:42',1,22,0),(175,'Tìm kiếm và sử dụng được toa mẫu từ màn hình \"Dự trù\"',1,2,'','','','Sử dụng thành công','0',NULL,2,'2024-09-04 15:32:20',2,'2024-09-04 15:36:48',1,11,0),(176,'Sử dụng toa mẫu ở màn hình \"Quản lý toa mẫu\"',1,2,'','','','Sử dụng thành công','0',NULL,2,'2024-09-04 15:33:29',2,'2024-09-04 15:36:42',1,11,0),(177,'Load STT khi sử dụng toa mẫu',1,2,'','','','Load đúng STT theo toa mẫu','0',NULL,2,'2024-09-04 15:34:24',2,'2024-09-04 15:36:35',1,11,0),(178,'Load Đối tượng thuốc khi sử dụng toa mẫu',1,2,'','','','BN thu phí, load Thu phí. BN BHYT load BHYT với các thuốc BHYT, còn lại Thu phí','0',NULL,2,'2024-09-04 15:35:13',2,'2024-09-04 15:36:21',1,11,0),(179,'Load Đường dùng khi sử dụng toa mẫu',1,2,'','','','Load đúng đường dùng','0',NULL,2,'2024-09-04 15:37:27',2,'2024-09-04 15:39:36',1,11,0),(180,'Load tốc độ, liều dùng, ghi chú sử dụng toa mẫu',1,2,'','','','Load tốc độ, liều dùng, ghi chú','0',NULL,2,'2024-09-04 15:37:56',2,'2024-09-04 15:39:24',1,11,0),(181,'Load Giờ BD, thời gian dùng thuốc khi sử dụng toa mẫu',1,2,'','','','Load đúng Giờ BD và Thời gian dùng thuốc','0',NULL,2,'2024-09-04 15:38:21',2,'2024-09-12 14:46:00',1,11,0),(182,'Dùng toa mẫu Sô lượng lẻ (0.5, 1.5,...)',1,2,'','','','Load được Số lẻ ','0',NULL,2,'2024-09-04 15:43:34',2,'2024-09-04 15:43:56',1,11,0),(183,'Dùng toa mẫu có thuốc Đa liều',1,2,'','','','Hiển thị checkbox Đa liều và mặc định tích','0',NULL,2,'2024-09-04 15:44:34',2,'2024-09-04 15:45:03',1,11,0),(184,'Dùng toa mẫu có thuốc Kháng sinh',1,2,'','','','Enable ô Ngày dùng và mặc định = 0','0',NULL,2,'2024-09-04 15:44:43',2,'2024-09-04 15:45:16',1,11,0),(185,'In diễn biến dự trù máu/ SL = 1 và SL > 1',1,2,'','','','Hiển thị túi máu đã chỉ định','0',NULL,2,'2024-09-05 15:22:37',2,'2024-09-05 15:25:35',1,19,0),(186,'In diễn biến dự trù máu Sl > 1',1,2,'','','','','0',NULL,2,'2024-09-05 15:23:19',2,'2024-09-05 15:25:41',0,19,0),(187,'Không chọn diễn biến, vào chức năng Ngưng thuốc',1,2,'','','','Vào và hiển thị tất cả các thuốc trong 3 ngày','0',NULL,2,'2024-09-06 11:25:30',2,'2024-09-06 14:47:08',1,12,0),(188,'Chọn diễn biến không có thuốc, vào chức năng Ngưng thuốc',1,2,'','','','Hiển thị DS trống','0',NULL,2,'2024-09-06 11:31:34',2,'2024-09-06 14:47:24',1,12,0),(189,'Chọn diễn biến có Xuất thuốc tủ trực, vào chức năng Ngưng thuốc',1,2,'','','','Hiển thị tất cả các thuốc tủ trực','0',NULL,2,'2024-09-06 11:33:56',2,'2024-09-06 14:47:41',1,12,0),(190,'Chọn diễn biến có Dự trù thường quy, Chưa duyệt',1,2,'','','','Không hiển thị thuốc chưa duyệt','0',NULL,2,'2024-09-06 11:34:29',2,'2024-09-06 14:47:54',1,12,0),(191,'Chọn diễn biến có Dự trù thường quy, Đã duyệt',1,2,'','','','Hiển thị tất cả các thuốc nếu phiếu duyệt','0',NULL,2,'2024-09-06 11:34:37',2,'2024-09-06 14:48:11',1,12,0),(192,'Tạo thành công y lệnh ngưng thuốc',1,2,'','','','Tạo thành công y lệnh ngưng thuốc, và hiển thị ra dòng y lệnh mới','0',NULL,2,'2024-09-06 13:13:57',2,'2024-09-06 14:49:48',1,12,0),(193,'Xóa ngưng thuốc',1,2,'','','','Xóa thành công','0',NULL,2,'2024-09-06 13:14:04',2,'2024-09-06 14:52:05',1,12,0),(194,'Load chẩn đoán | chẩn đoán có ẩn chẩn đoán ',1,2,'','','','Load đầy đủ chẩn đoán và chẩn đoán khi đã ẩn','0',NULL,2,'2024-09-06 14:12:55',2,'2024-09-06 14:52:32',1,12,0),(195,'Load chẩn đoán phân biệt | ẩn chẩn đoán',1,2,'','','','Load đầy đủ chẩn đoán phân biệt và chẩn đoán khi đã ẩn','0',NULL,2,'2024-09-06 14:13:20',2,'2024-09-06 14:53:01',1,12,0),(196,'Load cân nặng, chiều cao, BMI',1,2,'','','','Load đầy đủ cần nặng, chiều cao, BMI','0',NULL,2,'2024-09-06 14:13:47',2,'2024-09-06 14:55:32',1,12,0),(197,'Load các thông tin khác khi ngưng thuốc  (Diễn biến, cảnh báo, xử trí, vấn đề chính)',1,2,'','','','Không load','0',NULL,2,'2024-09-06 14:13:55',2,'2024-09-06 14:56:29',1,12,0),(198,'Ngưng thuốc chưa chọn thuốc',1,2,'','','','Chặn và hiển thị cảnh báo','0',NULL,2,'2024-09-06 14:43:27',2,'2024-09-06 14:56:19',1,12,0),(199,'Ngưng thuốc chưa nhập lý do',1,2,'','','','Chặn và cảnh báo','0',NULL,2,'2024-09-06 14:43:39',2,'2024-09-06 14:56:02',1,12,0),(200,'Load sinh hiệu',1,2,'','','','Không load sinh hiệu','0',NULL,2,'2024-09-06 14:55:48',2,'2024-09-06 14:55:55',1,12,0),(201,'Copy y lệnh có thuốc thường quy',1,2,'','','','Hiển thị màn hình chọn phiếu, kho','0',NULL,2,'2024-09-06 15:00:47',2,'2024-09-06 15:05:10',1,37,0),(202,'Vào chức năng \"Copy tờ điều trị\" khi y lệnh có xuất tủ trực',1,2,'','','','Hiển thị màn hình chọn phiếu, tủ trực','0',NULL,2,'2024-09-06 15:01:33',2,'2024-09-06 15:05:21',1,37,0),(203,'Chọn phiếu, kho ở màn hình Copy TDT khi copy dự trù thường quy',1,2,'','','','Đổi được khoa, phiếu. Kho load theo khung giờ và phiếu đã chọn','0',NULL,2,'2024-09-06 15:03:33',2,'2024-09-06 15:04:57',1,37,0),(204,'Chọn phiếu, tủ trực ở màn hình Copy TDT khi copy tủ trực',1,2,'','','','Đổi được phiếu, tủ trực','0',NULL,2,'2024-09-06 15:03:58',2,'2024-09-06 15:04:34',1,37,0),(205,'Load đúng STT thuốc khi copy',1,2,'','','','Load đúng STT','0',NULL,2,'2024-09-06 15:06:51',2,'2024-09-06 15:23:56',1,37,0),(206,'Hiển thị đúng đối tượng thuốc khi copy',1,2,'','','','Hiển thị đúng Đối tượng thuốc','0',NULL,2,'2024-09-06 15:07:04',2,'2024-09-06 15:24:09',1,37,0),(207,'Copy đúng Số lần/Ngày, SL/Lần, Số lượng',1,2,'','','','Hiển thị đúng Số lần/ngày, SL/Lần, Số lượng','0',NULL,2,'2024-09-06 15:13:08',2,'2024-09-06 15:24:35',1,37,0),(208,'Load Giờ BĐ, Thời gian dùng thuốc (khác ngày)',1,2,'','','','Load đúng Giờ BD, Thời gian dùng thuốc. ĐÚng Số ngày theo Ngày giờ thuốc','0',NULL,2,'2024-09-06 15:13:44',2,'2024-09-06 15:25:14',1,37,0),(209,'Copy lấy đúng đường dùng thuốc (thuốc nhiều đường dùng)',1,2,'','','','Load đúng đường dùng thuốc đã chọn','0',NULL,2,'2024-09-06 15:18:17',2,'2024-09-06 15:25:28',1,37,0),(210,'Copy load Liều dùng, tốc độ, ghi chú, cách dùng ',1,2,'','','','Load đầy đủ thông tin','0',NULL,2,'2024-09-06 15:18:48',2,'2024-09-06 15:25:37',1,37,0),(211,'Copy Thuốc Đa liều tích và không tích',1,2,'','','','Tích và bỏ tích tương ứng','0',NULL,2,'2024-09-06 15:19:01',2,'2024-09-06 15:25:52',1,37,0),(212,'Copy thuốc kháng sinh (khác ngày)',1,2,'','','','Enable Số ngày và default = 0, sau khi lưu thành công STT hiển thị theo công thức','0',NULL,2,'2024-09-06 15:19:16',2,'2024-09-06 15:26:19',1,37,0),(213,'Copy thuốc pha tiêm',1,2,'','','','Copy được thuốc pha tiêm','0',NULL,2,'2024-09-06 15:19:29',2,'2024-09-06 15:26:30',1,37,0),(214,'Copy có thuốc hết tồn',1,2,'','','','Khi lưu copy cảnh báo thuốc hết tồn','0',NULL,2,'2024-09-06 15:21:52',2,'2024-09-06 15:52:12',1,37,0),(215,'Copy thành công chỉ định dịch vụ',1,2,'','','','Copy thành công dịch vụ','0',NULL,2,'2024-09-10 13:49:17',2,'2024-09-10 13:56:44',1,38,0),(216,'Copy Load đúng đối tượng',1,2,'','','','Load đúng đối tượng đã chọn','0',NULL,2,'2024-09-10 13:49:33',2,'2024-09-10 13:56:36',1,38,0),(217,'Copy Load tình trạng (thường, cấp cứu)',1,2,'','','','Load đúng tình trạng đã chọn','0',NULL,2,'2024-09-10 13:49:57',2,'2024-09-10 13:56:28',1,38,0),(218,'Copy Load Số lượng đã chỉ định (SL > 1)',1,2,'','','','Load đúng Số lượng','0',NULL,2,'2024-09-10 13:50:30',2,'2024-09-10 13:56:56',1,38,0),(219,'Copy load Bệnh phẩm',1,2,'','','','Load đúng bệnh phẩm đã chọn','0',NULL,2,'2024-09-10 13:50:57',2,'2024-09-10 13:52:57',1,38,0),(220,'Copy load Ghi chú',1,2,'','','','Load đúng ghi chú đã nhập','0',NULL,2,'2024-09-10 13:52:34',2,'2024-09-10 13:52:44',1,38,0),(221,'Copy kiểm tra ràng buộc bệnh phẩm (dịch vụ cấu hình bệnh phẩm ràng buộc)',1,2,'','','','Chặn, không cho lưu khi chưa có bệnh phẩm','0',NULL,2,'2024-09-10 13:54:35',2,'2024-09-10 13:55:44',1,38,0),(222,'Copy dịch vụ kiểm tra hạn thẻ BHYT',1,2,'','','','Hết hạn thẻ BHYT, chặn không cho lưu ','0',NULL,2,'2024-09-10 13:55:07',2,'2024-09-10 13:55:31',1,38,0),(223,'Copy Load ngày dự kiến (trường hợp khác ngày)',1,2,'','','','Load Ngày dự kiến = Ngày y lệnh','0',NULL,2,'2024-09-10 13:58:05',2,'2024-09-10 14:03:10',1,38,0),(224,'Copy phát sinh Số phiếu (check ở Hsoft)',1,2,'','','','Sinh số phiếu','0',NULL,2,'2024-09-10 14:04:52',2,'2024-09-10 14:06:17',1,38,0),(225,'Copy thành công Dự trù máu',1,2,'','','','Copy thành công dự trù máu','0',NULL,2,'2024-09-10 14:14:36',2,'2024-09-10 14:47:27',1,39,0),(226,'Copy dự trù máu, load đối tượng',1,2,'','','','Load đùng đối tượng','0',NULL,2,'2024-09-10 14:14:55',2,'2024-09-10 14:32:41',1,39,0),(227,'Copy dự trù máu kê nhiều dòng',1,2,'','','','Copy thành công Dự trù máu kê nhiều dòng','0',NULL,2,'2024-09-10 14:16:37',2,'2024-09-10 14:32:28',1,39,0),(228,'Copy dự trù máu load ghi chú',1,2,'','','','Load ghi chú','0',NULL,2,'2024-09-10 14:16:50',2,'2024-09-10 14:31:59',1,39,0),(229,'Copy dự trù máu load Thời gian lãnh máu dự kiến',1,2,'','','','Thời gian lãnh máu dự kiến lấy theo ngày y lệnh','0',NULL,2,'2024-09-10 14:17:12',2,'2024-09-10 14:35:24',1,39,0),(230,'Copy dự trù máu load nhóm máu ABO, Rh',1,2,'','','','Load đúng nhóm máu ABO, Rh','0',NULL,2,'2024-09-10 14:18:50',2,'2024-09-10 14:24:38',1,39,0),(231,'Copy dự trù máu sinh số phiếu (check ở Hsoft)',1,2,'','','','Tạo được số phiếu','0',NULL,2,'2024-09-10 14:48:27',2,'2024-09-10 14:50:59',1,39,0),(232,'Copy Dự trù máu kiểm tra hạn thẻ BHYT',1,2,'','','','Chặn, cảnh báo trường hợp thẻ BHYT đã hết hạn','0',NULL,2,'2024-09-10 14:49:47',2,'2024-09-10 14:50:50',1,39,0),(233,'Copy Dự trù máu kiểm tra quyền khám bhyt của Bác sĩ',1,2,'','','','Nếu BS không có quyền khám bhyt thì chặn và cảnh báo. Ngược lại lưu thành công','0',NULL,2,'2024-09-10 14:50:13',2,'2024-09-10 14:51:25',1,39,0),(234,'Copy Chỉ định dịch vụ kiểm tra quyền khám bhyt của Bác sĩ',1,2,'','','','Nếu BS không có quyền khám bhyt thì chặn và cảnh báo. Ngược lại lưu thành công','0',NULL,2,'2024-09-10 14:54:04',2,'2024-09-10 14:54:13',1,38,0),(235,'Copy thành công Y lệnh đặc biệt',1,2,'','','','Copy thành công y lệnh đặc biệt','0',NULL,2,'2024-09-10 14:56:47',2,'2024-09-10 15:04:17',1,40,0),(236,'Copy thành công y lệnh đặc biệt khác',1,2,'','','','Copy thành công y lệnh đặc biệt khác','0',NULL,2,'2024-09-10 14:57:01',2,'2024-09-10 15:04:21',1,40,0),(237,'Copy  y lệnh đặc biệt load đối tượng',1,2,'','','','Lcoad đúng Đối tượng','0',NULL,2,'2024-09-10 14:57:36',2,'2024-09-10 15:04:28',1,40,0),(238,'Copy y lệnh đặc biệt load SL (SL > 1)',1,2,'','','','Load đúng Số lượng','0',NULL,2,'2024-09-10 14:58:03',2,'2024-09-10 15:04:36',1,40,0),(239,'Copy Y lệnh đặc biệt load Tên thiết bị',1,2,'','','','Load Tên thiết bị','0',NULL,2,'2024-09-10 14:58:32',2,'2024-09-10 15:04:44',1,40,0),(240,'Copy Y lệnh đặc biệt kiểm tra hạn thẻ BHYT',1,2,'','','','Chặn, cảnh báo trường hợp thẻ BHYT đã hết hạn','0',NULL,2,'2024-09-10 15:13:55',2,'2024-09-10 15:15:01',1,40,0),(241,'Copy Y lệnh đặc biệt kiểm tra quyền khám bhyt của Bác sĩ',1,2,'','','','Nếu BS không có quyền khám bhyt thì chặn và cảnh báo. Ngược lại lưu thành công','0',NULL,2,'2024-09-10 15:14:12',2,'2024-09-10 15:15:07',1,40,0),(242,'Thêm thành công Dự trù máu',1,2,'','','','','0',NULL,2,'2024-09-13 11:15:40',2,'2024-09-13 11:15:40',1,41,0),(243,'Xóa dự trù máu vừa thêm',1,2,'','','','','0',NULL,2,'2024-09-13 11:15:59',2,'2024-09-13 11:15:59',1,41,0),(244,'Thêm thành công Túi máu SL > 1',1,2,'','','','','0',NULL,2,'2024-09-13 11:16:17',2,'2024-09-13 11:16:17',1,41,0),(245,'Thêm túi máu đổi đối tượng',1,2,'','','','','0',NULL,2,'2024-09-13 11:16:34',2,'2024-09-13 11:16:34',1,41,0),(246,'Thêm túi máu BN thu phí, chọn BHYT',1,2,'','','','','0',NULL,2,'2024-09-13 11:16:57',2,'2024-09-13 11:16:57',1,41,0),(247,'Thêm túi máu BHYT, Bác sĩ không có quyền khám BHYT',1,2,'','','','','0',NULL,2,'2024-09-13 11:17:41',2,'2024-09-13 11:17:41',1,41,0),(248,'Điều chỉnh \'Thời gian lãnh máu dự kiến\' lớn hơn ngày hiện tại',1,2,'','','','','0',NULL,2,'2024-09-13 11:18:29',2,'2024-09-13 11:18:29',1,41,0),(249,'Điều chỉnh \'Thời gian lãnh máu dự kiến\' nhỏ hơn ngày hiện tại',1,2,'','','','','0',NULL,2,'2024-09-13 11:18:38',2,'2024-09-13 11:18:53',1,41,0),(250,'Lưu Dự trù máu Số lượng lẻ (0.5, 1.5, ...)',1,2,'','','','Lưu thành công và sẽ lưu về số nguyên','0',NULL,2,'2024-09-13 11:19:27',2,'2024-09-13 13:08:38',1,41,0),(251,'Thêm thuốc ADR',1,2,'','','','Thuốc adr không in đậm trên lưới hiển thị','0',NULL,2,'2024-09-13 15:47:21',2,'2024-09-13 15:47:58',1,6,0),(252,'Thêm thuốc ADR nguy cơ cao',1,2,'','','','Thuốc Adr nguy cơ cao sẽ hiển thị in đậm','0',NULL,2,'2024-09-13 15:47:32',2,'2024-09-13 15:48:15',1,6,0);
/*!40000 ALTER TABLE `testcase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk_token_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_admin` tinyint NOT NULL DEFAULT '0',
  `is_active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','pbkdf2:sha256:600000$IifzgYfd98xPZiwZ$2828daae0bbd1878b6bbeac5f840e648ecd4ad9acc1d6d5a6dca25109c48e804',1,1),(2,'ducpn','pbkdf2:sha256:600000$fd1WrzuBsiRA1JIg$927f5039c0af7072934605e3dc90b5f8f6c1bb29f3da5e654d4d1a83d1761fac',0,1),(3,'abc123','pbkdf2:sha256:600000$fd1WrzuBsiRA1JIg$927f5039c0af7072934605e3dc90b5f8f6c1bb29f3da5e654d4d1a83d1761fac',0,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dtest'
--
