import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RestauranteAPI } from "../../api/restaurante.api";
import type { Restaurante } from "../../types/restaurante";

export const ListRestaurante = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurantes = async () => {
    try {
      setLoading(true);
      const response = await RestauranteAPI.getAll();
      setRestaurantes(response.data.dados);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar restaurantes:", err);
      setError("Não foi possível carregar os restaurantes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja deletar este restaurante?"))
      return;

    try {
      await RestauranteAPI.delete(String(id));
      alert("Restaurante deletado com sucesso!");
      setRestaurantes(restaurantes.filter((rest) => rest.idRestaurante !== id));
    } catch (err) {
      console.error("Erro ao deletar:", err);
      alert("Não foi possível deletar o restaurante.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Carregando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* TÍTULO + BOTÃO */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Lista de Restaurantes
        </h2>

        <Link to="/restaurante/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
            + Adicionar Novo
          </button>
        </Link>
      </div>

      {/* TABELA */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">CNPJ</th>
              <th className="px-4 py-3">Telefone</th>
              <th className="px-4 py-3">Endereço</th>
              <th className="px-4 py-3">Funcionamento</th>
              <th className="px-4 py-3">Usuário Dono</th>
              <th className="px-4 py-3 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {restaurantes.map((rest, index) => (
              <tr
                key={rest.idRestaurante}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-4 py-3">{rest.idRestaurante}</td>
                <td className="px-4 py-3">{rest.nome}</td>
                <td className="px-4 py-3">{rest.cnpj}</td>
                <td className="px-4 py-3">{rest.telefone}</td>
                <td className="px-4 py-3">{rest.endereco}</td>
                <td className="px-4 py-3">{rest.horario_func}</td>
                <td className="px-4 py-3">{rest.usuario?.nome} (ID)</td>

                <td className="px-4 py-3 flex gap-2 justify-center">
                  <Link to={`/restaurante/edit/${rest.idRestaurante}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow">
                      Editar
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(rest.idRestaurante)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
