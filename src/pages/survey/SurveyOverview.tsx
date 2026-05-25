import { ReactNode } from 'react';
import { StepRenderProps } from '../../components/stepper/Stepper';
import { SurveyData } from './types';
import { FrameworkOption } from './config';

interface SurveyOverviewProps extends StepRenderProps<SurveyData> {
  frameworks: FrameworkOption[];
  commentPrefix: string;
}

export function SurveyOverview({ data, goTo, frameworks, commentPrefix }: SurveyOverviewProps) {
  const selectedFramework = frameworks.find((f) => f.value === data.framework);
  const finalComment = data.comments ? `${commentPrefix} ${data.comments}` : '';

  return (
    <div>
      <h2 className="text-xl font-semibold">Twoje odpowiedzi</h2>

      <Section title="Doświadczenie" onEdit={() => goTo(0)}>
        <Row label="Lata" value={String(data.yearsOfExperience)} />
        <Row label="Język" value={data.primaryLanguage} />
        <Row
          label="Framework"
          value={selectedFramework ? `${selectedFramework.icon} ${selectedFramework.label}` : ''}
        />
      </Section>

      <Section title="Preferencje" onEdit={() => goTo(1)}>
        <Row label="Praca zdalna" value={data.worksRemotely ? '✓ Tak' : '✗ Nie'} />
        <Row label="Ocena" value={`${data.rating}/10`} />
        <Row label="Uwagi (z prefiksem)" value={finalComment} />
      </Section>
    </div>
  );
}

function Section({ title, children, onEdit }: { title: string; children: ReactNode; onEdit: () => void }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mt-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{title}</h3>
        <button onClick={onEdit} className="text-blue-600 text-sm hover:underline">
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