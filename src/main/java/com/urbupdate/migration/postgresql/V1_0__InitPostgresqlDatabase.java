/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.urbupdate.migration.postgresql;

import org.flywaydb.core.api.migration.spring.SpringJdbcMigration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;

@Profile("prod")
public class V1_0__InitPostgresqlDatabase implements SpringJdbcMigration {

    @Override
    public void migrate(JdbcTemplate jdbcTemplate) throws Exception {
        System.out.println("Create users table -------------------------------------------------------------------");
        jdbcTemplate.execute(createUsersTable());
        System.out.println("Create roles table ---------------------------------------------------------------");
        jdbcTemplate.execute(createRolesTable());
        jdbcTemplate.execute(insertUserProfile_USER());
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
        System.out.println("Isertion des couches --------------------------------------------------------------------");
        jdbcTemplate.execute(createCouches());

    }

    private String createUsersTable() {
        return "create table users (\n"
                + "   id serial NOT NULL primary key,\n"
                + "   name VARCHAR(30) NOT NULL,\n"
                + "   email VARCHAR(100) NOT NULL,\n"
                + "   password VARCHAR(100) NOT NULL,\n"
                + "   phone VARCHAR(100) NOT NULL,\n"
                + "   address VARCHAR(100) NOT NULL,\n"
                + "   created_at timestamp,\n"
                + "   updated_at timestamp\n"
                + ");";
    }

    private String createClaimsTable() {
        return "create table claims (\n"
                + "   id serial NOT NULL primary key,\n"
                + "   title VARCHAR(255) NOT NULL,\n"
                + "   description text NOT NULL,\n"
                + "   user_id integer NOT NULL,\n"
                + "   created_at timestamp,\n"
                + "   updated_at timestamp,\n"
                + "   CONSTRAINT FK_APP_USER FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE\n"
                + ");";
    }

    private String createFeaturesTable() {
        return "create table features (\n"
                + "   id serial NOT NULL primary key,\n"
                + "   lon double precision NOT NULL,\n"
                + "   lat double precision NOT NULL,\n"
                + "   status VARCHAR(30) NOT NULL,\n"
                + "   claim_id integer NOT NULL,\n"
                + "   created_at timestamp,\n"
                + "   updated_at timestamp,\n"
                + "   CONSTRAINT FK_APP_USER FOREIGN KEY (claim_id) REFERENCES claims (id) ON DELETE CASCADE\n"
                + ");";
    }

    private String createPhotosTable() {
        return "create table photos (\n"
                + "   id serial NOT NULL primary key,\n"
                + "   name VARCHAR(255) NOT NULL,\n"
                + "   path VARCHAR(255) NOT NULL,\n"
                + "   thumbnail_path VARCHAR(255) NOT NULL,\n"
                + "   thumbnail_path_url VARCHAR(255) NOT NULL,\n"
                + "   url VARCHAR(255) NOT NULL,\n"
                + "   extension VARCHAR(30) NOT NULL,\n"
                + "   claim_id integer NOT NULL,\n"
                + "   created_at timestamp,\n"
                + "   updated_at timestamp,\n"
                + "   CONSTRAINT FK_APP_USER FOREIGN KEY (claim_id) REFERENCES claims (id) ON DELETE CASCADE\n"
                + ");";
    }

    private String createLayersTable() {
        return "CREATE TABLE layers ( \n"
                + "   id serial NOT NULL primary key,\n"
                + "  name varchar(50) NOT NULL, \n"
                + "  color varchar(50) NOT NULL, \n"
                + "  stroke varchar(50) NOT NULL, \n"
                + "  active boolean NOT NULL, \n"
                + "   created_at timestamp,\n"
                + "   updated_at timestamp\n"
                + ");";
    }

    private String createGeoserversTable() {
        return "CREATE TABLE geoservers ( \n"
                + "   id serial NOT NULL primary key,\n"
                + "  url varchar(50) NOT NULL, \n"
                + "  workspace varchar(50) NOT NULL, \n"
                + "  feature_ns varchar(50) NOT NULL, \n"
                + "  src_name varchar(50) NOT NULL, \n"
                + "  layers_primary_key varchar(50) NOT NULL, \n"
                + "  created_at timestamp,\n"
                + "  updated_at timestamp\n"
                + ");";
    }

    private String createNotificationsTable() {
        return "CREATE TABLE notifications ( \n"
                + "   id serial NOT NULL primary key,\n"
                + "  notifiable_id integer NOT NULL, \n"
                + "  notifiable_type varchar(50) NOT NULL, \n"
                + "  data text, \n"
                + "  read_at timestamp,\n"
                + "  created_at timestamp,\n"
                + "  updated_at timestamp\n"
                + ");";
    }

    private String createRolesTable() {
        return "create table roles(\n"
                + "   id serial NOT NULL primary key,\n"
                + "   name VARCHAR(30) NOT NULL,\n"
                + "   slug VARCHAR(30) NOT NULL\n"
                + ");";
    }

    private String insertUserProfile_USER() {
        return "INSERT INTO roles (name,slug) VALUES ('Administrateur','administrateur');";
    }

    private String insertUserProfile_ADMIN() {
        return "INSERT INTO roles (name,slug) VALUES ('Éditeur','éditeur');";
    }

    private String createAppUserUserProfileTable() {
        return "CREATE TABLE role_user (\n"
                + "    user_id integer NOT NULL,\n"
                + "    role_id integer NOT NULL,\n"
                + "    PRIMARY KEY (user_id, role_id),\n"
                + "    CONSTRAINT FK_APP_USER FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,\n"
                + "    CONSTRAINT FK_USER_PROFILE FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE\n"
                + ");";

    }

    private String createAdjustmentsTable() {
        return "CREATE TABLE adjustments (\n"
                + "   id serial NOT NULL primary key,\n"
                + "    user_id integer NOT NULL,\n"
                + "    claim_id integer NOT NULL,\n"
                + "    before text,\n "
                + "    after text,\n"
                + "    created_at timestamp,\n"
                + "    updated_at timestamp,\n"
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

    private String createCouches() {
        return "INSERT INTO layers (id, name, color, stroke, active) VALUES\n"
                + "(1, 'Fouchana', 'rgba(30, 102, 223, 0.45)', 'rgb(255, 0, 0)', false),\n"
                + "(2, 'Mhamdia', 'rgba(211, 227, 227, 0.45)', '#3399CC', false),\n"
                + "(3, 'batdf_Project2_Clip', 'rgba(211, 227, 227, 0.48)', '#3399CC', true);\n";
    }

    private String insertGeoserverConfig() {
        return "INSERT INTO geoservers (url,workspace,feature_ns,src_name,layers_primary_key) VALUES ('http://localhost:8080/geoserver','sabrine','urbupdate','EPSG:32632','ID');";
    }

}
