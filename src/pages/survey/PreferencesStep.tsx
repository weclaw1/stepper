import { StepRenderProps } from '../../components/stepper/Stepper';
import { SurveyData } from './types';

interface PreferencesStepProps extends StepRenderProps<SurveyData> {
  commentPrefix: string;
  maxCommentLength: number;
}

const labelClass = 'block text-sm font-medium mt-3 mb-1';

export function PreferencesStep({
  data,
  update,
  commentPrefix,
  maxCommentLength,
}: PreferencesStepProps) {
  const charsLeft = maxCommentLength - data.comments.length;

  return (
    <div>
      <h2 className="text-xl font-semibold">Preferencje</h2>

      <label className="flex items-center gap-2 mt-3 text-sm font-medium">
        <input
          type="checkbox"
          checked={data.worksRemotely}
          onChange={(e) => update({ worksRemotely: e.target.checked })}
          className="h-4 w-4 accent-blue-600"
        />
        Pracuję zdalnie
      </label>

      <label className={labelClass}>Ocena ankiety: {data.rating}/10</label>
      <input
        type="range"
        min={1}
        max={10}
        value={data.rating}
        onChange={(e) => update({ rating: Number(e.target.value) })}
        className="w-full accent-blue-600"
      />

      <label className={labelClass}>
        Uwagi <span className="text-gray-500 text-xs">(prefiks: "{commentPrefix}")</span>
      </label>
      <textarea
        rows={4}
        maxLength={maxCommentLength}
        value={data.comments}
        onChange={(e) => update({ comments: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
                   focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
      <p className="text-gray-500 text-xs mt-1">Pozostało znaków: {charsLeft}</p>
    </div>
  );
}