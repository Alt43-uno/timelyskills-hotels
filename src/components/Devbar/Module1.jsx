import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Создать компонент <code>HomePage</code>',
  'Добавить <code>HomePage</code> в <code>App</code>',
  'Создать компонент <code>ListingList</code>',
  'Создать компонент <code>ListingCard</code>',
  'Обновить <code>ListingList</code> с помощью <code>ListingCard</code>',
  'Обновить <code>HomePage</code> с помощью <code>ListingList</code>',
];

export const Intro = () => {
  return (
    <div>
      <h2>Модуль 1 – Основы React</h2>
      <Separator className='mb-2' />
      <p>
        В этом модуле мы отправимся в увлекательное путешествие в мир React.
        Мы будем создавать собственную платформу для размещения объявлений,
        похожую на Booking.com и Airbnb, и реализуем большинство их основных функций.
      </p>
      <p>
        В нашем приложении будут объявления, которые пользователи смогут просматривать,
        фильтровать по доступности, указывать количество гостей, добавлять в избранное и многое другое.
        Мы начнем с малого и будем постепенно увеличивать сложность нашего приложения по мере прохождения модулей.
      </p>
      <h3>Описание</h3>
      <Separator className='mb-2' />
      <p>
        Цель этого модуля — изучить основы React и заложить фундамент для нашего приложения.
        Мы будем работать с компонентами, JSX, условным рендерингом, итерацией и пропсами.
      </p>
      <p>
        Мы начнем с создания домашней страницы, которая будет отображать статический список объявлений.
        Мы создадим несколько компонентов, которые помогут нам отображать эти объявления,
        и настроим их для повторного использования. Также мы научимся
        использовать некоторые компоненты из папки <code>src/components/ui</code>, чтобы упростить задачу.
      </p>
      <h3>Задачи</h3>
      <Separator className='mb-2' />
      <ul>
        {tasks.map((task) => (
          <li key={task} dangerouslySetInnerHTML={{ __html: task }} />
        ))}
      </ul>
    </div>
  );
};

const homePageCode = `const HomePage = () => {
  return <div className='container py-4'>Hello World!</div>;
};

export default HomePage;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>HomePage</code>
      </h2>
      <p>
        Давайте начнём с создания домашней страницы. Эта страница важна, потому что
        это первая страница, на которую пользователи попадают, когда они посещают наше приложение.
        Для этого нам нужно создать наш первый компонент страницы,{' '}
        <code>HomePage</code>.
      </p>
      <p>
        Компоненты страниц размещаются в директории <code>src/pages</code>. Здесь
        будут находиться все наши страницы. Компонент <code>HomePage</code> будет
        отвечать за отображение списка объявлений, но на данный момент он будет просто
        рендерить простой <code>div</code> с некоторыми стилями и сообщением "Hello World!".
      </p>
      <p>
        Мы применим некоторые базовые стили к нашему компоненту, такие как класс{' '}
        <code>container</code> и немного отступов. По мере прохождения курса
        мы захотим применять эти стили ко всем компонентам страниц, которые
        мы создаём, чтобы обеспечить единообразный интерфейс в нашем приложении.
      </p>
      <p>
        Нам нужно создать новый файл в директории <code>src/pages</code>{' '}
        с именем <code>HomePage.jsx</code> и следующим кодом:
      </p>
      <CodeHighlighter title='src/pages/HomePage.jsx'>
        {homePageCode}
      </CodeHighlighter>
    </div>
  );
};


const appWithHomePageCode = `import Devbar from '@/components/Devbar/Devbar';
import HomePage from '@/pages/HomePage';

const App = () => {
  return (
    <>
      <div className='fixed bottom-0 left-0 top-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
        <HomePage />
      </div>
    </>
  );
};

export default App;`;

export const Step2 = () => {
  return (
    <div>
      <h2>
        Добавление <code>HomePage</code> в <code>App</code>
      </h2>
      <p>
        Теперь, когда у нас есть компонент <code>HomePage</code>, нам нужно
        добавить его в наш компонент <code>App</code>. Это основной компонент,
        который рендерится, когда загружается наше приложение. В настоящее время
        это корень нашего приложения, и здесь также находится компонент
        <code>Devbar</code>.
      </p>
      <p>
        Нам нужно будет импортировать <code>HomePage</code> и добавить его в
        компонент <code>App</code> внутри <code>div</code> с классом{' '}
        <code>ml-[700px]</code>. Это обеспечит видимость компонента
        <code>Devbar</code> на левой стороне экрана,
        а также отобразит содержимое справа.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>App</code> следующим кодом:
      </p>
      <CodeHighlighter highlightedLines={[2, 11]} title='src/App.jsx'>
        {appWithHomePageCode}
      </CodeHighlighter>
    </div>
  );
};


const listingListCode = `const ListingList = () => {
  return <div>Listings go here!</div>;
};

export default ListingList;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingList</code>
      </h2>
      <p>
        Теперь давайте создадим наш второй компонент, <code>ListingList</code>. Этот
        компонент будет отвечать за отображение списка объявлений. Это
        те объявления, которые наши пользователи могут просматривать. На данный момент,
        поскольку у нас нет никаких объявлений для показа, мы просто
        отобразим простое сообщение "Объявления будут здесь!" в нашем компоненте.
      </p>
      <p>
        <code>ListingList</code> — это то, что мы называем компонентом функциональности.
        Он будет обрабатывать функциональность отображения наших объявлений. Поскольку это
        компонент функциональности, он будет находиться в корне папки{' '}
        <code>src/components</code>, рядом со всеми нашими UI-компонентами в папке
        <code>ui</code>.
      </p>
      <p>
        Нам нужно создать новый файл в директории <code>src/components</code>{' '}
        с именем <code>ListingList.jsx</code> и следующим кодом:
      </p>
      <CodeHighlighter title='src/components/ListingList.jsx'>
        {listingListCode}
      </CodeHighlighter>
    </div>
  );
};


const listingCardCode = `import { Card, CardContent } from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingCard = ({ listing }) => {
  return (
    <Card className='w-[320px]'>
      <img
        className='h-[200px] w-full rounded-md object-cover'
        src={getImageUrl(listing.images[0])}
        alt={listing.name}
      />
      <CardContent className='p-4'>
        <h2 className='mb-0 text-xl font-semibold'>{listing.name}</h2>
      </CardContent>
    </Card>
  );
};

export default ListingCard;`;

export const Step4 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingCard</code>
      </h2>
      <p>
        Давайте создадим наш третий компонент, <code>ListingCard</code>. Этот
        компонент будет отвечать за отображение одного объявления. Здесь мы
        будем импортировать и использовать некоторые компоненты из папки{' '}
        <code>src/components/ui</code>, чтобы упростить нашу задачу.
      </p>
      <p>
        Этот компонент также будет компонентом функциональности, что означает, что он
        также будет находиться в корне папки <code>src/components</code>,
        рядом с компонентом <code>ListingList</code>, который мы создали на
        предыдущем шаге.
      </p>
      <p>
        Это также первый компонент, который должен принимать некоторые
        свойства. Поскольку мы собираемся отображать одно объявление, нам нужно
        чтобы этот компонент получил <code>listing</code> в качестве свойства. Мы
        сможем использовать это <code>listing</code> в этом компоненте для
        отображения основного изображения и названия объявления.
      </p>
      <p>
        Для изображения мы будем использовать функцию <code>getImageUrl</code>
        из утилиты изображений в папке <code>src/utils</code>. Эта
        функция предоставит нам URL для изображения, который мы можем использовать
        для его отображения. У каждого объявления есть несколько изображений, но на
        данный момент мы будем использовать только первое изображение. Позже мы
        обновим это, чтобы добавить слайдер изображений со всеми изображениями.
      </p>
      <p>
        Нам нужно создать новый файл в директории <code>src/components</code>{' '}
        с именем <code>ListingCard.jsx</code> и следующим кодом:
      </p>
      <CodeHighlighter title='src/components/ListingCard.jsx'>
        {listingCardCode}
      </CodeHighlighter>
    </div>
  );
};


export const listingListWithListingCardCode = `import ListingCard from '@/components/ListingCard';

const ListingList = ({ listings }) => {
  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      ) : (
        <p>No listings found.</p>
      )}
    </div>
  );
};

export default ListingList;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Обновление <code>ListingList</code> с помощью <code>ListingCard</code>
      </h2>
      <p>
        Отлично! Теперь, когда у нас есть все необходимые компоненты, давайте объединим
        их и отобразим! Первое, что нам нужно сделать, это заменить сообщение
        "Объявления будут здесь!" в компоненте <code>ListingList</code> на компонент
        <code>ListingCard</code>, который мы только что создали.
      </p>
      <p>
        Для этого нам понадобятся некоторые <code>listings</code>, чтобы пройтись по
        ним и отобразить <code>ListingCard</code> для каждого из них. Мы будем передавать
        эти объявления из <code>HomePage</code>, поэтому нам нужно будет обновить наш
        компонент <code>ListingList</code>, чтобы он принимал{' '}
        <code>listings</code> в качестве свойств.
      </p>
      <p>
        Нам также нужно будет проверить длину{' '}
        <code>listings</code>, так как может случиться так, что мы получим пустой
        список. Если нет объявлений для показа, мы отобразим простое сообщение
        "Объявления не найдены.". В противном случае мы пройдём по{' '}
        <code>listings</code> и отобразим <code>ListingCard</code> для каждого,
        передавая текущее <code>listing</code> в качестве свойств.
      </p>
      <p>
        Поскольку мы проходим по списку, нам нужно будет обработать свойство
        <code>key</code>, которое обязательно в React. Мы будем использовать{' '}
        <code>id</code> каждого объявления в качестве его ключа, так как он будет уникальным
        и не вызовет дубликатов. Правильная обработка ключей в React очень важна!
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingList</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 3, 5, 6, 7, 8, 9, 10, 11, 12]}
        title='src/components/ListingList.jsx'
      >
        {listingListWithListingCardCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithListingListCode = `import { listings } from '@/api/data/listings';
import ListingList from '@/components/ListingList';

const HomePage = () => {
  return (
    <div className='container py-4'>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;`;

export const Step6 = () => {
  return (
    <div>
      <h2>
        Обновление <code>HomePage</code> с помощью <code>ListingList</code>
      </h2>
      <p>
        Последний шаг, который нам нужно сделать, — это заменить сообщение
        "Объявления будут здесь!" в <code>HomePage</code> на компонент
        <code>ListingList</code> и передать ему некоторые <code>listings</code>
        через свойства.
      </p>
      <p>
        Мы можем использовать объявления, которые определены в{' '}
        <code>src/api/data/listings</code>. Мы можем импортировать их напрямую в
        <code>HomePage</code> и передать их в <code>ListingList</code> для
        отображения. Пока это будет статический список объявлений. В следующих
        модулях мы обновим это, чтобы сделать его более динамичным и фактически
        получать их из базы данных <code>localStorage</code>.
      </p>
      <p>
        Обратите внимание, что мы могли бы импортировать объявления прямо в
        <code>ListingList</code> без необходимости передавать их через{' '}
        <code>HomePage</code>. Однако лучше иметь их здесь, так как это
        должно быть ответственностью <code>HomePage</code> владеть{' '}
        <code>listings</code>. <code>ListingList</code> тогда будет отвечать
        за их отображение через <code>ListingCard</code>, а{' '}
        <code>ListingCard</code> фактически отобразит каждое объявление.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 2, 7]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithListingListCode}
      </CodeHighlighter>
    </div>
  );
};


export const Completed = () => {
  return (
    <div className='relative'>
      <CheckCircle className='mx-auto mb-8 h-40 w-40' />
      <h2>Модуль завершен!</h2>
      <p>
        Поздравляем! Вы завершили 1-й модуль курса. Теперь у вас должны
        корректно отображаться объявления на главной странице, используя
        компоненты, которые мы создали в этом модуле!
      </p>
      <p>
        В этом модуле мы изучили основы React, как создавать компоненты и
        настроить базу нашей платформы объявлений! У нас теперь есть все
        необходимое, чтобы сделать наше приложение динамичным, добавив состояние!
      </p>
      <p>
        Убедитесь, что вы следовали шагам правильно, так как следующий модуль
        начнется сразу с того места, на котором мы остановились.
      </p>
      <p>
        Чтобы перейти к следующему модулю, просто выберите{' '}
        <code>2-state-and-event-handlers</code> из выпадающего списка выше.
        Увидимся там!
      </p>
      <h3>Завершенные задачи</h3>
      <Separator className='mb-2' />
      <TaskList checked tasks={tasks} />
      <div className='absolute -top-6'>
        <Confetti
          numberOfPieces={200}
          recycle={false}
          height={window.innerHeight - 200}
          width={650}
        />
      </div>
    </div>
  );
};

