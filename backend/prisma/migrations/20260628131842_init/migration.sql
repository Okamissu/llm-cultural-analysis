-- CreateTable
CREATE TABLE `experiment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `source_language` ENUM('PL', 'EN') NOT NULL,
    `target_language` ENUM('PL', 'EN') NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `temperature` DECIMAL(3, 2) NOT NULL,
    `cultural_prompting` BOOLEAN NOT NULL,
    `prompt_similarity` DECIMAL(6, 5) NOT NULL,
    `response_similarity` DECIMAL(6, 5) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prompt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `experiment_id` INTEGER NOT NULL,
    `language` ENUM('PL', 'EN') NOT NULL,
    `prompt_type` ENUM('ORIGINAL', 'TRANSLATED') NOT NULL,
    `content` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `response` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `experiment_id` INTEGER NOT NULL,
    `language` ENUM('PL', 'EN') NOT NULL,
    `content` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evaluation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `experiment_id` INTEGER NOT NULL,
    `naturalness_original` DECIMAL(3, 1) NOT NULL,
    `naturalness_translated` DECIMAL(3, 1) NOT NULL,
    `precision_original` DECIMAL(3, 1) NOT NULL,
    `precision_translated` DECIMAL(3, 1) NOT NULL,
    `detail_original` DECIMAL(3, 1) NOT NULL,
    `detail_translated` DECIMAL(3, 1) NOT NULL,
    `cultural_context_original` DECIMAL(3, 1) NOT NULL,
    `cultural_context_translated` DECIMAL(3, 1) NOT NULL,
    `tone_original` DECIMAL(3, 1) NOT NULL,
    `tone_translated` DECIMAL(3, 1) NOT NULL,
    `summary` LONGTEXT NOT NULL,
    `observations` JSON NOT NULL,

    UNIQUE INDEX `evaluation_experiment_id_key`(`experiment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `prompt` ADD CONSTRAINT `prompt_experiment_id_fkey` FOREIGN KEY (`experiment_id`) REFERENCES `experiment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `response` ADD CONSTRAINT `response_experiment_id_fkey` FOREIGN KEY (`experiment_id`) REFERENCES `experiment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluation` ADD CONSTRAINT `evaluation_experiment_id_fkey` FOREIGN KEY (`experiment_id`) REFERENCES `experiment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
