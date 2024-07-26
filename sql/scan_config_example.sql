SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for scan_config
-- ----------------------------
CREATE TABLE IF NOT EXISTS `scan_config` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chain_id` INT UNSIGNED DEFAULT 0 NOT NULL COMMENT '链ID',
  `contract_name` VARCHAR(255) NOT NULL COMMENT '合约名称',
  `contract_address` VARCHAR(255) NOT NULL COMMENT '合约地址',
  `from_block` BIGINT UNSIGNED DEFAULT NULL COMMENT '起始区块',
  `status` INT DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni_address` (`chain_id`, `contract_name`, `contract_address`)
) ENGINE=InnoDB AUTO_INCREMENT=0;

-- ----------------------------
-- Records of scan_config
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
