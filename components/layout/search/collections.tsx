// @/components/layout/search/collections
import clsx from 'clsx';
import { Suspense } from 'react';

// import { getCollections } from 'lib/saleor';
// import FilterList from './filter';
import FilterList, { PathFilterItem } from './filter';
import { getCategories } from '@/lib/commercetools/queries/getCategories';

async function CollectionList() {
  const categories = await getCategories(); // Fetch categories
  const formattedCategories: PathFilterItem[] = categories.map((category: { name: any; key: any; }) => ({
    title: category.name,
    path: `/search/${category.key}`, // Constructing a path using the category key
  }));

  // Include a default "All" category
  const allCategories = [
    { title: 'All', path: '/search' },
    ...formattedCategories,
  ];

  return <FilterList list={allCategories} title="Collections" />;
}

// async function CollectionList() {
//   // const collections = await getCollections();
//   const categories = await getCategories();
//   return <FilterList list={categories.results} title="Collections" />;
// }

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}
