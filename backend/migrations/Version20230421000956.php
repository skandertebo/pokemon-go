<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230421000956 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `admin` (id INT AUTO_INCREMENT NOT NULL, mail VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE capture (id INT AUTO_INCREMENT NOT NULL, pokemon_id INT NOT NULL, spawn_id INT NOT NULL, date_capture DATE NOT NULL, INDEX IDX_8BFEA6E52FE71C3E (pokemon_id), INDEX IDX_8BFEA6E56136E503 (spawn_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE notification (id INT AUTO_INCREMENT NOT NULL, contenu VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE player (id INT AUTO_INCREMENT NOT NULL, mail VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, player_tag VARCHAR(255) NOT NULL, score INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE pokemon (id INT AUTO_INCREMENT NOT NULL, base_score INT NOT NULL, description VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, model3_d VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `read` (id INT AUTO_INCREMENT NOT NULL, player_id INT NOT NULL, notification_id INT NOT NULL, `read` TINYINT(1) NOT NULL, INDEX IDX_9857416799E6F5DF (player_id), INDEX IDX_98574167EF1A9D84 (notification_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE spawn (id INT AUTO_INCREMENT NOT NULL, pokemon_id INT NOT NULL, player_id INT NOT NULL, latitude DOUBLE PRECISION NOT NULL, longitude DOUBLE PRECISION NOT NULL, `range` INT NOT NULL, spawn_date DATE NOT NULL, INDEX IDX_900ECFE72FE71C3E (pokemon_id), INDEX IDX_900ECFE799E6F5DF (player_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, mail VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE capture ADD CONSTRAINT FK_8BFEA6E52FE71C3E FOREIGN KEY (pokemon_id) REFERENCES pokemon (id)');
        $this->addSql('ALTER TABLE capture ADD CONSTRAINT FK_8BFEA6E56136E503 FOREIGN KEY (spawn_id) REFERENCES spawn (id)');
        $this->addSql('ALTER TABLE `read` ADD CONSTRAINT FK_9857416799E6F5DF FOREIGN KEY (player_id) REFERENCES player (id)');
        $this->addSql('ALTER TABLE `read` ADD CONSTRAINT FK_98574167EF1A9D84 FOREIGN KEY (notification_id) REFERENCES notification (id)');
        $this->addSql('ALTER TABLE spawn ADD CONSTRAINT FK_900ECFE72FE71C3E FOREIGN KEY (pokemon_id) REFERENCES pokemon (id)');
        $this->addSql('ALTER TABLE spawn ADD CONSTRAINT FK_900ECFE799E6F5DF FOREIGN KEY (player_id) REFERENCES player (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE capture DROP FOREIGN KEY FK_8BFEA6E52FE71C3E');
        $this->addSql('ALTER TABLE capture DROP FOREIGN KEY FK_8BFEA6E56136E503');
        $this->addSql('ALTER TABLE `read` DROP FOREIGN KEY FK_9857416799E6F5DF');
        $this->addSql('ALTER TABLE `read` DROP FOREIGN KEY FK_98574167EF1A9D84');
        $this->addSql('ALTER TABLE spawn DROP FOREIGN KEY FK_900ECFE72FE71C3E');
        $this->addSql('ALTER TABLE spawn DROP FOREIGN KEY FK_900ECFE799E6F5DF');
        $this->addSql('DROP TABLE `admin`');
        $this->addSql('DROP TABLE capture');
        $this->addSql('DROP TABLE notification');
        $this->addSql('DROP TABLE player');
        $this->addSql('DROP TABLE pokemon');
        $this->addSql('DROP TABLE `read`');
        $this->addSql('DROP TABLE spawn');
        $this->addSql('DROP TABLE `user`');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
