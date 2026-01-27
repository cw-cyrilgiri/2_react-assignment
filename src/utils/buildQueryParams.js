export const buildQueryParams = (searchParams) => {
  const params = {};

  if (searchParams.get('fuel')) {
    params.fuel = searchParams.get('fuel');
  }

  if (searchParams.get('city')) {
    params.city = searchParams.get('city');
  }

  if (searchParams.get('car')) {
    params.car = searchParams.get('car');
  }

  if (searchParams.get('budget')) {
    params.budget = searchParams.get('budget');
  }

  return Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
};
