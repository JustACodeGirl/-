CREATE DATABASE IF NOT EXISTS `ovalarmdb` DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES ON ovalarmdb.* TO 'alarm'@'%' IDENTIFIED BY 'alarm';
GRANT ALL PRIVILEGES ON ovalarmdb.* TO 'alarm'@'localhost' IDENTIFIED BY 'alarm';

USE `ovalarmdb`;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `to_rec`;
create table to_rec
(
  rec_id bigint(20) NOT NULL AUTO_INCREMENT,
  task_num varchar(40) NOT NULL,
  caller_account varchar(40) not null, 
  caller_name varchar(40) not null,
  caller_phone varchar(20) not null,
  caller_address varchar(255),
  caller_desc varchar(1000),
  state varchar(20) NOT NULL DEFAULT '待办',
  next_role_id bigint(20) NOT NULL DEFAULT 0,
  next_role_name varchar(255) NOT NULL DEFAULT '',
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  primary key (rec_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `to_rec_act`;
create table  to_rec_act
(
 act_id bigint(20) NOT NULL AUTO_INCREMENT,
 rec_id bigint(20) NOT NULL,
 user_id bigint(20) NOT NULL,
 user_name varchar(255) NOT NULL,
 user_code varchar(255) NOT NULL,
 role_id bigint(20) NOT NULL,
 role_name varchar(255) NOT NULL,
 deal_type varchar(20) NOT NULL,
 deal_opinion varchar(1000),
 create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (act_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `to_rec_media`;
create table  to_rec_media
(
  media_id bigint(20) NOT NULL AUTO_INCREMENT,
  rec_id bigint(20) NOT NULL,
  media_type varchar(10) not null, 
  media_path  varchar(100) not null,
  screenshot_path varchar(100),
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  primary key (media_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `t_user`;
CREATE TABLE t_user (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  user_code varchar(255) NOT NULL DEFAULT '',
  user_name varchar(255) NOT NULL DEFAULT '',
  password varchar(255) NOT NULL DEFAULT '',
  phone varchar(20),
  is_delete TINYINT(1) NOT NULL DEFAULT 0,
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `t_user_token`;
CREATE TABLE `t_user_token` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `user_token` varbinary(100) DEFAULT NULL,
  `expire_time` datetime DEFAULT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  `role_desc` varchar(255) DEFAULT NULL,
  `is_delete` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `app_properties`;
CREATE TABLE `app_properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prop_name` varchar(100) NOT NULL DEFAULT '',
  `prop_value` varchar(1000) NOT NULL DEFAULT '',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `desc` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
