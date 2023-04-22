<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230421010957 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE notification_player (id INT AUTO_INCREMENT NOT NULL, player_id_id INT NOT NULL, notification_id_id INT NOT NULL, is_read TINYINT(1) NOT NULL, INDEX IDX_5CBE8438C036E511 (player_id_id), INDEX IDX_5CBE8438B9F07BAE (notification_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE notification_player ADD CONSTRAINT FK_5CBE8438C036E511 FOREIGN KEY (player_id_id) REFERENCES player (id)');
        $this->addSql('ALTER TABLE notification_player ADD CONSTRAINT FK_5CBE8438B9F07BAE FOREIGN KEY (notification_id_id) REFERENCES notification (id)');
        $this->addSql('ALTER TABLE `read` DROP FOREIGN KEY FK_9857416799E6F5DF');
        $this->addSql('ALTER TABLE `read` DROP FOREIGN KEY FK_98574167EF1A9D84');
        $this->addSql('DROP TABLE `read`');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `read` (id INT AUTO_INCREMENT NOT NULL, player_id INT NOT NULL, notification_id INT NOT NULL, `read` TINYINT(1) NOT NULL, INDEX IDX_9857416799E6F5DF (player_id), INDEX IDX_98574167EF1A9D84 (notification_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE `read` ADD CONSTRAINT FK_9857416799E6F5DF FOREIGN KEY (player_id) REFERENCES player (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE `read` ADD CONSTRAINT FK_98574167EF1A9D84 FOREIGN KEY (notification_id) REFERENCES notification (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE notification_player DROP FOREIGN KEY FK_5CBE8438C036E511');
        $this->addSql('ALTER TABLE notification_player DROP FOREIGN KEY FK_5CBE8438B9F07BAE');
        $this->addSql('DROP TABLE notification_player');
    }
}
