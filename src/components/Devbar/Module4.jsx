import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Настроить компонент <code>Router</code>',
  'Заменить <code>App</code> на <code>Router</code>',
  'Добавить <code>HomePage</code> как дочерний маршрут',
  'Добавить <code>Outlet</code> в <code>App</code>',
  'Создать компонент <code>ListingDetailsCard</code>',
  'Создать компонент <code>ListingDetailsPage</code>',
  'Добавить <code>ListingDetailsPage</code> в <code>Router</code>',
  'Добавить ссылку на детали в <code>ListingCard</code>',
  'Создать компонент <code>ListingDetailsCardImages</code>',
  'Добавить <code>ListingDetailsCardImages</code> в <code>ListingDetailsCard</code>',
  'Создать компонент <code>NotFoundPage</code>',
  'Добавить <code>NotFoundPage</code> в <code>router</code>',
];


export const Intro = () => {
  return (
    <div>
      <h2>Модуль 4 - Маршруты и Навигация</h2>
      <Separator className='mb-2' />
      <p>
        В этом модуле мы будем работать с маршрутами и навигацией. Мы узнаем,
        как использовать <code>react-router-dom</code> для добавления навигации
        в наше приложение, затем создадим маршрутизатор, который будет
        содержать наши маршруты и структуру навигации для нашего приложения,
        и, наконец, добавим новые страницы, на которые пользователи смогут
        переходить.
      </p>
      <p>
        Этот модуль очень важен, потому что мы будем
        кардинально изменять структуру нашего приложения. Мы заменим
        точку входа нашего приложения, которая сейчас рендерит единственный
        компонент, на рендеринг целого маршрутизатора!
      </p>
      <h3>Описание</h3>
      <Separator className='mb-2' />
      <p>
        В настоящее время все наши объявления не кликабельны. Мы показываем
        все их на главной странице и даже позволяем пользователю фильтровать
        их, но не даем ему возможности кликнуть на объявление, чтобы
        увидеть больше информации о нем. Это не лучший опыт для пользователя.
      </p>
      <p>
        Мы можем улучшить это, создав новую страницу, которая будет
        показывать детали объявления. Пользователь может кликнуть на любое
        объявление и быть перенаправленным на эту страницу, а затем, когда он
        закончит, сможет вернуться на главную страницу через браузер. Это
        значительно улучшит пользовательский опыт и сделает наше приложение
        более живым.
      </p>
      <p>
        Чтобы это сделать, нам нужно изучить навигацию в React и реализовать
        собственное решение для маршрутизации на стороне клиента. Мы будем
        использовать библиотеку <code>react-router-dom</code>. Нам нужно будет
        создать свой маршрутизатор, определить наши маршруты и
        структурировать способ, которым пользователи смогут навигировать по
        нашему приложению.
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


const routerCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Настройка компонента <code>Router</code>
      </h2>
      <p>
        Мы начнем с интеграции <code>react-router-dom</code> в наше приложение.
        Первый шаг — создать компонент <code>Router</code>, где мы определим
        наши маршруты и как они будут структурированы. Это станет новой
        точкой входа в наше приложение.
      </p>
      <p>
        Мы используем функцию <code>createBrowserRouter</code> из{' '}
        <code>react-router-dom</code> для создания нашего маршрутизатора. Внутри
        мы определим простой маршрут <code>/</code>, который будет рендерить наш
        компонент <code>App</code>. Компонент <code>App</code> — это тот
        компонент, который в данный момент рендерит наше целое приложение,
        включая компонент <code>Devbar</code>, в котором вы читаете это прямо
        сейчас. Маршрутизатор будет сопоставлять индексный маршрут нашего
        приложения с компонентом <code>App</code>, и каждый раз, когда
        пользователь посещает эту страницу, она будет рендериться.
      </p>
      <p>
        Затем нам нужно будет создать компонент <code>Router</code>, который
        будет использовать <code>RouterProvider</code> из{' '}
        <code>react-router-dom</code> и передавать ему <code>router</code>,
        который мы только что создали. Мы экспортируем этот компонент, чтобы
        использовать его на следующем шаге для фактического рендеринга нашего
        маршрутизатора.
      </p>
      <p>
        Нам нужно будет создать новый файл внутри директории <code>src</code>{' '}
        с именем <code>Router.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/Router.jsx'>{routerCode}</CodeHighlighter>
    </div>
  );
};


const mainCode = `import ReactDOM from 'react-dom/client';

import { seedLocalDatabase } from '@/api/data/seed';
import ThemeProvider from '@/components/ThemeProvider';

import Router from './Router';

import './index.css';

// DO NOT REMOVE: Seeds the local storage database with data
seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Router />
  </ThemeProvider>,
);`;

export const Step2 = () => {
  return (
    <div>
      <h2>
        Замена <code>App</code> на <code>Router</code>
      </h2>
      <p>
        Теперь, когда мы создали наш компонент <code>Router</code>, нам нужно
        импортировать его и добавить его в качестве основной точки входа в
        наше приложение. Мы заменим <code>App</code> в методе <code>render</code>{' '}
        компонента <code>ReactDOM</code>, чтобы основной точкой входа в наше
        приложение стал наш маршрутизатор.
      </p>
      <p>
        С этими изменениями наш <code>Router</code> теперь управляет
        всем приложением и решает, что рендерить. Поскольку мы встроили
        компонент <code>App</code> в путь <code>/</code>, он будет
        автоматически рендериться через наш <code>Router</code>, когда мы
        находимся на главной странице нашего приложения.
      </p>
      <p>
        Нам нужно будет обновить файл <code>main.jsx</code> следующим кодом:
      </p>
      <CodeHighlighter highlightedLines={[6, 15]} title='src/main.jsx'>
        {mainCode}
      </CodeHighlighter>
    </div>
  );
};


const routerWithChildrenCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Добавление <code>HomePage</code> в качестве дочернего маршрута
      </h2>
      <p>
        Следующее, что нам нужно сделать, это сделать так, чтобы <code>App</code>
        мог рендерить динамический контент. В текущем состоянии <code>App</code> не
        способен рендерить динамический контент. Мы жестко закодировали{' '}
        <code>HomePage</code> в нем. Нам следует изменить это, чтобы разрешить
        рендеринг любого компонента в зависимости от текущего URL. Мы также хотим
        сохранить ту же стилизацию, что и сейчас, а также рендерить динамический
        контент только с правой стороны экрана, рядом с компонентом <code>Devbar</code>.
      </p>
      <p>
        К счастью, одной из замечательных особенностей <code>react-router-dom</code>{' '}
        является возможность иметь дочерние маршруты. Это позволит нам определить
        маршрут, который является дочерним для другого маршрута. Когда мы
        переходим к этому маршруту, рендерятся как родительский, так и дочерний
        маршруты. Мы можем использовать <code>App</code> в качестве родителя и
        любой динамический маршрут в качестве дочернего.
      </p>
      <p>
        Для этого нам нужно будет добавить новый маршрут внутри нашего{' '}
        <code>Router</code>, под свойством <code>children</code> индексного маршрута.
        Мы дадим ему тот же путь <code>/</code> и будем использовать компонент{' '}
        <code>HomePage</code>. Это рендерит все, как у нас есть сейчас, но через
        дочерний маршрут в <code>Router</code>.
      </p>
      <p>
        Нам нужно будет обновить <code>router</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 11, 12, 13, 14, 15, 16]}
        title='src/Router.jsx'
      >
        {routerWithChildrenCode}
      </CodeHighlighter>
    </div>
  );
};


const appWithOutletCode = `import { Outlet } from 'react-router-dom';

import Devbar from '@/components/Devbar/Devbar';

const App = () => {
  return (
    <>
      <div className='fixed bottom-0 left-0 top-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
        <Outlet />
      </div>
    </>
  );
};

export default App;`;

export const Step4 = () => {
  return (
    <div>
      <h2>
        Добавление <code>Outlet</code> в <code>App</code>
      </h2>
      <p>
        Следующее, что нам нужно сделать, это удалить <code>HomePage</code>{' '}
        внутри компонента <code>App</code> и заменить его на наш новый дочерний
        маршрут. Поскольку мы теперь определили дочерний маршрут для{' '}
        <code>App</code>, нам нужно сказать{' '}
        <code>react-router-dom</code>, где рендерить дочерний маршрут.
      </p>
      <p>
        Для этого мы будем использовать компонент <code>Outlet</code> из{' '}
        <code>react-router-dom</code>. Этот компонент является плейсхолдером, который{' '}
        <code>react-router-dom</code> будет использовать для динамического рендеринга
        маршрута внутри контента другого маршрута. В нашем случае он будет
        рендерить любого ребенка <code>App</code>.
      </p>
      <p>
        Мы собираемся заменить жестко закодированный <code>HomePage</code> на{' '}
        <code>Outlet</code>, чтобы сохранить всю ту же стилизацию, что и раньше,
        а также сохранить компонент <code>Devbar</code> видимым в любое время.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>App</code> следующим кодом:
      </p>
      <CodeHighlighter highlightedLines={[1, 12]} title='src/App.jsx'>
        {appWithOutletCode}
      </CodeHighlighter>
    </div>
  );
};


const listingDetailsCardCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import { Card, Separator } from '@/components/ui';

const ListingDetailsCard = ({ listing }) => {
  return (
    <Card className='mx-auto p-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='mb-2 text-2xl font-bold'>{listing.name}</h1>
        <div className='flex items-center gap-2'>
          <DollarSign className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            <span className='font-bold text-foreground'>{listing.price}</span> /
            night
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Pin className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>{listing.location.name}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Users className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            {listing.maxGuests} Guests
          </span>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='whitespace-pre-line'>{listing.description}</div>
    </Card>
  );
};

export default ListingDetailsCard;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingDetailsCard</code>
      </h2>
      <p>
        Теперь, когда наш маршрутизатор настроен и работает с вложенными маршрутами,
        мы можем начать добавлять новые страницы в наше приложение. Мы говорили о
        добавлении страницы с деталями объявления ранее, чтобы пользователь мог
        перейти к ней и просмотреть дополнительную информацию об объявлении, так что
        давайте сделаем это!
      </p>
      <p>
        Первое, что нам нужно сделать, это создать компонент, который будет
        отображать некоторые детали о listing. Это будет очень похоже на{' '}
        <code>ListingCard</code>, который мы создали ранее, но он будет содержать
        больше информации для отображения. Он также будет получать{' '}
        <code>listing</code> в качестве пропса и просто рендерить UI для
        объявления.
      </p>
      <p>
        Сначала мы начнем без каких-либо изображений. Мы просто отобразим
        <code>listing</code> название, цену, местоположение, максимальное
        количество гостей и описание. На следующих этапах мы также добавим
        изображения, как и сделали с <code>ListingCard</code>.
      </p>
      <p>
        Нам нужно будет создать новый файл внутри <code>src/components</code>{' '}
        с названием <code>ListingDetailsCard.jsx</code> и следующим кодом:
      </p>
      <CodeHighlighter title='src/components/ListingDetailsCard.jsx'>
        {listingDetailsCardCode}
      </CodeHighlighter>
    </div>
  );
};


const listingDetailsPageCode = `import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '@/api';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import { Spinner } from '@/components/ui';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const [listing, setListing] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortController = useRef(null);

  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true);
      setError(null);

      abortController.current = new AbortController();

      try {
        const response = await api.get(${'`/api/listings/${listingId}`'}, {
          signal: abortController.current?.signal,
        });
        setListing(response.data);
      } catch {
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();

    return () => {
      abortController.current?.abort();
    };
  }, [listingId]);

  const renderListing = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }

    if (error) {
      return <div className='text-center'>{error}</div>;
    }

    return <ListingDetailsCard listing={listing} />;
  };

  return <div className='container py-4'>{renderListing()}</div>;
};

export default ListingDetailsPage;`;

export const Step6 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingDetailsPage</code>
      </h2>
      <p>
        Далее давайте создадим страницу с деталями объявления. Это будет
        компонент страницы, который мы подключим к нашему <code>router</code>,
        и он будет рендерить компонент <code>ListingDetailsCard</code>, который
        мы только что создали на предыдущем шаге.
      </p>
      <p>
        Поскольку наш компонент <code>ListingDetailsCard</code> нуждается в{' '}
        <code>listing</code>, чтобы показать его, нам нужно будет получить его на
        этой странице и передать вниз. Так же, как мы сделали это на{' '}
        <code>HomePage</code>, нам нужно будет получить объявление в{' '}
        <code>useEffect</code>, а также обрабатывать состояния загрузки и
        ошибок, и предотвращать гонки условий.
      </p>
      <p>
        Чтобы получить правильное объявление, нам нужно знать{' '}
        <code>listingId</code>, которое нужно получить. API-эндпоинт для
        получения одного объявления требует этого. Мы можем использовать параметры
        в <code>react-router-dom</code>. Параметры позволяют нам передавать
        данные от одного маршрута к другому. Это позволит нам передать{' '}
        <code>listingId</code> на этот маршрут, когда мы будем переходить к нему.
      </p>
      <p>
        Чтобы получить доступ к <code>listingId</code> и любым другим параметрам,
        мы можем использовать хук <code>useParams</code> из{' '}
        <code>react-router-dom</code>. Это даст нам доступ к любым параметрам,
        которые были переданы этому маршруту.
      </p>
      <p>
        Нам нужно будет создать новый файл внутри <code>src/pages</code>{' '}
        с названием <code>ListingDetailsPage.jsx</code> и следующим кодом:
      </p>
      <CodeHighlighter title='src/pages/ListingDetailsPage.jsx'>
        {listingDetailsPageCode}
      </CodeHighlighter>
    </div>
  );
};


const routerWithListingsDetailsCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/listings/:listingId',
        element: <ListingDetailsPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step7 = () => {
  return (
    <div>
      <h2>
        Добавление <code>ListingDetailsPage</code> в <code>Router</code>
      </h2>
      <p>
        Теперь, когда <code>ListingDetailsPage</code> создан, мы можем добавить
        его в наш <code>router</code>, чтобы он был доступен в нашем приложении.
        Мы захотим отобразить этот маршрут как дочерний маршрут к нашему
        индексному маршруту, прямо рядом с <code>HomePage</code>. Это
        гарантирует, что наша навигация будет происходить только между
        дочерними маршрутами, при этом <code>App</code> будет отображаться
        вместе с компонентом <code>Devbar</code>.
      </p>
      <p>
        Путь для этой страницы с деталями объявления будет содержать динамический
        URL-параметр, <code>listingId</code>. Путь будет <code>/listings/:listingId</code>,
        который будет соответствовать любому <code>listingId</code>, который мы
        предоставим. Такой способ даст нам доступ к <code>listingId</code> через
        параметры маршрута, к которым мы получили доступ через{' '}
        <code>useParams</code> на предыдущем шаге.
      </p>
      <p>
        Важно понимать взаимосвязь между различными маршрутами и их путями.
        В данный момент мы поместили <code>ListingDetailsPage</code> под
        основным индексным путем <code>/</code>, где находится <code>App</code>,
        а затем указали <code>/listings/:listingId</code> как путь. Первый путь
        применяется к компоненту <code>App</code>, который должен отображаться на
        любом маршруте, так как он содержит основной макет нашего приложения.
        Однако компонент <code>ListingDetailsPage</code> должен отображаться
        только на <code>/listings/:listingId</code>. В результате на каждой
        странице у нас будет отображаться <code>App</code>, а любой подмаршрут,
        который мы определили, будет рендерить соответствующий компонент внутри
        <code>Outlet</code> <code>App</code>.
      </p>
      <p>
        Нам нужно будет обновить файл <code>Router.jsx</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[4, 17, 18, 19, 20]}
        title='src/Router.jsx'
      >
        {routerWithListingsDetailsCode}
      </CodeHighlighter>
    </div>
  );
};


const listingCardWithLinkCode = `import { DollarSign, Pin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import ListingCardImages from '@/components/ListingCardImages';
import { Card, CardContent } from '@/components/ui';

const ListingCard = ({ listing }) => {
  return (
    <Link to={${'`/listings/${listing.id}`'}}>
      <Card className='w-[320px]'>
        <ListingCardImages listing={listing} />
        <CardContent className='flex flex-col gap-2 p-4'>
          <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              <span className='font-bold text-foreground'>{listing.price}</span>{' '}
              / night
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Pin className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.location.name}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.maxGuests} Guests
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;`;

export const Step8 = () => {
  return (
    <div>
      <h2>
        Добавление ссылки на детали в <code>ListingCard</code>
      </h2>
      <p>
        Последнее, что нам нужно сделать, это создать ссылку из компонента{' '}
        <code>ListingCard</code> на <code>ListingDetailsPage</code>. Это сделает
        каждое объявление на нашей главной странице кликабельным и перенаправит
        пользователя на страницу с деталями. Поскольку у нас есть доступ к{' '}
        <code>listing</code> внутри <code>ListingCard</code>, мы можем использовать
        это, чтобы передать правильный <code>listingId</code> в URL.
      </p>
      <p>
        При использовании <code>react-router-dom</code> нам нужно использовать
        компонент <code>Link</code> вместо обычного HTML-тега <code>a</code> для
        создания ссылки. Это позволит нам иметь маршрутизацию на стороне клиента,
        которая не будет перезагружать страницу, как это делает обычный тег{' '}
        <code>a</code>. Компонент <code>Link</code> принимает свойство{' '}
        <code>to</code>, которое аналогично <code>href</code> в обычной ссылке.
        Мы можем передать относительную ссылку и использовать интерполяцию
        строк, чтобы отправить <code>listingId</code>.
      </p>
      <p>
        Вы заметите, что мы решили обернуть весь компонент <code>ListingCard</code>
        в <code>Link</code>. Это сделано для того, чтобы вся карточка была
        кликабельной, как и ожидалось в обычном приложении. Однако мы также могли
        бы сделать это по-другому, например, создав кнопку и сделав кликабельной
        только ее. Оба способа приемлемы, и это полностью вопрос предпочтения на
        данный момент.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingCard</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[2, 9, 35]}
        title='src/components/ListingCard.jsx'
      >
        {listingCardWithLinkCode}
      </CodeHighlighter>
    </div>
  );
};

const listingDetailsCardImagesCode = `import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingDetailsCardImages = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      <img
        className='mb-4 h-[500px] w-full rounded-md object-cover'
        src={getImageUrl(listing.images[currentImageIndex])}
        alt={listing.name}
      />
      <Carousel className='mx-auto mb-4 w-[90%]'>
        <CarouselContent>
          {listing.images.map((image, index) => (
            <CarouselItem
              key={image}
              className='basis-1/3 cursor-pointer'
              onClick={() => setCurrentImageIndex(index)}
              isSelected={index === currentImageIndex}
            >
              <img
                className='h-52 w-full object-cover shadow-sm'
                src={getImageUrl(image)}
                alt={listing.name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default ListingDetailsCardImages;`;

export const Step9 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingDetailsCardImages</code>
      </h2>
      <p>
        Отлично! Наша маршрутизация работает как ожидалось, и мы можем кликнуть
        на любое объявление, чтобы перейти на страницу с деталями. Теперь давайте
        завершим компонент <code>ListingDetailsCard</code> и добавим к нему
        изображения. Точно так же, как мы делали для изображений в{' '}
        <code>ListingCard</code>, мы создадим новый компонент под названием{' '}
        <code>ListingDetailsCardImages</code>, который будет отвечать за
        отображение изображений объявления.
      </p>
      <p>
        <code>ListingDetailsCardImages</code> будет использовать тот же{' '}
        <code>Carousel</code>, что и в <code>ListingCardImages</code>, но
        также будет отслеживать текущий индекс изображения и отображать его в
        большем размере. Это позволит пользователю кликнуть на любое изображение
        и увидеть его в увеличенном размере, а также перемещаться по
        изображениям с помощью карусели.
      </p>
      <p>
        Нам нужно будет создать переменную состояния с именем{' '}
        <code>currentIndex</code>, чтобы хранить текущее выбранное изображение.
        Затем мы передадим <code>setCurrentIndex</code> в обработчик события{' '}
        <code>onClick</code> для <code>CarouselItem</code>, устанавливая текущий
        индекс на индекс кликнутого изображения.
      </p>
      <p>
        Нам нужно будет создать новый файл в <code>src/components</code>{' '}
        с именем <code>ListingDetailsCardImages.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/components/ListingDetailsCardImages.jsx'>
        {listingDetailsCardImagesCode}
      </CodeHighlighter>
    </div>
  );
};


const listingDetailsCardWithListingDetailsCardImagesCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import ListingDetailsCardImages from '@/components/ListingDetailsCardImages';
import { Card, Separator } from '@/components/ui';

const ListingDetailsCard = ({ listing }) => {
  return (
    <Card className='mx-auto p-4'>
      <ListingDetailsCardImages listing={listing} />
      <Separator className='mb-4' />
      <div className='flex flex-col gap-2'>
        <h1 className='mb-2 text-2xl font-bold'>{listing.name}</h1>
        <div className='flex items-center gap-2'>
          <DollarSign className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            <span className='font-bold text-foreground'>{listing.price}</span> /
            night
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Pin className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>{listing.location.name}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Users className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            {listing.maxGuests} Guests
          </span>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='whitespace-pre-line'>{listing.description}</div>
    </Card>
  );
};

export default ListingDetailsCard;`;

export const Step10 = () => {
  return (
    <div>
      <h2>
        Добавление <code>ListingDetailsCardImages</code> в{' '}
        <code>ListingDetailsCard</code>
      </h2>
      <p>
        Теперь, когда у нас есть компонент <code>ListingDetailsCardImages</code>,
        нам нужно добавить его в наш компонент <code>ListingDetailsCard</code>,
        чтобы показать все изображения. Мы добавим его в самом верху карточки, чтобы
        это было первое, что увидит пользователь, когда он перейдет на страницу с
        деталями.
      </p>
      <p>
        Нам нужно будет импортировать компонент <code>ListingDetailsCardImages</code>
        и отрендерить его внутри компонента <code>ListingDetailsCard</code>,
        передав ему <code>listing</code> в качестве props. Также мы добавим{' '}
        <code>Separator</code> с небольшим отступом, чтобы все выглядело
        аккуратно.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingDetailsCard</code> со
        следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 9, 10]}
        title='src/components/ListingDetailsCard.jsx'
      >
        {listingDetailsCardWithListingDetailsCardImagesCode}
      </CodeHighlighter>
    </div>
  );
};


const notFoundPageCode = `import { Link } from 'react-router-dom';

import { Button, Card } from '@/components/ui';

const NotFoundPage = () => {
  return (
    <div className='container flex h-screen w-screen items-center justify-center py-4 text-center'>
      <Card className='p-8'>
        <h1>Page not found</h1>
        <p className='pb-2'>
          Unfortunately, the page that you're looking for does not exist.
        </p>
        <Button asChild>
          <Link to='/' replace>
            Back to Home
          </Link>
        </Button>
      </Card>
    </div>
  );
};

export default NotFoundPage;`;

export const Step11 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>NotFoundPage</code>
      </h2>
      <p>
        Отлично! Наша страница с деталями объявления завершена! Теперь давайте
        вернемся к нашему маршрутизатору, потому что нам нужно позаботиться о
        еще одной вещи в нашем приложении. Вы заметите, что если мы вручную
        изменим URL в браузере на что-то другое, кроме того, что мы
        настроили, мы получим неприятную ошибку. Это не лучший пользовательский
        опыт, и нам нужно это исправить.
      </p>
      <p>
        Способ, которым мы можем это исправить с помощью <code>react-router-dom</code>,
        заключается в том, что нам нужно предоставить резервный компонент в случае,
        если текущий URL не соответствует ни одному из действительных маршрутов,
        которые в данный момент только <code>/</code> и <code>/listings/:listingId</code>.
        Мы можем создать общий компонент страницы <code>NotFoundPage</code>, чтобы
        отобразить интерфейс для пользователей, если они туда попадут.
      </p>
      <p>
        На этой странице мы также должны добавить кнопку для возврата на главную
        страницу, чтобы пользователям было легче вернуться назад. Мы снова
        воспользуемся компонентом <code>Link</code>, чтобы отправить пользователей
        на главную страницу. Мы также передадим <code>replace</code> в качестве props
        компоненту <code>Link</code>, чтобы вся история была заменена, и
        пользователи не могли вернуться на страницу с ошибкой.
      </p>
      <p>
        Нам нужно будет создать новый файл внутри <code>src/pages</code> под
        названием <code>NotFoundPage.jsx</code> с следующим кодом:
      </p>
      <CodeHighlighter title='src/pages/NotFoundPage.jsx'>
        {notFoundPageCode}
      </CodeHighlighter>
    </div>
  );
};


const routerWithNotFoundPageCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
import NotFoundPage from '@/pages/NotFoundPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/listings/:listingId',
        element: <ListingDetailsPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step12 = () => {
  return (
    <div>
      <h2>
        Добавление <code>NotFoundPage</code> в <code>router</code>
      </h2>
      <p>
        Теперь, когда у нас есть наш компонент <code>NotFoundPage</code>, нам
        нужно подключить его к нашему <code>router</code>, чтобы он действовал
        как резервный вариант для любого маршрута, который не обрабатывается.
        Для этого нам нужно будет использовать свойство <code>errorElement</code>.
      </p>
      <p>
        С помощью <code>react-router-dom</code> мы можем легко передать любой
        компонент, чтобы он действовал как резервный вариант ошибки. Это означает,
        что когда наши пользователи перейдут на страницу, которая не настроена,
        вместо того чтобы показывать неприятную ошибку, <code>react-router-dom</code>
        отобразит этот компонент.
      </p>
      <p>
        Все, что нам нужно сделать, это передать <code>NotFoundPage</code> как{' '}
        <code>errorElement</code> в нашем маршрутизаторе, под основным маршрутом <code>/</code>.
        Это обработает все наши ошибки на любом маршруте. После этого мы сможем
        ввести любой недопустимый URL, и мы всегда будем видеть этот компонент,
        что является гораздо лучшим пользовательским опытом.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>Router</code> следующим кодом:
      </p>
      <CodeHighlighter highlightedLines={[5, 13]} title='src/Router.jsx'>
        {routerWithNotFoundPageCode}
      </CodeHighlighter>
    </div>
  );
};


export const Completed = () => {
  return (
    <div className='relative'>
      <CheckCircle className='mx-auto mb-8 h-40 w-40' />
      <h2>Модуль завершён!</h2>
      <p>
        Поздравляем! Вы успешно завершили 4-й модуль курса. Теперь вы сможете
        перемещаться между главной страницей и страницей деталей объявления,
        нажав на любое объявление!
      </p>
      <p>
        В этом модуле мы научились работать с{' '}
        <code>react-router-dom</code>, как создать маршрутизатор с помощью{' '}
        <code>createBrowserRouter</code> и передать его в наше приложение
        через <code>RouterProvider</code>. Мы узнали, как перемещаться между
        маршрутами и передавать параметры, а также как создать свой собственный
        компонент "страница не найдена".
      </p>
      <p>
        Чтобы перейти к следующему модулю, просто выберите{' '}
        <code>5-hooks-and-performance</code> из выпадающего списка выше.
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

