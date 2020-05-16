class HttpError extends Error {
  url: string | null = null;
  response: object | string | null = null;
  status: number | null = null;
  statusText: string | null = null;
}

const getJson = (response: Response) => response.json();

const handleError = async (response: Response) => {
  if (response.ok) {
    return response;
  }

  const error = new HttpError(`${response.status} ${response.statusText}`);

  error.url = response.url;
  error.status = response.status;
  error.statusText = response.statusText;

  const body = await response.text();

  try {
    const parsedBody = JSON.parse(body);
    error.response = parsedBody;
  } catch (error) {} // eslint-disable-line

  throw error;
};

export { getJson, handleError };
