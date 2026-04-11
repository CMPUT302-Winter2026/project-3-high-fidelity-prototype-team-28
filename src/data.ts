import { Word, Category } from './types';

export const categories: { name: Category; icon: string; description: string; colorClass: string; textColorClass: string; iconColorClass: string }[] = [
  { 
    name: 'Family', 
    icon: 'Users', 
    description: 'Explore wahkohtowin', 
    colorClass: 'bg-primary-container',
    textColorClass: 'text-on-primary-container',
    iconColorClass: 'text-on-primary-container/40'
  },
  { 
    name: 'Animals', 
    icon: 'PawPrint', 
    description: 'See pisiskiwak', 
    colorClass: 'bg-surface-container-high',
    textColorClass: 'text-on-surface',
    iconColorClass: 'text-primary/30'
  },
  { 
    name: 'Weather', 
    icon: 'CloudSun', 
    description: 'Study isiyihkasowin', 
    colorClass: 'bg-secondary-container',
    textColorClass: 'text-on-secondary-container',
    iconColorClass: 'text-on-secondary-container/40'
  },
  { 
    name: 'Body', 
    icon: 'User', 
    description: 'Learn niyow', 
    colorClass: 'bg-tertiary-fixed',
    textColorClass: 'text-on-tertiary-fixed',
    iconColorClass: 'text-tertiary/30'
  },
  { 
    name: 'Movement', 
    icon: 'Footprints', 
    description: 'Follow pimohtewin', 
    colorClass: 'bg-primary-fixed',
    textColorClass: 'text-on-primary-fixed',
    iconColorClass: 'text-primary/40'
  },
  { 
    name: 'Plants', 
    icon: 'Leaf', 
    description: 'Discover maskihkiya', 
    colorClass: 'bg-tertiary-container',
    textColorClass: 'text-on-tertiary-container',
    iconColorClass: 'text-on-tertiary-container/50'
  },
];

export const words: Word[] = [
  {
    id: 'atim',
    cree: 'atim',
    english: 'dog',
    category: 'Animals',
    exampleSentence: {
      cree: 'atim nitawi-wâpamâw',
      english: 'I saw a dog.'
    },
    morphology: {
      root: 'ati-',
      explanation: 'Indicates movement or origin in certain dialects.'
    },
    classification: {
      class: 'VAI',
      paradigm: 'AI-1',
      dialect: 'Plains Cree'
    },
    relatedWords: ['maskwa', 'mistatim', 'mahihkan']
  },
  {
    id: 'pisiw',
    cree: 'pisiw',
    english: 'lynx / bobcat',
    category: 'Animals'
  },
  {
    id: 'maskwa',
    cree: 'maskwa',
    english: 'bear',
    category: 'Animals'
  },
  {
    id: 'mistatim',
    cree: 'mistatim',
    english: 'horse',
    category: 'Animals'
  },
  {
    id: 'minos',
    cree: 'minôs',
    english: 'cat',
    category: 'Animals'
  },
  {
    id: 'mahihkan',
    cree: 'mahihkan',
    english: 'wolf',
    category: 'Animals'
  },
  {
    id: 'mostos',
    cree: 'mostos',
    english: 'cow / bison',
    category: 'Animals'
  },
  {
    id: 'atimo-pimitakan',
    cree: 'atimo-pimitâkan',
    english: 'dog sled',
    category: 'Animals'
  }
];
