import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RestauranteAPI } from "../../api/restaurante.api";
import { UsuarioAPI } from "../../api/usuario.api";
import type { RestauranteDTO } from "../../types/restaurante";
import type { Usuario } from "../../types/usuario";

export const EditRestaurante = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Estados para os campos

  const [nome, setNome] = useState("");
  const [horario_func, setHorarioFunc] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [idUsuario, setIdUsuario] = useState("");

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Busca os dados iniciais (do restaurante e a lista de usuários)

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true); // 1. Busca os dados DO RESTAURANTE
        const restResponse = await RestauranteAPI.getOne(id);
        const restData = restResponse.data.dados; // 2. Busca a lista de TODOS OS USUÁRIOS
        const userResponse = await UsuarioAPI.getAll();
        setUsuarios(userResponse.data.dados); // 3. Preenche o formulário com os dados do restaurante
        setNome(restData.nome);
        setHorarioFunc(restData.horario_func);
        setCnpj(restData.cnpj);
        setTelefone(restData.telefone);
        setEndereco(restData.endereco); // Proteção contra usuário nulo (se houver)
        if (restData.usuario) {
          setIdUsuario(String(restData.usuario.idUsuario));
        }
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]); // Função chamada ao enviar o formulário

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return; // Monta o objeto DTO para enviar para a API

    const data: RestauranteDTO = {
      nome,
      horario_func,
      cnpj,
      telefone,
      endereco,
      idUsuario: Number(idUsuario),
    };

    try {
      await RestauranteAPI.update(id, data);
      alert("Restaurante atualizado com sucesso!");
      navigate("/restaurante/list");
    } catch (err) {
      console.error("Erro ao atualizar restaurante:", err);
      setError("Não foi possível atualizar o restaurante.");
    }
  }; // Renderização

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Carregando dados...</p>
    );
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    // Container principal: Centraliza o formulário (igual ao CreateRestaurante)
    <div className="flex justify-center items-start pt-12 min-h-screen">
                 {" "}
      {/* Card do Formulário: Fundo branco, sombra, cantos arredondados e padding */}
           {" "}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                       {" "}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Editar Restaurante (ID: {id})        {" "}
        </h2>
               {" "}
        <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campo Nome */}         {" "}
          <div>
                       {" "}
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome:
            </label>
                       {" "}
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
                     {" "}
          </div>
                              {/* Campo CNPJ */}         {" "}
          <div>
                       {" "}
            <label
              htmlFor="cnpj"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              CNPJ:
            </label>
                       {" "}
            <input
              type="text"
              id="cnpj"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
                     {" "}
          </div>
                              {/* Campo Telefone */}         {" "}
          <div>
                       {" "}
            <label
              htmlFor="telefone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Telefone:
            </label>
                       {" "}
            <input
              type="text"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
                     {" "}
          </div>
                              {/* Campo Endereço */}         {" "}
          <div>
                       {" "}
            <label
              htmlFor="endereco"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Endereço:
            </label>
                       {" "}
            <input
              type="text"
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
                     {" "}
          </div>
                              {/* Campo Horário de Funcionamento */}         {" "}
          <div>
                       {" "}
            <label
              htmlFor="horario_func"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Horário de Funcionamento:
            </label>
                       {" "}
            <input
              type="text"
              id="horario_func"
              value={horario_func}
              onChange={(e) => setHorarioFunc(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
                     {" "}
          </div>
                              {/* Campo Usuário Dono (Dropdown) */}         {" "}
          <div>
                       {" "}
            <label
              htmlFor="idUsuario"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Usuário Dono:
            </label>
                       {" "}
            <select
              id="idUsuario"
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
                            <option value="">Selecione um usuário...</option>   
                       {" "}
              {usuarios.map((user) => (
                <option key={user.idUsuario} value={user.idUsuario}>
                                    {user.nome} (ID: {user.idUsuario})          
                       {" "}
                </option>
              ))}
                         {" "}
            </select>
                     {" "}
          </div>
                            {/* Mensagem de Erro */}         {" "}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}       
                    {/* Botão Atualizar (usando o estilo do botão Salvar) */}   
               {" "}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6"
          >
                        Atualizar          {" "}
          </button>
                 {" "}
        </form>
             {" "}
      </div>
         {" "}
    </div>
  );
};
