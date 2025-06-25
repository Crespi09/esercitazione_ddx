-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 25, 2025 alle 15:32
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
-- Struttura della tabella `file`
--

CREATE TABLE `file` (
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
-- Dump dei dati per la tabella `file`
--

INSERT INTO `file` (`id`, `fileType`, `fileName`, `storage`, `path`, `createdAt`, `updatedAt`, `itemId`) VALUES
(2, 'image/png', 'spidamana.png', 48983, 'uploads\\file-1750252218047-392608884.png', '2025-06-18 13:10:18.064', '2025-06-18 13:10:18.064', 8);

-- --------------------------------------------------------

--
-- Struttura della tabella `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `color` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `parentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `item`
--

INSERT INTO `item` (`id`, `name`, `color`, `createdAt`, `updatedAt`, `ownerId`, `parentId`) VALUES
(1, 'folderUpdatedName', '#f59673', '2025-06-08 10:15:53.741', '2025-06-08 10:29:19.995', 30, NULL),
(5, 'folder_test', '#ffffff', '2025-06-08 10:23:12.199', '2025-06-08 10:23:12.199', 30, 1),
(6, 'folder_test', '#ffffff', '2025-06-16 10:26:39.554', '2025-06-16 10:26:39.554', 33, NULL),
(8, 'spidamana.png', NULL, '2025-06-18 13:10:18.051', '2025-06-18 13:10:18.051', 33, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `shared`
--

CREATE TABLE `shared` (
  `id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `itemId` int(11) NOT NULL,
  `sharedWithId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `shared`
--

INSERT INTO `shared` (`id`, `createdAt`, `updatedAt`, `itemId`, `sharedWithId`) VALUES
(2, '2025-06-23 09:52:43.272', '2025-06-23 09:52:43.272', 8, 30),
(6, '2025-06-23 10:49:05.679', '2025-06-23 10:49:05.679', 6, 30);

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `hash` varchar(191) NOT NULL,
  `refreshToken` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `user`
--

INSERT INTO `user` (`id`, `username`, `hash`, `refreshToken`, `createdAt`, `updatedAt`) VALUES
(30, 'gianfranco', '$argon2id$v=19$m=65536,t=3,p=4$6680liCBx80VzKDn9TtELg$fwOGKBtHFYT7FTPbWj3QMcvv4oC8RFI+NVjAOwHvqFA', '$argon2id$v=19$m=65536,t=3,p=4$ZTzSAVUD3eDxUvYJjgibcg$gZlp2ueM0pzw5hgoE8qbdKV1WnYbDeaarkii4VrwqSM', '2024-11-18 17:52:13.170', '2025-06-23 10:47:51.603'),
(33, 'pierino', '$argon2id$v=19$m=65536,t=3,p=4$wdj3R8nkMxliG8IYKNgKrQ$3sDwAdiIAW4z/sEv1pPrCKk85/WaWccwy2vf1MiwaN0', '$argon2id$v=19$m=65536,t=3,p=4$AoWLzm3TcwbZOBYzKfGoag$Ccz7QaeucBaeKumcC27CQgmeeRkhQl5xAjOC2b7KOQM', '2024-11-19 22:11:09.537', '2025-06-25 11:51:31.172');

-- --------------------------------------------------------

--
-- Struttura della tabella `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('2e19e85c-356c-4fd1-8105-5c20811fc283', 'cedd386e97f327e2eaf2d0a530b6dd8878814f3c4e9b9022eb0295c99472a02f', '2024-11-17 00:37:17.670', '20241117003717_add_user_table', NULL, NULL, '2024-11-17 00:37:17.654', 1),
('3e79d547-ad38-4364-8d5d-fd0c1f17a229', 'f23d26bf123193aa51f830a7d99e03e0021a3790d5ec963c5b983ee5c1d1215a', '2024-11-18 13:57:58.663', '20241118105848_add_user_table', NULL, NULL, '2024-11-18 13:57:58.609', 1),
('43a4772e-08f1-4855-96ef-efa47de24be1', 'b02b8e431c681e7a56eac7156162bf2653076cfafa311b54c14a6980fd9fb80e', '2024-11-18 14:02:49.113', '20241118135814_alter_user_table', NULL, NULL, '2024-11-18 14:02:49.098', 1),
('56a8e852-4552-4177-8574-3054be899254', 'e4bf5823181a0255ff254868c5c3c4df7cc854b7a0de03c9e6d014eb9940afb3', '2024-11-17 00:37:17.449', '20241117001732_add_user_table', NULL, NULL, '2024-11-17 00:37:17.411', 1),
('b3176786-26ab-487b-8a5c-f90fec4b3c7e', '4e79cbe93b14487d4963cebe1e84040e24ad62c8a7ec9840a2588f3119494302', '2025-06-16 11:22:29.170', '20250616112229_storage', NULL, NULL, '2025-06-16 11:22:29.096', 1),
('d6415869-eeda-4473-916b-fcc32299e68b', '89dac817504415e8847c3b4c885fa8136e4f8ad0efcd8234529d99bb74365e31', '2024-11-18 17:41:54.220', '20241118174154_modifica_tabella', NULL, NULL, '2024-11-18 17:41:54.121', 1),
('dbe30f80-e948-415e-a62d-e9a13d5062ba', '09d8f0966ca8433e1a27e83687faf2ac784071f9bd73b353bd555c90b7d37c20', '2025-06-08 06:03:04.342', '20250603131048_add', NULL, NULL, '2025-06-08 06:03:03.911', 1);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `File_itemId_key` (`itemId`);

--
-- Indici per le tabelle `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Item_ownerId_fkey` (`ownerId`),
  ADD KEY `Item_parentId_fkey` (`parentId`);

--
-- Indici per le tabelle `shared`
--
ALTER TABLE `shared`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Shared_itemId_sharedWithId_key` (`itemId`,`sharedWithId`),
  ADD KEY `Shared_sharedWithId_fkey` (`sharedWithId`);

--
-- Indici per le tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`);

--
-- Indici per le tabelle `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `file`
--
ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT per la tabella `shared`
--
ALTER TABLE `shared`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `File_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `Item_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Item_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `shared`
--
ALTER TABLE `shared`
  ADD CONSTRAINT `Shared_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Shared_sharedWithId_fkey` FOREIGN KEY (`sharedWithId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
