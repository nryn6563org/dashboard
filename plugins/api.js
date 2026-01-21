export default function ({ $axios, redirect }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  });

  // Set base URL
  api.setBaseURL('http://localhost:4000/api');

  // Inject to context as $api
  inject('api', api);
}
