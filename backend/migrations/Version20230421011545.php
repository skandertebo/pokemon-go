<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230421011545 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE capture DROP FOREIGN KEY FK_8BFEA6E52FE71C3E');
        $this->addSql('DROP INDEX IDX_8BFEA6E52FE71C3E ON capture');
        $this->addSql('ALTER TABLE capture CHANGE pokemon_id player_id INT NOT NULL');
        $this->addSql('ALTER TABLE capture ADD CONSTRAINT FK_8BFEA6E599E6F5DF FOREIGN KEY (player_id) REFERENCES player (id)');
        $this->addSql('CREATE INDEX IDX_8BFEA6E599E6F5DF ON capture (player_id)');
        $this->addSql('ALTER TABLE spawn DROP FOREIGN KEY FK_900ECFE799E6F5DF');
        $this->addSql('DROP INDEX IDX_900ECFE799E6F5DF ON spawn');
        $this->addSql('ALTER TABLE spawn DROP player_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE capture DROP FOREIGN KEY FK_8BFEA6E599E6F5DF');
        $this->addSql('DROP INDEX IDX_8BFEA6E599E6F5DF ON capture');
        $this->addSql('ALTER TABLE capture CHANGE player_id pokemon_id INT NOT NULL');
        $this->addSql('ALTER TABLE capture ADD CONSTRAINT FK_8BFEA6E52FE71C3E FOREIGN KEY (pokemon_id) REFERENCES pokemon (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_8BFEA6E52FE71C3E ON capture (pokemon_id)');
        $this->addSql('ALTER TABLE spawn ADD player_id INT NOT NULL');
        $this->addSql('ALTER TABLE spawn ADD CONSTRAINT FK_900ECFE799E6F5DF FOREIGN KEY (player_id) REFERENCES player (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_900ECFE799E6F5DF ON spawn (player_id)');
    }
}
