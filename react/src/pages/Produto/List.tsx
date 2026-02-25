import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProdutoAPI } from "../../api/produto.api";
import type { Produto } from "../../types/produto";

export const ListProduto = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const response = await ProdutoAPI.getAll();
      // Ajuste 'response.data.dados' conforme o retorno padrão do seu backend
      setProdutos(response.data.dados || response.data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setError("Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja deletar este produto?")) return;

    try {
      await ProdutoAPI.delete(id);
      alert("Produto deletado com sucesso!");
      setProdutos(produtos.filter((prod) => prod.idProduto !== id));
    } catch (err) {
      console.error("Erro ao deletar:", err);
      alert("Não foi possível deletar o produto.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Carregando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Lista de Produtos</h2>
        <Link to="/produto/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
            + Adicionar Novo
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Restaurante</th>
              <th className="px-4 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((prod, index) => (
              <tr
                key={prod.idProduto}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-4 py-3">{prod.idProduto}</td>
                <td className="px-4 py-3 font-medium">{prod.nome}</td>
                <td className="px-4 py-3">
                  R$ {Number(prod.preco).toFixed(2)}
                </td>
                <td className="px-4 py-3">{prod.categoria}</td>
                <td className="px-4 py-3">{prod.restaurante?.nome || "-"}</td>
                <td className="px-4 py-3 flex gap-2 justify-center">
                  <Link to={`/produto/edit/${prod.idProduto}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow">
                      Editar
                    </button>
                  </Link>
                  <button
                    onClick={() =>
                      prod.idProduto && handleDelete(prod.idProduto)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
            {produtos.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Nenhum produto cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
