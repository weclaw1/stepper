interface StepNavProps {
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  nextLabel: string;
  prevLabel: string;
}

export function StepNav({ onPrev, onNext, isFirst, isLast, nextLabel, prevLabel }: StepNavProps) {
  return (
    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        className="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm
                   hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {prevLabel}
      </button>
      <button
        type="button"
        onClick={onNext}
        className={[
          'px-4 py-2 rounded-md text-sm text-white transition-colors',
          isLast ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700',
        ].join(' ')}
      >
        {nextLabel}
      </button>
    </div>
  );
}