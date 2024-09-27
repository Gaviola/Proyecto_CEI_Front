import React from "react";

// Definimos los tipos de las props que recibirá el componente
interface PaginationProps {
  currentPage: number;  // Página actual
  totalPages: number;   // Total de páginas
  onPageChange: (page: number) => void;  // Callback cuando se cambia de página
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Función para manejar el cambio de página
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {/* Botón para retroceder una página */}
      <button
        className={`px-3 py-1 border rounded-md ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {/* Mostrando las páginas */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-3 py-1  rounded-xl size-10 ${
            currentPage === index + 1
              ? "bg-primaryGreen-500 text-white duration-500"
              : "bg-zinc-100 text-primaryGreen-500 duration-500"
          } `}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      {/* Botón para avanzar una página */}
      <button
        className={`px-3 py-1 border rounded-md ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
