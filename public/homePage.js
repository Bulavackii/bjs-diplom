"use strict";

// Создаем объект кнопки выхода из личного кабинета
const logoutButton = new LogoutButton();

// Устанавливаем обработчик события для кнопки выхода
logoutButton.action = () => {
  // Выполняем запрос на сервер для выхода из личного кабинета и обработки результата
  ApiConnector.logout((response) => {
    if (response.success) {
      // Если выход выполнен успешно, перезагружаем страницу
      location.reload();
    }
  });
};

// Получение информации о текущем пользователе
ApiConnector.current((response) => {
    if (response.success) {
      // Отображаем профиль пользователя на странице
      ProfileWidget.showProfile(response.data);
    }
  });

  // Создаем объект для отображения текущих курсов валюты
const ratesBoard = new RatesBoard();

// Функция для обновления данных о курсах валют
const repeatGetStocks = () => {
    ApiConnector.getStocks((response) => {
      if (response.success) {
        // Очищаем и заполняем таблицу с курсами валют
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
      }
    });
  };

  // Выполняем первичное получение данных о курсах и устанавливаем периодическое обновление каждые 60 секунд
repeatGetStocks();
setInterval(repeatGetStocks, 60000);

// Создаем объект для выполнения операций с деньгами пользователя
const moneyManager = new MoneyManager();

// Устанавливаем обработчик для пополнения баланса
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
      if (response.success) {
        // Отображаем обновленный профиль пользователя
        ProfileWidget.showProfile(response.data);
        // Устанавливаем сообщение об успешном пополнении баланса
        moneyManager.setMessage(response.success, "Баланс кошелька пополнен");
      } else {
        // Устанавливаем сообщение об ошибке
        moneyManager.setMessage(response.success, response.error);
      }
    });
  };

  // Устанавливаем обработчик для конвертации валюты
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Конвертация выполнена");
      } else {
        moneyManager.setMessage(response.success, response.error);
      }
    });
  };