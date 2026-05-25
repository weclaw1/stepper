import { Stepper, StepConfig } from '../components/stepper/Stepper';
import { SurveyData, initialSurveyData } from './survey/types';
import { FRAMEWORKS, EXPERIENCE_LIMITS } from './survey/config';
import { ExperienceStep } from './survey/ExperienceStep';
import { PreferencesStep } from './survey/PreferencesStep';
import { SurveyOverview } from './survey/SurveyOverview';

const COMMENT_PREFIX = '[Opinia użytkownika]';
const MAX_COMMENT_LENGTH = 200;

export default function SurveyPage() {
  const steps: StepConfig<SurveyData>[] = [
    {
      id: 'experience',
      label: 'Doświadczenie',
      component: (props) => (
        <ExperienceStep
          {...props}
          frameworks={FRAMEWORKS}
          minYears={EXPERIENCE_LIMITS.min}
          maxYears={EXPERIENCE_LIMITS.max}
        />
      ),
      validate: (d) => {
        if (!d.primaryLanguage.trim()) return 'Podaj język programowania';
        if (!d.framework) return 'Wybierz framework';
        if (d.yearsOfExperience < EXPERIENCE_LIMITS.min || d.yearsOfExperience > EXPERIENCE_LIMITS.max) {
          return `Lata doświadczenia muszą być w zakresie ${EXPERIENCE_LIMITS.min}-${EXPERIENCE_LIMITS.max}`;
        }
        return true;
      },
    },
    {
      id: 'preferences',
      label: 'Preferencje',
      component: (props) => (
        <PreferencesStep
          {...props}
          commentPrefix={COMMENT_PREFIX}
          maxCommentLength={MAX_COMMENT_LENGTH}
        />
      ),
    },
    {
      id: 'overview',
      label: 'Podsumowanie',
      component: (props) => (
        <SurveyOverview {...props} frameworks={FRAMEWORKS} commentPrefix={COMMENT_PREFIX} />
      ),
      nextLabel: 'Wyślij ankietę ✓',
    },
  ];

  return (
    <Stepper<SurveyData>
      steps={steps}
      initialData={initialSurveyData}
      onComplete={(data) => {
        console.log('Ankieta:', data);
        alert(`Dziękujemy! Ocena: ${data.rating}/10`);
      }}
    />
  );
}