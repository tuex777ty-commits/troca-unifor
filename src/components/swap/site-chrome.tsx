import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeftRight, ArrowUpRight, Gift, Menu, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { categories } from "@/components/swap/data";

export function Logo() {
  return (
    <a href="#" className="logo" aria-label="SWAP, início">
      <ArrowLeftRight className="logo-mark" />
      SWAP<span className="logo-dot">.</span>
    </a>
  );
}

type SiteHeaderProps = {
  onLogin: () => void;
  onChooseCategory: (name: string) => void;
};

export function SiteHeader({ onLogin, onChooseCategory }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const chooseCategory = (name: string) => {
    onChooseCategory(name);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>FEITO POR ALUNOS. PARA ALUNOS.</span>
          <a href="https://www.unifor.br" target="_blank" rel="noreferrer">
            COMUNIDADE UNIFOR <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav">
          <div className="nav-left">
            <Logo />
            <nav className="nav-links" aria-label="Principal">
              {categories.map((category) => (
                <a key={category.id} href="#anuncios" onClick={() => chooseCategory(category.name)}>
                  {category.name}
                </a>
              ))}
            </nav>
          </div>
          <Link to="/presente" className="nav-gift">
            <Gift size={13} /> ASSINATURAS GRÁTIS
          </Link>
          <div className="nav-actions">
            <Button variant="ghost" className="nav-login" onClick={onLogin}>
              Entrar <ArrowUpRight />
            </Button>
            <Button variant="ink" asChild>
              <a href="#vender">
                Anunciar <Plus />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="menu-trigger"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Menu móvel">
            {categories.map((category) => (
              <a key={category.id} href="#anuncios" onClick={() => chooseCategory(category.name)}>
                {category.name}
              </a>
            ))}
            <a href="#vender" onClick={() => setMenuOpen(false)}>
              Serviços & projetos
            </a>
            <a href="#como-funciona" onClick={() => setMenuOpen(false)}>
              Como funciona
            </a>
          </nav>
        )}
      </header>
    </>
  );
}

export function SiteFooter({ onChooseCategory }: { onChooseCategory: (name: string) => void }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>
              Trocas, serviços e projetos entre alunos da Unifor. Conexões que fazem a vida
              universitária render mais.
            </p>
          </div>
          <div className="footer-col">
            <h3>Explore</h3>
            {categories.map((category) => (
              <a href="#anuncios" key={category.id} onClick={() => onChooseCategory(category.name)}>
                {category.name}
              </a>
            ))}
          </div>
          <div className="footer-col">
            <h3>Na comunidade</h3>
            <a href="#vender">Serviços & projetos</a>
            <a href="#anuncios" onClick={() => onChooseCategory("Todos")}>
              Mural de trocas
            </a>
            <a href="#indique">Programa de indicação</a>
          </div>
          <div className="footer-col">
            <h3>TROCA</h3>
            <a href="#como-funciona">Como funciona</a>
            <a href="#seguranca">Segurança</a>
            <a href="https://www.unifor.br" target="_blank" rel="noreferrer">
              Conheça a Unifor ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 TROCA. FEITO POR ALUNOS DA UNIFOR.</span>
          <span>
            FORTALEZA — CE <span aria-hidden="true">↗</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
