import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Aquí puedes obtener los datos de los usuarios desde una base de datos o cualquier otra fuente
    const users = [
      { id: 1, firstName: 'Juan', lastName: 'Pérez', dni: '12345678', registrationDate: '2023-01-01', email: 'juan.perez@example.com' },
      { id: 2, firstName: 'María', lastName: 'García', dni: '87654321', registrationDate: '2023-02-01', email: 'maria.garcia@example.com' },
    ];

    res.status(200).json({ users });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}