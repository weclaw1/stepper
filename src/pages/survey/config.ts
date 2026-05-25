export interface FrameworkOption {
  value: string;
  label: string;
  icon: string;
}

export const FRAMEWORKS: FrameworkOption[] = [
  { value: 'react',   label: 'React',   icon: '⚛️' },
  { value: 'vue',     label: 'Vue',     icon: '🟢' },
  { value: 'angular', label: 'Angular', icon: '🅰️' },
  { value: 'svelte',  label: 'Svelte',  icon: '🔶' },
];

export const EXPERIENCE_LIMITS = { min: 0, max: 50 };