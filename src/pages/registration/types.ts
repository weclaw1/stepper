export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  company: string;
  position: string;
}

export const initialRegistrationData: RegistrationData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  company: '',
  position: '',
};