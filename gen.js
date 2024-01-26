const axios = require('axios');
const fs = require('fs');

// Загрузка данных из JSON-файла
const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// URL для отправки запросов
const apiUrl = 'https://bot.jaicp.com/chatapi/FZWSBqfV:68932bef32cca3534102fc03717456d948216edd';

// Функция для отправки запроса
async function sendRequest(data) {
  try {
    await axios.post(apiUrl, data);
    console.log('Запрос успешно отправлен:', data);
  } catch (error) {
    console.error('Ошибка при отправке запроса:', error);
  }
}

// Генерация случайных индексов для выбора данных из JSON
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

// Отправка случайных запросов
const numberOfRequests = getRandomIndex(50); // Количество запросов, которое нужно отправить

for (let i = 0; i < numberOfRequests; i++) {
  const randomClientId = "client-"+getRandomIndex(100);
  const randomClientName = jsonData.name[getRandomIndex(jsonData.name.length)];
  var randomText = Array;
  randomText[1] = jsonData.text[getRandomIndex(jsonData.text.length)];
  randomText[2] = jsonData.text[getRandomIndex(jsonData.text.length)];
  randomText[3] = jsonData.text[getRandomIndex(jsonData.text.length)];
  
  var randomData = {"query":randomText[1], "clientId":randomClientId, clientInfo:{"firstName": randomClientName}};  
  sendRequest(randomData);
  var randomData = {"query":randomText[2], "clientId":randomClientId, clientInfo:{"firstName": randomClientName}};  
  sendRequest(randomData);
  var randomData = {"query":randomText[3], "clientId":randomClientId, clientInfo:{"firstName": randomClientName}};  
  sendRequest(randomData);    
}
