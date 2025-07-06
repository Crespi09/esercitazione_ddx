-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Lug 07, 2025 alle 00:14
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ddx`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `Bin`
--

CREATE TABLE `Bin` (
  `id` int(11) NOT NULL,
  `deletedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `userId` int(11) NOT NULL,
  `itemId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `Bin`
--

INSERT INTO `Bin` (`id`, `deletedAt`, `createdAt`, `userId`, `itemId`) VALUES
(1, '2025-07-06 18:26:22.170', '2025-07-06 18:26:22.169', 1, 2),
(2, '2025-07-06 18:28:48.091', '2025-07-06 18:28:48.090', 1, 3),
(3, '2025-07-06 18:29:23.996', '2025-07-06 18:29:23.995', 1, 4);

-- --------------------------------------------------------

--
-- Struttura della tabella `Favorite`
--

CREATE TABLE `Favorite` (
  `id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `userId` int(11) NOT NULL,
  `itemId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `Favorite`
--

INSERT INTO `Favorite` (`id`, `createdAt`, `userId`, `itemId`) VALUES
(1, '2025-07-06 18:22:53.784', 1, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `File`
--

CREATE TABLE `File` (
  `id` int(11) NOT NULL,
  `fileType` varchar(191) NOT NULL,
  `fileName` varchar(191) NOT NULL,
  `storage` double NOT NULL,
  `path` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `itemId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `File`
--

INSERT INTO `File` (`id`, `fileType`, `fileName`, `storage`, `path`, `createdAt`, `updatedAt`, `itemId`) VALUES
(1, 'image/jpeg', 'aaaaa', 63869, 'uploads\\file-1751826183916-230576872.jpg', '2025-07-06 18:23:03.944', '2025-07-06 18:23:11.075', 2),
(2, 'image/jpeg', 'bbbbb', 63869, 'uploads\\file-1751826248712-24527411.jpg', '2025-07-06 18:24:08.747', '2025-07-06 18:24:24.437', 3),
(3, 'image/jpeg', '36f771ae-d6b5-4500-8053-6bdab3f4d6b22421294997167984439.jpg', 63412, 'uploads\\file-1751826562436-709739153.jpg', '2025-07-06 18:29:22.471', '2025-07-06 18:29:22.471', 4);

-- --------------------------------------------------------

--
-- Struttura della tabella `Item`
--

CREATE TABLE `Item` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `color` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `parentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `Item`
--

INSERT INTO `Item` (`id`, `name`, `color`, `createdAt`, `updatedAt`, `ownerId`, `parentId`) VALUES
(1, 'test', 'f44336', '2025-07-06 18:22:52.358', '2025-07-06 18:22:52.358', 1, NULL),
(2, 'aaaaa', NULL, '2025-07-06 18:23:03.937', '2025-07-06 18:23:11.079', 1, NULL),
(3, 'bbbbb', NULL, '2025-07-06 18:24:08.737', '2025-07-06 18:24:24.442', 1, NULL),
(4, '36f771ae-d6b5-4500-8053-6bdab3f4d6b22421294997167984439.jpg', NULL, '2025-07-06 18:29:22.463', '2025-07-06 18:29:22.463', 1, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `Shared`
--

CREATE TABLE `Shared` (
  `id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `itemId` int(11) NOT NULL,
  `sharedWithId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `hash` varchar(191) NOT NULL,
  `refreshToken` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `User`
--

INSERT INTO `User` (`id`, `username`, `hash`, `refreshToken`, `createdAt`, `updatedAt`) VALUES
(1, 'gianfranco', '$argon2id$v=19$m=65536,t=3,p=4$zdR0H2Yw6XKLjE+1q4ERRA$OBpfAHvttc6NQE4V1FSxyWXX3cOrXhRQXBdzAKJEtT8', '$argon2id$v=19$m=65536,t=3,p=4$R329NU/yPiaaUTTb49w7dg$q7CBBKwoW8ZL/o3kZJS81g2GG2LJg7PUzocYajoFNVA', '2025-07-06 18:20:42.193', '2025-07-06 21:51:57.125');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `Bin`
--
ALTER TABLE `Bin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Bin_userId_itemId_key` (`userId`,`itemId`),
  ADD KEY `Bin_itemId_fkey` (`itemId`);

--
-- Indici per le tabelle `Favorite`
--
ALTER TABLE `Favorite`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Favorite_userId_itemId_key` (`userId`,`itemId`),
  ADD KEY `Favorite_itemId_fkey` (`itemId`);

--
-- Indici per le tabelle `File`
--
ALTER TABLE `File`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `File_itemId_key` (`itemId`);

--
-- Indici per le tabelle `Item`
--
ALTER TABLE `Item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Item_ownerId_fkey` (`ownerId`),
  ADD KEY `Item_parentId_fkey` (`parentId`);

--
-- Indici per le tabelle `Shared`
--
ALTER TABLE `Shared`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Shared_itemId_sharedWithId_key` (`itemId`,`sharedWithId`),
  ADD KEY `Shared_sharedWithId_fkey` (`sharedWithId`);

--
-- Indici per le tabelle `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `Bin`
--
ALTER TABLE `Bin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `Favorite`
--
ALTER TABLE `Favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `File`
--
ALTER TABLE `File`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `Item`
--
ALTER TABLE `Item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `Shared`
--
ALTER TABLE `Shared`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `Bin`
--
ALTER TABLE `Bin`
  ADD CONSTRAINT `Bin_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Bin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `Favorite`
--
ALTER TABLE `Favorite`
  ADD CONSTRAINT `Favorite_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `File`
--
ALTER TABLE `File`
  ADD CONSTRAINT `File_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `Item`
--
ALTER TABLE `Item`
  ADD CONSTRAINT `Item_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Item_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `Shared`
--
ALTER TABLE `Shared`
  ADD CONSTRAINT `Shared_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Shared_sharedWithId_fkey` FOREIGN KEY (`sharedWithId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
