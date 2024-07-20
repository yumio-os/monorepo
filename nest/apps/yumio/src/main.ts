import { bootstrap } from './bootstrap';

bootstrap('.env.yumio')
  .then()
  .catch((error) => {
    console.error(error);
  });
