FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN apt-get update && apt-get -y install cron
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node

# Добавляем задачу cron для запуска скрипта каждый час
RUN echo "0 * * * * cd /usr/src/app && node gen.js >> /var/log/cron.log 2>&1" > /etc/cron.d/gen-cron

# Даем права на выполнение скрипта
RUN chmod 0644 /etc/cron.d/gen-cron

# Запускаем cron в фоновом режиме
CMD ["cron", "-f"]
# CMD ["node", "index.js"]


