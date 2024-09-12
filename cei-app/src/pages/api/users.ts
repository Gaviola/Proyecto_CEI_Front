import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Aquí puedes obtener los datos de los usuarios desde una base de datos o cualquier otra fuente
    const users = [
      {
        name: "Gabriel",
        lastname: "Garcia",
        email: "gabriel.garcia@gmail.com",
        idNumber: "12345678"
      },
      {
        name: "Pepe",
        lastname: "Garcia",
        email: "pepito.garcia@gmail.com",
        idNumber: "1234568"
      },
      {
        name: "Pepe",
        lastname: "Garcia",
        email: "pepito.garcia@gmail.com",
        idNumber: "1234568"
      },
      {
        name: "Pepe",
        lastname: "Garcia",
        email: "pepito.garcia@gmail.com",
        idNumber: "1234568"
      },
      {
        name: "Pepe",
        lastname: "Garcia",
        email: "pepito.garcia@gmail.com",
        idNumber: "1234568"
      },
    ];

    res.status(200).json({ users });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}