/*
 Navicat Premium Data Transfer

 Source Server         : 43.229.77.39-asiamall_parts-newvios2522
 Source Server Type    : MySQL
 Source Server Version : 50531
 Source Host           : 43.229.77.39:3306
 Source Schema         : asiamall_tmallgenprice

 Target Server Type    : MySQL
 Target Server Version : 50531
 File Encoding         : 65001

 Date: 11/03/2018 11:03:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for RequestPrice
-- ----------------------------
DROP TABLE IF EXISTS `RequestPrice`;
CREATE TABLE `RequestPrice`  (
  `RequestNo` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `SKU` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Product_URL` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Status` varchar(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT 'N',
  PRIMARY KEY (`RequestNo`, `SKU`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for ResponsePrice
-- ----------------------------
DROP TABLE IF EXISTS `ResponsePrice`;
CREATE TABLE `ResponsePrice`  (
  `ResponseNo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ItemsNo` int(10) UNSIGNED NOT NULL,
  `ids` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Names` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Pvs` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `SkuId` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Stock` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Price` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `sprice0` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `sprice1` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `sprice2` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `sprice3` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `sprice4` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `Url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `status` varchar(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT '0',
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `RequestNo` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ResponseNo`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of ResponsePrice
-- ----------------------------
INSERT INTO `ResponsePrice` VALUES (1, 1, '552707713024', '哈罗闪宝宝洗发沐浴二合一500ml婴儿洗护洗发沐浴露二合一', '-', '-', '0', '149.00', '149.00', '99.00', '0', '0', NULL, 'https://world.tmall.com/item/552707713024.htm?id=552707713024&areaId=440100&user_id=725677994&cat_id=50034774&is_b=1&rn=68527d322c09f29973cd043595122a6e', '0', '2018-03-11 09:59:25', '2018-03-11 09:59:25', '552707713024');

SET FOREIGN_KEY_CHECKS = 1;
