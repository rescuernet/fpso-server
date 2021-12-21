module.exports = {
  apps : [
      {
          name: "fpso-server",
          script: "startscript.js",
          watch: true,
          env: {
              "PORT": 5000,
              "NODE_ENV": "production",
              "CLIENT_URL":'http://new.samaraswimming.ru',
              'API_URL': 'http://api.samaraswimming.ru',
              'DB_URL': 'mongodb+srv://admin:admin@cluster0.qkb97.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
              'JWT_ACCESS_SECRET': 'access-Guzev-fpco-react+node+mongoDB',
              'JWT_REFRESH_SECRET': 'refresh-Guzev-fpco-react+node+mongoDB',
              'SMTP_HOST': "smtp.gmail.com",
              'SMTP_PORT': 587,
              'SMTP_USER': "samaraswimming@gmail.com",
              'SMTP_PASSWORD': 'ZUlu200201Om',
              'ADMIN_PATH_PREFIX': '/5070/admin',
              'LOGIN_PATH_PREFIX': '/5070/login'
          }
      }
  ]
}
