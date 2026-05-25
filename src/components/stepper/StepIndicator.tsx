interface StepIndicatorProps {
  labels: string[];
  currentIndex: number;
  onStepClick: (i: number) => void;
}

export function StepIndicator({ labels, currentIndex, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex justify-between gap-2">
      {labels.map((label, i) => {
        const active = i === currentIndex;
        const done = i < currentIndex;
        const clickable = done;

        const circleColor = active
          ? 'bg-blue-600'
          : done
          ? 'bg-emerald-500'
          : 'bg-gray-300';

        return (
          <button
            key={i}
            type="button"
            onClick={() => clickable && onStepClick(i)}
            disabled={!clickable}
            className={[
              'flex-1 text-center transition-opacity',
              clickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default',
              active || done ? 'opacity-100' : 'opacity-50',
            ].join(' ')}
          >
            <div
              className={[
                'w-9 h-9 rounded-full text-white font-bold mx-auto mb-2',
                'flex items-center justify-center',
                circleColor,
              ].join(' ')}
            >
              {done ? '✓' : i + 1}
            </div>
            <div className="text-xs text-gray-700">{label}</div>
          </button>
        );
      })}
    </div>
  );
}