module.exports = {
  apps: [{
    name: 'kgi-trader-api',
    script: 'npm run start',
    cwd: "D:\\App\\Trade-Api",
    error_file: "D:\\Logs\\Trade-Api\\pm2\\pm2-err.log",
    out_file: "D:\\Logs\\Trade-Api\\pm2\\pm2-info.log",
    log_date_format: 'DD/MMM/YYYY:HH:mm:ss'
  }]
}

