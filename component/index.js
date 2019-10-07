const componentDir = 'src/components/{{name}}';

module.exports = {
  description: 'Generate a component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of component:',
      default: 'Button',
    },
  ],
  actions: [
    {
      type: 'add',
      path: `${componentDir}/index.ts`,
      templateFile: './component/index.ts.hbs',
    },
    {
      type: 'add',
      path: `${componentDir}/{{name}}.tsx`,
      templateFile: './component/Component.tsx.hbs',
    },
    {
      type: 'add',
      path: `${componentDir}/types.ts`,
      templateFile: './component/types.ts.hbs',
    },
  ],
};
