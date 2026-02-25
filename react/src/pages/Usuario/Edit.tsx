import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UsuarioAPI } from "../../api/usuario.api";
import type { UpdateUsuarioDTO } from "../../types/usuario";

export const EditUsuario = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Estados para os campos

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tipo, setTipo] = useState(""); // O campo Tipo agora usará um <select> estilizado // 🚨 Reutilizando a lista de tipos permitidos para o <select>

  const tiposPermitidos = ["CLIENTE", "DONO_RESTAURANTE", "ADMIN_SISTEMA"];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUsuario = async () => {
      try {
        setLoading(true);
        const response = await UsuarioAPI.getOne(id);
        const userData = response.data.dados; // Preenche o formulário com os dados
        setNome(userData.nome);
        setEmail(userData.email);
        setTelefone(userData.telefone);
        setEndereco(userData.endereco);
        setTipo(userData.tipo);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar o usuário.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsuario();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    const data: UpdateUsuarioDTO = {
      nome,
      email,
      telefone,
      endereco,
      tipo,
    };

    try {
      await UsuarioAPI.update(id, data);
      alert("Usuário atualizado com sucesso!");
      navigate("/usuario/list");
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      setError("Não foi possível atualizar o usuário.");
    }
  }; // Renderização de estados

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Carregando dados...</p>
    );
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    // Container principal: Centraliza o formulário (igual aos demais forms)
    <div className="flex justify-center items-start pt-12 min-h-screen">
                 {" "}
      {/* Card do Formulário: Fundo branco, sombra, cantos arredondados e padding */}
           {" "}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                       {" "}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Editar Usuário (ID: {id})        {" "}
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
                              {/* Campo Email */}         {" "}
          <div>
                       {" "}
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
                       {" "}
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                             {" "}
          {/* Campo Tipo (Agora como SELECT para consistência) */}         {" "}
          <div>
                       {" "}
            <label
              htmlFor="tipo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo:
            </label>
                       {" "}
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
                           {" "}
              {/* Garante que a opção inicial (carregada do BD) seja selecionada */}
              {tiposPermitidos.map((t) => (
                <option key={t} value={t}>
                                    {t}               {" "}
                </option>
              ))}
                         {" "}
            </select>
                     {" "}
          </div>
                            {/* Mensagem de Erro */}         {" "}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}       
                    {/* Botão Atualizar */}         {" "}
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
