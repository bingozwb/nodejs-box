create table if not exists `app_user` (
    `id` varchar(100) comment 'ID' primary key,
    `create_date` int default 0 not null comment '创建时间',
    `status` int default 0 not null comment '状态',
    `parent_id` int unsigned not null COMMENT '上级ID',
    `parent_username` varchar(20) default '' COMMENT '上级账号名',
    `inviter_code` varchar(100) not null comment '邀请码',
    `note` varchar(255) comment '备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户';
