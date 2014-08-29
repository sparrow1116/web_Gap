/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : goodsinshops

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2014-08-29 17:40:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `firstshop`
-- ----------------------------
DROP TABLE IF EXISTS `firstshop`;
CREATE TABLE `firstshop` (
  `id` bigint(20) NOT NULL DEFAULT '0',
  `name` tinytext,
  `price` tinytext,
  `discription` tinytext,
  `available` int(11) DEFAULT NULL,
  `recommend` int(11) DEFAULT NULL,
  `url` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of firstshop
-- ----------------------------
INSERT INTO `firstshop` VALUES ('0', '海藻寿司', '11', '不详', '1', '1', 'img/test1.png');
INSERT INTO `firstshop` VALUES ('1', '鳗鱼寿司', '11', '不详', '1', '2', 'img/tt1.png');
INSERT INTO `firstshop` VALUES ('2', '辣味小八爪', '12', '不详', '1', '3', 'img/d1.png');
INSERT INTO `firstshop` VALUES ('3', '泡菜寿司', '10', '不详', '1', '4', 'img/test2.png');
INSERT INTO `firstshop` VALUES ('4', '三文鱼寿司', '13', '不详', '1', '5', 'img/tt2.png');
INSERT INTO `firstshop` VALUES ('5', '烤鳗寿司', '11', '不详', '1', '6', 'img/d2.png');
INSERT INTO `firstshop` VALUES ('6', '烟熏烤鸭肉', '11', '不详', '1', '-1', 'img/test1.png');
INSERT INTO `firstshop` VALUES ('7', '玉米沙拉', '10', '不详', '1', '-1', 'img/tt1.png');
INSERT INTO `firstshop` VALUES ('8', '鱿KISS', '11', '不详', '1', '-2', 'img/d1.png');
INSERT INTO `firstshop` VALUES ('9', '玉子烧', '10', '不详', '1', '-3', 'img/d2.png');

-- ----------------------------
-- Table structure for `userinfo`
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` bigint(20) NOT NULL DEFAULT '0',
  `name` tinytext,
  `shopname` tinytext,
  `buynum` bigint(20) DEFAULT NULL,
  `sellnum` bigint(20) DEFAULT NULL,
  `password` tinytext,
  `ismerchant` int(11) DEFAULT NULL,
  `successbuynum` bigint(20) DEFAULT NULL,
  `tel` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
