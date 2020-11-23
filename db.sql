-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 23, 2020 at 07:56 PM
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

CREATE TABLE `DIET_TYPE` (
  `DIET_ID` int(11) NOT NULL,
  `DIET_NAME` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `FOOD`
--

CREATE TABLE `FOOD` (
  `FOOD_ID` int(10) NOT NULL,
  `NAME` varchar(250) DEFAULT NULL,
  `PRICE` float DEFAULT NULL,
  `DESCRIPTION` varchar(250) DEFAULT NULL,
  `RESTAURANT_ID` int(10) NOT NULL,
  `AVAILABLE` varchar(250) NOT NULL,
  `DIET_TYPE` varchar(250) DEFAULT NULL,
  `HEALTHY_RATING` float NOT NULL,
  `FILLING_RATING` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `FOOD`
--

INSERT INTO `FOOD` (`FOOD_ID`, `NAME`, `PRICE`, `DESCRIPTION`, `RESTAURANT_ID`, `AVAILABLE`, `DIET_TYPE`, `HEALTHY_RATING`, `FILLING_RATING`) VALUES
(1, 'Pizza ', 12, 'Nice Pizza', 1, 'false', '1', 2.5, 5),
(2, 'cake', 19, 'good cake', 1, 'true', '2', 3.7, 1.8),
(3, 'Ice cream ', 1, 'This is ice cream description', 1, 'false', '3', 4.8, 2.9),
(4, 'Chips', 1.5, 'Nice chips', 1, 'true', '2', 2, 3.25),
(5, 'Burrito', 12, 'I don\'t know', 2, 'true', '1', 5, 1.5);

-- --------------------------------------------------------

--
-- Table structure for table `FOOD_REVIEWS`
--

CREATE TABLE `FOOD_REVIEWS` (
  `REVIEW_ID` int(10) NOT NULL,
  `FOOD_ID` int(10) NOT NULL,
  `USER_ID` int(10) NOT NULL,
  `REVIEW` varchar(250) DEFAULT NULL,
  `HEALTHY` float DEFAULT NULL,
  `FILLING` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

CREATE TABLE `MANAGER` (
  `MANAGER_ID` int(10) NOT NULL,
  `NAME` varchar(250) DEFAULT NULL,
  `SURNAME` varchar(250) DEFAULT NULL,
  `EMAIL` varchar(250) DEFAULT NULL,
  `PASSWORD` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `MANAGER`
--

INSERT INTO `MANAGER` (`MANAGER_ID`, `NAME`, `SURNAME`, `EMAIL`, `PASSWORD`) VALUES
(1, 'Harsh ', 'Patel', 'harsh@email', '$2y$10$R6Ejsr0z/0CGBonoqWbC2eaQV8qSC.w5Uckub1ASJ7Pq6ITQaSlsy'),
(2, 'Jaydip', 'Magan', 'magan@email', '$2y$10$sVP1IP4jGmAZP.89VSfVqe/bq/YK1mEhSNmsBvY8kH4r1h8mmVI6K'),
(3, 'Anjali', 'Shukla', 'anjali@email', '$2y$10$u89SrYbgAYQ5dxRsOt5bNu.b0eJmW9thexeMQKYTVz8wtNbQfNnr2');

-- --------------------------------------------------------

--
-- Table structure for table `RATINGS`
--

CREATE TABLE `RATINGS` (
  `USER_ID` int(10) NOT NULL,
  `FOOD_ID` int(10) NOT NULL,
  `RATING` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `RATINGS`
--

INSERT INTO `RATINGS` (`USER_ID`, `FOOD_ID`, `RATING`) VALUES
(8, 7, 1),
(8, 2, 3),
(4, 10, 4),
(6, 10, 5),
(5, 9, 5),
(3, 4, 5),
(6, 9, 3),
(4, 2, 3),
(10, 5, 2),
(10, 9, 3),
(6, 7, 2),
(1, 4, 2),
(3, 5, 4),
(8, 1, 4),
(4, 6, 4),
(3, 8, 1),
(10, 9, 2),
(4, 6, 3),
(10, 5, 1),
(6, 2, 2),
(1, 3, 5),
(3, 2, 2),
(8, 2, 2),
(4, 7, 1),
(9, 10, 1),
(6, 6, 1),
(3, 6, 2),
(4, 2, 3),
(10, 6, 5),
(1, 4, 5),
(5, 7, 5),
(7, 4, 5),
(4, 2, 3),
(2, 3, 5),
(3, 10, 5),
(5, 9, 5),
(10, 2, 4),
(9, 5, 4),
(4, 5, 2),
(1, 3, 2),
(10, 6, 5),
(2, 1, 5),
(10, 5, 1),
(7, 5, 4),
(7, 6, 4),
(10, 4, 2),
(1, 5, 1),
(1, 9, 1),
(5, 7, 5);

-- --------------------------------------------------------

--
-- Table structure for table `RESTAURANT`
--

CREATE TABLE `RESTAURANT` (
  `RESTAURANT_ID` int(10) NOT NULL,
  `NAME` varchar(250) DEFAULT NULL,
  `EMAIL` varchar(250) DEFAULT NULL,
  `NUMBER` varchar(250) DEFAULT NULL,
  `ADDRESS` varchar(250) DEFAULT NULL,
  `WEBSITE` varchar(250) DEFAULT NULL,
  `OPENING_TIME` time NOT NULL DEFAULT '08:00:00',
  `CLOSING_TIME` time NOT NULL DEFAULT '22:00:00',
  `MANAGER_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `RESTAURANT`
--

INSERT INTO `RESTAURANT` (`RESTAURANT_ID`, `NAME`, `EMAIL`, `NUMBER`, `ADDRESS`, `WEBSITE`, `OPENING_TIME`, `CLOSING_TIME`, `MANAGER_ID`) VALUES
(1, 'My Restaurant', 'my@email', '07776846506', 'This is my address', 'https://hammadmehmood.co.uk', '08:00:00', '22:00:00', 1),
(2, 'Magan\'s restaurant', 'maganrestaurant@email', '1245647', 'Wembley', 'https://jaydipmagan.com/', '02:00:00', '05:30:00', 2),
(3, '', '', '', '', '', '09:30:00', '22:30:00', 3);

-- --------------------------------------------------------

--
-- Table structure for table `USER`
--

CREATE TABLE `USER` (
  `USER_ID` int(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `SURNAME` varchar(250) NOT NULL,
  `EMAIL` varchar(250) NOT NULL,
  `PASSWORD` varchar(250) DEFAULT NULL,
  `GOOGLE_LOGIN` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `USER`
--

INSERT INTO `USER` (`USER_ID`, `NAME`, `SURNAME`, `EMAIL`, `PASSWORD`, `GOOGLE_LOGIN`) VALUES
(1, 'Hammad', 'Muhammad', 'hammadmuhammad15@gmail.com', NULL, 'true');

--
-- Indexes for dumped tables
--

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
-- Indexes for table `RESTAURANT`
--
ALTER TABLE `RESTAURANT`
  ADD PRIMARY KEY (`RESTAURANT_ID`);

--
-- Indexes for table `USER`
--
ALTER TABLE `USER`
  ADD PRIMARY KEY (`USER_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `FOOD`
--
ALTER TABLE `FOOD`
  MODIFY `FOOD_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `FOOD_REVIEWS`
--
ALTER TABLE `FOOD_REVIEWS`
  MODIFY `REVIEW_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `MANAGER`
--
ALTER TABLE `MANAGER`
  MODIFY `MANAGER_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `RESTAURANT`
--
ALTER TABLE `RESTAURANT`
  MODIFY `RESTAURANT_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `USER`
--
ALTER TABLE `USER`
  MODIFY `USER_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;
