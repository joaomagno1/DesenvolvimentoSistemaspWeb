import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UsuarioAPI } from "../../api/usuario.api";
import type { Usuario } from "../../types/usuario";

export const ListUsuario = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await UsuarioAPI.getAll();
      setUsuarios(response.data.dados);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError("Não foi possível carregar os usuários.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja deletar este usuário?")) return;

    try {
      await UsuarioAPI.delete(String(id));
      alert("Usuário deletado com sucesso!");
      setUsuarios(usuarios.filter((user) => user.idUsuario !== id));
    } catch (err) {
      console.error("Erro ao deletar:", err);
      alert("Não foi possível deletar o usuário.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Carregando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    // CONTÊINER PRINCIPAL: Max-width e padding do Restaurante
    <div className="max-w-6xl mx-auto p-6">
      {/* TÍTULO + BOTÃO: Mesmo alinhamento, tamanho de fonte e margem */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Lista de Usuários</h2>

        <Link to="/usuario/create">
          {/* BOTÃO ADICIONAR: Mesmas classes, incluindo 'rounded-md shadow' */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
            + Adicionar Novo Usuário
          </button>
        </Link>
      </div>

      {/* TABELA: Aplica sombra e bordas arredondadas no container */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        {/* Tabela sem border-collapse, w-full e text-left */}
        <table className="w-full text-left border-collapse">
          {/* CABEÇALHO: Fundo escuro e texto branco (bg-gray-800 text-white) */}
          <thead className="bg-gray-800 text-white">
            <tr>
              {/* THs: Usa px-4 py-3 (sem border) */}
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Telefone</th>
              <th className="px-4 py-3">Endereço</th>
              <th className="px-4 py-3">Tipo</th>
              {/* Centraliza o texto da coluna Ações */}
              <th className="px-4 py-3 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((user, index) => (
              // LINHAS: Usa index para aplicar classes alternadas (bg-gray-100 / bg-white)
              <tr
                key={user.idUsuario}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                {/* TDs: Usa px-4 py-3 (sem border) */}
                <td className="px-4 py-3">{user.idUsuario}</td>
                <td className="px-4 py-3">{user.nome}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.telefone}</td>
                <td className="px-4 py-3">{user.endereco}</td>
                <td className="px-4 py-3">{user.tipo}</td>

                {/* BOTÕES: Mesmas classes (rounded-md shadow) e alinhamento centralizado */}
                <td className="px-4 py-3 flex gap-2 justify-center">
                  <Link to={`/usuario/edit/${user.idUsuario}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow">
                      Editar
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(user.idUsuario)}
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
