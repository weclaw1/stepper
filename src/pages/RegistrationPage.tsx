import { useEffect, useState } from 'react';
import { Stepper, StepConfig } from '../components/stepper/Stepper';
import { RegistrationData, initialRegistrationData } from './registration/types';
import { fetchCountries, fetchPositions } from './registration/api';
import { PersonalStep } from './registration/PersonalStep';
import { ContactStep } from './registration/ContactStep';
import { WorkStep } from './registration/WorkStep';
import { RegistrationOverview } from './registration/RegistrationOverview';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export default function RegistrationPage() {
  const [countries, setCountries] = useState<string[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [positions, setPositions] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCountries().then((c) => {
      setCountries(c);
      setCountriesLoading(false);
    });
    fetchPositions().then(setPositions);
  }, []);

  const trackEvent = (event: string) => console.log('[analytics]', event);

  const steps: StepConfig<RegistrationData>[] = [
    {
      id: 'personal',
      label: 'Dane osobowe',
      component: (props) => (
        <PersonalStep
          {...props}
          minNameLength={2}
          onFieldChange={(field) => trackEvent(`personal_${field}_changed`)}
        />
      ),
      validate: (d) =>
        d.firstName.trim().length >= 2 && d.lastName.trim().length >= 2
          ? true
          : 'Imię i nazwisko muszą mieć co najmniej 2 znaki',
    },
    {
      id: 'contact',
      label: 'Kontakt',
      component: (props) => (
        <ContactStep
          {...props}
          countries={countries}
          countriesLoading={countriesLoading}
          validateEmail={(email) => EMAIL_REGEX.test(email)}
        />
      ),
      validate: (d) => {
        if (!EMAIL_REGEX.test(d.email)) return 'Podaj poprawny email';
        if (!d.country) return 'Wybierz kraj';
        return true;
      },
    },
    {
      id: 'work',
      label: 'Praca',
      component: (props) => (
        <WorkStep {...props} availablePositions={positions} suggestCompany="Acme Corp" />
      ),
    },
    {
      id: 'overview',
      label: 'Podsumowanie',
      component: (props) => <RegistrationOverview {...props} submitting={submitting} />,
      nextLabel: submitting ? 'Wysyłam...' : 'Zarejestruj ✓',
    },
  ];

  return (
    <Stepper<RegistrationData>
      steps={steps}
      initialData={initialRegistrationData}
      onComplete={async (data) => {
        setSubmitting(true);
        await new Promise((r) => setTimeout(r, 800));
        setSubmitting(false);
        trackEvent('registration_complete');
        alert(`Witaj, ${data.firstName}! Zarejestrowano.`);
      }}
    />
  );
}