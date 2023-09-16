"use strict";

const userForm = new UserForm();

// Функция обратного вызова для входа в личный кабинет
userForm.loginFormCallback = (data) => {
  // Вызываем метод для отправки данных на сервер и обработки результата
  ApiConnector.login(data, response => {
    if (response.success) {
      // Если успешно, перезагружаем страницу
      location.reload();
    } else {
      // Если есть ошибка, устанавливаем сообщение об ошибке
      userForm.setLoginErrorMessage(response.error);
    };
  });
};

// Функция обратного вызова для регистрации
userForm.registerFormCallBack = (data) => {
  ApiConnector.register(data, response => {
    if (response.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(response.error);
    };
  });
};