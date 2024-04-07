SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for scan_config
-- ----------------------------
DROP TABLE IF EXISTS `scan_config`;
CREATE TABLE `scan_config`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `contract_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '合约名称',
  `contract_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '合约地址',
  `from_block` bigint UNSIGNED NULL DEFAULT NULL COMMENT '起始区块',
  `status` int NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uni_address`(`contract_name`,`contract_address`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 0 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of scan_config
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
