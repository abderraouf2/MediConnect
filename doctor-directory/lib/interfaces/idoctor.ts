export interface IDoctor {
  _id: string;
  id: number;
  first_name: string;
  last_name: string;
  specialty: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip_code: number;
  bio: string;
  rating: number;
  years_experience: number;
  favourite?: boolean;
}
