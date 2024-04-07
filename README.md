# xxx-admin

nodejs project

### install nodejs

[Node.js](https://nodejs.org/en/)

### install pkg

```shell script
$ npm install
```

### generate tables of contract event by `abi/abi.json`

```shell
$ node utils/genTable.js
```

### edit config

- application config    
`.env.xxx.js`
- pm2 config    
`pm2_xxx.config.js`
- contract event scanning config    
`scan_config_xxx.sql`

### import sql to db

```shell
mysql> source /path/to/sql/xxx.sql;
```

### start server by pm2
```shell
$ pm2 start pm2_xxx.config.js
```

