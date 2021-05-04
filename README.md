# Инструкции по запуску

1. Склонировать этот репозиторий
2. Установить и запустить Postgresql, создать базу данных
3. Запустить АПИ
   1. Переименовать **example.env** в **.env** и внести значения переменных для подключения к базе данных
   2. Выполнить **npm install**
   3. Выполнить **npm start**
4. Запустить фронтенд апликейшн
   1. Выполнить **yarn install**
   2. Выполнить **yarn run start**
5. Открыть в браузере **http://localhost:3000**

P.S. В корне репозитория находится пример файла с фильмами, который можно использовать для импорта фильмов в систему (**films_data.txt**)

# Архитектура

## Backend приложение

Для реализации АПИ было исползовано **Nest.js** фреймворк. Для работы с базой данных использовалась **TypeORM**.

Приложение состоит из 3 основных слоев:

- Контроллеры
- Сервисы
- Репозитории

Контроллеры - используются для валидации входных параметров (с помощью применения **ValidationPipe**) и вызова соответствующих методов сервисов.

Сервисы - содержат бизнес логику, интегрируют различные репозитории. Например, метод для добавления нескольких фильмов сначала вызывает метод репозитория для добавления фильмов, потом вызывает метод другого репозитория для добавления новых уникальных актёров, которые снимались в заданных фильмах, а потом вызывает метод для связывания актёров и фильмов.

Репозитории - классы, в которых реализованы методы для работы с базой данных.

Сервисы и Репозитории при возникновении исключений генерируют ошибки, которые не связаны с http протоколом, затем эти ошибки перехватываются с помощью **CustomExceptionFilter** который мапит внутренние виды ошибок на исключения связанные с http протоколом.

Приложение имеет базовое покрытие unit тестами. Для покрытия тестами использовались: **mocha**, **chai**, **sinon**.

## Frontend приложение

Реализовано с помощью **React**.

Макет релизован в **MainLayout** компоненте. Он содержит хедер, футер и основной блок, в котом с помощью роутинга рендерится нужная страница.

Для каждой страницы приложения создана соответствующая компонента в папке **pages**. Те компоненты, которые используются только на определенных страницах вложены в соответствующие директории.
