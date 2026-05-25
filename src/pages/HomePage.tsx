import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Demo: Stepper z Tailwind CSS</h1>
      <p className="text-gray-600 mt-2">
        Każdy krok rozszerza <code className="bg-gray-200 px-1 rounded">StepRenderProps&lt;TData&gt;</code> o własne propsy.
        Dodatkowe dane wstrzykiwane są przez closure w <code className="bg-gray-200 px-1 rounded">component</code> w <code className="bg-gray-200 px-1 rounded">StepConfig</code>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <Card
          to="/registration"
          title="📝 Rejestracja"
          description="Lista krajów (async), stanowiska z API, callback analytics."
        />
        <Card
          to="/survey"
          title="📊 Ankieta"
          description="Frameworki z konfiguracji, min/max walidacja, prefiks uwag."
        />
      </div>
    </div>
  );
}

function Card({ to, title, description }: { to: string; title: string; description: string }) {
  return (
    <Link
      to={to}
      className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 mt-1 text-sm">{description}</p>
    </Link>
  );
}