import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowLeftRight, ArrowUpRight, AudioLines, GraduationCap, Sparkles, Gift, ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/presente')({
  head: () => ({
    meta: [
      { title: 'TROCA — Presente para quem escaneou' },
      { name: 'description', content: 'Você escaneou o QR code do evento TROCA na Unifor. Escolha uma assinatura gratuita.' },
    ],
  }),
  component: Presente,
});

const offers = [
  {
    id: 'streaming',
    cat: 'STREAMING',
    num: '01',
    title: '1 mês de streaming',
    desc: 'Vídeo, música e leitura sem anúncios para o seu descanso.',
    icon: AudioLines,
    color: 'stream-bg',
  },
  {
    id: 'ferramenta',
    cat: 'FERRAMENTAS',
    num: '02',
    title: '1 mês de ferramenta',
    desc: 'IA de escrita, design ou produtividade para o seu semestre.',
    icon: Sparkles,
    color: 'tool-bg',
  },
  {
    id: 'curso',
    cat: 'ESTUDOS',
    num: '03',
    title: '1 mês de curso',
    desc: 'Idiomas, programação ou preparação para provas.',
    icon: GraduationCap,
    color: 'study-bg',
  },
];

function Logo() {
  return (
    <a href="/" className="logo" aria-label="TROCA, início">
      <ArrowLeftRight className="logo-mark" />
      TROCA<span className="logo-dot">.</span>
    </a>
  );
}

function Presente() {
  const [chosen, setChosen] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  if (confirmed) {
    const offer = offers.find((o) => o.id === chosen)!;
    const Icon = offer.icon;
    return (
      <>
        <header className="site-header">
          <div className="container nav">
            <Logo />
            <div className="nav-actions">
              <a href="/">
                <ArrowLeft size={16} /> Voltar ao site
              </a>
            </div>
          </div>
        </header>
        <main>
          <section className="gift gift-page">
            <div className="container gift-confirmed reveal">
              <div className={`category-icon ${offer.color}`} style={{ width: 72, height: 72, margin: '0 auto 24px' }}>
                <Icon size={34} strokeWidth={1.5} />
              </div>
              <p className="gift-hint" style={{ margin: '0 auto 20px' }}>
                <Gift size={13} /> RESGATADO COM SUCESSO
              </p>
              <h1 className="gift-title" style={{ textAlign: 'center', margin: '0 0 16px' }}>
                Aproveite o seu<br /><em>{offer.title}</em>
              </h1>
              <p style={{ textAlign: 'center', maxWidth: 400, margin: '0 auto 28px' }}>
                Em breve você receberá o acesso. Fique de olho no seu e-mail da Unifor.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <a href="/" className="gift-cta">
                  Conhecer o TROCA <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </section>
        </main>
        <footer>
          <div className="container">
            <div className="footer-bottom">
              <span>© 2026 TROCA. FEITO POR ALUNOS DA UNIFOR.</span>
              <span>FORTALEZA — CE <span aria-hidden="true">↗</span></span>
            </div>
          </div>
        </footer>
      </>
    );
  }

  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <Logo />
          <div className="nav-actions">
            <a href="/">
              <ArrowLeft size={16} /> Voltar ao site
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="gift gift-page">
          <div className="container gift-layout">
            {/* Left: copy */}
            <div className="reveal">
              <div className="gift-hint">
                <Gift size={13} /> EVENTO NO CAMPUS — PRESENTE PARA QUEM ESCANEOU
              </div>
              <h1 className="gift-title">
                Você escaneou.<br />
                Ganhou <em>1 de 3</em> assinaturas de graça.
              </h1>
              <p>
                Esta página é exclusiva para quem leu o QR code do evento TROCA na
                Unifor. Escolha uma das opções ao lado e aproveite de graça.
              </p>
              <div className="gift-note">
                <Gift size={13} /> Válido apenas durante o evento. Uma escolha por pessoa.
              </div>
            </div>

            {/* Right: cards */}
            <div className="reveal">
              <div className="gift-list">
                {offers.map((offer) => {
                  const Icon = offer.icon;
                  const isSelected = chosen === offer.id;
                  return (
                    <button
                      key={offer.id}
                      className={`gift-card gift-card-pick${isSelected ? ' gift-card--selected' : ''}`}
                      onClick={() => setChosen(offer.id)}
                      type="button"
                      aria-pressed={isSelected}
                    >
                      <span className={`category-icon ${offer.color}`}>
                        <Icon size={24} strokeWidth={1.5} />
                      </span>
                      <div>
                        <h3>{offer.title}</h3>
                        <p>{offer.desc}</p>
                        <small>{offer.num} · {offer.cat}</small>
                      </div>
                      <span className="gift-tag">GRÁTIS</span>
                    </button>
                  );
                })}
              </div>

              <button
                className={`gift-submit${chosen ? ' gift-submit--active' : ''}`}
                disabled={!chosen}
                onClick={() => chosen && setConfirmed(true)}
                type="button"
              >
                {chosen ? <>Resgatar agora <ArrowUpRight size={13} /></> : 'Escolha uma opção acima'}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-bottom">
            <span>© 2026 TROCA. FEITO POR ALUNOS DA UNIFOR.</span>
            <span>FORTALEZA — CE <span aria-hidden="true">↗</span></span>
          </div>
        </div>
      </footer>
    </>
  );
}
