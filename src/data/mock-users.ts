export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Should not be sent to client in a real app
  role: 'admin' | 'employee' | 'accountant';
}

export const MOCK_USERS: User[] = [
  {
    id: 'admin01',
    name: 'Admin',
    email: 'admin@constructora.com',
    password: 'password123',
    role: 'admin',
  },
  {
    id: 'emp01',
    name: 'Juan Pérez',
    email: 'juan.perez@constructora.com',
    password: 'password123',
    role: 'employee',
  },
   {
    id: 'emp02',
    name: 'Ana García',
    email: 'ana.garcia@constructora.com',
    password: 'password123',
    role: 'employee',
  },
  {
    id: 'acc01',
    name: 'Contador',
    email: 'contador@constructora.com',
    password: 'password123',
    role: 'accountant',
  },
];
