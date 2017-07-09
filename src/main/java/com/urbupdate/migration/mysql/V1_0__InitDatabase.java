/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.urbupdate.migration.mysql;

import org.flywaydb.core.api.migration.spring.SpringJdbcMigration;
import org.springframework.jdbc.core.JdbcTemplate;

public class V1_0__InitDatabase implements SpringJdbcMigration {

    @Override
    public void migrate(JdbcTemplate jdbcTemplate) throws Exception {
        System.out.println("Create users table -------------------------------------------------------------------");
        jdbcTemplate.execute(createUsersTable());
        System.out.println("Create roles table ---------------------------------------------------------------");
        jdbcTemplate.execute(createRolesTable());
        jdbcTemplate.execute(insertUserProfile_USER());
        jdbcTemplate.execute(insertUserProfile_Agent());
        jdbcTemplate.execute(insertUserProfile_ADMIN());
        System.out.println("create role_user table ------------------------------------------------------");
        jdbcTemplate.execute(createAppUserUserProfileTable());
        System.out.println("create layers Table ---------------------------------------------------------------------");
        jdbcTemplate.execute(createLayersTable());
        System.out.println("create claims Table ---------------------------------------------------------------------");
        jdbcTemplate.execute(createClaimsTable());
        System.out.println("create features Table -------------------------------------------------------------------");
        jdbcTemplate.execute(createFeaturesTable());
        System.out.println("create photos Table -------------------------------------------------------------------");
        jdbcTemplate.execute(createPhotosTable());
        System.out.println("create adjustments Table -------------------------------------------------------------------");
        jdbcTemplate.execute(createAdjustmentsTable());
        System.out.println("create geoservers Table -------------------------------------------------------------------");
        jdbcTemplate.execute(createGeoserversTable());
        System.out.println("configuring geoserver -------------------------------------------------------------------");
        jdbcTemplate.execute(insertGeoserverConfig());
        System.out.println("create notifications table -------------------------------------------------------------------");
        jdbcTemplate.execute(createNotificationsTable());
        System.out.println("create Admin ----------------------------------------------------------------------------");
        jdbcTemplate.execute(createDefaultAdmin());
        jdbcTemplate.execute(createAdmin());
    }

    private String createUsersTable() {
        return "create table users (\n"
                + "   id BIGINT NOT NULL AUTO_INCREMENT,\n"
                + "   name VARCHAR(30) NOT NULL,\n"
                + "   email VARCHAR(100) NOT NULL,\n"
                + "   phone VARCHAR(100),\n"
                + "   address VARCHAR(100),\n"
                + "   password VARCHAR(100) NOT NULL,\n"
                + "   created_at timestamp,\n"
                + "   updated_at timestamp,\n"
                + "   PRIMARY KEY (id),\n"
                + "   UNIQUE (name)\n"
                + ");";
    }

    private String createClaimsTable() {
        return "create table claims (\n"
                + "   id BIGINT NOT NULL AUTO_INCREMENT,\n"
                + "   titre VARCHAR(255) NOT NULL,\n"
                + "   description TEXT NOT NULL,\n"
                + "   type VARCHAR(255) NOT NULL,\n"
                + "   planification boolean NOT NULL, \n"
                + "   etat_avancement INT NOT NULL,\n"
                + "   epannelage VARCHAR(255) NOT NULL,\n"
                + "   user_id BIGINT NOT NULL,\n"
                + "   created_at timestamp,\n"
                + "   updated_at timestamp,\n"
                + "   PRIMARY KEY (id),\n"
                + "   CONSTRAINT FK_APP_USER FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE\n"
                + ");";
    }

    private String createFeaturesTable() {
        return "create table features (\n"
                + "   id BIGINT NOT NULL AUTO_INCREMENT,\n"
                + "   lon double NOT NULL,\n"
                + "   lat double NOT NULL,\n"
                + "   status VARCHAR(30) NOT NULL,\n"
                + "   claim_id BIGINT NOT NULL,\n"
                + "   created_at timestamp,\n"
                + "   updated_at timestamp,\n"
                + "   PRIMARY KEY (id),\n"
                + "   CONSTRAINT FK_APP_USER FOREIGN KEY (claim_id) REFERENCES claims (id) ON DELETE CASCADE\n"
                + ");";
    }

    private String createPhotosTable() {
        return "create table photos (\n"
                + "   id BIGINT NOT NULL AUTO_INCREMENT,\n"
                + "   name VARCHAR(255) NOT NULL,\n"
                + "   path VARCHAR(255) NOT NULL,\n"
                + "   thumbnail_path VARCHAR(255) NOT NULL,\n"
                + "   thumbnail_path_url VARCHAR(255) NOT NULL,\n"
                + "   url VARCHAR(255) NOT NULL,\n"
                + "   extension VARCHAR(30) NOT NULL,\n"
                + "   claim_id BIGINT NOT NULL,\n"
                + "   created_at timestamp,\n"
                + "   updated_at timestamp,\n"
                + "   PRIMARY KEY (id),\n"
                + "   CONSTRAINT FK_APP_USER FOREIGN KEY (claim_id) REFERENCES claims (id) ON DELETE CASCADE\n"
                + ");";
    }

    private String createLayersTable() {
        return "CREATE TABLE layers ( \n"
                + "  id int(11) NOT NULL AUTO_INCREMENT, \n"
                + "  name varchar(50) NOT NULL, \n"
                + "  color varchar(50) NOT NULL, \n"
                + "  stroke varchar(50) NOT NULL, \n"
                + "  active boolean NOT NULL, \n"
                + "   created_at timestamp,\n"
                + "   updated_at timestamp,\n"
                + "   PRIMARY KEY (id),\n"
                + "   UNIQUE (name)\n"
                + ");";
    }

    private String createGeoserversTable() {
        return "CREATE TABLE geoservers ( \n"
                + "  id int(11) NOT NULL AUTO_INCREMENT, \n"
                + "  url varchar(50) NOT NULL, \n"
                + "  workspace varchar(50) NOT NULL, \n"
                + "  feature_ns varchar(50) NOT NULL, \n"
                + "  src_name varchar(50) NOT NULL, \n"
                + "  layers_primary_key varchar(50) NOT NULL, \n"
                + "  PRIMARY KEY (id)\n"
                + ");";
    }

    private String createNotificationsTable() {
        return "CREATE TABLE notifications ( \n"
                + "  id int(11) NOT NULL AUTO_INCREMENT, \n"
                + "  notifiable_id int(11) NOT NULL, \n"
                + "  notifiable_type varchar(50) NOT NULL, \n"
                + "  data text NOT NULL, \n"
                + "  read_at timestamp,\n"
                + "  created_at timestamp,\n"
                + "  updated_at timestamp,\n"
                + "  PRIMARY KEY (id)\n"
                + ");";
    }

    private String createRolesTable() {
        return "create table roles(\n"
                + "   id BIGINT NOT NULL AUTO_INCREMENT,\n"
                + "   name VARCHAR(30) NOT NULL,\n"
                + "   slug VARCHAR(30) NOT NULL,\n"
                + "   PRIMARY KEY (id),\n"
                + "   UNIQUE (name)\n"
                + ");";
    }

    private String insertUserProfile_USER() {
        return "INSERT INTO roles (name,slug) VALUES ('Administrateur','administrateur');";
    }

    private String insertUserProfile_Agent() {
        return "INSERT INTO roles (name,slug) VALUES ('Technicien','technicien');";
    }

    private String insertUserProfile_ADMIN() {
        return "INSERT INTO roles (name,slug) VALUES ('Citoyen','citoyen');";
    }

    private String createAppUserUserProfileTable() {
        return "CREATE TABLE role_user (\n"
                + "    user_id BIGINT NOT NULL,\n"
                + "    role_id BIGINT NOT NULL,\n"
                + "    PRIMARY KEY (user_id, role_id),\n"
                + "    CONSTRAINT FK_APP_USER FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,\n"
                + "    CONSTRAINT FK_USER_PROFILE FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE\n"
                + ");";

    }

    private String createAdjustmentsTable() {
        return "CREATE TABLE adjustments (\n"
                + "    id BIGINT NOT NULL AUTO_INCREMENT,\n"
                + "    user_id BIGINT NOT NULL,\n"
                + "    claim_id BIGINT NOT NULL,\n"
                + "    old_version text,\n "
                + "    new_version text,\n"
                + "    created_at timestamp,\n"
                + "    updated_at timestamp,\n"
                + "    PRIMARY KEY (id),\n"
                + "    CONSTRAINT FK_USERS FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,\n"
                + "    CONSTRAINT FK_CLAIMS FOREIGN KEY (claim_id) REFERENCES claims (id) ON DELETE CASCADE\n"
                + ");";

    }


    private String createDefaultAdmin() {
        return "INSERT INTO users (id, name, password, email) VALUES"
                + "(1, 'admin', '$2a$10$MvwUYRexceCXTm7CEeD56u8O0ikZ8FF20Z/2H0FhJsCKvHF83RV2W','admin@urbupdate.tn');";
    }

    private String createAdmin() {
        return "INSERT INTO role_user (user_id, role_id) VALUES (1,1)";
    }

    private String insertGeoserverConfig() {
        return "INSERT INTO geoservers (url,workspace,feature_ns,src_name,layers_primary_key) VALUES ('http://localhost:8080/geoserver','urbupdate','http://urbupdate','EPSG:32632','ID');";
    }

}
