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