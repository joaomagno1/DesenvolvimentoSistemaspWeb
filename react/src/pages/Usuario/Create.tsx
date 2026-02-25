import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UsuarioAPI } from "../../api/usuario.api";
import type { CreateUsuarioDTO } from "../../types/usuario";

export const CreateUsuario = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const tiposPermitidos = ["CLIENTE", "DONO_RESTAURANTE", "ADMIN_SISTEMA"];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!tiposPermitidos.includes(tipo)) {
      setError("Por favor, selecione um Tipo de usuário válido.");
      return;
    }

    const data: CreateUsuarioDTO = {
      nome,
      email,
      senha,
      telefone,
      endereco,
      tipo,
    };

    try {
      await UsuarioAPI.create(data);
      alert("Usuário criado com sucesso!");
      navigate("/usuario/list");
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      setError(
        "Não foi possível criar o usuário. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    // Container principal: Centraliza o formulário na tela e remove o bg-gray-100
    <div className="flex justify-center items-center min-h-screen">
           {" "}
      {/* Card do Formulário: Fundo branco, sombra, cantos arredondados e padding */}
           {" "}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
               {" "}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Adicionar Novo Usuário        {" "}
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
                            Nome:            {" "}
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
                            Email:            {" "}
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
                    {/* Campo Senha */}         {" "}
          <div>
                       {" "}
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
                            Senha:            {" "}
            </label>
                       {" "}
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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
                            Telefone:            {" "}
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
                            Endereço:            {" "}
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
                    {/* Campo Tipo (Select) */}         {" "}
          <div>
                       {" "}
            <label
              htmlFor="tipo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
                            Tipo:            {" "}
            </label>
                       {" "}
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
                            <option value="">Selecione o Tipo...</option>       
                   {" "}
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
            {/* Botão Salvar */}         {" "}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6"
          >
                        Salvar          {" "}
          </button>
                 {" "}
        </form>
             {" "}
      </div>
         {" "}
    </div>
  );
};
