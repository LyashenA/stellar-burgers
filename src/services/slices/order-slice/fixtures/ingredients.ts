import data from '../../../../../cypress/fixtures/ingredients.json';

export const bun = data.data.find(item => item.type === 'bun')!;
export const salad = data.data.find(item => item.name.includes('салат'))!;
export const cheese = data.data.find(item => item.name.includes('Сыр'))!;
export const meat = data.data.find(item => item.name.includes('Биокотлета'))!;