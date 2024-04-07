CREATE TABLE IF NOT EXISTS admin_user(
    `id` int unsigned primary key auto_increment COMMENT 'ID',
    `create_date` int default 0 not null comment '创建时间',
    `username` varchar(20) default '' COMMENT '账号名',
    `nick` varchar(20) NOT NULL DEFAULT '' COMMENT '账号昵称',
    `password` varchar(500) not null COMMENT '账号密码',
    `access_level` tinyint(5) default 0 COMMENT '账号权限等级',
    `last_login_time` int(20) default 0 COMMENT '最后登录时间',
    `last_logout_time` int(20) default 0 COMMENT '最后登出时间',
    `is_delete` tinyint(5) default 0 COMMENT '账号是否被删除',
    `secret_key` varchar(100) default '' COMMENT 'secret key',
    `role` int(20) default 0 COMMENT '角色',
    UNIQUE key(`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员账号';

CREATE TABLE IF NOT EXISTS admin_roles(
    `id` int unsigned primary key auto_increment COMMENT 'ID',
    `name` varchar(20) default '' COMMENT '角色名',
    `menu_ids` varchar(2000) NOT NULL DEFAULT '' COMMENT '账号昵称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

CREATE TABLE IF NOT EXISTS admin_menu (
    `id` int unsigned primary key auto_increment COMMENT '菜单ID',
    `name` varchar(20) not null COMMENT '菜单名',
    `high` varchar(5000) not null COMMENT '高低权限',
    `view_name` varchar(50) not null COMMENT '菜单视图名',
    `menu_group` varchar(100) not NULL COMMENT '菜单组名',
    `weight` int(10) unsigned COMMENT '权重'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单表';

CREATE TABLE IF NOT EXISTS admin_opt_log (
    `id` int unsigned primary key auto_increment,
    `main_type` int unsigned not null default 0 COMMENT '大类 1系统配置 ',
    `log_type` int COMMENT '日志类型',
    `operator` varchar(100) COMMENT '操作员ID',
    `obj` int COMMENT '操作对象',
    `val` varchar(5000) COMMENT '操作数据',
    `timestamp` int COMMENT '操作时间',
    key `timestamp`(`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员操作记录';

CREATE TABLE IF NOT EXISTS sys_config (
    `key` varchar(50) PRIMARY KEY,
    `value` varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统配置';


insert into admin_user (`username`, `nick`, `password`, `role`) values
  ('admin', 'admin', '$2b$10$zbfOKTegBMdGciEWRPNu3O1CcTiRWsywgDwDuYgelJsixANFb0gAi', -1);

INSERT INTO `admin_menu` (`id`, `name`, `high`, `view_name`, `menu_group`, `weight`) VALUES (1, '员工管理', '1', '/system/user', '系统管理', 1001);
INSERT INTO `admin_menu` (`id`, `name`, `high`, `view_name`, `menu_group`, `weight`) VALUES (2, '角色管理', '0', '/system/role', '系统管理', 1002);
INSERT INTO `admin_menu` (`id`, `name`, `high`, `view_name`, `menu_group`, `weight`) VALUES (3, '菜单管理', '0', '/system/menu', '系统管理', 1003);
INSERT INTO `admin_menu` (`id`, `name`, `high`, `view_name`, `menu_group`, `weight`) VALUES (9, '参数设置', '0', '/sys_config/sys_config', '系统设置', 99001);
-- INSERT INTO `admin_menu` (`id`, `name`, `high`, `view_name`, `menu_group`, `weight`) VALUES (101, '首页', '1', '/home/home', '首页', 2001);

-- INSERT INTO `sys_config` (`key`, `value`) VALUES ('task_example', '1');

SET GLOBAL log_bin_trust_function_creators = 1;