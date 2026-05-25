import { StepRenderProps } from '../../components/stepper/Stepper';
import { RegistrationData } from './types';

interface WorkStepProps extends StepRenderProps<RegistrationData> {
  availablePositions: string[];
  suggestCompany?: string;
}

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-md text-sm ' +
  'focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100';
const labelClass = 'block text-sm font-medium mt-3 mb-1';

export function WorkStep({ data, update, availablePositions, suggestCompany }: WorkStepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">Praca</h2>

      <label className={`${labelClass} flex items-center gap-2`}>
        Firma
        {suggestCompany && (
          <button
            type="button"
            onClick={() => update({ company: suggestCompany })}
            className="text-xs px-2 py-0.5 rounded border border-gray-300 hover:bg-gray-50"
          >
            Wstaw: {suggestCompany}
          </button>
        )}
      </label>
      <input
        className={inputClass}
        value={data.company}
        onChange={(e) => update({ company: e.target.value })}
      />

      <label className={labelClass}>Stanowisko</label>
      <select
        value={data.position}
        onChange={(e) => update({ position: e.target.value })}
        className={inputClass}
      >
        <option value="">— wybierz —</option>
        {availablePositions.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    </div>
  );
}