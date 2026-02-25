import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    // BARRA DE NAVEGAÇÃO: Fundo escuro, padding, e sombra.
    <nav className="bg-gray-800 p-4 shadow-lg mb-6">
      {/* Container para centralizar o conteúdo */}
      <div className="max-w-7xl mx-auto flex">
        {/* Link Restaurantes */}
        <Link
          to="/restaurante/list"
          className="text-white text-lg font-semibold hover:text-blue-400 mr-6"
        >
          Restaurantes
        </Link>

        {/* Link Produtos (Adicionado) */}
        <Link
          to="/produto/list"
          className="text-white text-lg font-semibold hover:text-blue-400 mr-6"
        >
          Produtos
        </Link>

        {/* Link Usuários */}
        <Link
          to="/usuario/list"
          className="text-white text-lg font-semibold hover:text-blue-400"
        >
          Usuários
        </Link>
      </div>
    </nav>
  );
};
