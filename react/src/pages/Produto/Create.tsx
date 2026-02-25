import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ProdutoAPI } from "../../api/produto.api";
import { RestauranteAPI } from "../../api/restaurante.api"; // Importar API de restaurante
import type { ProdutoDTO } from "../../types/produto";
import type { Restaurante } from "../../types/restaurante";

export const CreateProduto = () => {
  const navigate = useNavigate();

  // Estados do formulário
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [idRestaurante, setIdRestaurante] = useState("");

  // Dados para o select
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Carregar restaurantes ao abrir a tela
  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const response = await RestauranteAPI.getAll();
        setRestaurantes(response.data.dados || response.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar lista de restaurantes.");
      }
    };
    fetchRestaurantes();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!idRestaurante) {
      setError("Selecione um restaurante.");
      return;
    }

    const data: ProdutoDTO = {
      nome,
      descricao,
      preco: Number(preco),
      categoria,
      disponibilidade: Number(disponibilidade),
      idRestaurante: Number(idRestaurante),
    };

    try {
      await ProdutoAPI.create(data);
      alert("Produto criado com sucesso!");
      navigate("/produto/list");
    } catch (err) {
      console.error(err);
      setError("Não foi possível criar o produto.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Novo Produto
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome:
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição:
            </label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Preço e Disponibilidade (lado a lado) */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço (R$):
              </label>
              <input
                type="number"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disponibilidade (Qtd):
              </label>
              <input
                type="number"
                value={disponibilidade}
                onChange={(e) => setDisponibilidade(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria:
            </label>
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Select Restaurante */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Restaurante:
            </label>
            <select
              value={idRestaurante}
              onChange={(e) => setIdRestaurante(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Selecione...</option>
              {restaurantes.map((rest) => (
                <option key={rest.idRestaurante} value={rest.idRestaurante}>
                  {rest.nome}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Salvar Produto
          </button>
        </form>
      </div>
    </div>
  );
};
