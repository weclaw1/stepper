import { StepRenderProps } from '../../components/stepper/Stepper';
import { RegistrationData } from './types';

interface ContactStepProps extends StepRenderProps<RegistrationData> {
  countries: string[];
  countriesLoading: boolean;
  validateEmail: (email: string) => boolean;
}

const inputBase =
  'w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-100';
const labelClass = 'block text-sm font-medium mt-3 mb-1';

export function ContactStep({
  data,
  update,
  countries,
  countriesLoading,
  validateEmail,
}: ContactStepProps) {
  const emailValid = data.email === '' || validateEmail(data.email);

  return (
    <div>
      <h2 className="text-xl font-semibold">Kontakt</h2>

      <label className={labelClass}>Email</label>
      <input
        type="email"
        value={data.email}
        onChange={(e) => update({ email: e.target.value })}
        className={`${inputBase} ${emailValid ? 'border-gray-300 focus:border-blue-600' : 'border-red-500 focus:border-red-500'}`}
      />
      {!emailValid && (
        <p className="text-red-600 text-xs mt-1">Nieprawidłowy format emaila</p>
      )}

      <label className={labelClass}>Telefon</label>
      <input
        className={`${inputBase} border-gray-300 focus:border-blue-600`}
        value={data.phone}
        onChange={(e) => update({ phone: e.target.value })}
      />

      <label className={labelClass}>
        Kraj{' '}
        {countriesLoading && <span className="text-gray-500 text-xs">(ładowanie...)</span>}
      </label>
      <select
        value={data.country}
        onChange={(e) => update({ country: e.target.value })}
        disabled={countriesLoading}
        className={`${inputBase} border-gray-300 focus:border-blue-600 disabled:bg-gray-100`}
      >
        <option value="">— wybierz —</option>
        {countries.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <label className={labelClass}>Miasto</label>
      <input
        className={`${inputBase} border-gray-300 focus:border-blue-600`}
        value={data.city}
        onChange={(e) => update({ city: e.target.value })}
      />
    </div>
  );
}