import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProdutoAPI } from "../../api/produto.api";
import { RestauranteAPI } from "../../api/restaurante.api";
import type { ProdutoDTO } from "../../types/produto";
import type { Restaurante } from "../../types/restaurante";

export const EditProduto = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [idRestaurante, setIdRestaurante] = useState("");

  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Busca produto
        const prodResponse = await ProdutoAPI.getById(id);
        const prodData = prodResponse.data.dados || prodResponse.data;

        // 2. Busca restaurantes
        const restResponse = await RestauranteAPI.getAll();
        setRestaurantes(restResponse.data.dados || restResponse.data);

        // 3. Popula campos
        setNome(prodData.nome);
        setDescricao(prodData.descricao);
        setPreco(prodData.preco);
        setCategoria(prodData.categoria);
        setDisponibilidade(prodData.disponibilidade);

        if (prodData.restaurante) {
          setIdRestaurante(String(prodData.restaurante.idRestaurante));
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    const data: ProdutoDTO = {
      nome,
      descricao,
      preco: Number(preco),
      categoria,
      disponibilidade: Number(disponibilidade),
      idRestaurante: Number(idRestaurante),
    };

    try {
      await ProdutoAPI.update(id, data);
      alert("Produto atualizado!");
      navigate("/produto/list");
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar produto.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Carregando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-start pt-12 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Editar Produto (ID: {id})
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço:
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
                Disponibilidade:
              </label>
              <input
                type="number"
                value={disponibilidade}
                onChange={(e) => setDisponibilidade(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

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
            Atualizar Produto
          </button>
        </form>
      </div>
    </div>
  );
};
