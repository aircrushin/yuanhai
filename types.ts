export enum Gender {
  MALE = '乾造 (男)',
  FEMALE = '坤造 (女)'
}

export enum CalendarType {
  SOLAR = '阳历',
  LUNAR = '阴历'
}

export interface UserInfo {
  birthDate: string;
  birthTime: string;
  calendarType: CalendarType;
  gender: Gender;
  birthPlace: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
  isTable?: boolean;
}

export enum AppState {
  INTRO,
  INPUT,
  ANALYZING,
  RESULT,
  ERROR
}