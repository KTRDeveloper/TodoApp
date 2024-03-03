// const APIEndPoint = 'http://localhost:3001/api/v1';
const APIEndPoint = import.meta.env.VITE_API_ENDPOINT ?? 'http://localhost:3001/api/v1';

export async function getTasks() {
  const resp = await fetch(`${APIEndPoint}/tasks?sort=-createdAt&limit=100`);
  const data = await resp.json();
  return data;
}

export async function getTaskById(id) {
  const resp = await fetch(`${APIEndPoint}/tasks/${id}`);
  const data = await resp.json();
  return data;
}
export async function createTask(body) {
  const resp = await fetch(`${APIEndPoint}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  return data;
}
export async function updateTaskById(id, body) {
  const resp = await fetch(`${APIEndPoint}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  return data;
}
export async function deleteTaskById(id) {
  const resp = await fetch(`${APIEndPoint}/tasks/${id}`, {
    method: 'DELETE',
  });
  return resp.ok;
}
