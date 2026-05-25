import { useState, ReactNode } from 'react';
import { StepIndicator } from './StepIndicator';
import { StepNav } from './StepNav';

export interface StepRenderProps<TData> {
  data: TData;
  update: (patch: Partial<TData>) => void;
  goTo: (index: number) => void;
}

export interface StepConfig<TData> {
  id: string;
  label: string;
  component: (props: StepRenderProps<TData>) => ReactNode;
  validate?: (data: TData) => boolean | string;
  nextLabel?: string;
  prevLabel?: string;
}

export interface StepperProps<TData> {
  steps: StepConfig<TData>[];
  initialData: TData;
  onComplete?: (data: TData) => void;
}

export function Stepper<TData>({ steps, initialData, onComplete }: StepperProps<TData>) {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState<TData>(initialData);
  const [error, setError] = useState<string | null>(null);

  const total = steps.length;
  const step = steps[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const update = (patch: Partial<TData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setError(null);
  };

  const goTo = (i: number) => {
    if (i >= 0 && i < total) {
      setIndex(i);
      setError(null);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setIndex(index - 1);
      setError(null);
    }
  };

  const handleNext = () => {
    if (step.validate) {
      const result = step.validate(data);
      if (result !== true) {
        setError(typeof result === 'string' ? result : 'Uzupełnij wymagane pola');
        return;
      }
    }
    if (isLast) onComplete?.(data);
    else setIndex(index + 1);
  };

  const renderProps: StepRenderProps<TData> = { data, update, goTo };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <StepIndicator
        labels={steps.map((s) => s.label)}
        currentIndex={index}
        onStepClick={goTo}
      />

      <div className="bg-white p-6 rounded-xl mt-6 shadow-sm">
        {step.component(renderProps)}

        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-md mt-4 text-sm">
            {error}
          </div>
        )}

        <StepNav
          onPrev={handlePrev}
          onNext={handleNext}
          isFirst={isFirst}
          isLast={isLast}
          nextLabel={step.nextLabel ?? (isLast ? 'Wyślij ✓' : 'Dalej →')}
          prevLabel={step.prevLabel ?? '← Wstecz'}
        />
      </div>
    </div>
  );
}