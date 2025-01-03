module.exports = {
  apps: [{
      name: 'kgi-trader-api-dev',
      script: '$npm16 run start',
      cwd: "/opt/nodejs/dev/kgi-trader-api/",
      env: {
          "NODE_ENV": "development",
      },
      error_file: "/var/log/rjah/node-js-log/dev/kgi-trader-api/logs/pm2/pm2-err.log",
      out_file: "/var/log/rjah/node-js-log/dev/kgi-trader-api/logs/pm2/pm2-info.log",
      log_date_format: 'DD/MMM/YYYY:HH:mm:ss'
  }]
}
