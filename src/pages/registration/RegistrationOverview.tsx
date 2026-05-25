import { ReactNode } from 'react';
import { StepRenderProps } from '../../components/stepper/Stepper';
import { RegistrationData } from './types';

interface OverviewProps extends StepRenderProps<RegistrationData> {
  submitting: boolean;
}

export function RegistrationOverview({ data, goTo, submitting }: OverviewProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">
        Podsumowanie{' '}
        {submitting && <span className="text-gray-500 text-sm">(wysyłam...)</span>}
      </h2>

      <Section title="Dane osobowe" onEdit={() => goTo(0)}>
        <Row label="Imię" value={data.firstName} />
        <Row label="Nazwisko" value={data.lastName} />
      </Section>

      <Section title="Kontakt" onEdit={() => goTo(1)}>
        <Row label="Email" value={data.email} />
        <Row label="Telefon" value={data.phone} />
        <Row label="Lokalizacja" value={[data.city, data.country].filter(Boolean).join(', ')} />
      </Section>

      <Section title="Praca" onEdit={() => goTo(2)}>
        <Row label="Firma" value={data.company} />
        <Row label="Stanowisko" value={data.position} />
      </Section>
    </div>
  );
}

function Section({ title, children, onEdit }: { title: string; children: ReactNode; onEdit: () => void }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mt-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{title}</h3>
        <button
          onClick={onEdit}
          className="text-blue-600 text-sm hover:underline"
        >
          ✏️ Edytuj
        </button>
      </div>
      <div className="mt-2 space-y-1 text-sm">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-medium">{label}:</span>{' '}
      <span className="text-gray-700">{value || '-'}</span>
    </p>
  );
}