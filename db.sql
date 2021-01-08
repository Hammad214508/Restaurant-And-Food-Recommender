-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 08, 2021 at 02:42 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `database`
--
CREATE DATABASE IF NOT EXISTS `database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `database`;

-- --------------------------------------------------------

--
-- Table structure for table `DIET_TYPE`
--

DROP TABLE IF EXISTS `DIET_TYPE`;
CREATE TABLE IF NOT EXISTS `DIET_TYPE` (
  `DIET_ID` int(11) NOT NULL,
  `DIET_NAME` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `FOOD`
--

DROP TABLE IF EXISTS `FOOD`;
CREATE TABLE IF NOT EXISTS `FOOD` (
  `FOOD_ID` int(10) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(250) DEFAULT NULL,
  `PRICE` float DEFAULT NULL,
  `DESCRIPTION` varchar(250) DEFAULT NULL,
  `RESTAURANT_ID` int(10) NOT NULL,
  `AVAILABLE` varchar(250) NOT NULL,
  `DIET_TYPE` varchar(250) DEFAULT NULL,
  `HEALTHY_RATING` float NOT NULL,
  `FILLING_RATING` float NOT NULL,
  `AVG_RATING` float NOT NULL,
  PRIMARY KEY (`FOOD_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `FOOD`
--

INSERT INTO `FOOD` (`FOOD_ID`, `NAME`, `PRICE`, `DESCRIPTION`, `RESTAURANT_ID`, `AVAILABLE`, `DIET_TYPE`, `HEALTHY_RATING`, `FILLING_RATING`, `AVG_RATING`) VALUES
(1, 'Pizza ', 12, 'Nice Pizza', 1, 'false', '1', 2.5, 5, 5),
(2, 'cake', 19, 'good cake', 1, 'true', '2', 3.7, 1.8, 1),
(3, 'Ice cream ', 1, 'This is ice cream description', 2, 'true', '3', 4.8, 2.9, 3),
(4, 'Chips', 1.5, 'Nice chips', 1, 'true', '1', 2, 3.25, 2),
(5, 'Burrito', 12, 'I don\'t know', 2, 'true', '1', 5, 1.5, 4),
(6, 'banana', 100, 'big banana', 4, 'true', '1', 5, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `FOOD_REVIEWS`
--

DROP TABLE IF EXISTS `FOOD_REVIEWS`;
CREATE TABLE IF NOT EXISTS `FOOD_REVIEWS` (
  `REVIEW_ID` int(10) NOT NULL AUTO_INCREMENT,
  `FOOD_ID` int(10) NOT NULL,
  `USER_ID` int(10) NOT NULL,
  `REVIEW` varchar(250) DEFAULT NULL,
  `HEALTHY` float DEFAULT NULL,
  `FILLING` float DEFAULT NULL,
  PRIMARY KEY (`REVIEW_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `FOOD_REVIEWS`
--

INSERT INTO `FOOD_REVIEWS` (`REVIEW_ID`, `FOOD_ID`, `USER_ID`, `REVIEW`, `HEALTHY`, `FILLING`) VALUES
(1, 1, 1, 'I like the pizza', 3.2, 1.2),
(2, 1, 2, 'I  liked it', 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `IMAGES`
--

DROP TABLE IF EXISTS `IMAGES`;
CREATE TABLE IF NOT EXISTS `IMAGES` (
  `ENTITY_ID` int(10) NOT NULL,
  `ENTITY_TYPE` varchar(250) NOT NULL,
  `IMAGE_NAME` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `IMAGES`
--

INSERT INTO `IMAGES` (`ENTITY_ID`, `ENTITY_TYPE`, `IMAGE_NAME`) VALUES
(1, 'FOOD', 'pizza.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `MANAGER`
--

DROP TABLE IF EXISTS `MANAGER`;
CREATE TABLE IF NOT EXISTS `MANAGER` (
  `MANAGER_ID` int(10) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(250) NOT NULL,
  `SURNAME` varchar(250) NOT NULL,
  `EMAIL` varchar(250) NOT NULL,
  `PASSWORD` varchar(250) DEFAULT NULL,
  `GOOGLE_LOGIN` varchar(250) NOT NULL,
  PRIMARY KEY (`MANAGER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `MANAGER`
--

INSERT INTO `MANAGER` (`MANAGER_ID`, `NAME`, `SURNAME`, `EMAIL`, `PASSWORD`, `GOOGLE_LOGIN`) VALUES
(1, 'Harsh ', 'Patel', 'harsh@email', '$2y$10$R6Ejsr0z/0CGBonoqWbC2eaQV8qSC.w5Uckub1ASJ7Pq6ITQaSlsy', ''),
(2, 'Jaydip', 'Magan', 'magan@email', '$2y$10$sVP1IP4jGmAZP.89VSfVqe/bq/YK1mEhSNmsBvY8kH4r1h8mmVI6K', ''),
(3, 'Anjali', 'Shukla', 'anjali@email', '$2y$10$u89SrYbgAYQ5dxRsOt5bNu.b0eJmW9thexeMQKYTVz8wtNbQfNnr2', ''),
(4, 'Hammad', 'Muhammad', 'hammadmuhammad15@gmail.com', NULL, 'true');

-- --------------------------------------------------------

--
-- Table structure for table `RATINGS`
--

DROP TABLE IF EXISTS `RATINGS`;
CREATE TABLE IF NOT EXISTS `RATINGS` (
  `USER_ID` int(10) NOT NULL,
  `FOOD_ID` int(10) NOT NULL,
  `RATING` int(10) NOT NULL,
  PRIMARY KEY (`USER_ID`,`FOOD_ID`,`RATING`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `RATINGS`
--

INSERT INTO `RATINGS` (`USER_ID`, `FOOD_ID`, `RATING`) VALUES
(1, 3, 4),
(1, 7, 5),
(1, 16, 5),
(1, 19, 5),
(1, 20, 5),
(2, 1, 1),
(2, 2, 1),
(2, 12, 1),
(2, 13, 1),
(2, 14, 1),
(2, 17, 1),
(2, 19, 1),
(3, 1, 4),
(3, 2, 1),
(3, 2, 5),
(3, 5, 4),
(3, 11, 2),
(3, 13, 5),
(3, 15, 2),
(3, 16, 3),
(3, 18, 5),
(3, 19, 2),
(3, 20, 3),
(4, 2, 5),
(4, 3, 1),
(4, 8, 2),
(4, 10, 5),
(4, 12, 3),
(4, 14, 5),
(4, 15, 1),
(5, 1, 3),
(5, 2, 4),
(5, 3, 1),
(5, 7, 5),
(5, 8, 1),
(5, 9, 2),
(5, 10, 4),
(5, 12, 2),
(5, 14, 4),
(5, 16, 2),
(5, 17, 3),
(5, 18, 5),
(5, 19, 5),
(5, 20, 1),
(6, 5, 2),
(6, 7, 5),
(6, 8, 1),
(6, 10, 3),
(6, 11, 5),
(6, 14, 3),
(7, 3, 4),
(7, 7, 4),
(7, 10, 2),
(7, 14, 2),
(7, 15, 3),
(7, 20, 5),
(8, 3, 4),
(8, 5, 5),
(8, 7, 3),
(8, 7, 4),
(8, 8, 4),
(8, 12, 4),
(8, 14, 1),
(8, 16, 4),
(9, 2, 1),
(9, 2, 5),
(9, 3, 2),
(9, 7, 2),
(9, 8, 4),
(9, 9, 4),
(9, 13, 5),
(9, 14, 1),
(9, 15, 2),
(9, 16, 3),
(9, 17, 4),
(10, 1, 4),
(10, 2, 5),
(10, 4, 3),
(10, 5, 4),
(10, 12, 3),
(10, 17, 4),
(11, 3, 1),
(11, 5, 3),
(11, 5, 4),
(11, 6, 5),
(11, 12, 2),
(11, 13, 3),
(11, 13, 4),
(11, 14, 4),
(11, 15, 1),
(11, 19, 1),
(11, 20, 2),
(12, 1, 3),
(12, 3, 5),
(12, 6, 3),
(12, 8, 1),
(12, 8, 2),
(12, 10, 5),
(12, 19, 5),
(13, 7, 5),
(13, 8, 1),
(13, 8, 5),
(13, 10, 3),
(13, 13, 1),
(13, 14, 2),
(13, 20, 1),
(14, 2, 2),
(14, 4, 5),
(14, 20, 5),
(15, 2, 2),
(15, 5, 1),
(15, 7, 3),
(15, 9, 1),
(15, 11, 3),
(15, 13, 5),
(15, 17, 1),
(15, 19, 3),
(15, 20, 4),
(16, 4, 3),
(16, 5, 4),
(16, 6, 1),
(16, 7, 2),
(16, 9, 5),
(16, 10, 1),
(16, 14, 1),
(16, 14, 5),
(16, 17, 5),
(16, 18, 1),
(17, 1, 3),
(17, 1, 4),
(17, 2, 5),
(17, 3, 1),
(17, 4, 2),
(17, 8, 3),
(17, 12, 2),
(17, 15, 1),
(17, 16, 2),
(17, 19, 1),
(18, 3, 1),
(18, 4, 2),
(18, 8, 1),
(18, 14, 4),
(18, 14, 5),
(18, 15, 5),
(18, 16, 1),
(18, 16, 2),
(18, 18, 4),
(18, 20, 2),
(19, 2, 4),
(19, 3, 5),
(19, 7, 4),
(19, 9, 3),
(19, 10, 4),
(19, 11, 5),
(19, 14, 4),
(20, 3, 4),
(20, 10, 3),
(20, 12, 1),
(20, 14, 3),
(20, 20, 5);

-- --------------------------------------------------------

--
-- Table structure for table `RESTAURANT`
--

DROP TABLE IF EXISTS `RESTAURANT`;
CREATE TABLE IF NOT EXISTS `RESTAURANT` (
  `RESTAURANT_ID` int(10) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(250) DEFAULT NULL,
  `EMAIL` varchar(250) DEFAULT NULL,
  `NUMBER` varchar(250) DEFAULT NULL,
  `ADDRESS` varchar(250) DEFAULT NULL,
  `WEBSITE` varchar(250) DEFAULT NULL,
  `RATING` float DEFAULT NULL,
  `OPENING_TIME` time NOT NULL DEFAULT '08:00:00',
  `CLOSING_TIME` time NOT NULL DEFAULT '22:00:00',
  `MANAGER_ID` int(10) NOT NULL,
  PRIMARY KEY (`RESTAURANT_ID`),
  UNIQUE KEY `NameIndex` (`NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `RESTAURANT`
--

INSERT INTO `RESTAURANT` (`RESTAURANT_ID`, `NAME`, `EMAIL`, `NUMBER`, `ADDRESS`, `WEBSITE`, `RATING`, `OPENING_TIME`, `CLOSING_TIME`, `MANAGER_ID`) VALUES
(1, 'My Restaurant', 'my@email', '07776846506', 'London', 'https://hammadmehmood.co.uk', 2.7, '08:00:00', '22:00:00', 1),
(2, 'Magan\'s restaurant', 'maganrestaurant@email', '1245647', 'Wembley', 'https://jaydipmagan.com/', 4.1, '02:00:00', '05:30:00', 2),
(3, 'Anjali\'s restaurant', '', '', '', '', 3.8, '12:00:00', '05:30:00', 3),
(4, 'Hammad restaurant ', 'hammad@email ', '80796567890', 'jhfkda;f', 'jdfkllfda', 1.69, '08:00:00', '22:00:00', 4);

-- --------------------------------------------------------

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
CREATE TABLE IF NOT EXISTS `USER` (
  `USER_ID` int(10) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(250) NOT NULL,
  `SURNAME` varchar(250) NOT NULL,
  `EMAIL` varchar(250) NOT NULL,
  `PASSWORD` varchar(250) DEFAULT NULL,
  `GOOGLE_LOGIN` varchar(250) NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `USER`
--

INSERT INTO `USER` (`USER_ID`, `NAME`, `SURNAME`, `EMAIL`, `PASSWORD`, `GOOGLE_LOGIN`) VALUES
(1, 'Hammad', 'Muhammad', 'hammadmuhammad15@gmail.com', NULL, 'true'),
(7, 'Aiza', 'Khan', 'aiza@email', '$2y$10$JBB1J8sxvY3MG.uyuPPAXeIdH5o4U5cVgpn.PONALhW.6u2UovWi6', '');
COMMIT;
