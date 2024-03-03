import { Link, useLoaderData } from 'react-router-dom';
import Task from '../components/Task';

export default function Home() {
  const { tasksData } = useLoaderData();
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="w-full text-center font-bold text-2xl p-4 uppercase">My Todo list</h1>
      <div className="w-full flex flex-col gap-3 items-center md:max-w-2xl">
        <div className="w-full flex justify-end">
          <Link
            to={`/tasks/new/edit`}
            className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            New Task
          </Link>
        </div>

        <div className="flex w-full flex-col gap-3">
          {tasksData &&
            tasksData.docs.map((t) => {
              return <Task key={t._id} task={t} />;
            })}
        </div>
      </div>
    </div>
  );
}
