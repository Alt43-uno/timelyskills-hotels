import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Преобразовать статический <code>listings</code> в <code>HomePage</code> в состояние',
  'Создать компонент <code>ListingFilters</code>',
  'Добавить состояние и обработчики событий в <code>ListingFilters</code>',
  'Добавить пропс обратного вызова в <code>ListingFilters</code>',
  'Добавить <code>ListingFilters</code> в <code>HomePage</code>',
  'Создать обратный вызов для обновления фильтров в <code>HomePage</code>',
];

export const Intro = () => {
  return (
    <div>
      <h2>Модуль 2 - Состояние и обработчики событий</h2>
      <Separator className='mb-2' />
      <p>
        В этом модуле мы будем работать с состоянием и добавим некоторые
        переменные состояния в наше приложение. Мы также будем работать с
        обработчиками событий, чтобы позволить нашим пользователям взаимодействовать с
        нашим приложением.
      </p>
      <h3>Описание</h3>
      <Separator className='mb-2' />
      <p>
        Цель этого модуля - научиться работать с состоянием и оживить
        наше приложение, сделав его состоящим. Состояние позволяет
        вещам изменяться со временем и является очень важной частью любого
        приложения. Чтобы иметь возможность изменять состояние, нам нужно будет
        научиться работать с обработчиками событий.
      </p>
      <p>
        Мы начнем с преобразования наших <code>listings</code> в состояние, что
        позволит <code>listings</code> изменяться со временем. Затем мы создадим
        функцию, которая сможет фильтровать <code>listings</code> и заменять их
        на те, которые соответствуют критериям фильтрации. Наконец, мы добавим
        несколько полей ввода, чтобы пользователь мог изменять состояние
        <code>listings</code>.
      </p>
      <p>
        Нам нужно будет создать новый компонент под названием <code>ListingFilters</code>,
        который будет обрабатывать фильтры и рендерить некоторые компоненты, чтобы
        пользователи могли фильтровать объявления по их названию, выбирая диапазон дат
        и добавляя количество гостей. Затем мы добавим этот компонент в
        <code>HomePage</code> и будем использовать его для фильтрации
        <code>listings</code> в компоненте <code>HomePage</code>.
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


const homePageCode = `import { useState } from 'react';

import { listings as staticListings } from '@/api/data/listings';
import ListingList from '@/components/ListingList';

const HomePage = () => {
  const [listings, setListings] = useState(staticListings);

  return (
    <div className='container py-4'>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Преобразование статических <code>listings</code> в <code>HomePage</code> в состояние
      </h2>
      <p>
        Первое, что нам нужно сделать, это сделать наши <code>listings</code>{' '}
        состоящими. В настоящее время мы импортируем <code>listings</code> напрямую
        из файла <code>src/api/data/listings</code>, что означает, что{' '}
        <code>listings</code> статичны и никогда не изменятся.
      </p>
      <p>
        Для этого мы будем использовать один из самых распространенных хуков в React: <code>useState</code>. Этот хук позволит нам хранить переменную состояния,
        а также предоставит нам функцию обновления, чтобы обновить её. Мы можем затем
        вызывать эту функцию всякий раз, когда хотим обновить наше состояние.
      </p>
      <p>
        Нам нужно будет использовать псевдоним при импорте наших объявлений, так как у нас теперь
        будет новая переменная состояния с именем <code>listings</code>, и мы не можем иметь
        дубликатов. Чтобы упростить, мы назовем псевдоним <code>staticListings</code>. Затем мы можем использовать хук <code>useState</code>{' '}
        для создания переменной состояния с именем <code>listings</code> и передать
        эти статические объявления в неё.
      </p>
      <p>
        С этими изменениями наше приложение будет работать так же, и не будет
        никаких очевидных различий. Тем не менее, что мы сейчас сделали, так это позволили нашим{' '}
        <code>listings</code> динамически изменяться со временем, что позволит
        нам добавить функциональность для изменения отображаемых объявлений позже.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> с помощью
        следующего кода:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 3, 7]}
        title='src/pages/HomePage.jsx'
      >
        {homePageCode}
      </CodeHighlighter>
    </div>
  );
};


const listingFiltersCode = `import { Search } from 'lucide-react';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';

const ListingFilters = () => {
  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input className='w-[400px]' placeholder='Search destinations' />
      <DateRangePicker placeholder='Add dates' />
      <Stepper />
      <Button>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default ListingFilters;`;

export const Step2 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingFilters</code>
      </h2>
      <p>
        Теперь, когда наши <code>listings</code> стали состоянием в <code>HomePage</code>, мы можем
        начать создавать компоненты, которые будут их изменять. Нам нужно добавить
        строку поиска, чтобы наши пользователи могли искать объявления по их заголовку,
        выбор диапазона дат, чтобы позволить пользователям выбирать свои даты,
        шаговый ввод, чтобы позволить пользователям выбирать количество гостей, и, наконец,
        нам нужна кнопка отправки, чтобы фактически установить фильтры и обновить
        объявления.
      </p>
      <p>
        Лучший способ сделать это — создать новый компонент, который мы назовем{' '}
        <code>ListingFilters</code>. Создание нового компонента для этого — хорошая
        идея, потому что мы можем инкапсулировать всю логику и пользовательский интерфейс
        для фильтров в одном месте, а затем просто использовать этот компонент в{' '}
        <code>HomePage</code>.
      </p>
      <p>
        Здесь мы также будем использовать несколько удобных компонентов из папки{' '}
        <code>src/components/ui</code>. У нас есть компонент <code>Input</code>,
        компонент <code>DateRangePicker</code>, компонент <code>Stepper</code>
        и компонент <code>Button</code>. Мы также используем иконку <code>Search</code> из{' '}
        <code>lucide-react</code>.
      </p>
      <p>
        Нам нужно будет создать новый файл в директории <code>src/components</code>{' '}
        с названием <code>ListingFilters.jsx</code> с следующим кодом:
      </p>
      <CodeHighlighter title='src/components/ListingFilters.jsx'>
        {listingFiltersCode}
      </CodeHighlighter>
    </div>
  );
};


const listingFiltersWithState = `import { Search } from 'lucide-react';
import { useState } from 'react';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';

const ListingFilters = () => {
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState('');

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input
        className='w-[400px]'
        placeholder='Search destinations'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DateRangePicker
        value={dates}
        onChange={setDates}
        minDate={new Date()}
        placeholder='Add dates'
      />
      <Stepper label='guest' value={guests} onChange={setGuests} />
      <Button>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default ListingFilters;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Добавление состояния и обработчиков событий в <code>ListingFilters</code>
      </h2>
      <p>
        Наш компонент <code>ListingFilters</code> в настоящее время ничего не делает,
        кроме как отображает некоторый пользовательский интерфейс. Нам нужно это
        изменить и добавить состояние и обработчики событий, чтобы мы могли
        фактически использовать его для фильтрации наших объявлений.
      </p>
      <p>
        Нам нужно будет создать 3 переменные состояния: <code>dates</code>,{' '}
        <code>guests</code> и <code>search</code>. Мы передадим{' '}
        <code>dates</code> в <code>DateRangePicker</code>,{' '}
        <code>guests</code> в <code>Stepper</code>, а{' '}
        <code>search</code> — в компонент <code>Input</code>. Мы также
        собираемся передать функции обновления в эти компоненты, чтобы они
        могли обновлять переменные состояния.
      </p>
      <p>
        Для <code>Input</code> нам нужно будет получить свойство{' '}
        <code>e.target.value</code> и установить его в состояние, для{' '}
        <code>Stepper</code> мы передадим функцию <code>setGuests</code>
        напрямую, а для <code>DateRangePicker</code> мы просто передадим{' '}
        <code>setDates</code>, поскольку он уже настроен на возврат
        правильных данных. Даты будут объектом с <code>from</code> и{' '}
        <code>to</code> в качестве свойств.
      </p>
      <p>
        Также мы должны добавить свойство <code>minDate</code> к{' '}
        <code>DateRangePicker</code> со значением текущей даты, чтобы
        не позволять пользователям выбирать даты в прошлом! Мы не будем ограничивать даты
        в будущем, так что пользователи могут бронировать так далеко вперёд, как захотят.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingFilters</code> с
        следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[2, 7, 8, 9, 16, 17, 20, 21, 22, 25]}
        title='src/components/ListingFilters.jsx'
      >
        {listingFiltersWithState}
      </CodeHighlighter>
    </div>
  );
};


const listingFiltersWithCallbacks = `import { Search } from 'lucide-react';
import { useState } from 'react';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';

const ListingFilters = ({ onChange }) => {
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    onChange({ dates, guests, search });
  };

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input
        className='w-[400px]'
        placeholder='Search destinations'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DateRangePicker
        value={dates}
        onChange={setDates}
        minDate={new Date()}
        placeholder='Add dates'
      />
      <Stepper label='guest' value={guests} onChange={setGuests} />
      <Button onClick={handleSubmit}>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default ListingFilters;`;

export const Step4 = () => {
  return (
    <div>
      <h2>
        Добавление свойства обратного вызова в <code>ListingFilters</code>
      </h2>
      <p>
        Наш компонент <code>ListingFilters</code> выглядит хорошо, но его состояние
        является самодостаточным. В настоящее время у нас нет способа отправить это
        состояние в компонент <code>HomePage</code>, где мы будем его использовать.
      </p>
      <p>
        Важно понимать, что <code>HomePage</code> отвечает за фильтрацию{' '}
        <code>listings</code>, а не компонент <code>ListingFilters</code>. Это
        ответственность <code>HomePage</code>, поскольку он хранит состояние для{' '}
        <code>listings</code>. <code>ListingFilters</code> просто будет
        управлять своим внутренним состоянием, за которое отвечает, и только
        вызывать обратный вызов из <code>HomePage</code> с фильтрами.
      </p>
      <p>
        Чтобы передать состояние вверх, нам понадобятся две вещи. Сначала нам
        потребуется функция обратного вызова <code>onChange</code>, которую{' '}
        <code>HomePage</code> передаст в <code>ListingFilters</code>, а затем
        нам понадобится функция <code>handleSubmit</code>, которую{' '}
        <code>ListingFilters</code> вызовет, когда кнопка <code>Button</code>{' '}
        будет нажата. Функция <code>handleSubmit</code> затем вызовет
        обратный вызов <code>onChange</code>.
      </p>
      <p>
        Функция <code>handleSubmit</code> вызовет обратный вызов{' '}
        <code>onChange</code> с текущими значениями <code>dates</code>,{' '}
        <code>guests</code> и <code>search</code>. Мы прикрепим ее к{' '}
        <code>Button</code>, чтобы каждый раз, когда она нажимается, мы
        отправляли состояние вверх для использования в <code>HomePage</code>.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingFilters</code> с
        следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[6, 11, 12, 13, 30]}
        title='src/components/ListingFilters.jsx'
      >
        {listingFiltersWithCallbacks}
      </CodeHighlighter>
    </div>
  );
};


export const homePageWithListingFiltersCode = `import { useState } from 'react';

import { listings as staticListings } from '@/api/data/listings';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState(staticListings);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters />
        <Separator className='my-4' />
      </div>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Добавление <code>ListingFilters</code> в <code>HomePage</code>
      </h2>
      <p>
        Теперь, когда наш компонент <code>ListingFilters</code> полностью
        функционален, мы можем подключить его к <code>HomePage</code>. Нам
        нужно будет импортировать компонент <code>ListingFilters</code> в{' '}
        <code>HomePage</code> и отобразить его.
      </p>
      <p>
        Мы не будем беспокоиться о передаче обратного вызова <code>onChange</code>{' '}
        прямо сейчас, так как нам нужно будет создать его на следующем этапе. Но
        нам нужно будет позаботиться о расположении и стилях <code>ListingFilters</code>, чтобы
        он хорошо смотрелся внутри <code>HomePage</code>.
      </p>
      <p>
        Мы разместим <code>ListingFilters</code> в верхней части страницы и
        используем <code>Separator</code> из нашей{' '}
        <code>src/components/ui</code> папки, чтобы создать визуальное
        различие между ним и остальной частью страницы. Это сделает наши фильтры
        видимыми в верхней части экрана, где пользователи их ожидают.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> с
        следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[4, 6, 13, 14, 15, 16]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithListingFiltersCode}
      </CodeHighlighter>
    </div>
  );
};


export const homePageWithFiltersCallbackCode = `import { useState } from 'react';

import {
  isListingAvailable,
  listings as staticListings,
} from '@/api/data/listings';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState(staticListings);

  const handleFilters = (filters) => {
    const { dates, guests, search } = filters;

    // Resets filters by using static listings
    let filteredListings = staticListings;

    // Handles date range
    if (dates) {
      filteredListings = filteredListings.filter((listing) =>
        isListingAvailable(listing, dates),
      );
    }

    // Handles guests
    if (guests) {
      filteredListings = filteredListings.filter(
        (listing) => guests <= listing.maxGuests,
      );
    }

    // Handles search
    if (search) {
      filteredListings = filteredListings.filter((listing) =>
        listing.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setListings(filteredListings);
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;`;

export const Step6 = () => {
  return (
    <div>
      <h2>
        Создание обратного вызова для обновления фильтров в <code>HomePage</code>
      </h2>
      <p>
        Наконец, нам нужно создать и передать функцию обратного вызова в{' '}
        <code>ListingFilters</code> в качестве его свойства <code>onChange</code>.
        Как мы видели, этот обратный вызов будет вызываться каждый раз, когда
        фильтры будут отправлены, и ему будут переданы текущие значения{' '}
        <code>dates</code>, <code>guests</code> и <code>search</code>.
      </p>
      <p>
        Чтобы создать нашу функцию обратного вызова, которую мы назовем{' '}
        <code>handleFilters</code>, нам нужно будет принять фильтры из{' '}
        <code>ListingFilters</code> и использовать их для обновления состояния{' '}
        <code>listings</code>, чтобы показывать только те листинги, которые
        соответствуют фильтрам. Нам нужно будет обработать значение{' '}
        <code>dates</code> фильтров, значение <code>guests</code>, а также
        значение <code>search</code>.
      </p>
      <p>
        Сначала нам нужно будет проверить, что название листинга содержит{' '}
        <code>search</code>, затем мы проверим, что <code>guests</code> меньше,
        чем свойство <code>maxGuests</code> у листинга, а затем для дат мы
        используем удобную вспомогательную функцию{' '}
        <code>isListingAvailable</code>, чтобы проверить, находятся ли даты в
        пределах доступности листинга. Эта функция позволяет нам просто передать{' '}
        <code>listing</code> и некоторые <code>dates</code>, и она скажет нам,
        доступен ли <code>listing</code> или нет.
      </p>
      <p>
        Исходя из этих результатов, мы отфильтруем <code>listings</code> и
        покажем только те, которые соответствуют критериям фильтрации, обновив
        состояние с помощью нашей функции обновления, <code>setListings</code>.
        Это автоматически обновит наш интерфейс только с теми{' '}
        <code>listings</code>, которые соответствуют нашим критериям!
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> с
        следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[
          4, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
        ]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithFiltersCallbackCode}
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
        Поздравляем! Вы завершили второй модуль курса. Фильтры на главной
        странице теперь должны работать полностью. Попробуйте выбрать диапазон
        дат, искать листинг по его названию или выбрать количество гостей,
        а затем нажмите кнопку, чтобы отправить ваши фильтры. Это отфильтрует
        ваши листинги и покажет только те, которые соответствуют выбранным
        критериям!
      </p>
      <p>
        В этом модуле мы узнали, как работать с состоянием в React. Мы добавили
        состояние к листингам на главной странице и создали новый компонент для
        обработки фильтров. Мы также научились передавать обратные вызовы между
        компонентами и использовать их для обновления состояния в родительском
        компоненте. Мы работали с обработчиками событий и научились использовать
        их для получения значения в ответ на пользовательский ввод.
      </p>
      <p>
        Убедитесь, что вы правильно следовали шагам, так как следующий модуль
        начнется именно с того места, на котором мы остановились.
      </p>
      <p>
        Чтобы перейти к следующему модулю, просто выберите{' '}
        <code>3-effects-and-data-fetching</code> из выпадающего списка выше.
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

