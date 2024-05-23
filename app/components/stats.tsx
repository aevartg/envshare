import { ErrorMessage } from '@components/error';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useSwr from 'swr';

export const revalidate = 60;

export const Stats = () => {
  const { data, isLoading, error } = useSwr<{ reads: number; writes: number }>(
    '/api/v1/stats',
    async (url: string) => {
      const response = await fetch(url);
      return response.json();
    }
  );

  if (error) return <ErrorMessage message={error.message} />;
  if (!data && !isLoading) return null;

  const stats = [
    {
      label: 'Documents Encrypted',
      value: data ? data.writes : 0,
    },
    {
      label: 'Documents Decrypted',
      value: data ? data.reads : 0,
    },
  ] satisfies { label: string; value: number }[];

  return (
    <section className="container mx-auto mt-16">
      <ul className="flex gap-4 justify-evenly">
        {stats.map(({ label, value }) => (
          <li
            key={label}
            className="flex max-w-sm items-center justify-between gap-2 px-4 py-3 overflow-hidden rounded m sm:flex-col"
          >
            <dd className="text-2xl font-bold tracking-tight text-center sm:text-5xl text-zinc-200">
              {isLoading ? (
                <SkeletonTheme baseColor="#3F3F464D" highlightColor="#444">
                  <Skeleton width={70} height={48} />
                </SkeletonTheme>
              ) : (
                Intl.NumberFormat('is-IS', { notation: 'compact' }).format(
                  value
                )
              )}
            </dd>
            <dt className="leading-6 text-center text-zinc-500">{label}</dt>
          </li>
        ))}
      </ul>
    </section>
  );
};
