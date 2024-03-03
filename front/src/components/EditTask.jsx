import { Form } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function EditTask({ task }) {
  const navigate = useNavigate();
  return (
    <Form method="post" className="w-full max-w-lg">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Title
          <input
            type="text"
            className="bg-gray-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your task title"
            required
            defaultValue={task?.title}
            name="title"
          />
        </label>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Description
          <textarea
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Provide a description of your task..."
            defaultValue={task?.description}
            required
            name="description"
          ></textarea>
        </label>
      </div>
      <div className="flex justify-between gap-3 mt-5">
        <button
          onClick={() => {
            navigate('/');
          }}
          type="button"
          className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
