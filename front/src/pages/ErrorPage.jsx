import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="w-full h-full flex-1 flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-2xl p-4 uppercase">Error!</h1>
      <p className="text-lg font-semibold">Sorry, an error has occurred.</p>
      <p>
        <i className="italic">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
