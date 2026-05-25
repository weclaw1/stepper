export function fetchCountries(): Promise<string[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(['Polska', 'Niemcy', 'Czechy', 'Hiszpania', 'Włochy']), 300),
  );
}

export function fetchPositions(): Promise<string[]> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(['Frontend Developer', 'Backend Developer', 'Fullstack', 'DevOps', 'Designer']),
      300,
    ),
  );
}