import { StepRenderProps } from '../../components/stepper/Stepper';
import { SurveyData } from './types';
import { FrameworkOption } from './config';

interface ExperienceStepProps extends StepRenderProps<SurveyData> {
  frameworks: FrameworkOption[];
  minYears: number;
  maxYears: number;
}

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-md text-sm ' +
  'focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100';
const labelClass = 'block text-sm font-medium mt-3 mb-1';

export function ExperienceStep({
  data,
  update,
  frameworks,
  minYears,
  maxYears,
}: ExperienceStepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">Twoje doświadczenie</h2>

      <label className={labelClass}>
        Lata doświadczenia ({minYears}–{maxYears})
      </label>
      <input
        type="number"
        min={minYears}
        max={maxYears}
        value={data.yearsOfExperience}
        onChange={(e) => update({ yearsOfExperience: Number(e.target.value) })}
        className={inputClass}
      />

      <label className={labelClass}>Główny język programowania</label>
      <input
        value={data.primaryLanguage}
        onChange={(e) => update({ primaryLanguage: e.target.value })}
        placeholder="np. TypeScript"
        className={inputClass}
      />

      <label className={labelClass}>Ulubiony framework</label>
      <div className="flex gap-2 flex-wrap mt-1">
        {frameworks.map((f) => {
          const selected = data.framework === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => update({ framework: f.value })}
              className={[
                'px-3 py-1.5 rounded-md border text-sm transition',
                selected
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50',
              ].join(' ')}
            >
              {f.icon} {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}