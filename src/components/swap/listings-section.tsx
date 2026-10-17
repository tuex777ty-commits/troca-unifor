import { ArrowLeftRight, Heart, Search, Truck, X, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { categories, type Listing } from "@/components/swap/data";

type ListingsSectionProps = {
  filter: string;
  search: string;
  savedIds: number[];
  listings: readonly Listing[];
  onFilterChange: (filter: string) => void;
  onSearchChange: (search: string) => void;
  onSavedToggle: (id: number) => void;
  onListingSelect: (listing: Listing) => void;
};

export function ListingsSection({
  filter,
  search,
  savedIds,
  listings,
  onFilterChange,
  onSearchChange,
  onSavedToggle,
  onListingSelect,
}: ListingsSectionProps) {
  const filters = ["Todos", ...categories.map((category) => category.name), "Salvos"];

  return (
    <section className="listings scroll-reveal" id="anuncios">
      <div className="container">
        <div className="section-eyebrow">O mural da comunidade</div>
        <div className="section-head">
          <div>
            <h2>Encontre o seu próximo match.</h2>
            <p>O que alguém não usa pode ser exatamente o que você precisa.</p>
          </div>
          <Button variant="ghost" onClick={() => onFilterChange("Todos")}>
            Ver todos <ArrowLeftRight />
          </Button>
        </div>
        <ListingSearch value={search} onChange={onSearchChange} />
        <div className="filter-row" aria-label="Filtrar anúncios">
          {filters.map((item) => (
            <Button
              key={item}
              variant="outline"
              className={filter === item ? "selected" : ""}
              onClick={() => onFilterChange(item)}
              aria-pressed={filter === item}
            >
              {item === "Salvos" && <Heart size={12} />}
              {item}
              {item === "Todos" && <span>{String(listings.length).padStart(2, "0")}</span>}
            </Button>
          ))}
        </div>
        <div className="listing-grid">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              saved={savedIds.includes(listing.id)}
              onSavedToggle={() => onSavedToggle(listing.id)}
              onSelect={() => onListingSelect(listing)}
            />
          ))}
        </div>
        {listings.length === 0 && (
          <p className="listing-empty" role="status">
            {filter === "Salvos" && !search
              ? "Você ainda não salvou nenhum anúncio."
              : "Nenhum anúncio encontrado. Tente outro termo ou filtro."}
          </p>
        )}
        <p className="text-muted-foreground text-[9px] mt-4 font-mono">
          ANÚNCIOS ILUSTRATIVOS — AÇÕES E NEGOCIAÇÕES AINDA NÃO ESTÃO DISPONÍVEIS
        </p>
      </div>
    </section>
  );
}

function ListingSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="listing-search">
      <Search size={17} />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por anúncio, categoria ou item desejado..."
        aria-label="Buscar anúncios"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Limpar pesquisa"
          onClick={() => onChange("")}
        >
          <X size={15} />
        </Button>
      )}
    </label>
  );
}

function ListingCard({
  listing,
  saved,
  onSavedToggle,
  onSelect,
}: {
  listing: Listing;
  saved: boolean;
  onSavedToggle: () => void;
  onSelect: () => void;
}) {
  return (
    <article className="listing-card">
      <div className={`listing-media ${listing.color}`}>
        <span className="badge">{listing.cat.toUpperCase()}</span>
        <Button
          variant="ghost"
          size="icon"
          className={`save-button ${saved ? "saved" : ""}`}
          aria-label={`${saved ? "Remover dos salvos" : "Salvar"}: ${listing.name}`}
          aria-pressed={saved}
          onClick={onSavedToggle}
        >
          <Heart size={15} />
        </Button>
        <listing.icon />
      </div>
      <div className="listing-body">
        <small>{listing.type}</small>
        <h3>{listing.name}</h3>
        <strong className="listing-price">R$ {listing.price.toFixed(2).replace(".", ",")}</strong>
        <div className="listing-meta">
          <ArrowLeftRight size={12} /> Procura: {listing.wants}
        </div>
        <div className="listing-options">
          <span className="listing-option">
            <ArrowLeftRight size={12} /> Venda ou troca
          </span>
          <span className="listing-option">
            {listing.delivery === "automatic" ? <Zap size={12} /> : <Truck size={12} />}
            {listing.delivery === "automatic"
              ? "Entrega automática · em breve"
              : "Envio pelo vendedor"}
          </span>
        </div>
        <div className="listing-status">
          <i /> DISPONÍVEL
        </div>
        <Button variant="outline" className="listing-view" onClick={onSelect}>
          Ver anúncio
        </Button>
      </div>
    </article>
  );
}
