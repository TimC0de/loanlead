-- MySQL dump 10.16  Distrib 10.2.10-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: loanlead
-- ------------------------------------------------------
-- Server version	10.2.10-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entity_name` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `district` varchar(50) NOT NULL,
  `town` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `branches_name_uindex` (`name`),
  UNIQUE KEY `branches_id_uindex` (`id`),
  KEY `FKki9w25xskrhvval4oqwj62k8b` (`entity_name`),
  CONSTRAINT `branches_entities_name_fk` FOREIGN KEY (`entity_name`) REFERENCES `entities` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone_numbers_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `document` varchar(100) NOT NULL,
  `document_type` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customers_document_uindex` (`document`),
  KEY `customers_phone_numbers_id_fk` (`phone_numbers_id`),
  CONSTRAINT `customers_phone_numbers_id_fk` FOREIGN KEY (`phone_numbers_id`) REFERENCES `phone_numbers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2004 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entities`
--

DROP TABLE IF EXISTS `entities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `short_name` varchar(50) NOT NULL,
  `box_number` varchar(100) NOT NULL,
  `plot_number` varchar(100) NOT NULL,
  `branches_number` int(5) NOT NULL,
  `description` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `entities_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entities`
--

LOCK TABLES `entities` WRITE;
/*!40000 ALTER TABLE `entities` DISABLE KEYS */;
/*!40000 ALTER TABLE `entities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_products`
--

DROP TABLE IF EXISTS `loan_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loan_product` varchar(50) NOT NULL,
  `loan_type` varchar(20) NOT NULL,
  `max_amount` int(11) NOT NULL,
  `max_tenure` int(11) NOT NULL,
  `time_threshold` int(5) NOT NULL,
  PRIMARY KEY (`loan_product`),
  UNIQUE KEY `loan_thresholds_type_uindex` (`loan_product`),
  UNIQUE KEY `loan_thresholds_id_uindex` (`id`),
  KEY `loan_products_loan_types_loan_type_fk` (`loan_type`),
  CONSTRAINT `loan_products_loan_types_loan_type_fk` FOREIGN KEY (`loan_type`) REFERENCES `loan_types` (`loan_type`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_products`
--

LOCK TABLES `loan_products` WRITE;
/*!40000 ALTER TABLE `loan_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `loan_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_types`
--

DROP TABLE IF EXISTS `loan_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loan_type` varchar(20) NOT NULL,
  PRIMARY KEY (`loan_type`),
  UNIQUE KEY `loan_types_id_uindex` (`id`),
  UNIQUE KEY `loan_types_type_uindex` (`loan_type`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_types`
--

LOCK TABLES `loan_types` WRITE;
/*!40000 ALTER TABLE `loan_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `loan_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loans`
--

DROP TABLE IF EXISTS `loans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `loan_product` varchar(50) NOT NULL,
  `actioned_by` varchar(30) NOT NULL,
  `stage` varchar(40) NOT NULL,
  `amount` int(11) NOT NULL,
  `tenure` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `receive_timestamp` datetime DEFAULT NULL,
  `defer_stage` int(2) DEFAULT NULL,
  `type_changed` tinyint(1) DEFAULT NULL,
  `staged_at` datetime NOT NULL,
  `status` varchar(20) NOT NULL,
  `comment` longtext DEFAULT NULL,

  PRIMARY KEY (`id`),
  KEY `loans_ibfk_7` (`customer_id`),
  KEY `loans_ibfk_8` (`loan_product`),
  KEY `loans_users_id_fk` (`actioned_by`),
  KEY `loans_roles_id_fk` (`stage`),
  CONSTRAINT `loans_ibfk_7` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `loans_loan_thresholds_type_fk` FOREIGN KEY (`loan_product`) REFERENCES `loan_products` (`loan_product`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `loans_users_id_fk` FOREIGN KEY (`actioned_by`) REFERENCES `users` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `loans_roles_id_fk` FOREIGN KEY (`stage`) REFERENCES `roles` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1961 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loans`
--

LOCK TABLES `loans` WRITE;
/*!40000 ALTER TABLE `loans` DISABLE KEYS */;
/*!40000 ALTER TABLE `loans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loans_security_types`
--

DROP TABLE IF EXISTS `loans_security_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loans_security_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loan_id` int(11) NOT NULL,
  `security_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `loans_security_types_loans_id_fk` (`loan_id`),
  KEY `loans_security_types_security_types_id_fk` (`security_type_id`),
  CONSTRAINT `loans_security_types_loans_id_fk` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `loans_security_types_security_types_id_fk` FOREIGN KEY (`security_type_id`) REFERENCES `security_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1965 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loans_security_types`
--

LOCK TABLES `loans_security_types` WRITE;
/*!40000 ALTER TABLE `loans_security_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `loans_security_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone_numbers`
--

DROP TABLE IF EXISTS `phone_numbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phone_numbers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_phone_number` varchar(20) DEFAULT NULL,
  `second_phone_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1949 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone_numbers`
--

LOCK TABLES `phone_numbers` WRITE;
/*!40000 ALTER TABLE `phone_numbers` DISABLE KEYS */;
/*!40000 ALTER TABLE `phone_numbers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loan_id` int(11) NOT NULL,
  `actioned_by` varchar(30) NOT NULL,
  `status` varchar(20) NOT NULL,
  `comment` longtext DEFAULT NULL,
  `actioned_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `action_by` (`actioned_by`),
  KEY `reports_loans_id_fk` (`loan_id`),
  CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`actioned_by`) REFERENCES `users` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reports_loans_id_fk` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27021 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `display_name` varchar(40) NOT NULL,
  `send_sms` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`name`),
  UNIQUE KEY `roles_name_uindex` (`name`),
  UNIQUE KEY `roles_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `security_types`
--

DROP TABLE IF EXISTS `security_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `security_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `security_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `security_types_id_uindex` (`id`),
  UNIQUE KEY `security_types_security_type_uindex` (`security_type`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `security_types`
--

LOCK TABLES `security_types` WRITE;
/*!40000 ALTER TABLE `security_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `security_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `sid` varchar(255) NOT NULL,
  `sess` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expired` datetime NOT NULL,
  PRIMARY KEY (`sid`),
  KEY `sessions_expired_index` (`expired`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_counter`
--

DROP TABLE IF EXISTS `sms_counter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_counter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `messages_count` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_counter`
--

LOCK TABLES `sms_counter` WRITE;
/*!40000 ALTER TABLE `sms_counter` DISABLE KEYS */;
INSERT INTO `sms_counter` VALUES (1,0);
/*!40000 ALTER TABLE `sms_counter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_messages`
--

DROP TABLE IF EXISTS `sms_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone_number` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_ibfk_1` (`template_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `sms_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_messages`
--

LOCK TABLES `sms_messages` WRITE;
/*!40000 ALTER TABLE `sms_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_templates`
--

DROP TABLE IF EXISTS `sms_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `stage_id` varchar(40) NOT NULL,
  `template` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `templates_ibfk_1` (`stage_id`),
  CONSTRAINT `sms_templates_roles_name_fk` FOREIGN KEY (`stage_id`) REFERENCES `roles` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_templates`
--

LOCK TABLES `sms_templates` WRITE;
/*!40000 ALTER TABLE `sms_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(30) NOT NULL,
  `role_name` varchar(40) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `phone_numbers_id` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `status` varchar(10) DEFAULT 'online',
  `picture_path` varchar(100) NOT NULL,
  `receive_sms` tinyint(1) DEFAULT 1,
  `updated_at` datetime DEFAULT NULL,
  `status_change_timestamp` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `newly_created` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `users_username_uindex` (`employee_id`),
  UNIQUE KEY `users_id_uindex` (`id`),
  KEY `users_ibfk_6` (`role_name`),
  KEY `users_branches_id_fk` (`branch_name`),
  KEY `users_phone_numbers_id_fk` (`phone_numbers_id`),
  CONSTRAINT `users_branches_name_fk` FOREIGN KEY (`branch_name`) REFERENCES `branches` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_6` FOREIGN KEY (`role_name`) REFERENCES `roles` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_phone_numbers_id_fk` FOREIGN KEY (`phone_numbers_id`) REFERENCES `phone_numbers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'loanlead'
--
/*!50003 DROP FUNCTION IF EXISTS `GET_AGE_BY_DATETIME` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GET_AGE_BY_DATETIME`(specific_datetime DATETIME) RETURNS varchar(20) CHARSET latin1
BEGIN

    DECLARE difference_in_days INT;



    SELECT DATEDIFF(CURRENT_TIMESTAMP, specific_datetime) INTO difference_in_days;



    RETURN CONCAT(

        FLOOR(difference_in_days / 7),

        ' weeks ',

        difference_in_days - FLOOR(difference_in_days / 7) * 7,

        ' days'

    );

  END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `STAGE_TO_FORWARD` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `STAGE_TO_FORWARD`(loan_id INT) RETURNS int(11)
BEGIN

    DECLARE loan_type VARCHAR(20);

    DECLARE loan_amount INT;

    DECLARE loan_stage_id INT;



    SELECT lp.loan_type, l.amount, r.id INTO loan_type, loan_amount, loan_stage_id

    FROM loan_products AS lp,

         loans AS l,

         users AS u,

         roles AS r

    WHERE lp.loan_product = l.loan_product AND

          l.id = loan_id AND

          l.actioned_by = u.employee_id AND u.role_id = r.name;



    IF loan_type = 'MSE' THEN

      IF loan_stage_id < 5 THEN

        RETURN loan_stage_id + 2;

      ELSEIF loan_stage_id = 5 THEN

        RETURN 9;

      ELSE

        RETURN loan_stage_id + 1;

      END IF;

    ELSE

      IF loan_amount < 3000000 THEN

        IF loan_stage_id < 3 THEN

          RETURN loan_stage_id + 1;

        ELSEIF loan_stage_id < 5 THEN

          RETURN 5;

        ELSEIF loan_stage_id < 8 THEN

          RETURN 8;

        ELSE

          RETURN loan_stage_id + 1;

        END IF;

      ELSEIF loan_amount < 10000000 THEN

        IF loan_stage_id < 5 THEN

          RETURN loan_stage_id + 1;

        ELSEIF loan_stage_id < 8 THEN

          RETURN 8;

        ELSE

          RETURN loan_stage_id + 1;

        END IF;

      ELSE

        RETURN loan_stage_id + 1;

      END IF;

    END IF;

  END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MIGRATE_LOANS_SECURITY_TYPES` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MIGRATE_LOANS_SECURITY_TYPES`()
BEGIN

    DECLARE loan_id INT;

    DECLARE cursor_done TINYINT(1);

    DECLARE loans_cursor CURSOR FOR SELECT id FROM loans;

    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET cursor_done = 1;



    DELETE FROM loans_security_types;



    OPEN loans_cursor;

    loans_iterator: LOOP

      FETCH loans_cursor INTO loan_id;



      IF cursor_done THEN

        LEAVE loans_iterator;

      END IF;



      CALL MIGRATE_LOANS_SECURITY_TYPES_BY_LOAN_ID(loan_id);

    END LOOP;

    CLOSE loans_cursor;

  END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MIGRATE_LOANS_SECURITY_TYPES_BY_LOAN_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MIGRATE_LOANS_SECURITY_TYPES_BY_LOAN_ID`(IN loan_id INT)
BEGIN

    DECLARE security_type_id INT;

    DECLARE security_type_value VARCHAR(50);

    DECLARE security_types_string VARCHAR(100);



    SELECT l.security_type INTO security_types_string

      FROM previous_loanlead.loans AS l

      WHERE l.id = loan_id;



    security_types_iterator: LOOP

      SET security_type_value = SUBSTRING_INDEX(security_types_string, ';', 1);

      SELECT id INTO security_type_id

        FROM security_types

        WHERE security_type = security_type_value;

      INSERT INTO loans_security_types(loan_id, security_type_id)

        VALUES (loan_id, security_type_id);



      SET security_types_string = SUBSTRING(

          security_types_string,

          LENGTH(security_type_value) + 2

      );



      IF POSITION(';' IN security_types_string) = 0 THEN

        LEAVE security_types_iterator;

      END IF;

    END LOOP;

  END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MIGRATION_PROCEDURE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MIGRATION_PROCEDURE`()
BEGIN

    

    CALL REMOVE_REPEATED_CUSTOMERS();



    

    DELETE FROM phone_numbers;



    INSERT INTO phone_numbers(first_phone_number, second_phone_number)

    SELECT IF(phone_number1 = '', id, phone_number1), IF(phone_number2 = '', id, phone_number2) FROM previous_loanlead.users UNION

    SELECT phone_number1, phone_number2 FROM previous_loanlead.customers;



    

    DELETE FROM entities;



    INSERT INTO entities(id, name, short_name, box_number, plot_number, branches_number, description, created_at)

    SELECT e.id, TRIM(e.name), e.short_name, e.box_number, e.plot_number, e.branches_number, e.description, e.created_at

    FROM previous_loanlead.entities AS e;



    

    DELETE FROM branches;



    INSERT INTO branches(id, entity_name, name, type, district, town, created_at)

    SELECT b.id, e.name, b.name, b.type, b.district, b.town, b.created_at

    FROM previous_loanlead.branches AS b,
        entities AS e

    WHERE e.id = b.entity_id;



    

    DELETE FROM roles;



    INSERT INTO roles(id, name, display_name)

    SELECT id, name, display_name FROM previous_loanlead.roles;



    

    DELETE FROM users;



    INSERT INTO users(id, employee_id, role_name, branch_name, phone_numbers_id, password, full_name, email, status, picture_path, receive_sms, updated_at, status_change_timestamp, created_at, newly_created)

    SELECT u.id, CONCAT(u.employee_id, u.id), r.name, b.name, p.id, u.password, u.full_name, u.email, u.status, u.picture_path, u.receive_sms, u.updated_at, CURRENT_TIMESTAMP, u.created_at, 0

    FROM previous_loanlead.users AS u,

         roles AS r,

         phone_numbers AS p,

         branches AS b

    WHERE r.id = u.role_id AND p.first_phone_number = u.phone_number1 AND p.second_phone_number = u.phone_number2 AND b.id = u.branch_id;



    

    DELETE FROM customers;



    INSERT INTO customers(id, phone_numbers_id, name, document, document_type, created_at)

    SELECT c.id, p.id, c.name, c.document, c.document_type, c.created_at

    FROM previous_loanlead.customers AS c,

         phone_numbers AS p

    WHERE p.first_phone_number = c.phone_number1 AND p.second_phone_number = c.phone_number2;



    

    DELETE FROM loan_types;



    INSERT INTO loan_types(loan_type) VALUES ('MSE'), ('DAS'), ('Group Loans');



    

    DELETE FROM loan_products;



    INSERT INTO loan_products(id, loan_product, loan_type, max_amount, max_tenure, time_threshold)

    SELECT lt.id, lt.type, IF(lt.type LIKE 'Group Loans', 'Group Loans', IF(lt.type LIKE 'DAS', 'DAS', 'MSE')), lt.amount, lt.tenure, lt.time_threshold

    FROM previous_loanlead.loan_thresholds AS lt;


    DELETE FROM loans;



    INSERT INTO loans(id, customer_id, loan_product, actioned_by, stage, amount, tenure, created_at, receive_timestamp, defer_stage, type_changed, staged_at, comment, status)

    SELECT l.id, l.customer_id, lp.loan_product, u.employee_id, r.name, l.amount, l.tenure, l.created_at, l.receive_timestamp, l.stage_deferred, l.type_changed, l.stage_timestamp, l.comment, l.status

    FROM previous_loanlead.loans AS l,
         loan_products AS lp,
         users AS u,
         roles AS r

    WHERE u.id = l.staged_by AND
          lp.id = l.loan_threshold_id AND
          r.id = l.stage;
    

    DELETE FROM security_types;



    INSERT INTO security_types(security_type)

    VALUES ('Household chattels'),

           ('Motor vehicle'),

           ('Land sale agreement'),

           ('Land title'),

           ('Equipment'),

           ('Cash'),

           ('Salary'),

           ('Group guarantee'),

           ('Unsecure');



    

    DELETE FROM loans_security_types;



    CALL MIGRATE_LOANS_SECURITY_TYPES();



    

    DELETE FROM reports;



    INSERT INTO reports(id, loan_id, status, comment, actioned_at, actioned_by)

    SELECT a.id, l.id, a.status, a.comment, a.created_at, u.employee_id

    FROM previous_loanlead.auditing AS a,
         loans AS l,
         users AS u

    WHERE u.id = a.action_by AND l.id = a.loan_id;

    

    DELETE FROM sms_templates;



    INSERT INTO sms_templates(id, type, stage_id, template)

    SELECT st.id, st.type, r.name, st.template

    FROM previous_loanlead.sms_templates AS st,

         roles AS r

    WHERE r.id = st.stage_id;



    

    DELETE FROM sms_messages;



    INSERT INTO sms_messages(id, phone_number, template_id, created_at)

    SELECT id, phone_number, template_id, created_at FROM previous_loanlead.sms_messages;

  END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REMOVE_REPEATED_CUSTOMERS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REMOVE_REPEATED_CUSTOMERS`()
BEGIN

    DECLARE repeated_document VARCHAR(50);

    DECLARE first_customer_id INT;

    DECLARE cursor_done TINYINT(1);

    DECLARE repeated_documents_cursor CURSOR FOR SELECT document, id FROM previous_loanlead.customers GROUP BY document HAVING COUNT(*) = 2;

    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET cursor_done = 1;



    OPEN repeated_documents_cursor;

      repeated_document_loop: LOOP

        FETCH repeated_documents_cursor INTO repeated_document, first_customer_id;



        IF cursor_done THEN

          LEAVE repeated_document_loop;

        END IF;



        UPDATE previous_loanlead.loans AS l, previous_loanlead.customers AS c

        SET l.customer_id = first_customer_id

        WHERE l.customer_id = c.id AND c.document = repeated_document AND c.id != first_customer_id;



        DELETE FROM previous_loanlead.customers WHERE document = repeated_document AND id != first_customer_id;

      END LOOP;

    CLOSE repeated_documents_cursor;

  END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-09 23:44:39
