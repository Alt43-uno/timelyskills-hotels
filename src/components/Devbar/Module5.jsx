import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Создать пользовательский хук <code>useFetch</code>',
  'Рефакторить <code>HomePage</code> с использованием <code>useFetch</code>',
  'Предотвратить бесконечный цикл в <code>HomePage</code> с помощью <code>useMemo</code>',
  'Предотвратить ненужные повторные рендеры <code>ListingFilters</code> с помощью <code>useCallback</code>',
  'Обернуть <code>ListingFilters</code> в <code>memo</code>',
  'Рефакторить <code>ListingDetailsPage</code> с использованием <code>useFetch</code>',
  'Создать компонент <code>DataRenderer</code>',
  'Обновить <code>HomePage</code> с использованием <code>DataRenderer</code>',
  'Обновить <code>ListingDetailsPage</code> с использованием <code>DataRenderer</code>',
  'Добавить поддержку кэширования в <code>useFetch</code>',
];


export const Intro = () => {
  return (
    <div>
      <h2>Модуль 5 - Хуки и производительность</h2>
      <Separator className='mb-2' />
      <p>
        В этом модуле мы сосредоточимся на оптимизации и рефакторинге нашего кода,
        вместо добавления новых функций. Мы научимся мыслить в React и
        применять лучшие практики React. Мы улучшим производительность нашего кода
        и компонентов, а также избавимся от некоторых повторяющихся частей кода,
        которые мы добавили до сих пор.
      </p>
      <h3>Описание</h3>
      <Separator className='mb-2' />
      <p>
        В настоящее время у нас много повторяющегося кода в нашем приложении.
        У нас есть один и тот же код для получения данных в компонентах <code>HomePage</code> и{' '}
        <code>ListingDetailsPage</code>, мы обрабатываем состояния ошибок и загрузки
        одинаковым образом, и мы даже создали одинаковые функции рендеринга,
        которые отображают наши данные в обоих компонентах! Пришло время
        оптимизировать и рефакторить.
      </p>
      <p>
        Для этого мы сделаем две вещи. Во-первых, мы создадим пользовательский
        хук для обработки получения данных в любом компоненте. Мы извлечем код
        для получения, загрузки и обработки ошибок в него. Во-вторых, мы создадим
        компонент для автоматической отрисовки наших данных, учитывающий ошибки
        и состояние загрузки. Мы сможем использовать этот компонент вместо наших
        собственных функций рендеринга в каждом компоненте. Кроме того, в
        процессе рефакторинга нашего кода нам придется использовать{' '}
        <code>useMemo</code> и <code>useCallback</code>, чтобы улучшить
        производительность нашего приложения.
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


const useFetchCode = `import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import api from '@/api';

const useFetch = (url, options) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setIsLoading(true);

      abortControllerRef.current = new AbortController();

      try {
        const response = await api.get(url, {
          ...options,
          signal: abortControllerRef.current?.signal,
        });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [options, url]);

  return { data, error, isLoading };
};

export default useFetch;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Создание пользовательского хука <code>useFetch</code>
      </h2>
      <p>
        Наш код начинает выглядеть немного неаккуратно. У нас есть повторяющийся код в двух местах: в
        <code>HomePage</code> и в <code>ListingDetailsPage</code>. Оба компонента получают данные,
        обрабатывают состояния загрузки и ошибок, и, наконец, отображают данные с помощью
        пользовательской функции одинаковым образом. Это отличное применение для
        пользовательского переиспользуемого хука!
      </p>
      <p>
        Что мы можем сделать, чтобы улучшить это, так это создать пользовательский хук для
        обработки всех запросов данных, который мы сможем переиспользовать в обоих компонентах.
        Мы назовем его <code>useFetch</code>, и он будет принимать <code>url</code> для
        получения данных и некоторые необязательные <code>options</code>, которые будут переданы
        в <code>api</code>. Этот хук будет иметь ту же функциональность, что и в
        обоих компонентах.
      </p>
      <p>
        Наш хук <code>useFetch</code> будет иметь <code>useEffect</code>, который будет
        получать данные на основе предоставленного <code>url</code>, он будет управлять
        своими собственными состояниями загрузки и ошибок, обрабатывать состояния гонки
        с помощью <code>AbortController</code>, и, наконец, возвращать объект с тремя
        свойствами: <code>data</code>, <code>error</code> и <code>isLoading</code>,
        которые будут использоваться в компоненте.
      </p>
      <p>
        Нам нужно создать новый файл в папке <code>src/hooks</code> с названием
        <code>useFetch.js</code> и следующим кодом:
      </p>
      <CodeHighlighter title='src/hooks/useFetch.js'>
        {useFetchCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithUseFetchCode = `import { useState } from 'react';

import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';
import useFetch from '@/hooks/useFetch';

const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const {
    data: listings,
    error,
    isLoading,
  } = useFetch('/api/listings', { params: filters });

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

export const Step2 = () => {
  return (
    <div>
      <h2>
        Рефакторинг <code>HomePage</code> с помощью <code>useFetch</code>
      </h2>
      <p>
        Теперь, когда мы создали наш хук <code>useFetch</code>, мы можем
        рефакторить <code>HomePage</code>, чтобы использовать его и избавиться от
        лишнего кода. Это сделает наш компонент <code>HomePage</code> намного
        меньше и проще в работе.
      </p>
      <p>
        Мы избавимся от состояний <code>error</code> и <code>isLoading</code>,
        поскольку теперь они будут обрабатываться нашим кастомным хуком. Также
        мы уберем состояние <code>listings</code> и <code>useEffect</code>,
        который загружал наши объявления, так как они больше не нужны.
      </p>
      <p>
        Мы можем заменить все это значениями, возвращаемыми из <code>useFetch</code>.
        Чтобы наш компонент работал так же, как и раньше, нам нужно будет
        переименовать <code>data</code> в <code>listings</code>, а также получить
        значения <code>error</code> и <code>isLoading</code>. Нам также нужно
        будет передать <code>filters</code> в качестве параметров через второй
        аргумент <code>useFetch</code>.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[6, 15, 16, 17, 18, 19]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithUseFetchCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithUseMemoCode = `import { useMemo, useState } from 'react';

import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';
import useFetch from '@/hooks/useFetch';

const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  const {
    data: listings,
    error,
    isLoading,
  } = useFetch('/api/listings', fetchOptions);

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

export const Step3 = () => {
  return (
    <div>
      <h2>
        Предотвращение бесконечного цикла в <code>HomePage</code> с помощью{' '}
        <code>useMemo</code>
      </h2>
      <p>
        Мы только что упростили наш компонент <code>HomePage</code>, что
        замечательно! Но есть проблема. Из-за нашего рефакторинга, кажется,
        мы ввели ошибку. Теперь объявления загружаются снова и снова в
        бесконечном цикле, что не хорошо!
      </p>
      <p>
        Бесконечный цикл вызван аргументом <code>options</code>, который мы
        передали в <code>useFetch</code>. Эти <code>options</code> передаются
        как зависимости в хук <code>useEffect</code> внутри{' '}
        <code>useFetch</code>. В React значения, которые не являются примитивами,
        такими как массивы и объекты, не стабильны между перерисовками. Они
        создаются заново и получают другую идентичность, что заставляет{' '}
        <code>useEffect</code> считать, что его зависимости изменились.
      </p>
      <p>
        Когда зависимости <code>useEffect</code> изменяются, код внутри него
        снова выполняется. Вот что происходит. Функция <code>fetchData</code>
        внутри <code>useFetch</code> вызывается при каждом рендере, что
        вызывает бесконечный цикл.
      </p>
      <p>
        Решение заключается в использовании хука <code>useMemo</code> из React,
        который позволит нам создать переменную, которая будет одинаковой при
        каждом рендере, если мы не хотим, чтобы она менялась. Это
        называется стабильной ссылкой. Затем мы можем передать эту переменную
        в <code>useFetch</code> вместо объекта <code>options</code> напрямую.
      </p>
      <p>
        Мы можем просто создать новую переменную <code>fetchOptions</code> с
        тем же объектом, что и ранее, но теперь мы оборачиваем ее в{' '}
        <code>useMemo</code>. Поскольку <code>fetchOptions</code> использует и
        зависит от <code>filters</code>, нам нужно будет предоставить{' '}
        <code>filters</code> в массив зависимостей{' '}
        <code>useMemo</code>. Это сделает нашу <code>fetchOptions</code>{' '}
        стабильной между перерисовками, за исключением случаев, когда{' '}
        <code>filters</code> изменяются.
      </p>
      <p>
        Нам нужно будет изменить компонент <code>HomePage</code> следующим
        кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 15, 21]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithUseMemoCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithUseCallbackCode = `import { useCallback, useMemo, useState } from 'react';

import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';
import useFetch from '@/hooks/useFetch';

const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  const {
    data: listings,
    error,
    isLoading,
  } = useFetch('/api/listings', fetchOptions);

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

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
        Предотвращение ненужных перерисовок <code>ListingFilters</code> с
        помощью <code>useCallback</code>
      </h2>
      <p>
        Поскольку мы рефакторим компонент <code>HomePage</code>, давайте
        сделаем еще одно небольшое улучшение в нашем коде. В настоящее время
        каждый раз, когда <code>HomePage</code> перерисовывается, также
        перерисовывается компонент <code>ListingFilters</code>. Это происходит
        потому, что в React родительские компоненты вызывают перерисовку
        дочерних компонентов.
      </p>
      <p>
        Давайте подумаем о том, когда <code>HomePage</code> перерисовывается.
        Сначала он рендерится один раз при монтировании, затем происходит
        загрузка, и когда она завершится, <code>HomePage</code> снова
        перерисуется с установленными значениями <code>listings</code> и
        <code>isLoading</code> равными <code>false</code>. Это в сумме 2
        перерисовки, которые будут повторяться каждый раз, когда мы
        инициируем загрузку.
      </p>
      <p>
        Обычно перерисовки не являются проблемой. Но всегда лучше стараться
        избегать их, когда это возможно. В нашем случае у нас есть функция
        <code>handleFilters</code>, которая передается в компонент
        <code>ListingFilters</code>. Эта функция создается заново при каждой
        перерисовке, так как она не является стабильной ссылкой. Это также
        приведет к перерисовке <code>ListingFilters</code>, так как его
        пропсы изменились.
      </p>
      <p>
        Поскольку <code>ListingFilters</code> не зависит от ничего, что есть в
        <code>HomePage</code>, кроме функции обратного вызова <code>onChange</code>,
        мы должны предотвратить его перерисовку, когда перерисовывается
        <code>HomePage</code>. Это поможет нам сэкономить один цикл
        перерисовки, и если в будущем мы добавим больше функционала в
        <code>HomePage</code>, мы будем уверены, что не повлияем на
        производительность из-за избыточной перерисовки <code>ListingFilters</code>.
      </p>
      <p>
        Мы можем решить эту проблему, обернув нашу функцию
        <code>handleFilters</code> в <code>useCallback</code>. Это сделает
        функцию стабильной ссылкой, и она больше не будет вызывать
        перерисовку, если ее массив зависимостей не изменится. Поскольку она в
        настоящее время ни от чего не зависит, этот массив зависимостей будет
        пустым.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> следующим
        кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 23, 24, 25]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithUseCallbackCode}
      </CodeHighlighter>
    </div>
  );
};


const listingsFiltersWithMemoCode = `import { Search } from 'lucide-react';
import { memo, useState } from 'react';

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

export default memo(ListingFilters);`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Обертывание <code>ListingFilters</code> с помощью <code>memo</code>
      </h2>
      <p>
        Чтобы сделать изменения в <code>useCallback</code> из предыдущего шага
        эффективными, нам нужно обернуть <code>ListingFilters</code> в{' '}
        <code>memo</code>. Это сделает так, что компонент будет перерисовываться
        только тогда, когда его пропсы изменятся. Если мы этого не сделаем,
        даже с <code>useCallback</code> он все равно будет перерисовываться,
        потому что React по умолчанию не проверяет пропсы компонента перед
        тем, как решить, нужно ли его перерисовывать.
      </p>
      <p>
        Единственное, что нам нужно сделать, чтобы это исправить — это импортировать{' '}
        <code>memo</code> из <code>React</code>, а внизу файла, где мы
        экспортируем компонент, обернуть экспорт в <code>memo</code>. Это
        автоматически заставит <code>ListingFilters</code> проверять свои
        собственные пропсы перед тем, как решить, нужно ли его перерисовывать.
      </p>
      <p>
        В React вам всегда нужно оборачивать ваши компоненты в <code>memo</code>{' '}
        всякий раз, когда вы применяете <code>useCallback</code> или <code>useMemo</code>,
        чтобы попытаться предотвратить перерисовки. Использование <code>memo</code>
        гарантирует, что ваши компоненты всегда будут проверять свои пропсы на равенство
        перед перерисовкой, а без этого эти хуки не будут эффективными!
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingFilters</code> следующим
        кодом:
      </p>

      <CodeHighlighter
        highlightedLines={[2, 37]}
        title='src/components/ListingFilters.jsx'
      >
        {listingsFiltersWithMemoCode}
      </CodeHighlighter>
    </div>
  );
};


const listingDetailsWithUseFetchCode = `import { useParams } from 'react-router-dom';

import ListingDetailsCard from '@/components/ListingDetailsCard';
import { Spinner } from '@/components/ui';
import useFetch from '@/hooks/useFetch';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const {
    data: listing,
    error,
    isLoading,
  } = useFetch(${'`/api/listings/${listingId}`'});

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
        Рефакторинг <code>ListingDetailsPage</code> с помощью <code>useFetch</code>
      </h2>
      <p>
        Теперь, когда <code>HomePage</code> завершена, давайте сделаем то же
        самое с компонентом <code>ListingDetailsPage</code>. Нам нужно будет
        избавиться от состояний <code>error</code> и <code>isLoading</code>, а
        также удалить состояние <code>listing</code> и <code>useEffect</code>{' '}
        для загрузки нашего объявления. Всё будет обрабатываться кастомным хуком
        снова.
      </p>
      <p>
        На этот раз нам не нужно будет передавать никаких параметров в
        <code>useFetch</code>, поскольку нам нужен только <code>listingId</code>,
        который передается через <code>url</code> напрямую. Это также означает,
        что здесь нам не нужно использовать <code>useMemo</code>. И поскольку
        этот компонент не передает ничего своим дочерним элементам, нам также
        не нужно беспокоиться о <code>useCallback</code>.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingDetailsPage</code> следующим
        кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[5, 10, 11, 12, 13, 14]}
        title='src/pages/ListingDetailsPage.jsx'
      >
        {listingDetailsWithUseFetchCode}
      </CodeHighlighter>
    </div>
  );
};


const dataRendererCode = `import { Spinner } from '@/components/ui';

const DataRenderer = ({ children, error, isLoading }) => {
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

  return children;
};

export default DataRenderer;`;

export const Step7 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>DataRenderer</code>
      </h2>
      <p>
        Теперь давайте сделаем еще один рефакторинг нашего кода. Каждый раз,
        когда мы загружаем данные для отображения на <code>HomePage</code> и{' '}
        <code>ListingDetailsPage</code>, мы вручную создаем вспомогательную
        функцию для рендеринга пользовательского интерфейса для состояний загрузки
        и ошибки. Это прекрасно для пользовательского опыта, но мы снова
        повторяем одну и ту же логику в обоих компонентах. Точно так же, как
        мы делали это для загрузки, давайте сейчас рефакторим это, чтобы
        создать переиспользуемый компонент, который мы можем использовать в
        обеих страницах для рендеринга нашего интерфейса.
      </p>
      <p>
        Создание пользовательского компонента для этого — хорошая идея,
        потому что это шаблон, который мы, вероятно, будем использовать в
        нескольких местах по мере роста приложения. Всякий раз, когда вы
        замечаете, что повторяете такой код, всегда полезно задать себе вопрос,
        имеет ли смысл абстрагировать это в переиспользуемый хук или компонент.
      </p>
      <p>
        Мы можем создать пользовательский компонент <code>DataRenderer</code>,
        который будет принимать 3 пропса: <code>children</code>, <code>error</code>
        и <code>isLoading</code>. Затем мы можем поместить туда нашу логику
        обработки ошибок и загрузки, так же, как мы делали это в наших
        пользовательских функциях рендеринга.
      </p>
      <p>
        Нам нужно будет создать новый файл в папке <code>components</code> с
        названием <code>DataRenderer.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/components/DataRenderer.jsx'>
        {dataRendererCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithDataRendererCode = `import { useCallback, useMemo, useState } from 'react';

import DataRenderer from '@/components/DataRenderer';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import useFetch from '@/hooks/useFetch';

const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  const {
    data: listings,
    error,
    isLoading,
  } = useFetch('/api/listings', fetchOptions);

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <DataRenderer error={error} isLoading={isLoading}>
        <ListingList listings={listings} />
      </DataRenderer>
    </div>
  );
};

export default HomePage;`;

export const Step8 = () => {
  return (
    <div>
      <h2>
        Обновление <code>HomePage</code> с помощью <code>DataRenderer</code>
      </h2>
      <p>
        Теперь, когда у нас есть компонент <code>DataRenderer</code>, мы можем
        обновить <code>HomePage</code> с его помощью и избавиться от функции
        рендеринга, так как наш новый компонент теперь будет обрабатывать это.
        Все, что нам нужно сделать, это передать ему состояния <code>error</code>
        и <code>isLoading</code>, и он автоматически позаботится обо всем остальном!
      </p>
      <p>
        Преимущество такого подхода в том, что теперь компонент <code>HomePage</code>{' '}
        действительно маленький и простой по сравнению с тем, каким он был раньше.
        С ним гораздо легче работать. Все, что он делает, это хранит хук
        загрузки данных <code>useFetch</code> вместе с фильтрами и передает
        все остальное другим компонентам.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 34, 35, 36]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithDataRendererCode}
      </CodeHighlighter>
    </div>
  );
};


const listingDetailsWithDataRendererCode = `import { useParams } from 'react-router-dom';

import DataRenderer from '@/components/DataRenderer';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import useFetch from '@/hooks/useFetch';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const {
    data: listing,
    error,
    isLoading,
  } = useFetch(${'`/api/listings/${listingId}`'});

  return (
    <div className='container py-4'>
      <DataRenderer error={error} isLoading={isLoading}>
        <ListingDetailsCard listing={listing} />
      </DataRenderer>
    </div>
  );
};

export default ListingDetailsPage;`;

export const Step9 = () => {
  return (
    <div>
      <h2>
        Обновление <code>ListingDetailsPage</code> с помощью <code>DataRenderer</code>
      </h2>
      <p>
        Так же, как мы сделали с <code>HomePage</code>, мы теперь сделаем и с{' '}
        <code>ListingDetailsPage</code>. Мы избавимся от пользовательской функции
        рендеринга и просто используем <code>DataRenderer</code>, передав ему
        состояния <code>error</code> и <code>isLoading</code>.
      </p>
      <p>
        Этот компонент уже был довольно маленьким, но теперь, с этими
        изменениями, он станет еще меньше и легче в управлении. Вот как должны
        выглядеть большинство ваших компонентов в приложении React! Наличие
        маленьких компонентов, таких как эти, хорошо масштабируется и делает
        работу с вашим кодом проще со временем.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingDetailsPage</code> с
        помощью следующего кода:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 18, 19, 20]}
        title='src/pages/ListingDetailsPage.jsx'
      >
        {listingDetailsWithDataRendererCode}
      </CodeHighlighter>
    </div>
  );
};


const useFetchWithCacheCode = `import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

import api from '@/api';
import { getItem, setItem } from '@/lib/utils/localStorage';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

const useFetch = (url, options) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortControllerRef = useRef(null);

  const storageKey = useMemo(() => {
    if (!options?.params) {
      return url;
    }

    return url + '?' + JSON.stringify(options.params);
  }, [options, url]);

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = new Date().getTime();
      const cachedData = getItem(storageKey);

      if (cachedData && currentTime - cachedData.lastFetched < STALE_TIME) {
        setData(cachedData.data);
        setIsLoading(false);
        return;
      }

      abortControllerRef.current = new AbortController();

      setError(null);
      setIsLoading(true);

      try {
        const response = await api.get(url, {
          ...options,
          signal: abortControllerRef.current?.signal,
        });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [options, storageKey, url]);

  useEffect(() => {
    if (!data) return;

    setItem(storageKey, {
      lastFetched: new Date().getTime(),
      data,
    });
  }, [data, storageKey]);

  return { data, error, isLoading };
};

export default useFetch;`;

export const Step10 = () => {
  return (
    <div>
      <h2>
        Добавление поддержки кэша в <code>useFetch</code>
      </h2>
      <p>
        Давайте сделаем одно последнее улучшение. Добавим поддержку кэширования в{' '}
        <code>useFetch</code>. В текущем виде, каждый раз, когда мы переходим на
        <code>HomePage</code> или <code>ListingDetailsPage</code>, мы извлекаем
        данные из API и видим индикатор загрузки. Это неприятно, потому что
        происходит даже тогда, когда мы переходим на любой экран, даже если
        только что извлекли данные несколько секунд назад.
      </p>
      <p>
        В идеале мы должны сохранить извлеченные данные в кэше и установить
        порог времени, по истечении которого мы будем считать данные устаревшими,
        и только когда этот порог будет превышен, мы будем снова извлекать данные.
        Таким образом, если мы недавно извлекли данные, мы можем сразу показать
        их из кэша и улучшить пользовательский опыт.
      </p>
      <p>
        Для этого мы будем использовать <code>localStorage</code> в качестве
        нашего кэша и хранить наши данные там. Мы также будем хранить переменную{' '}
        <code>lastFetched</code>, которая позволит нам проверить, как давно
        данные были извлечены. Наконец, мы используем утилиты{' '}
        <code>localStorage</code>, чтобы реализовать кэширование в{' '}
        <code>useFetch</code>.
      </p>
      <p>
        Нам нужно будет проверить значение <code>lastFetched</code> из{' '}
        <code>localStorage</code>, если оно существует, а затем вернуть
        закэшированные данные, если с момента их извлечения прошло меньше{' '}
        <code>STALE_TIME</code>. Затем мы создадим другой <code>useEffect</code>,
        чтобы хранить закэшированные данные вместе с{' '}
        <code>lastFetched</code> каждый раз, когда <code>data</code> изменяется.
      </p>
      <p>
        Нам нужно будет обновить хук <code>useFetch</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[
          2, 5, 7, 16, 17, 18, 19, 20, 21, 22, 26, 27, 29, 30, 31, 32, 33, 64,
          65, 66, 67, 68, 69, 70, 71,
        ]}
        title='src/hooks/useFetch.js'
      >
        {useFetchWithCacheCode}
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
        Поздравляем! Вы успешно завершили 5-й модуль курса. Приложение теперь должно
        работать точно так же, как и раньше, но с несколькими улучшениями. Теперь у
        вас должна быть полностью работающая кэш-система для извлечения данных,
        основанная на URL и параметрах, а код должен быть гораздо проще, удобнее
        для работы и намного эффективнее!
      </p>
      <p>
        В этом модуле мы научились мыслить по-реактивному и применять лучшие практики
        React при рефакторинге наших компонентов. Мы узнали, как улучшить
        производительность с помощью <code>useMemo</code> и <code>useCallback</code>,
        научились создавать пользовательские хуки, такие как <code>useFetch</code>,
        и даже извлекать общую функциональность в пользовательские компоненты, такие
        как <code>DataRenderer</code>!
      </p>
      <p>
        Чтобы перейти к следующему модулю, просто выберите{' '}
        <code>6-state-management</code> в выпадающем меню выше. Увидимся там!
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

