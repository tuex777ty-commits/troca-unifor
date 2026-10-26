import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  AffiliateSection,
  CategoryGrid,
  HeroSection,
  HowItWorksSection,
  MarketplaceSection,
  Ticker,
  TrustSection,
} from "@/components/swap/landing-sections";
import { filterListings, listings, type Listing } from "@/components/swap/data";
import { InfoDialog } from "@/components/swap/info-dialog";
import { LoginDialog } from "@/components/swap/login-dialog";
import { ListingDialog } from "@/components/swap/listing-dialog";
import { ListingsSection } from "@/components/swap/listings-section";
import { SiteFooter, SiteHeader } from "@/components/swap/site-chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TROCA — Trocas, serviços e projetos da Unifor" },
      {
        name: "description",
        content:
          "Sua assinatura parada vale mais trocada. Explore streaming, estudos, ferramentas e projetos na comunidade Unifor.",
      },
      { property: "og:title", content: "TROCA — Conexões que valem mais" },
      {
        property: "og:description",
        content:
          "Trocas, serviços e projetos entre alunos da Unifor. Encontre o que você precisa no mural da comunidade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [info, setInfo] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [activeListing, setActiveListing] = useState<Listing | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );

    document.querySelectorAll(".scroll-reveal").forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    if (!info) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setInfo(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [info]);

  const visibleListings = filterListings(listings, filter, search, savedIds);
  const chooseCategory = (category: string) => setFilter(category);
  const toggleSaved = (id: number) => {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
    );
  };

  return (
    <>
      <SiteHeader onLogin={() => setLoginOpen(true)} onChooseCategory={chooseCategory} />
      <main>
        <HeroSection onChooseCategory={chooseCategory} />
        <Ticker />
        <CategoryGrid onChooseCategory={chooseCategory} />
        <ListingsSection
          filter={filter}
          search={search}
          savedIds={savedIds}
          listings={visibleListings}
          onFilterChange={chooseCategory}
          onSearchChange={setSearch}
          onSavedToggle={toggleSaved}
          onListingSelect={setActiveListing}
        />
        <HowItWorksSection />
        <TrustSection />
        <MarketplaceSection onAction={setInfo} />
        <AffiliateSection onAction={setInfo} />
      </main>
      <SiteFooter onChooseCategory={chooseCategory} />
      {activeListing && (
        <ListingDialog listing={activeListing} onClose={() => setActiveListing(null)} />
      )}
      {loginOpen && <LoginDialog onClose={() => setLoginOpen(false)} />}
      {info && <InfoDialog title={info} onClose={() => setInfo(null)} />}
    </>
  );
}
