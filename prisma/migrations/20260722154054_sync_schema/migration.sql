/*
  Warnings:

  - You are about to drop the column `portfolio_id` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio_id` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio_id` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio_id` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio_id` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio_id` on the `socials` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `portfolios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `educations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `socials` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `educations` DROP FOREIGN KEY `educations_portfolio_id_fkey`;

-- DropForeignKey
ALTER TABLE `experiences` DROP FOREIGN KEY `experiences_portfolio_id_fkey`;

-- DropForeignKey
ALTER TABLE `portfolios` DROP FOREIGN KEY `portfolios_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_portfolio_id_fkey`;

-- DropForeignKey
ALTER TABLE `services` DROP FOREIGN KEY `services_portfolio_id_fkey`;

-- DropForeignKey
ALTER TABLE `skills` DROP FOREIGN KEY `skills_portfolio_id_fkey`;

-- DropForeignKey
ALTER TABLE `socials` DROP FOREIGN KEY `socials_portfolio_id_fkey`;

-- DropIndex
DROP INDEX `educations_portfolio_id_fkey` ON `educations`;

-- DropIndex
DROP INDEX `experiences_portfolio_id_fkey` ON `experiences`;

-- DropIndex
DROP INDEX `projects_portfolio_id_fkey` ON `projects`;

-- DropIndex
DROP INDEX `services_portfolio_id_fkey` ON `services`;

-- DropIndex
DROP INDEX `skills_portfolio_id_fkey` ON `skills`;

-- DropIndex
DROP INDEX `socials_portfolio_id_fkey` ON `socials`;

-- AlterTable
ALTER TABLE `educations` DROP COLUMN `portfolio_id`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `experiences` DROP COLUMN `portfolio_id`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `projects` DROP COLUMN `portfolio_id`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    MODIFY `desc` TEXT NULL;

-- AlterTable
ALTER TABLE `services` DROP COLUMN `portfolio_id`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `skills` DROP COLUMN `portfolio_id`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `socials` DROP COLUMN `portfolio_id`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    ADD COLUMN `email_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `image` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NULL,
    MODIFY `desc` TEXT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `portfolios`;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `ip_address` VARCHAR(191) NULL,
    `user_agent` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `sessions_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `account_id` VARCHAR(191) NOT NULL,
    `provider_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `access_token` TEXT NULL,
    `refresh_token` TEXT NULL,
    `id_token` TEXT NULL,
    `access_token_expires_at` DATETIME(3) NULL,
    `refresh_token_expires_at` DATETIME(3) NULL,
    `scope` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verifications` (
    `id` VARCHAR(191) NOT NULL,
    `identifier` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `temp_images` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `temp_images_url_key`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_messages` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NULL,
    `message` TEXT NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testimonials` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NULL,
    `company` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `skills` ADD CONSTRAINT `skills_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `socials` ADD CONSTRAINT `socials_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experiences` ADD CONSTRAINT `experiences_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `educations` ADD CONSTRAINT `educations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testimonials` ADD CONSTRAINT `testimonials_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
