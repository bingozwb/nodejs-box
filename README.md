# xxx-admin

nodejs project

### install nodejs

[Node.js](https://nodejs.org/en/)

### install pkg

```shell script
$ npm install
```

### edit config

use chain name `xxx` to separate different config
- application config    
`.env.xxx.js`
- pm2 config    
`pm2_xxx.config.js`
- contract event scanning config    
`sql/scan_config_xxx.sql`

### generate tables of contract's event by `abi/abi.json`

```shell
$ chain=xxx node script/genTable.js
```

### import sql to db

```shell
mysql> source /path/to/sql/admin.sql;
mysql> source /path/to/sql/app.sql;
mysql> source /path/to/sql/event.sql;
mysql> source /path/to/sql/scan_config_xxx.sql;
```

### start with pm2
```shell
$ pm2 start pm2_xxx.config.js
```

### project structure

```
├── abi                    # contract abi
│   └── abi.json
├── admin                  # admin_system api
├── app                    # web api
├── common                 # common service & constants
│   └── constants.js
├── config                 # config files
├── script
├── sql                    # sql files
├── task                   # schedule jobs
│   └── scanEventAuto.js     # contract event scanning job
├── test
├── utils
├── README.md
├── admin.js               # admin_system entry file
├── app.js                 # web entry file
├── package.json
├── pm2_example.config.js
└── task.js                # schedule jobs entry file
```