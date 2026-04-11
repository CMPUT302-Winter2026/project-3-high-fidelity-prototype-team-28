export type Category = 'Family' | 'Animals' | 'Weather' | 'Body' | 'Movement' | 'Plants';

export interface Word {
  id: string;
  cree: string;
  english: string;
  category: Category;
  pronunciationUrl?: string;
  exampleSentence?: {
    cree: string;
    english: string;
  };
  morphology?: {
    root: string;
    explanation: string;
  };
  classification?: {
    class: string;
    paradigm: string;
    dialect: string;
  };
  relatedWords?: string[]; // IDs of related words
}

export interface SemanticNode {
  id: string;
  label: string;
  english: string;
  type: 'known' | 'gap' | 'related' | 'category';
  x: number;
  y: number;
}

export interface SemanticLink {
  source: string;
  target: string;
  label: 'related to' | 'type of' | 'same category';
}
