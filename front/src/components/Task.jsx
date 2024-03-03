import { Link, useFetcher } from 'react-router-dom';

export default function Task({ task }) {
  const fetcher = useFetcher();
  return (
    task && (
      <div
        className={`${
          task.status === 'done' ? 'bg-green-50' : ''
        } flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow`}
      >
        <div className="flex flex-col w-full justify-between p-4 leading-normal">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{task.title}</h2>
          <p className="mb-3 font-normal text-gray-700">{task.description}</p>
        </div>
        <div className="flex flex-row flex-wrap md:flex-nowrap gap-2 justify-between w-full px-4 pb-2">
          <div className="text-left uppercase font-medium text-xs">{task.status}</div>
          <div className="flex flex-row gap-2 flex-wrap md:flex-nowrap">
            <fetcher.Form method="post">
              <input type="hidden" name="taskId" defaultValue={task._id} />
              <button
                name="status"
                value={task.status === 'pending' ? 'done' : 'pending'}
                className="py-1 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              >
                {task.status === 'pending' ? 'Mark completed' : 'Mark uncompleted'}
              </button>
            </fetcher.Form>
            <Link
              to={`/tasks/${task._id}/edit`}
              className="flex py-1 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Edit
            </Link>
            <fetcher.Form
              method="post"
              action="/tasks/detete"
              onSubmit={(event) => {
                if (!confirm('Please confirm you want to delete this task.')) {
                  event.preventDefault();
                }
              }}
            >
              <input type="hidden" name="taskId" defaultValue={task._id} />
              <button className="py-1 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                Delete
              </button>
            </fetcher.Form>
          </div>
        </div>
      </div>
    )
  );
}
