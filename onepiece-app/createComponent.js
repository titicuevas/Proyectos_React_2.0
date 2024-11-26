import fs from 'fs';
const components = [
  'CharacterList',
  'SagaList',
  'FruitList',
  'HakiList',
  'CrewList',
  'BoatList',
];

const componentTemplate = (name) => `
  import React from 'react';

  const ${name} = () => {
    return (
      <div>
        <h1>${name}</h1>
      </div>
    );
  };

  export default ${name};
`;

components.forEach((component) => {
  const dir = `./src/components`;
  const filePath = `${dir}/${component}.jsx`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, componentTemplate(component));
  console.log(`Created: ${filePath}`);
});
