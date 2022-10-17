-- CreateTable
CREATE TABLE `Attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `attendance_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `attendane_status` BOOLEAN NOT NULL DEFAULT false,
    `lesson` INTEGER NOT NULL DEFAULT 1,
    `class` INTEGER NOT NULL,
    `student` INTEGER NOT NULL,
    `is_removed` BOOLEAN NOT NULL DEFAULT false,

    INDEX `Attendance_class_fkey`(`class`),
    INDEX `Attendance_student_fkey`(`student`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `create_by` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `desc` VARCHAR(255) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `poster` VARCHAR(191) NOT NULL,
    `is_removed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class_Student` (
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `class` INTEGER NOT NULL,
    `student` INTEGER NOT NULL,
    `is_removed` BOOLEAN NOT NULL DEFAULT false,

    INDEX `Class_Student_student_fkey`(`student`),
    PRIMARY KEY (`class`, `student`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `create_by` INTEGER NOT NULL,
    `class_name` VARCHAR(40) NULL,
    `opening_day` DATE NOT NULL,
    `closing_day` DATE NOT NULL,
    `tottal_lesson` INTEGER NULL,
    `lesson_perweek` INTEGER NULL,
    `day_of_week` VARCHAR(191) NULL,
    `max_studens` INTEGER NULL,
    `is_removed` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Classes_class_name_key`(`class_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `create_by` INTEGER NOT NULL,
    `address` VARCHAR(255) NULL,
    `birthday` DATE NULL,
    `email` VARCHAR(20) NOT NULL,
    `mobile` VARCHAR(20) NULL,
    `name` VARCHAR(40) NULL,
    `work` VARCHAR(100) NOT NULL,
    `is_removed` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Students_email_key`(`email`),
    UNIQUE INDEX `Students_mobile_key`(`mobile`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `create_by` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `desc` VARCHAR(255) NOT NULL,
    `is_removed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `name` VARCHAR(40) NULL,
    `mobile` VARCHAR(20) NULL,
    `permisson` ENUM('admin', 'staff') NOT NULL DEFAULT 'staff',
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_removed` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Users_username_key`(`username`),
    UNIQUE INDEX `Users_email_key`(`email`),
    UNIQUE INDEX `Users_mobile_key`(`mobile`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create_by` INTEGER NOT NULL,
    `email` VARCHAR(255) NULL,
    `name` VARCHAR(40) NULL,
    `mobile` VARCHAR(20) NULL,
    `course` VARCHAR(20) NULL,
    `stage` ENUM('unpaid', 'paid', 'joined') NOT NULL DEFAULT 'unpaid',
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_student` BOOLEAN NOT NULL DEFAULT false,
    `is_removed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_class_fkey` FOREIGN KEY (`class`) REFERENCES `Classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_student_fkey` FOREIGN KEY (`student`) REFERENCES `Students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blogs` ADD CONSTRAINT `Blogs_create_by_fkey` FOREIGN KEY (`create_by`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class_Student` ADD CONSTRAINT `Class_Student_class_fkey` FOREIGN KEY (`class`) REFERENCES `Classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class_Student` ADD CONSTRAINT `Class_Student_student_fkey` FOREIGN KEY (`student`) REFERENCES `Students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classes` ADD CONSTRAINT `Classes_create_by_fkey` FOREIGN KEY (`create_by`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_create_by_fkey` FOREIGN KEY (`create_by`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tags` ADD CONSTRAINT `Tags_create_by_fkey` FOREIGN KEY (`create_by`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customers` ADD CONSTRAINT `Customers_create_by_fkey` FOREIGN KEY (`create_by`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
