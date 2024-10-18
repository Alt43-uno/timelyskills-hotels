import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Подготовить <code>HomePage</code> для получения данных',
  'Получить листинги в <code>HomePage</code>',
  'Добавить состояние загрузки в <code>HomePage</code>',
  'Добавить состояние ошибки в <code>HomePage</code>',
  'Добавить фильтры в <code>HomePage</code>',
  'Реализовать AbortController в <code>HomePage</code>',
  'Обновить <code>ListingCard</code> с новыми данными',
  'Создать компонент <code>ListingCardImages</code>',
  'Обновить <code>ListingCard</code> с <code>ListingCardImages</code>',
];


export const Intro = () => {
  return (
    <div>
      <h2>Модуль 3 - Эффекты и получение данных</h2>
      <Separator className='mb-2' />
      <p>
        В этом модуле мы будем работать с эффектами и получением данных. Мы
        узнаем о <code>useEffect</code> и о том, как он работает, изучим
        массивы зависимостей, а также жизненный цикл эффекта в компоненте
        React.
      </p>
      <p>
        Мы также научимся получать данные из API, используя <code>useEffect</code>.
        Мы узнаем, как управлять собственными состояниями загрузки и ошибки, а
        также как предотвратить условия гонки из-за нескольких запросов,
        выполняющихся в разное время!
      </p>
      <h3>Описание</h3>
      <Separator className='mb-2' />
      <p>
        В данный момент, хотя наши <code>listings</code> в <code>HomePage</code>
        являются состоянием, данные непосредственно импортируются из статического
        списка, определенного в <code>src/api/data/listings</code>. Кроме того,
        при применении наших фильтров к <code>listings</code>, мы на самом деле
        фильтруем только импортированный статический список. Нам нужно это
        изменить.
      </p>
      <p>
        Следующий шаг для нас - получить эти данные из API вместо этого. Так
        работает большинство приложений на React в реальном мире, поэтому важно
        знать, как это делать. Для получения наших данных мы будем использовать
        пользовательскую обертку вокруг <code>axios</code>, которая доступна в
        проекте в папке <code>api</code>.
      </p>
      <p>
        Важно отметить, что <code>api</code>, доступный в нашем приложении, является
        макетом API. Это означает, что мы будем работать с ним и вызывать его так,
        как мы сделали бы в реальном приложении, но все данные замокированы. Данные
        будут поступать из <code>localStorage</code>, который инициализируется из
        того же статического списка <code>listings</code>, который мы использовали
        до сих пор. Мы делаем это, потому что у нас нет бэкенда для этого
        приложения, поэтому мы имитируем его. Но это отлично, потому что мы
        получаем все преимущества работы с API, не реализуя свой собственный
        бэкенд!
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


const homePagePreparedForFetchingCode = `import { useState } from 'react';

import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);

  const handleFilters = (filters) => {
    // Will implement later
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

export const Step1 = () => {
  return (
    <div>
      <h2>
        Подготовка <code>HomePage</code> для получения данных
      </h2>
      <p>
        Первое, что нам нужно сделать, это удалить{' '}
        <code>staticListings</code> из <code>HomePage</code>, так как мы больше
        не будем использовать их напрямую. Мы собираемся подготовить{' '}
        <code>HomePage</code> для получения <code>listings</code> из макета API.
        Затем мы установим наше начальное состояние <code>listings</code> как
        пустой массив. Это заставит наши <code>listings</code> исчезнуть из
        пользовательского интерфейса на данный момент, но не волнуйтесь, мы
        добавим их обратно на следующем шаге.
      </p>
      <p>
        Затем нам также нужно будет удалить нашу реализацию{' '}
        <code>handleFilters</code>, так как фильтрация больше не будет
        происходить в компоненте <code>HomePage</code>. На следующих шагах мы
        реализуем фильтрацию, отправляя данные в API. Пока мы оставим
        функцию <code>handleFilters</code> пустой с комментарием, чтобы напомнить
        нам, что нам нужно будет реализовать ее позже.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> следующим
        кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[8, 11]}
        title='src/pages/HomePage.jsx'
      >
        {homePagePreparedForFetchingCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithFetchingCode = `import { useEffect, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await api.get('/api/listings');
      setListings(response.data);
    };

    fetchListings();
  }, []);

  const handleFilters = (filters) => {
    // Will implement later
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

export const Step2 = () => {
  return (
    <div>
      <h2>
        Получение объявлений в <code>HomePage</code>
      </h2>
      <p>
        Теперь, когда наш <code>HomePage</code> готов для получения данных, мы
        можем начать добавлять код, который это обеспечит. Мы будем обрабатывать
        получение данных с помощью <code>useEffect</code>, и нам нужно будет
        реализовать функцию для получения объявлений. Мы определим эту функцию
        внутри <code>useEffect</code> и вызовем ее, когда <code>HomePage</code>{' '}
        будет смонтирован. Мы назовем ее <code>fetchListings</code>, чтобы было
        ясно, что она делает.
      </p>
      <p>
        Причина, по которой мы определяем <code>fetchListings</code> внутри{' '}
        <code>useEffect</code>, а не снаружи, заключается в том, что нам не
        придется указывать ее в массиве зависимостей. Всегда хорошая идея
        ограничивать количество зависимостей, которые вы передаете в{' '}
        <code>useEffect</code>.
      </p>
      <p>
        Функция <code>fetchListings</code> будет использовать наш обертку{' '}
        <code>api</code> и вызывать конечную точку <code>/api/listings</code>,
        чтобы получить все объявления. Это стандартный способ получения данных из
        API, и наш макет <code>api</code> позволяет нам делать это так, как если
        бы мы получали данные из реального API.
      </p>
      <p>
        Как только мы получим ответ от API, мы обновим{' '}
        <code>listings</code>, вызвав функцию <code>setListings</code> с
        параметром <code>response.data</code>. Это приведет к повторному рендерингу
        нашего компонента и покажет полученные объявления на экране.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> следующим
        кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 3, 11, 12, 13, 14, 15, 16, 17, 18]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithFetchingCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithLoadingCode = `import { useEffect, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);

      const response = await api.get('/api/listings');
      setListings(response.data);

      setIsLoading(false);
    };

    fetchListings();
  }, []);

  const handleFilters = (filters) => {
    // Will implement later
  };

  const renderListingList = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Добавление состояния загрузки в <code>HomePage</code>
      </h2>
      <p>
        Отлично! Наши объявления теперь загружаются из API и правильно отображаются
        на главной странице. Однако есть небольшая ошибка в интерфейсе. В
        текущем виде пользователь видит сообщение «Объявления не найдены.» до тех
        пор, пока запрос не вернет данные, что не является хорошим пользовательским
        опытом. Нам нужно что-то сделать, чтобы сообщить пользователю, что
        объявления загружаются.
      </p>
      <p>
        Для этого нам нужно создать и отслеживать наше собственное состояние
        загрузки. Мы сделаем это с помощью переменной, называемой{' '}
        <code>isLoading</code>. Мы установим ее в <code>true</code> изначально, когда
        наш компонент будет смонтирован, а затем в <code>false</code> после того,
        как запрос вернет некоторые данные. Поскольку мы будем разрешать
        несколько запросов в течение жизненного цикла этого компонента, нам
        также нужно будет убедиться, что мы снова устанавливаем{' '}
        <code>isLoading</code> в <code>true</code> каждый раз, когда вызывается
        функция <code>fetchListings</code>.
      </p>
      <p>
        Чтобы нам было проще отрисовывать различный интерфейс в зависимости от
        состояния загрузки, мы примем шаблон, который обычно используется в
        React. Мы создадим функцию под названием <code>renderListingList</code>,
        которая будет возвращать JSX, который мы хотим отрисовать. Мы можем
        настроить ее так, чтобы она возвращала компонент <code>Spinner</code>,
        пока <code>isLoading</code> равно <code>true</code>, в противном случае
        она будет возвращать компонент <code>ListingList</code>.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> следующим
        кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[
          6, 10, 14, 19, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 47,
        ]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithLoadingCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithErrorCode = `import { useEffect, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/api/listings');
        setListings(response.data);
      } catch {
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleFilters = (filters) => {
    // Will implement later
  };

  const renderListingList = () => {
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

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;`;

export const Step4 = () => {
  return (
    <div>
      <h2>
        Добавление состояния ошибки в <code>HomePage</code>
      </h2>
      <p>
        Наше приложение стало намного более удобным для пользователя! Однако
        есть еще одна вещь, которую нам нужно сделать. Что произойдет, если
        API не работает? Или если возникнет ошибка в нашем запросе? В
        текущем виде наше приложение упадет, и пользователь не будет знать,
        что произошло. Нам нужно обработать состояние ошибки нашего запроса.
      </p>
      <p>
        Так же, как мы создали переменную состояния <code>isLoading</code> для
        отслеживания состояния загрузки, нам нужно создать переменную
        состояния <code>error</code> для нашей ошибки. Если что-то пойдет не
        так с нашим запросом, мы установим <code>error</code> в состояние и
        используем его для отображения интерфейса пользователю. Таким образом,
        независимо от того, что произойдет, пользователь всегда будет видеть
        что-то, и приложение не упадет.
      </p>
      <p>
        Для этого нам нужно будет переместить наш код запроса внутрь блока
        try-catch, чтобы мы могли поймать ошибку, если что-то пойдет не так.
        Мы также должны помнить о сбросе состояния ошибки каждый раз, когда
        вызываем функцию <code>fetchListings</code>, поскольку новый запрос
        должен очищать предыдущую ошибку. Если произойдет ошибка, мы просто
        установим сообщение «Что-то пошло не так. Пожалуйста, попробуйте
        позже.» в состоянии <code>error</code>.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> следующим
        кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[11, 16, 18, 19, 20, 21, 22, 23, 24, 25, 44, 45, 46]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithErrorCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageFetchWithFilters = `import { useEffect, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/api/listings', { params: filters });
        setListings(response.data);
      } catch {
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [filters]);

  const handleFilters = (filters) => {
    setFilters(filters);
  };

  const renderListingList = () => {
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

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Добавление фильтров в <code>HomePage</code>
      </h2>
      <p>
        Теперь, когда наша функция <code>fetchListings</code> работает, мы можем
        начать повторно реализовывать фильтры, которые мы удалили на первом
        шаге. Фильтры теперь будут храниться в состоянии <code>HomePage</code>
        и передаваться в функцию <code>fetchListings</code>. Это упрощает нашу
        задачу, поскольку нам больше не нужно беспокоиться о фильтрации
        списков самостоятельно. Mock API будет обрабатывать это за нас, и нам
        нужно просто передать ему необходимые данные.
      </p>
      <p>
        Нам нужно создать новую переменную состояния, названную
        <code>filters</code>. Это будет объект с тремя свойствами, которые у нас
        были ранее: <code>dates</code>, <code>guests</code> и <code>search</code>.
        Мы установим начальное состояние для <code>dates</code> в
        <code>undefined</code>, для <code>guests</code> в <code>0</code>, а для
        <code>search</code> — в пустую строку. Затем мы передадим эти фильтры
        в нашу функцию <code>fetchListings</code> как параметры.
      </p>
      <p>
        Поскольку мы теперь используем <code>filters</code> в нашей функции
        <code>fetchListings</code> внутри <code>useEffect</code>, нам нужно будет
        добавить ее в массив зависимостей <code>useEffect</code>. Все, что
        используется внутри <code>useEffect</code>, должно быть в его массиве
        зависимостей. Это приведет к повторному вызову функции
        <code>fetchListings</code> каждый раз, когда изменяются
        <code>filters</code>, что нам и нужно.
      </p>
      <p>
        Наконец, нам нужно снова реализовать нашу функцию
        <code>handleFilters</code>, что, к счастью, будет действительно легко!
        Единственное, что нам нужно сделать, это установить фильтры, которые мы
        получаем от компонента <code>ListingFilters</code>, в состояние
        <code>HomePage</code>. Поскольку мы добавили <code>filters</code> в массив
        зависимостей нашего <code>useEffect</code>, функция
        <code>fetchListings</code> будет вызываться автоматически каждый раз,
        когда они изменяются.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> следующим
        кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[12, 13, 14, 15, 16, 24, 34, 37]}
        title='src/pages/HomePage.jsx'
      >
        {homePageFetchWithFilters}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithAbortControllerCode = `import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const abortController = useRef(null);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);

      abortController.current = new AbortController();

      try {
        const response = await api.get('/api/listings', {
          params: filters,
          signal: abortController.current?.signal,
        });
        setListings(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();

    return () => {
      abortController.current?.abort();
    };
  }, [filters]);

  const handleFilters = (filters) => {
    setFilters(filters);
  };

  const renderListingList = () => {
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

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;`;

export const Step6 = () => {
  return (
    <div>
      <h2>
        Реализация AbortController в <code>HomePage</code>
      </h2>
      <p>
        Наш процесс получения данных почти завершен. Однако у нас есть еще один
        недостающий элемент. Давайте подумаем о другой ситуации, которая может
        произойти. В настоящее время, когда компонент <code>HomePage</code>
        монтируется, он немедленно вызывает функцию <code>fetchListings</code>,
        чтобы получить первую партию <code>listings</code>. Что произойдет, если
        пользователь изменит <code>filters</code> до того, как этот запрос вернется?
      </p>
      <p>
        Что ж, как у нас это устроено в данный момент, произойдет второй вызов
        функции <code>fetchListings</code>, потому что изменение фильтров
        вызовет повторный рендеринг в <code>useEffect</code>. Это означает, что
        у нас будет две активные запросы, что недопустимо. Еще хуже, если первый
        запрос задержится по какой-то причине и вернется после второго, он
        перезапишет результаты второго, что приведет к рассинхронизации UI с
        данными. Это называется гонкой условий, и нам нужно этого избежать.
      </p>
      <p>
        Способ, которым мы предотвратим это, заключается в том, чтобы убедиться,
        что любой ожидающий запрос отменяется перед тем, как будет выполнен новый.
        Это гарантирует, что у нас всегда будет только один активный запрос и
        что мы всегда будем видеть самые актуальные результаты.
      </p>
      <p>
        Для этого мы будем использовать <code>AbortController</code>, который
        мы можем использовать для отмены запроса. Нам нужно будет хранить его в
        компоненте. Однако, поскольку мы не отображаем контроллер в UI, мы
        можем хранить его в ref с помощью <code>useRef</code>, чтобы избежать
        перерисовки нашего компонента каждый раз, когда он изменяется.
      </p>
      <p>
        Все это будет сделано в <code>useEffect</code>. Перед каждым запросом
        мы установим новый <code>AbortController</code> в наш ref, затем передадим
        его объект <code>signal</code> в наш запрос, а затем в функции очистки
        эффекта мы вызовем функцию <code>abort</code> для отмены запроса. Это
        означает, что всякий раз, когда мы снова запускаем эффект, обновляя
        <code>filters</code>, мы сначала отменим предыдущий запрос через функцию
        очистки, и у нас всегда будет новый контроллер отмены для нашего нового
        запроса.
      </p>
      <p>
        Важно отметить, что наш <code>api</code>, а значит и
        <code>axios</code> под капотом, будет выбрасывать ошибку каждый раз,
        когда запрос отменяется. Это означает, что эта ошибка будет поймана в
        блоке <code>catch</code> нашего кода. В этом случае мы не хотим
        устанавливать ошибку в нашем состоянии, мы хотим ее игнорировать. Для
        этого нам нужно будет импортировать <code>axios</code> и использовать
        функцию <code>isCancel</code> для обработки ошибки перед тем, как установить
        состояние. Если ошибка возникает из-за отмены, мы ее игнорируем.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> следующим
        кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 2, 19, 26, 31, 34, 35, 36, 37, 46, 47, 48]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithAbortControllerCode}
      </CodeHighlighter>
    </div>
  );
};


const listingCardWithNewDataCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import { Card, CardContent } from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingCard = ({ listing }) => {
  return (
    <Card className='w-[320px]'>
      <img
        className='h-[200px] w-full rounded-md object-cover'
        src={getImageUrl(listing.images[0])}
        alt={listing.name}
      />
      <CardContent className='flex flex-col gap-2 p-4'>
        <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
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
      </CardContent>
    </Card>
  );
};

export default ListingCard;`;

export const Step7 = () => {
  return (
    <div>
      <h2>
        Обновление <code>ListingCard</code> с новыми данными
      </h2>
      <p>
        Теперь, когда мы завершили процесс получения данных, мы можем внести
        некоторые изменения в компонент <code>ListingCard</code>, чтобы использовать
        их. Поскольку мы теперь получаем наши <code>listings</code> из
        <code>api</code>, у нас есть доступ к дополнительным данным, которых
        у нас не было ранее. Это потому, что <code>api</code> фактически
        обрабатывает каждое <code>listing</code> и добавляет к нему некоторые
        связанные данные перед его возвратом.
      </p>
      <p>
        Мы добавим больше деталей в компонент <code>ListingCard</code>, чтобы
        использовать эти данные. Мы покажем цену <code>listing</code>,
        местоположение, максимальное количество гостей, а в следующих шагах
        мы также добавим все его оставшиеся изображения в карусели изображений.
      </p>
      <p>
        Для этого сначала нужно импортировать и использовать несколько компонентов
        из папки <code>src/components/ui</code>. Мы также будем использовать
        новые иконки из <code>lucide-react</code>. С их помощью мы добавим
        еще несколько деталей в <code>CardContent</code> компонента
        <code>ListingCard</code>.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingCard</code>
        следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[
          1, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          31, 32,
        ]}
        title='src/components/ListingCard.jsx'
      >
        {listingCardWithNewDataCode}
      </CodeHighlighter>
    </div>
  );
};


const listingCardImagesCode = `import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingCardImages = ({ listing }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Carousel
      className='w-full'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CarouselContent className='ml-0'>
        {listing.images.map((image, index) => (
          <CarouselItem key={image} className='pl-0'>
            <img
              className='h-[200px] w-full rounded-md object-cover'
              src={getImageUrl(image)}
              alt={\`\${listing.name} Image \${index + 1}\`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {isHovering && (
        <>
          <CarouselPrevious className='absolute left-4' />
          <CarouselNext className='absolute right-4' />
        </>
      )}
    </Carousel>
  );
};

export default ListingCardImages;`;

export const Step8 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingCardImages</code>
      </h2>
      <p>
        Следующее, что нам нужно сделать, это улучшить отображение
        изображений объявления. В настоящее время отображается только первое
        изображение, а остальные игнорируются. Мы собираемся изменить это,
        добавив красивую карусель изображений в компонент <code>ListingCard</code>.
      </p>
      <p>
        Мы создадим для этого новый компонент, который назовем{' '}
        <code>ListingCardImages</code>. Этот компонент будет использовать
        компонент <code>Carousel</code> из папки <code>src/components/ui</code>
        и будет отображать все изображения объявления.
      </p>
      <p>
        Мы сделаем так, чтобы этот компонент принимал <code>listing</code>
        в качестве пропса и использовал его для перебора каждого из изображений
        и рендеринга карусели. Мы будем использовать тот же тег <code>img</code>,
        который мы использовали ранее для каждого элемента, но интегрируем его
        в компонент <code>CarouselItem</code>.
      </p>
      <p>
        Мы также захотим отобразить несколько кнопок для навигации между
        различными изображениями. Эти кнопки будут использовать компоненты
        <code>CarouselPrevious</code> и <code>CarouselNext</code>. Все это
        будет работать вместе, потому что <code>Carousel</code> является
        составным компонентом, и каждый из этих компонентов принадлежит ему.
      </p>
      <p>
        Последнее, что нам нужно сделать, это показывать кнопки "предыдущее"
        и "следующее" только если пользователь в настоящее время наводит курсор
        на карусель. Таким образом, мы сохраняем наш интерфейс чистым, не
        теряя функциональность. Для этого нам нужно будет создать новую
        переменную состояния с названием <code>isHovering</code> и обновлять ее,
        используя обработчики событий <code>onMouseEnter</code> и{' '}
        <code>onMouseLeave</code> на <code>Carousel</code>.
      </p>
      <p>
        Нам нужно будет создать новый файл внутри директории <code>src/components</code>
        с названием <code>ListingCardImages.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/components/ListingCardImages.jsx'>
        {listingCardImagesCode}
      </CodeHighlighter>
    </div>
  );
};


const listingCardWithListingCardImagesCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import ListingCardImages from '@/components/ListingCardImages';
import { Card, CardContent } from '@/components/ui';

const ListingCard = ({ listing }) => {
  return (
    <Card className='w-[320px]'>
      <ListingCardImages listing={listing} />
      <CardContent className='flex flex-col gap-2 p-4'>
        <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
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
      </CardContent>
    </Card>
  );
};

export default ListingCard;`;

export const Step9 = () => {
  return (
    <div>
      <h2>
        Обновление <code>ListingCard</code> с помощью <code>ListingCardImages</code>
      </h2>
      <p>
        Последнее, что нам нужно сделать, это добавить наш новый{' '}
        <code>ListingCardImages</code> компонент в <code>ListingCard</code>,{' '}
        чтобы наша карусель изображений могла отображаться. Мы сделаем это,
        импортировав компонент <code>ListingCardImages</code> и рендеря его внутри{' '}
        <code>ListingCard</code>.
      </p>
      <p>
        Мы заменим существующий тег <code>img</code>, который у нас был ранее
        для первого изображения, и вместо этого будем использовать компонент
        <code>ListingCardImages</code>. Нам нужно будет передать ему{' '}
        <code>listing</code> в качестве пропса, чтобы он работал корректно.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingCard</code> со
        следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 9]}
        title='src/components/ListingCard.jsx'
      >
        {listingCardWithListingCardImagesCode}
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
        Поздравляем! Вы успешно завершили третий модуль курса. Теперь ваши
        объявления должны извлекаться через наше мок API, вы должны обработать
        состояния загрузки и ошибок, а также успешно предотвратить гонки
        условий!
      </p>
      <p>
        В этом модуле мы научились работать с API, как извлекать данные с
        помощью <code>useEffect</code>, как обрабатывать состояния загрузки и
        ошибок, а также как использовать контроллеры прерывания для предотвращения
        гонок условий. Мы также работали с рефами и увидели, как можно использовать
        их в качестве альтернативы состоянию, когда нам не нужно отображать значение
        в пользовательском интерфейсе.
      </p>
      <p>
        Убедитесь, что вы правильно выполнили шаги, так как следующий модуль
        начнётся прямо с того места, где мы остановились.
      </p>
      <p>
        Чтобы перейти к следующему модулю, просто выберите{' '}
        <code>4-routes-and-navigation</code> из выпадающего списка выше.
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

