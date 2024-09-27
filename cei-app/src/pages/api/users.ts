import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Aquí puedes obtener los datos de los usuarios desde una base de datos o cualquier otra fuente
    let users = [
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
        idNumber: "12345658"
      },
      {
        name: "Pepe",
        lastname: "Garcia",
        email: "pepito.garcia@gmail.com",
        idNumber: "12344568"
      },
      {
        name: "Pepe",
        lastname: "Garcia",
        email: "pepito.garcia@gmail.com",
        idNumber: "16234568"
      },
      {
        name: "Pepe",
        lastname: "Garcia",
        email: "pepito.garcia@gmail.com",
        idNumber: "16345678"
      },
    ];

    let searchContent = req.query.content as string;
    if (searchContent) {
      users = users.filter((user) => user.name.toLowerCase().includes(searchContent) );
    }

    res.status(200).json({ users });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}