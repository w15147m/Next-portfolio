-- AlterTable
ALTER TABLE `experiences` ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `sort_order` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `url` VARCHAR(191) NULL,
    MODIFY `desc` TEXT NULL;

-- AlterTable
ALTER TABLE `projects` ADD COLUMN `external` VARCHAR(191) NULL,
    ADD COLUMN `featured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `github` VARCHAR(191) NULL,
    ADD COLUMN `sort_order` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `type` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `services` ADD COLUMN `sort_order` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `skills` ADD COLUMN `is_core` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `sort_order` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `socials` ADD COLUMN `sort_order` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `about` TEXT NULL,
    ADD COLUMN `open_for_work` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `sub_desc` TEXT NULL;

-- CreateTable
CREATE TABLE `experience_projects` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `experience_id` BIGINT NOT NULL,
    `project_id` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `experience_projects_experience_id_project_id_key`(`experience_id`, `project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `experience_projects` ADD CONSTRAINT `experience_projects_experience_id_fkey` FOREIGN KEY (`experience_id`) REFERENCES `experiences`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience_projects` ADD CONSTRAINT `experience_projects_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
