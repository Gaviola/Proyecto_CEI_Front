import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Aquí puedes obtener los datos de los préstamos desde una base de datos o cualquier otra fuente
    const loans = [
      {
        id: 1,
        deliveryDate: "2021-01-01",
        deliveryResponsible: "Nombre, Apellido",
        borrowerName: "Apellido, Nombre",
        fileNumber: "123456",
        cellphone: "1234567890",
        borrowedItem: "Elemento",
        clarification: "Aclaración",
        term: 7,
        returnDate: "2021-01-08",
        receptionResponsible: "Nombre, Apellido",
        amount: 100,
        paymentMethod: "Efectivo",
        observation: "Observación",
      },

      {
        id: 2,
        deliveryDate: "2021-01-01",
        deliveryResponsible: "Nombre, Apellido",
        borrowerName: "Apellido, Nombre",
        fileNumber: "123456",
        cellphone: "1234567890",
        borrowedItem: "Elemento",
        clarification: "Aclaración",
        term: 7,
        returnDate: "2021-01-08",
        receptionResponsible: "Nombre, Apellido",
        amount: 100,
        paymentMethod: "Efectivo",
        observation: "Observación",
      },

      {
        id: 3,
        deliveryDate: "2021-01-01",
        deliveryResponsible: "Nombre, Apellido",
        borrowerName: "Apellido, Nombre",
        fileNumber: "123456",
        cellphone: "1234567890",
        borrowedItem: "Elemento",
        clarification: "Aclaración",
        term: 7,
        returnDate: "2021-01-08",
        receptionResponsible: "Nombre, Apellido",
        amount: 100,
        paymentMethod: "Efectivo",
        observation: "Observación",
      },

      {
        id: 4,
        deliveryDate: "2021-01-01",
        deliveryResponsible: "Nombre, Apellido",
        borrowerName: "Apellido, Nombre",
        fileNumber: "123456",
        cellphone: "1234567890",
        borrowedItem: "Elemento",
        clarification: "Aclaración",
        term: 7,
        returnDate: "2021-01-08",
        receptionResponsible: "Nombre, Apellido",
        amount: 100,
        paymentMethod: "Efectivo",
        observation: "Observación",
      },

      {
        id: 5,
        deliveryDate: "2021-01-01",
        deliveryResponsible: "Nombre, Apellido",
        borrowerName: "Apellido, Nombre",
        fileNumber: "123456",
        cellphone: "1234567890",
        borrowedItem: "Elemento",
        clarification: "Aclaración",
        term: 7,
        returnDate: "2021-01-08",
        receptionResponsible: "Nombre, Apellido",
        amount: 100,
        paymentMethod: "Efectivo",
        observation: "Observación",
      },

      {
        id: 6,
        deliveryDate: "2021-01-01",
        deliveryResponsible: "Nombre, Apellido",
        borrowerName: "Apellido, Nombre",
        fileNumber: "123456",
        cellphone: "1234567890",
        borrowedItem: "Elemento",
        clarification: "Aclaración",
        term: 7,
        returnDate: "2021-01-08",
        receptionResponsible: "Nombre, Apellido",
        amount: 100,
        paymentMethod: "Efectivo",
        observation: "Observación",
      },

      {
        id: 7,
        deliveryDate: "2021-01-01",
        deliveryResponsible: "Nombre, Apellido",
        borrowerName: "Apellido, Nombre",
        fileNumber: "123456",
        cellphone: "1234567890",
        borrowedItem: "Elemento",
        clarification: "Aclaración",
        term: 7,
        returnDate: "2021-01-08",
        receptionResponsible: "Nombre, Apellido",
        amount: 100,
        paymentMethod: "Efectivo",
        observation: "Observación",
      },

      {
        id: 8,
        deliveryDate: "2021-01-01",
        deliveryResponsible: "Nombre, Apellido",
        borrowerName: "Apellido, Nombre",
        fileNumber: "123456",
        cellphone: "1234567890",
        borrowedItem: "Elemento",
        clarification: "Aclaración",
        term: 7,
        returnDate: "2021-01-08",
        receptionResponsible: "Nombre, Apellido",
        amount: 100,
        paymentMethod: "Efectivo",
        observation: "Observación",
      },

      {
        id: 9,
        deliveryDate: "2021-01-01",
        deliveryResponsible: "Nombre, Apellido",
        borrowerName: "Apellido, Nombre",
        fileNumber: "123456",
        cellphone: "1234567890",
        borrowedItem: "Elemento",
        clarification: "Aclaración",
        term: 7,
        returnDate: "2021-01-08",
        receptionResponsible: "Nombre, Apellido",
        amount: 100,
        paymentMethod: "Efectivo",
        observation: "Observación",
      },

      {
        id: 10,
        deliveryDate: "2021-01-01",
        deliveryResponsible: "Nombre, Apellido",
        borrowerName: "Apellido, Nombre",
        fileNumber: "123456",
        cellphone: "1234567890",
        borrowedItem: "Elemento",
        clarification: "Aclaración",
        term: 7,
        returnDate: "2021-01-08",
        receptionResponsible: "Nombre, Apellido",
        amount: 100,
        paymentMethod: "Efectivo",
        observation: "Observación",
      },

      {
        id: 11,
        deliveryDate: "2021-01-01",
        deliveryResponsible: "Nombre, Apellido",
        borrowerName: "Apellido, Nombre",
        fileNumber: "123456",
        cellphone: "1234567890",
        borrowedItem: "Elemento",
        clarification: "Aclaración",
        term: 7,
        returnDate: "2021-01-08",
        receptionResponsible: "Nombre, Apellido",
        amount: 100,
        paymentMethod: "Efectivo",
        observation: "Observación",
      },
    ];

    res.status(200).json({ loans });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}