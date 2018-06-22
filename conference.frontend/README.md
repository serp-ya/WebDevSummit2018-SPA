Клиентская часть приложения
===

## Установка
Клиентская часть приложения требует установленного `Node.js`. Проверить его наличие можно с помощью вызова консольной команды `node -v`. Если в консоль попадает ошибка, что `node не является внутренней командой`, значит, нужно всё таки скачать и установить с [официального сайта](https://nodejs.org/en/download/).

Далее, необходимо скачать репозиторий и в корне выполниить команду `node i` или `yarn install`, смотря, что вы используете. 

Yarn требует дополнительной установки! Если вы не знаете, что такое `yarn` - не расстраивайтесь, можно продолжать без него и использовать npm.

Начнётся установка необходимых зависимостей, появится папка `node_modules`, которая будет содержать всё необходимое для запуска проекта в режиме разработчика, автоматического обновления страницы при изменении файлов, автоматической компиляции проекта, обработкии css-файлов, поддержания синтаксиса `es6 import/export` и много чего другого.

После окончания установки проекта, в файле `package.json` появится список зависимостей:
```json
{
  "dependencies": {
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "react-router-dom": "^4.3.1",
    "react-scripts": "1.1.4"
  },
}
```

И список возможных команд:
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

Дело в том, что для комфортной разработки react-приложений, необходимо настраивать модульный сборщик, например `WebPack`, транспилятор `Babel` с определёнными лодерами, чтобы связать сборщик и транспилятор, и многое другое...

Чтобы этого избежать, разработчики React.js создали специальное приложение [Create React App (CRA)](https://github.com/facebook/create-react-app), позволяющее за 1 команду установить всё необходимое и заняться разработкой своего приложения.

Я тоже использую CRA, в проекте его устанавливать не надо, оно установится после команды `node i` или `yarn install`.

### Модули
Наше клиентское приложение было создано с помощью двух npm-пакетов:
1. create-react-app (CRA)
2. react-router-dom

#### CRA
Этот пакет используется для настройки необходимого окружения и ведения разработки react-приложения.

Для установки CRA отдельно от нашего приложения необходимо установить его глобально с помощью команды:
`npm i -g create-react-app` или `yarn global add create-react-app`

Далее, нужно выбрать директорию, где лежат ваши приложения, открыть в ней консоль и выполнить команду `create-react-app [my-app-name]`, где `[my-app-name]` - название новой директории под новое приложение.

Далее, в этой директории всё будет похоже на наше приложение.

#### react-router-dom
Этот пакет отвечает за работу роутинга внутри нашего приложения.

Устанавливается выполнением команды `npm i -S react-router-dom` или `yarn add react-router-dom` в корне нашего приложения (рядом с папкой `node_modules`).

#### `Примечание!`
```
Устанавливать перечисленные модули не требуется!
Чтобы они подтянулись в проект, достаточно выполнить `npm i` или `yarn install`
```

### Структура приложения
Для более удобного развития проекта, приложение разбито на следующую структуру:
```
conference.frontend
├── README.md
├── package.json
├── src
│   └── index.js
│   └── index.css
│   └── App.js
│   └── App.css
│   └── apiConfig.js
│   └── logo.svg
│   └── components
│       └── MainPage
│       │   └── index.js
│       └── NewsAdd
│       │   └── index.js
│       └── NewsCard
│       │   └── index.js
│       └── NewsList
│       │   └── index.js
│       └── NewsPage
│       │   └── index.js
│       └── UserCard
│       │   └── index.js
│       └── UserList
│           └── index.js
└── public
     └── index.html
     └── favicon.ico
     └── manifest.json
```

Папка src - в ней содержатся все исходники приложения. Это все js-компоненты, css-стили этих компонентов, svg фалы и изображения.

Папка public - в ней можно хранить общие для всего приложения css стили, дополнительные изображения и обязательно файл index.html, который является точкой входа в приложение.

Напомню, у нас Single Page Application, поэтому больше одного html файла нам не понадобится.

Внутри папки components лежат поддиректории, внутри которых всего 1 файл `index.js`. Это сделано для более удобного подключения этих компонентов внутри других компонентов. При использовании команды `import` без указания конкретного файла в той или иной директории, подключается `index.js`.

### Начало нашего приложения
После установки нужных модулей, мы можем его запустить! Для этого в корне приложения надо выполнить команду в консоли `npm start` или `yarn start`. После этого запустится локальный сервер, который будет слушать порт 3000. Если этот порт занят, то консоль спросит разрешения использовать другой порт.

После этого, мы можем в адресной строке браузера набрать `http://localhost:3000` и откроется наше приложение.

Входной точкой в само приложение является файл `./src/index.js`, система `CRA` настроена таким образом, то по умолчанию она смотрит именно на него.

В нём происходит буквально следующее:
+ [Импортируются React, ReactDOM, корневой компонент (App.js), общий файл со стилями](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/index.js#L1-L4)
+ [Вызывается метод ReactDOM.render()](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/index.js#L6), в который мы передаём наш корневой компонент и элемент, найденный по ID 'root'

#### `Примечание!`
```
Библиотека React.js не умеет рисовать ничего на странице.
Основная задача библиотеки - создавать виртуальное DOM-дерево 
и ОЧЕНЬ быстро вносить в него изменения!

За создание и изменение элементов в браузере отвечает библиотека ReactDOM
```

### Корневой компонент App.js
Так уж сложилось, что по своей структуре каждое react-приложение должно быть обёрнуто внутри общего предка, создают корневой элемент. В этот элемент обычно принято импортировать компоненты приложения [(MainPage, NewsList, NewsPage, NewsAdd, UsersList)](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L7-L12), дополнительные модули, отвечающие за [роутинг](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L2-L3), [работу с API](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L5) или за хранение данных в приложении, например, популярный Redux.

Мы не использовали библиотеку Redux по одной простой причине - это бы сильно усложнило наше приложение, с точки зрения восприятия новичков, поэтому все данные приложения будут храниться в состоянии корневого компонента.

#### Что такое react-компонент?
Любой react-компонент это либо функция, либо класс, возвращающий react-элементы, либо null...

Если вы первый раз рассматриваете react-приложение, вас может ужаснуть, почему мы пишем html-код внутри js файла! Но мы вспомним, что мы подключали сборщик и транспилятор, который превратит это в обычный js-код.

Синтаксис, на котором пишут react-приложения, называется [JSX](https://reactjs.org/docs/introducing-jsx.html).

Каждый наш компонент - это либо функция ([MainPage](./src/components/MainPage/index.js), [NewsCard](./src/components/NewsCard/index.js), [NewsPage](./src/components/NewsPage/index.js), [UserCard](./src/components/UserCard/index.js)), либо класс ([App](./src/App.js), [NewsAdd](./src/components/NewsAdd/index.js), [NewsList](./src/components/NewsList/index.js), [UsersList](./src/components/UsersList/index.js)).

Отличаются они только тем, что компонент на основе класса может хранить в себе состояние и содержать больше логики. Ну и, естественно, синтаксисом написания. Оба вида этих компонентов обязаны возвращать JSX код (или null), но функциональные компоненты делают это с помощью `return`, как обычные функции, а компоненты на основе классов внутри метода `render()`.

#### `Примечание!`
```
Метод render() вызывается каждый раз, когда вызывается метод this.setState()
что заставляет компонент перерисовываться!

Будьте с этим аккуратнее и не допускайте бесконечных циклов перерисовки!
```

Отходим от теории react и вернёмся к нашему корневому компоненту.

Как видно в конструкторе, мы [создаём два поля](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L22-L23) в `this.state`. Это нужно для `хранения данных` и `меморизации`. 

Наш компонент содержит следующие методы:
+ loadNews - делает запрос к нашему API и сохраняет новости в this.state.newsList.
+ loadUsers - делает запрос к нашему API и сохраняет данные пользователей в this.state.usersList.
+ renderSingleNews - является, по-сути, [функцией высшего порядка](https://ru.wikipedia.org/wiki/%D0%A4%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F_%D0%B2%D1%8B%D1%81%D1%88%D0%B5%D0%B3%D0%BE_%D0%BF%D0%BE%D1%80%D1%8F%D0%B4%D0%BA%D0%B0), которая получает поле `match`, где находится `id` просматриваемой новости, и возвращает компонент `NewsPage`, куда передаёт данные этой новости. Участвует в роутинге.
+ addNewsCallback - чтобы не делать дополнительный запрос на сервер, этот метод добавит в хранилище добавленную новость из компонента `NewsAdd`. 
+ deleteNewsHandler - метод, который делает запрос на сервер, чтобы удалить новость по её id и удаляет эту новость из локального хранилища (this.state.newsList).

В методе render мы [получаем два списка](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L91) с данными с помощью деструктуризации `this.state` и возвращаем html-разметку приложения, где есть [хедер](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L95-L97) и происходит [настройка роутинга](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L99-L131).

Внутри настроек роутинга необходимо поместить [компоненты внутренних ссылок](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L99-L131) и сами [роуты](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L110-L126).

Роуты будут "срабатывать" в зависимости от изменения URL в приложении и показывать на странице тот или иной компонент, в зависимости от настройке.

Всего в приложении настроено 5 роутов:
1. [Главная страница](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L110-L112) - компонент `MainPage `. Отображается "как есть".
2. [Список пользователей](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L114-L116) - при отображении загружает список пользователей с сервера, если переданный список пуст.
3. [Список новостей](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L118-L120) - работает аналогично со списком пользователей, умеет удалять новости.
4. [Добавление новой новости](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L122-L124) - добавляет новость на сервер. При успешном ответе сервера, добавляет новую новость в локальный список.
5. [Чтение новости](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/App.js#L126) - смотрит на id в строке запроса и отображает нужную новость из списка

#### Компонент MainPage
Функциональный компонент, ничего не принимает и возвращает статичную html-разметку

#### Компонент NewsCard
Функциональный компонент, принимает данные новости - id, title, author и функцию удаления статьи deleteNewsHandler.
Так же, позволяет [перейти к чтению статьи](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsCard/index.js#L9)

#### Компонент NewsPage
Функциональный компонент, принимает данные новости в поле props.newsData - title, author, text. Возвращает разметку новости.

#### Компонент UserCard
Функциональный компонент, принимает данные пользователя - login, name, password. Возвращает разметку записи о пользователе.

#### Компонент NewsList
Компонент на основе класса. Перед тем, как отрисовать компонент, проверяет, был ли передан список с новостями. Если нет - [вызывает функцию загрузки новостей](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsList/index.js#L9-L13) из родительского компонента. Эта функция изменит состояние родителя, что заставит компонент перерисовать себя.

В методе `render()` компонента мы [получаем список новостей и переданную функцию удаления новостей](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsList/index.js#L16). [Добавляем ссылку на добавление новости](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsList/index.js#L19-L21) после чего делаем проверку, если у [нас нет списка новостей](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/50ddb324643616c13756fddecdcb32cba99c7313/conference.frontend/src/components/NewsList/index.js#L25), то компонент возвращает `null`, чтобы ничего не отрисовать, если список есть, то [генерируем массив из компонентов](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsList/index.js#L25-L27) `NewsCard` с данными каждой статьи.

#### Компонент NewsAdd
Контролируемый компонент на основе класса. Компонент добавления новостей. В конструкторе создаётся `this.state` со следующими полями:
+ title - заголовок добавляемой новости
+ author - автор добавляемой новости
+ text - текст добавляемой новости
+ messages - текст возможных сообщений
+ error - текст возможных ошибок

Почему "Контролируемый компонент"? Этот компонент генерирует html-форму. При изменении значений в любом из полей формы, происходит изменение состояния компонента и его перерисовка. Поэтому, все значения из полей ввода хранятся в `this.state`. Это удобно для дальнейшей обработки данных.

Компонент содержит методы:
+ onChangeHandler - обрабатывает изменения в полях ввода, принимает один аргумент - объект события, [извлекает из него](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L19) поля `name` и `value`, в которых будет содержаться имя изменяемого поля и его значение, и [сохраняет значение в локальном состоянии](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L20).
+ onSubmitHandler - обрабатывает событие `submit` формы, [прерывает действие по умолчанию](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L24) [извлекает данные](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L26) из `this.state`, [получает метод](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L27) добавления статей в список предка и делает [проверку полей на наполненость](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L29-L31). Если значение [хотя бы одного из полей имеет длину 0](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L29), то [прерывает выполнение обработчика события и помещает в локальный стейт текст об ошибке](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L30), который будет выведен на страницу. Если ошибки нет, [создаёт URL](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L33) для обращения к серверу, куда помещает данные в query-параметры и [делает запрос к серверу](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L35) с методом `POST`. Если сервер ответил статусом, [отличным от 200-299](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L39-L41), то выкидывает ошибку. Если ошибки нет, то полученные данные [преобразует в js-объект](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L43) и передаёт дальше по цепочке. Если всё хорошо, [вызывается метод предка](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L46), для добавления новой статьи в локальный стейт и [очищает данные формы](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L46) из своего стейта и [помещает туда сообщение](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L51) об успешном добавлении. Если же вдруг возникла ошибка, [добавляет текст ошибки](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L57) в соответствующее поле стейта.

Получилось объёмно по последнему методу (есть смысл разбить его на несколько мелких методов).

В методе `render()` мы сперва [извлекаем данные стейта](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L62) для дальнейшего их рендеринга. Элементу формы [назначаем обработчик](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L65) события `submit`, [делаем проверку](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L67) переменной `messages`, если она не пуста - [выводим сообщение](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L68-L70). Аналогично с [ошибками](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L73-L77). Далее мы [создаём поля ввода](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L80-L111), где [назначаем им обработчик события ввода](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L86) и [задаём значение из стейта](https://github.com/serp-ya/WebDevSummit2018-SPA/blob/master/conference.frontend/src/components/NewsAdd/index.js#L87).

#### Компонент UsersList
Компонент на основе класса. Не имеет локального стейта или методов. Сделан именно на основе класса из-за необходимости работы с методом `componentDidMount`. Работает по аналогии с компонентом `NewsList`.

### Вывод
Как вы заметили, синтаксис JSX позволяет с лёгкостью шаблонизировать данные и насыщать логикой компоненты наших приложений. Сама библиотека react.js позволяет нам с лёгкостью следить за изменениями в приложении. 

Обращаю ваше внимание, если компонент необходимо перерисовывать, то реакт делает это с умом. 

Он не переобходит все компоненты с целью поиска изменений - он работает по паттерну `Observer` (Наблюдатель), что экономит ресурсы. 

Он не рисует с нуля приложение каждый раз, он вносит изменения только там, где это необходимо! Это тоже экономит ресурсы.

При этом, react.js позволяет создавать действительно сложные приложения и с лёгкостью их контролировать! 

Не обязательно это должно приложение с множеством роутов, часто встречается, что на реакте пишут только какую-то особо сложную часть одной страницы сайта.

### Практика
Если вас впечатлило происходящее - предлагаю попрактиковаться. Сейчас есть возможность добавлять/удалять новости, но нет возможности делать то же самое с пользователями, хотя сервер это уже умеет!

Предлагаю возможность попрактиковаться и наделить такой функциональностью фронтенд по аналогии со списком новостей!

### Практика посложнее
Если первая задача далась с лёгкостью, можно добавить несколько новых сущностей в наше хранилище данных и научить наш Фронтенд их обрабатывать!

### Деплой
Чтобы выгрузить наше приложение в свет, в CRA есть специальная функция, она описана в `package.json`.

Всё, что у нас есть сейчас - это приложение в режиме разработки. Чтобы сделать версию для продакшна, достаточно в корне приложения выполнить команду в консоли `npm build`.

Если в приложении нет ошибок, то будет в корне приложения будет создана директория `build`. Все файлы этой директории можно разместить на своём сервере и приложение будет работать!