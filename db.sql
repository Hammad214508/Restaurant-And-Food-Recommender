-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 12, 2021 at 09:44 PM
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
-- Table structure for table `CONNECTIONS`
--

DROP TABLE IF EXISTS `CONNECTIONS`;
CREATE TABLE `CONNECTIONS` (
  `CONNECTION_ID` int(11) NOT NULL,
  `USER1` int(10) NOT NULL,
  `USER2` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `CONNECTIONS`
--

INSERT INTO `CONNECTIONS` (`CONNECTION_ID`, `USER1`, `USER2`) VALUES
(1, 3, 1),
(2, 1, 3),
(3, 1, 5),
(4, 5, 1),
(13, 1, 8),
(14, 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `DIET_TYPE`
--

DROP TABLE IF EXISTS `DIET_TYPE`;
CREATE TABLE `DIET_TYPE` (
  `DIET_ID` int(11) NOT NULL,
  `DIET_NAME` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `EVENTS`
--

DROP TABLE IF EXISTS `EVENTS`;
CREATE TABLE `EVENTS` (
  `EVENT_ID` int(10) NOT NULL,
  `EVENT_NAME` varchar(250) NOT NULL,
  `EVENT_DATE` date NOT NULL,
  `EVENT_TIME` time NOT NULL,
  `CREATOR_ID` int(10) NOT NULL,
  `NUM_VOTES` int(10) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `EVENTS`
--

INSERT INTO `EVENTS` (`EVENT_ID`, `EVENT_NAME`, `EVENT_DATE`, `EVENT_TIME`, `CREATOR_ID`, `NUM_VOTES`) VALUES
(2, 'Valentine\'s day', '0000-00-00', '00:00:00', 2, 1),
(24, 'Event 4', '2021-02-01', '19:00:00', 2, 1),
(36, 'graduation', '2021-02-11', '19:30:00', 2, 1),
(37, 'Event 3', '2021-02-02', '19:00:00', 2, 1),
(53, 'Event 4', '2021-02-04', '19:00:00', 1, 2),
(54, 'Event 5', '2021-02-04', '19:00:00', 1, 2),
(55, 'Event 6', '2021-02-07', '19:00:00', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `EVENT_LOCATIONS`
--

DROP TABLE IF EXISTS `EVENT_LOCATIONS`;
CREATE TABLE `EVENT_LOCATIONS` (
  `ID` int(10) NOT NULL,
  `EVENT_ID` int(10) NOT NULL,
  `LOCATION` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `EVENT_LOCATIONS`
--

INSERT INTO `EVENT_LOCATIONS` (`ID`, `EVENT_ID`, `LOCATION`) VALUES
(29, 13, 'Test'),
(35, 37, 'A'),
(36, 37, 'B'),
(43, 53, 'A'),
(44, 53, 'B'),
(45, 53, 'C'),
(46, 53, 'D'),
(47, 54, 'A'),
(48, 54, 'B'),
(49, 54, 'C'),
(50, 54, 'D'),
(51, 54, 'E'),
(52, 36, 'Uni'),
(53, 36, 'Pizza hut');

-- --------------------------------------------------------

--
-- Table structure for table `EVENT_USERS`
--

DROP TABLE IF EXISTS `EVENT_USERS`;
CREATE TABLE `EVENT_USERS` (
  `ID` int(11) NOT NULL,
  `EVENT_ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `VOTES` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `EVENT_USERS`
--

INSERT INTO `EVENT_USERS` (`ID`, `EVENT_ID`, `USER_ID`, `VOTES`) VALUES
(13, 13, 1, NULL),
(15, 14, 1, NULL),
(48, 36, 1, 'Uni'),
(49, 37, 1, 'A'),
(51, 36, 2, NULL),
(74, 53, 1, 'A,D'),
(75, 53, 3, NULL),
(76, 54, 1, 'A,E'),
(77, 55, 1, ''),
(83, 36, 3, NULL),
(84, 37, 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `FOOD`
--

DROP TABLE IF EXISTS `FOOD`;
CREATE TABLE `FOOD` (
  `FOOD_ID` int(10) NOT NULL,
  `NAME` varchar(250) DEFAULT NULL,
  `PRICE` float DEFAULT NULL,
  `DESCRIPTION` varchar(250) DEFAULT NULL,
  `RESTAURANT_ID` int(10) NOT NULL,
  `AVAILABLE` varchar(250) NOT NULL,
  `DIET_TYPE` varchar(250) DEFAULT NULL,
  `HEALTHY_RATING` float NOT NULL,
  `FILLING_RATING` float NOT NULL,
  `AVG_RATING` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `FOOD`
--

INSERT INTO `FOOD` (`FOOD_ID`, `NAME`, `PRICE`, `DESCRIPTION`, `RESTAURANT_ID`, `AVAILABLE`, `DIET_TYPE`, `HEALTHY_RATING`, `FILLING_RATING`, `AVG_RATING`) VALUES
(1, 'Pizza1', 12, 'Nice Pizza', 1, 'false', '1', 2.75, 2.3, 2.55),
(2, 'cake', 19, 'good cake', 1, 'true', '2', 3.7, 1.8, 1),
(3, 'Ice cream ', 1, 'This is ice cream description', 2, 'true', '3', 4.8, 2.9, 3),
(4, 'Chips', 1.5, 'Nice chips', 1, 'true', '1', 2, 3.25, 2),
(5, 'Burrito', 12, 'I don\'t know', 2, 'true', '1', 5, 1.5, 4),
(6, 'banana', 100, 'big banana', 4, 'false', '1', 5, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `FOOD_REVIEWS`
--

DROP TABLE IF EXISTS `FOOD_REVIEWS`;
CREATE TABLE `FOOD_REVIEWS` (
  `REVIEW_ID` int(10) NOT NULL,
  `FOOD_ID` int(10) NOT NULL,
  `USER_ID` int(10) NOT NULL,
  `RATING` float DEFAULT NULL,
  `REVIEW` varchar(250) DEFAULT NULL,
  `HEALTHY` float DEFAULT NULL,
  `FILLING` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `FOOD_REVIEWS`
--

INSERT INTO `FOOD_REVIEWS` (`REVIEW_ID`, `FOOD_ID`, `USER_ID`, `RATING`, `REVIEW`, `HEALTHY`, `FILLING`) VALUES
(1, 1, 1, 1.7, 'I like the pizza', 4, 1.2),
(2, 1, 2, 4.5, 'I  liked it', 2, 3),
(3, 1, 1, 4.5, 'Good pizza', NULL, NULL),
(4, 1, 1, 1, 'jfdkljafkdljak;fdafa', NULL, NULL),
(5, 1, 1, 3, 'This is my rewview', NULL, NULL),
(6, 1, 1, 2.5, '', NULL, NULL),
(7, 1, 1, 1, '', NULL, NULL),
(8, 1, 1, 0, '', NULL, NULL),
(9, 1, 1, 0, '', NULL, NULL),
(10, 1, 1, 1.5, '', NULL, NULL),
(11, 1, 1, 2.5, '', NULL, NULL),
(12, 1, 1, 2.5, '', 2.5, 2.5),
(13, 1, 1, 2.5, '', 2.5, 2.5),
(14, 1, 1, 2.5, '', NULL, NULL),
(15, 1, 1, 2.5, '', NULL, NULL),
(16, 1, 1, 2.25, 'fa', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `IMAGES`
--

DROP TABLE IF EXISTS `IMAGES`;
CREATE TABLE `IMAGES` (
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
CREATE TABLE `MANAGER` (
  `MANAGER_ID` int(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `SURNAME` varchar(250) NOT NULL,
  `EMAIL` varchar(250) NOT NULL,
  `PASSWORD` varchar(250) DEFAULT NULL,
  `GOOGLE_LOGIN` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Table structure for table `NOTIFICATIONS`
--

DROP TABLE IF EXISTS `NOTIFICATIONS`;
CREATE TABLE `NOTIFICATIONS` (
  `NOTIFICATION_ID` int(10) NOT NULL,
  `TYPE` varchar(255) NOT NULL,
  `FROM_UID` int(10) NOT NULL,
  `TO_UID` int(10) NOT NULL,
  `MESSAGE` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `NOTIFICATIONS`
--

INSERT INTO `NOTIFICATIONS` (`NOTIFICATION_ID`, `TYPE`, `FROM_UID`, `TO_UID`, `MESSAGE`) VALUES
(1, 'connection_request', 7, 1, 'Sup bro'),
(3, 'connection_request', 6, 1, 'I want to be friends');

-- --------------------------------------------------------

--
-- Table structure for table `RATINGS`
--

DROP TABLE IF EXISTS `RATINGS`;
CREATE TABLE `RATINGS` (
  `USER_ID` int(10) NOT NULL,
  `FOOD_ID` int(10) NOT NULL,
  `RATING` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `RATINGS`
--

INSERT INTO `RATINGS` (`USER_ID`, `FOOD_ID`, `RATING`) VALUES
(1, 1, 0),
(1, 1, 1),
(1, 1, 2),
(1, 1, 3),
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
CREATE TABLE `RESTAURANT` (
  `RESTAURANT_ID` int(10) NOT NULL,
  `NAME` varchar(250) DEFAULT NULL,
  `EMAIL` varchar(250) DEFAULT NULL,
  `NUMBER` varchar(250) DEFAULT NULL,
  `ADDRESS` varchar(250) DEFAULT NULL,
  `WEBSITE` varchar(250) DEFAULT NULL,
  `RATING` float DEFAULT NULL,
  `OPENING_TIME` time NOT NULL DEFAULT '08:00:00',
  `CLOSING_TIME` time NOT NULL DEFAULT '22:00:00',
  `MANAGER_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `RESTAURANT`
--

INSERT INTO `RESTAURANT` (`RESTAURANT_ID`, `NAME`, `EMAIL`, `NUMBER`, `ADDRESS`, `WEBSITE`, `RATING`, `OPENING_TIME`, `CLOSING_TIME`, `MANAGER_ID`) VALUES
(1, 'My Restaurant', 'my@email', '07776846506', 'London', 'https://hammadmehmood.co.uk', 2.96, '08:00:00', '22:00:00', 1),
(2, 'Magan\'s restaurant', 'maganrestaurant@email', '1245647', 'Wembley', 'https://jaydipmagan.com/', 4.1, '02:00:00', '05:30:00', 2),
(3, 'Anjali\'s restaurant', '', '', '', '', 3.8, '12:00:00', '05:30:00', 3),
(4, 'Hammad restaurant ', 'hammad@email ', '80796567890', 'jhfkda;f', 'jdfkllfda', 1.69, '08:00:00', '22:00:00', 4);

-- --------------------------------------------------------

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
CREATE TABLE `USER` (
  `USER_ID` int(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `SURNAME` varchar(250) NOT NULL,
  `EMAIL` varchar(250) NOT NULL,
  `PASSWORD` varchar(250) DEFAULT NULL,
  `GOOGLE_LOGIN` varchar(250) NOT NULL,
  `DIET_TYPE` int(10) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `USER`
--

INSERT INTO `USER` (`USER_ID`, `NAME`, `SURNAME`, `EMAIL`, `PASSWORD`, `GOOGLE_LOGIN`, `DIET_TYPE`) VALUES
(1, 'Hammad ', 'Muhammad', 'hammadmuhammad15@gmail.com', NULL, 'true', 1),
(2, 'Aiza', 'Khan', 'aiza@email', '$2y$10$JBB1J8sxvY3MG.uyuPPAXeIdH5o4U5cVgpn.PONALhW.6u2UovWi6', '', 1),
(3, 'Harsh', 'Patel', 'harsh_user@email', '$2y$10$JBB1J8sxvY3MG.uyuPPAXeIdH5o4U5cVgpn.PONALhW.6u2UovWi6', '', 1),
(4, 'Jaydip', 'Magan', 'magan@email.com', '$2y$10$JBB1J8sxvY3MG.uyuPPAXeIdH5o4U5cVgpn.PONALhW.6u2UovWi6', '', 2),
(5, 'Anjali', 'Shukla', 'anjali@email', '$2y$10$JBB1J8sxvY3MG.uyuPPAXeIdH5o4U5cVgpn.PONALhW.6u2UovWi6', '', 3),
(6, 'Bhargav', 'Talluri', 'bhargav@email', '$2y$10$JBB1J8sxvY3MG.uyuPPAXeIdH5o4U5cVgpn.PONALhW.6u2UovWi6', '', 3),
(7, 'Shanelie', 'Fernandez', 'shanelie@email', '$2y$10$JBB1J8sxvY3MG.uyuPPAXeIdH5o4U5cVgpn.PONALhW.6u2UovWi6', '', 2),
(8, 'Hardik', 'Poptani', 'hardik@email', '$2y$10$JBB1J8sxvY3MG.uyuPPAXeIdH5o4U5cVgpn.PONALhW.6u2UovWi6', '', 1),
(9, 'Nikhil', 'Difficult', 'nikhil@email', '$2y$10$JBB1J8sxvY3MG.uyuPPAXeIdH5o4U5cVgpn.PONALhW.6u2UovWi6', '', 3),
(10, 'Dhruva', 'Konidena', 'dhruva@email', '$2y$10$JBB1J8sxvY3MG.uyuPPAXeIdH5o4U5cVgpn.PONALhW.6u2UovWi6', '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CONNECTIONS`
--
ALTER TABLE `CONNECTIONS`
  ADD PRIMARY KEY (`CONNECTION_ID`);

--
-- Indexes for table `EVENTS`
--
ALTER TABLE `EVENTS`
  ADD PRIMARY KEY (`EVENT_ID`);

--
-- Indexes for table `EVENT_LOCATIONS`
--
ALTER TABLE `EVENT_LOCATIONS`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `EVENT_USERS`
--
ALTER TABLE `EVENT_USERS`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `FOOD`
--
ALTER TABLE `FOOD`
  ADD PRIMARY KEY (`FOOD_ID`);

--
-- Indexes for table `FOOD_REVIEWS`
--
ALTER TABLE `FOOD_REVIEWS`
  ADD PRIMARY KEY (`REVIEW_ID`);

--
-- Indexes for table `MANAGER`
--
ALTER TABLE `MANAGER`
  ADD PRIMARY KEY (`MANAGER_ID`);

--
-- Indexes for table `NOTIFICATIONS`
--
ALTER TABLE `NOTIFICATIONS`
  ADD PRIMARY KEY (`NOTIFICATION_ID`);

--
-- Indexes for table `RATINGS`
--
ALTER TABLE `RATINGS`
  ADD PRIMARY KEY (`USER_ID`,`FOOD_ID`,`RATING`);

--
-- Indexes for table `RESTAURANT`
--
ALTER TABLE `RESTAURANT`
  ADD PRIMARY KEY (`RESTAURANT_ID`),
  ADD UNIQUE KEY `NameIndex` (`NAME`);

--
-- Indexes for table `USER`
--
ALTER TABLE `USER`
  ADD PRIMARY KEY (`USER_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CONNECTIONS`
--
ALTER TABLE `CONNECTIONS`
  MODIFY `CONNECTION_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `EVENTS`
--
ALTER TABLE `EVENTS`
  MODIFY `EVENT_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `EVENT_LOCATIONS`
--
ALTER TABLE `EVENT_LOCATIONS`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `EVENT_USERS`
--
ALTER TABLE `EVENT_USERS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `FOOD`
--
ALTER TABLE `FOOD`
  MODIFY `FOOD_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `FOOD_REVIEWS`
--
ALTER TABLE `FOOD_REVIEWS`
  MODIFY `REVIEW_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `MANAGER`
--
ALTER TABLE `MANAGER`
  MODIFY `MANAGER_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `NOTIFICATIONS`
--
ALTER TABLE `NOTIFICATIONS`
  MODIFY `NOTIFICATION_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `RESTAURANT`
--
ALTER TABLE `RESTAURANT`
  MODIFY `RESTAURANT_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `USER`
--
ALTER TABLE `USER`
  MODIFY `USER_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;
