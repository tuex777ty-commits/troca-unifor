import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, ArrowLeftRight, AudioLines, BookOpen, Sparkles, BriefcaseBusiness, Menu, X, ShieldCheck, Users, Eye, LockKeyhole, Heart, Code2, FileText, Monitor, GraduationCap, Check, Plus, Gift, Gamepad2, Truck, Zap, Search } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import deskImage from '@/assets/community-desk.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'TROCA — Trocas, serviços e projetos da Unifor' },
    { name: 'description', content: 'Sua assinatura parada vale mais trocada. Explore streaming, estudos, ferramentas e projetos na comunidade Unifor.' },
    { property: 'og:title', content: 'TROCA — Conexões que valem mais' },
    { property: 'og:description', content: 'Trocas, serviços e projetos entre alunos da Unifor. Encontre o que você precisa no mural da comunidade.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Index,
});
const categories = [
  { name:'Streaming', desc:'Vídeo, música e leitura. Troque o que você não usa mais.', count:38, icon:AudioLines, color:'stream-bg', id:'streaming' },
  { name:'Estudos', desc:'Cursos, idiomas e novas possibilidades para aprender.', count:29, icon:BookOpen, color:'study-bg', id:'estudos' },
  { name:'Ferramentas', desc:'IA, design e produtividade. Dê um upgrade na sua rotina.', count:52, icon:Sparkles, color:'tool-bg', id:'ferramentas' },
  { name:'Jogos', desc:'Jogos de tabuleiro e acessórios para jogar com a galera.', count:24, icon:Gamepad2, color:'game-bg', id:'jogos' },
];
const listings = [
  { id:1, cat:'Streaming', type:'Vídeo', name:'Plano família 4 telas', wants:'Spotify', price:30, delivery:'automatic', icon:Monitor, color:'stream-bg' },
  { id:2, cat:'Ferramentas', type:'Inteligência artificial', name:'Assistente de escrita Pro', wants:'Notion Pro', price:25, delivery:'automatic', icon:Sparkles, color:'tool-bg' },
  { id:3, cat:'Estudos', type:'Idiomas', name:'Curso de inglês avançado', wants:'curso de espanhol', price:40, delivery:'automatic', icon:GraduationCap, color:'study-bg' },
  { id:4, cat:'Streaming', type:'Música', name:'Assinatura de música', wants:'plano de vídeo', price:20, delivery:'automatic', icon:AudioLines, color:'stream-bg' },
  { id:5, cat:'Jogos', type:'Jogo de tabuleiro', name:'Jogo cooperativo para jogar em grupo', wants:'jogo de cartas', price:40, delivery:'manual', icon:Gamepad2, color:'game-bg' },
  { id:6, cat:'Jogos', type:'Acessório gamer', name:'Controle USB para PC', wants:'headset gamer', price:60, delivery:'manual', icon:Gamepad2, color:'game-bg' },
] as const;
type Listing = (typeof listings)[number];
const events = ['Aline trocou Canva Pro por Duolingo Plus', 'Pedro anunciou ChatGPT Plus em Ferramentas', 'Camila trocou plano família por assinatura de música', 'Novo anúncio: editor de vídeo por curso de inglês'];
function Logo() { return <a href="#" className="logo" aria-label="SWAP, início"><ArrowLeftRight className="logo-mark" />SWAP<span className="logo-dot">.</span></a>; }
function Index() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState<number[]>([]);
  const [info, setInfo] = useState<string | null>(null);
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  useEffect(() => {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold:.1 });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => { observer.disconnect(); document.documentElement.classList.remove('motion-ready'); };
  }, []);
  useEffect(() => { if (!info) return; const handler = (event:KeyboardEvent) => { if(event.key==='Escape') setInfo(null); }; document.addEventListener('keydown', handler); return () => document.removeEventListener('keydown', handler); }, [info]);
  const choose = (name:string) => { setFilter(name); setMenu(false); };
  const normalizedSearch = search.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const visibleListings = listings.filter(listing => {
    const matchesFilter = filter === 'Todos' || listing.cat === filter || (filter === 'Salvos' && saved.includes(listing.id));
    const searchableText = `${listing.name} ${listing.cat} ${listing.type} ${listing.wants}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
    return matchesFilter && (!normalizedSearch || searchableText.includes(normalizedSearch));
  });
  return <>
    <div className="topbar"><div className="container"><span>FEITO POR ALUNOS. PARA ALUNOS.</span><a href="https://www.unifor.br" target="_blank" rel="noreferrer">COMUNIDADE UNIFOR <ArrowUpRight size={11}/></a></div></div>
    <header className="site-header"><div className="container nav"><div className="nav-left"><Logo/><nav className="nav-links" aria-label="Principal">{categories.map(c => <a key={c.id} href="#anuncios" onClick={() => choose(c.name)}>{c.name}</a>)}</nav></div><Link to="/presente" className="nav-gift"><Gift size={13}/> ASSINATURAS GRÁTIS</Link><div className="nav-actions"><Button variant="ghost" className="nav-login" onClick={() => setInfo('Entrar na comunidade')}>Entrar <ArrowUpRight/></Button><Button variant="ink" asChild><a href="#vender">Anunciar <Plus/></a></Button><Button variant="ghost" size="icon" className="menu-trigger" aria-label={menu?'Fechar menu':'Abrir menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu?<X/>:<Menu/>}</Button></div></div>{menu && <nav className="mobile-menu" aria-label="Menu móvel">{categories.map(c => <a key={c.id} href="#anuncios" onClick={() => choose(c.name)}>{c.name}</a>)}<a href="#vender" onClick={() => setMenu(false)}>Serviços & projetos</a><a href="#como-funciona" onClick={() => setMenu(false)}>Como funciona</a></nav>}</header>
    <main>
      <section className="hero"><div className="container"><div className="hero-meta reveal"><div className="hero-label"><span className="status-dot"/> CONEXÕES QUE VALEM MAIS</div><div className="hero-meta-right"><span>FORTALEZA, CE</span><span>UNIFOR / 2026</span></div></div><div className="hero-stage reveal"><h1 className="hero-wordmark">SWAP<span className="wordmark-dot">.</span></h1>{[
        {cls:'float-stream', icon:AudioLines, number:'01', cat:'STREAMING', name:'Vídeo & música', foot:'trocas ativas', count:'38'},
        {cls:'float-tools', icon:Sparkles, number:'03', cat:'FERRAMENTAS', name:'IA & software', foot:'trocas ativas', count:'52'},
        {cls:'float-study', icon:BookOpen, number:'02', cat:'ESTUDOS', name:'Cursos & idiomas', foot:'trocas ativas', count:'29'},
        {cls:'float-service', icon:BriefcaseBusiness, number:'04', cat:'SERVIÇOS', name:'Projetos & freela', foot:'anúncios', count:'17'},
      ].map(c => <a key={c.cls} href={c.cat==='SERVIÇOS'?'#vender':'#anuncios'} onClick={() => { if(c.cat!=='SERVIÇOS') choose(c.cat==='STREAMING'?'Streaming':c.cat==='ESTUDOS'?'Estudos':'Ferramentas'); }} className={`floating-card ${c.cls}`}><div className="float-top"><c.icon/><span>{c.number} <ArrowUpRight size={11}/></span></div><small>{c.cat}</small><h3>{c.name}</h3><div className="float-foot"><span>{c.foot}</span><span>{c.count}</span></div></a>)}</div><div className="hero-bottom reveal"><h2>Sua assinatura parada vale mais trocada.</h2><p>Troque assinaturas, compartilhe talentos e descubra possibilidades na Unifor.</p><div className="hero-ctas"><Button variant="brand" asChild><a href="#anuncios" onClick={() => choose('Todos')}>Explorar trocas <ArrowUpRight/></a></Button><Button variant="outline" asChild><a href="#vender">Anunciar o que tenho <Plus/></a></Button></div><div className="hero-note"><ShieldCheck size={13}/> Sem custo para trocar. De aluno para aluno.</div></div></div></section>
      <div className="ticker" aria-label="Atividades ilustrativas do mural"><div className="ticker-label"><i/> NO MURAL</div><div className="ticker-track">{[...events,...events].map((e,i) => <span key={i}>{e}<b>↗</b></span>)}</div></div>
      <section className="categories"><div className="container"><div className="section-eyebrow">Encontre sua próxima troca</div><div className="category-grid">{categories.map(c => <a href="#anuncios" onClick={() => choose(c.name)} className="category" key={c.id}><div className={`category-icon ${c.color}`}><c.icon size={25} strokeWidth={1.5}/></div><div><h3>{c.name}</h3><p>{c.desc}</p><small>{c.count} ANÚNCIOS <span aria-hidden="true">↗</span></small></div><ArrowUpRight size={19}/></a>)}</div></div></section>
      <section className="listings scroll-reveal" id="anuncios"><div className="container"><div className="section-eyebrow">O mural da comunidade</div><div className="section-head"><div><h2>Encontre o seu próximo match.</h2><p>O que alguém não usa pode ser exatamente o que você precisa.</p></div><Button variant="ghost" onClick={() => choose('Todos')}>Ver todos <ArrowUpRight/></Button></div><label className="listing-search"><Search size={17}/><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar por anúncio, categoria ou item desejado..." aria-label="Buscar anúncios"/>{search && <Button variant="ghost" size="icon" aria-label="Limpar pesquisa" onClick={() => setSearch('')}><X size={15}/></Button>}</label><div className="filter-row" aria-label="Filtrar anúncios">{['Todos','Streaming','Estudos','Ferramentas','Jogos','Salvos'].map(f => <Button key={f} variant="outline" className={filter===f?'selected':''} onClick={() => choose(f)} aria-pressed={filter===f}>{f==='Salvos' && <Heart size={12}/>} {f}{f==='Todos' && <span>{String(listings.length).padStart(2,'0')}</span>}</Button>)}</div><div className="listing-grid">{visibleListings.map(l => <article className="listing-card" key={l.id}><div className={`listing-media ${l.color}`}><span className="badge">{l.cat.toUpperCase()}</span><Button variant="ghost" size="icon" className={`save-button ${saved.includes(l.id)?'saved':''}`} aria-label={`${saved.includes(l.id)?'Remover dos salvos':'Salvar'}: ${l.name}`} aria-pressed={saved.includes(l.id)} onClick={() => setSaved(prev => prev.includes(l.id)?prev.filter(id=>id!==l.id):[...prev,l.id])}><Heart size={15}/></Button><l.icon/></div><div className="listing-body"><small>{l.type}</small><h3>{l.name}</h3><strong className="listing-price">R$ {l.price.toFixed(2).replace('.', ',')}</strong><div className="listing-meta"><ArrowLeftRight size={12}/> Procura: {l.wants}</div><div className="listing-options"><span className="listing-option"><ArrowLeftRight size={12}/> Venda ou troca</span><span className="listing-option">{l.delivery === 'automatic' ? <Zap size={12}/> : <Truck size={12}/>} {l.delivery === 'automatic' ? 'Entrega automática · em breve' : 'Envio pelo vendedor'}</span></div><div className="listing-status"><i/> DISPONÍVEL</div><Button variant="outline" className="listing-view" onClick={() => setActiveListing(l)}>Ver anúncio</Button></div></article>)}</div>{visibleListings.length===0 && <p className="listing-empty" role="status">{filter==='Salvos' && !search ? 'Você ainda não salvou nenhum anúncio.' : 'Nenhum anúncio encontrado. Tente outro termo ou filtro.'}</p>}<p className="text-muted-foreground text-[9px] mt-4 font-mono">ANÚNCIOS ILUSTRATIVOS — AÇÕES E NEGOCIAÇÕES AINDA NÃO ESTÃO DISPONÍVEIS</p></div></section>
      <section className="how" id="como-funciona"><div className="container how-layout scroll-reveal"><div><div className="section-eyebrow">Simples assim</div><h2>Menos assinatura parada.<br/>Mais possibilidades.</h2>{[
        ['Anuncie o que você tem','Escolha a categoria, descreva o plano e diga o que você quer em troca.'],['Encontre um par','Veja no mural quem tem o que você procura e precisa do que você oferece.'],['Conecte e combine','Converse com a outra pessoa e combine os detalhes da troca.'],
      ].map(([title,desc],i) => <div className="step" key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div><div className="how-photo"><img src={deskImage} alt="Fones de ouvido, notebook e materiais de estudo sobre uma mesa" loading="lazy" width={1536} height={1024}/><div className="photo-tag"><ArrowLeftRight size={23}/><span>O que conecta a gente<br/>vai além da sala de aula.</span></div></div></div></section>
      <section className="trust" id="seguranca"><div className="container trust-grid">{[{icon:ShieldCheck,title:'Sem custo para trocar',desc:'Trocas entre assinaturas são gratuitas.'},{icon:Eye,title:'Mural aberto',desc:'Descubra oportunidades da comunidade.'},{icon:Users,title:'De aluno para aluno',desc:'Feito para a comunidade Unifor.'},{icon:LockKeyhole,title:'Sua segurança importa',desc:'Combine os detalhes antes de trocar.'}].map(t=><div className="trust-item" key={t.title}><t.icon/><div><h3>{t.title}</h3><p>{t.desc}</p></div></div>)}</div></section>
      <section className="market scroll-reveal" id="vender"><div className="container"><div className="section-eyebrow">Seu talento também tem espaço</div><div className="section-head"><div><h2>Mais que trocas. Oportunidades.</h2><p>Transforme o que você sabe em algo que a comunidade precisa.</p></div></div><div className="market-grid">{[{icon:Code2,title:'Projetos & código',desc:'Publique projetos prontos, scripts e templates para outros alunos.',cta:'Anunciar projeto'},{icon:BriefcaseBusiness,title:'Serviços',desc:'Ofereça freelas, aulas particulares e consultorias dentro da comunidade.',cta:'Oferecer serviço'},{icon:FileText,title:'Infoprodutos',desc:'Compartilhe e-books, resumos e materiais de estudo com outros alunos.',cta:'Publicar infoproduto'}].map((m,i)=><article className="market-item" key={m.title}><div className="market-top"><span>0{i+1}</span><m.icon size={24}/></div><h3>{m.title}</h3><p>{m.desc}</p><Button variant="link" className="p-0 h-auto text-xs" onClick={()=>setInfo(m.cta)}>{m.cta} <ArrowUpRight/></Button></article>)}</div></div></section>
      <section className="affiliate" id="indique"><div className="container affiliate-layout scroll-reveal"><div><div className="section-eyebrow mb-4">Boas conexões merecem retorno</div><h2>Indique. Conecte.<br/><em>Ganhe com a comunidade.</em></h2><p>Compartilhe seu link de indicação. A cada duas vendas confirmadas pela sua indicação, você ganha comissão.</p><Button variant="brand" onClick={()=>setInfo('Programa de indicação')}>Conhecer o programa <ArrowUpRight/></Button></div><div className="affiliate-stat">2×<small>VENDAS PARA LIBERAR<br/>A PRIMEIRA COMISSÃO</small></div></div></section>
    </main>
    <footer><div className="container"><div className="footer-top"><div className="footer-brand"><Logo/><p>Trocas, serviços e projetos entre alunos da Unifor. Conexões que fazem a vida universitária render mais.</p></div><div className="footer-col"><h3>Explore</h3>{categories.map(c=><a href="#anuncios" key={c.id} onClick={()=>choose(c.name)}>{c.name}</a>)}</div><div className="footer-col"><h3>Na comunidade</h3><a href="#vender">Serviços & projetos</a><a href="#anuncios" onClick={()=>choose('Todos')}>Mural de trocas</a><a href="#indique">Programa de indicação</a></div><div className="footer-col"><h3>TROCA</h3><a href="#como-funciona">Como funciona</a><a href="#seguranca">Segurança</a><a href="https://www.unifor.br" target="_blank" rel="noreferrer">Conheça a Unifor ↗</a></div></div><div className="footer-bottom"><span>© 2026 TROCA. FEITO POR ALUNOS DA UNIFOR.</span><span>FORTALEZA — CE <span aria-hidden="true">↗</span></span></div></div></footer>
    {activeListing && <ListingDialog listing={activeListing} close={() => setActiveListing(null)} />}
    {info && <InfoDialog title={info} close={()=>setInfo(null)}/>}
  </>;
}
function ListingDialog({listing,close}:{listing:Listing;close:()=>void}) {
  const [mode,setMode] = useState<'details'|'proposal'|'purchase'>('details');
  const [submitted,setSubmitted] = useState(false);
  const amount = `R$ ${listing.price.toFixed(2).replace('.', ',')}`;
  return <Dialog open onOpenChange={open=>{if(!open)close();}}>
    <DialogContent className="transaction-dialog">
      <DialogHeader>
        <DialogTitle>{mode==='proposal'?'Fazer proposta':mode==='purchase'?'Comprar anúncio':listing.name}</DialogTitle>
        <DialogDescription>{listing.cat} · {listing.type} · valor pedido {amount}</DialogDescription>
      </DialogHeader>
      {mode==='details' && <>
        <div className="transaction-summary">
          <p>O anunciante aceita venda ou troca. Você pode oferecer um item e sugerir um complemento em dinheiro; a decisão é do anunciante.</p>
          <p><strong>Entrega:</strong> {listing.delivery==='automatic'?'Automática para produto digital (planejada; ainda indisponível).':'Envio feito pelo vendedor.'}</p>
        </div>
        <p className="prototype-note">Prévia da interface: anúncios, pagamentos e conversas ainda não estão conectados.</p>
        <div className="transaction-actions">
          <Button variant="brand" onClick={()=>{setSubmitted(false);setMode('proposal');}}>Fazer proposta</Button>
          <Button variant="outline" onClick={()=>{setSubmitted(false);setMode('purchase');}}>Comprar</Button>
        </div>
      </>}
      {mode==='proposal' && (submitted
        ? <div className="prototype-note" role="status">Esta é apenas uma prévia. A proposta não foi enviada nem salva.</div>
        : <form className="proposal-form" onSubmit={event=>{event.preventDefault();setSubmitted(true);}}>
            <label>Item que você oferece<input required name="offered-item" placeholder="Ex.: outro jogo de tabuleiro" /></label>
            <label>Valor que você atribui ao item (R$)<input required name="offered-value" type="number" min="0" step="0.01" placeholder="Ex.: 25,00" /></label>
            <label>Complemento em dinheiro (R$)<input name="cash-difference" type="number" min="0" step="0.01" placeholder="Opcional" /></label>
            <p className="prototype-note">Você pode sugerir valores; o anunciante avalia e pode aceitar, recusar ou fazer uma contraproposta. Pagamentos e chat ainda não estão disponíveis nesta prévia.</p>
            <div className="transaction-actions"><Button type="button" variant="outline" onClick={()=>setMode('details')}>Voltar</Button><Button type="submit" variant="brand">Pré-visualizar proposta</Button></div>
          </form>
      )}
      {mode==='purchase' && <div className="transaction-summary"><p>Preço anunciado: <strong>{amount}</strong></p><p className="prototype-note">O SWAP ainda não processa pagamentos. Esta ação é apenas demonstrativa e não inicia uma compra.</p><Button variant="outline" onClick={()=>setMode('details')}>Voltar ao anúncio</Button></div>}
    </DialogContent>
  </Dialog>;
}
function InfoDialog({title,close}:{title:string;close:()=>void}) {
  return <Dialog open onOpenChange={open=>{if(!open)close();}}><DialogContent><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription className="pt-3 leading-relaxed">{title==='Programa de indicação'?'A proposta do programa é liberar uma comissão a cada duas vendas confirmadas por indicação. O programa ainda não está disponível.':'Esta é uma prévia do TROCA. O cadastro e a publicação de anúncios ainda não estão disponíveis.'}</DialogDescription></DialogHeader><Button variant="brand" onClick={close}><Check/> Entendi</Button></DialogContent></Dialog>;
}