import { StepRenderProps } from '../../components/stepper/Stepper';
import { RegistrationData } from './types';

interface PersonalStepProps extends StepRenderProps<RegistrationData> {
  minNameLength: number;
  onFieldChange?: (field: string) => void;
}

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-md text-sm ' +
  'focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100';

const labelClass = 'block text-sm font-medium mt-3 mb-1';

export function PersonalStep({ data, update, minNameLength, onFieldChange }: PersonalStepProps) {
  const handle = (field: keyof RegistrationData, value: string) => {
    update({ [field]: value } as Partial<RegistrationData>);
    onFieldChange?.(field);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Dane osobowe</h2>
      <p className="text-gray-500 text-xs mt-1">Min. długość: {minNameLength} znaków.</p>

      <label className={labelClass}>Imię</label>
      <input
        className={inputClass}
        value={data.firstName}
        minLength={minNameLength}
        onChange={(e) => handle('firstName', e.target.value)}
      />

      <label className={labelClass}>Nazwisko</label>
      <input
        className={inputClass}
        value={data.lastName}
        minLength={minNameLength}
        onChange={(e) => handle('lastName', e.target.value)}
      />
    </div>
  );
}