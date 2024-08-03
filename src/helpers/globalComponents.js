import BaseInput from '../components/global/BaseInput.vue';

const globalComponents = (app) => {
  const components = {
    BaseInput
  };

  for (const [name, component] of Object.entries(components)) {
    app.component(name, component);
  }
};

export default globalComponents;
