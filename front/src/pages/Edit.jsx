import { useLoaderData } from 'react-router-dom';
import EditTask from '../components/EditTask';

export default function Edit() {
  const { task } = useLoaderData();
  return (
    <>
      <h1 className="text-center font-bold text-2xl p-4 uppercase">Edit Task</h1>;
      <EditTask task={task} />
    </>
  );
}
