export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service: string;
  budget?: string | null;
  message: string;
  source: string;
  createdAt: string;
};
