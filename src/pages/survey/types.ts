export interface SurveyData {
  yearsOfExperience: number;
  primaryLanguage: string;
  framework: string;
  worksRemotely: boolean;
  rating: number;
  comments: string;
}

export const initialSurveyData: SurveyData = {
  yearsOfExperience: 0,
  primaryLanguage: '',
  framework: '',
  worksRemotely: false,
  rating: 5,
  comments: '',
};