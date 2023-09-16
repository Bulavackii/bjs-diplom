"use strict";

const userFormAuth = new UserForm();

// Функция обратного вызова для входа в личный кабинет
userFormAuth.loginFormCallback = (data) => {
  // Вызываем метод для отправки данных на сервер и обработки результата
  ApiConnector.login(data, response => {
    if (response.success) {
      // Если успешно, перезагружаем страницу
      location.reload();
    } else {
      // Если есть ошибка, устанавливаем сообщение об ошибке
      userFormAuth.setLoginErrorMessage(response.error);
    };
  });
};

// Функция обратного вызова для регистрации
userFormAuth.registerFormCallBack = (data) => {
  ApiConnector.register(data, response => {
    if (response.success) {
      location.reload();
    } else {
      userFormAuth.setRegisterErrorMessage(response.error);
    };
  });
};