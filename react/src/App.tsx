import { Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";

// Importe suas páginas de CRUD
import { CreateRestaurante } from "./pages/Restaurante/Create";
import { EditRestaurante } from "./pages/Restaurante/Edit";
import { ListRestaurante } from "./pages/Restaurante/List";

import { CreateUsuario } from "./pages/Usuario/Create";
import { EditUsuario } from "./pages/Usuario/Edit";
import { ListUsuario } from "./pages/Usuario/List";

// Importando páginas de Produto
import { CreateProduto } from "./pages/Produto/Create";
import { EditProduto } from "./pages/Produto/Edit";
import { ListProduto } from "./pages/Produto/List";

// Layout simples com a Navbar
const AppLayout = () => (
  <div>
    <Navbar />
    <main style={{ padding: "1rem" }}>
      <Outlet /> {/* Suas páginas aparecem aqui */}
    </main>
  </div>
);

export const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Rotas de Restaurante */}
        <Route path="/restaurante/list" element={<ListRestaurante />} />
        <Route path="/restaurante/create" element={<CreateRestaurante />} />
        <Route path="/restaurante/edit/:id" element={<EditRestaurante />} />

        {/* Rotas de Produto */}
        <Route path="/produto/list" element={<ListProduto />} />
        <Route path="/produto/create" element={<CreateProduto />} />
        <Route path="/produto/edit/:id" element={<EditProduto />} />

        {/* Rotas de Usuário */}
        <Route path="/usuario/list" element={<ListUsuario />} />
        <Route path="/usuario/create" element={<CreateUsuario />} />
        <Route path="/usuario/edit/:id" element={<EditUsuario />} />

        {/* Rota Padrão (Home) */}
        <Route path="/" element={<ListRestaurante />} />
      </Route>

      {/* Rota para "Página não encontrada" */}
      <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} />
    </Routes>
  );
};
