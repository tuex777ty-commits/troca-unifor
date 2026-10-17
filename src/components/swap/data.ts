import { AudioLines, BookOpen, Gamepad2, GraduationCap, Monitor, Sparkles } from "lucide-react";

export const categories = [
  {
    name: "Streaming",
    desc: "Vídeo, música e leitura. Troque o que você não usa mais.",
    count: 38,
    icon: AudioLines,
    color: "stream-bg",
    id: "streaming",
  },
  {
    name: "Estudos",
    desc: "Cursos, idiomas e novas possibilidades para aprender.",
    count: 29,
    icon: BookOpen,
    color: "study-bg",
    id: "estudos",
  },
  {
    name: "Ferramentas",
    desc: "IA, design e produtividade. Dê um upgrade na sua rotina.",
    count: 52,
    icon: Sparkles,
    color: "tool-bg",
    id: "ferramentas",
  },
  {
    name: "Jogos",
    desc: "Jogos de tabuleiro e acessórios para jogar com a galera.",
    count: 24,
    icon: Gamepad2,
    color: "game-bg",
    id: "jogos",
  },
];

export const listings = [
  {
    id: 1,
    cat: "Streaming",
    type: "Vídeo",
    name: "Plano família 4 telas",
    wants: "Spotify",
    price: 30,
    delivery: "automatic",
    icon: Monitor,
    color: "stream-bg",
  },
  {
    id: 2,
    cat: "Ferramentas",
    type: "Inteligência artificial",
    name: "Assistente de escrita Pro",
    wants: "Notion Pro",
    price: 25,
    delivery: "automatic",
    icon: Sparkles,
    color: "tool-bg",
  },
  {
    id: 3,
    cat: "Estudos",
    type: "Idiomas",
    name: "Curso de inglês avançado",
    wants: "curso de espanhol",
    price: 40,
    delivery: "automatic",
    icon: GraduationCap,
    color: "study-bg",
  },
  {
    id: 4,
    cat: "Streaming",
    type: "Música",
    name: "Assinatura de música",
    wants: "plano de vídeo",
    price: 20,
    delivery: "automatic",
    icon: AudioLines,
    color: "stream-bg",
  },
  {
    id: 5,
    cat: "Jogos",
    type: "Jogo de tabuleiro",
    name: "Jogo cooperativo para jogar em grupo",
    wants: "jogo de cartas",
    price: 40,
    delivery: "manual",
    icon: Gamepad2,
    color: "game-bg",
  },
  {
    id: 6,
    cat: "Jogos",
    type: "Acessório gamer",
    name: "Controle USB para PC",
    wants: "headset gamer",
    price: 60,
    delivery: "manual",
    icon: Gamepad2,
    color: "game-bg",
  },
] as const;

export type Listing = (typeof listings)[number];

export const events = [
  "Aline trocou Canva Pro por Duolingo Plus",
  "Pedro anunciou ChatGPT Plus em Ferramentas",
  "Camila trocou plano família por assinatura de música",
  "Novo anúncio: editor de vídeo por curso de inglês",
];

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

export function filterListings(
  allListings: readonly Listing[],
  filter: string,
  search: string,
  savedIds: readonly number[],
) {
  const normalizedSearch = normalizeSearch(search.trim());

  return allListings.filter((listing) => {
    const matchesFilter =
      filter === "Todos" ||
      listing.cat === filter ||
      (filter === "Salvos" && savedIds.includes(listing.id));
    const searchableText = normalizeSearch(
      `${listing.name} ${listing.cat} ${listing.type} ${listing.wants}`,
    );

    return matchesFilter && (!normalizedSearch || searchableText.includes(normalizedSearch));
  });
}
