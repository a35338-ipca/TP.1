
export enum Page {
  Home = 'home',
  Attacks = 'attacks',
  Guides = 'guides'
}

export interface AttackType {
  id: string;
  title: string;
  description: string;
  prevention: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  icon: string;
}

export interface SecurityGuide {
  id: string;
  title: string;
  steps: string[];
  tips: string[];
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
