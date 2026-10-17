import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function InfoDialog({ title, onClose }: { title: string; onClose: () => void }) {
  const description =
    title === "Programa de indicação"
      ? "A proposta do programa é liberar uma comissão a cada duas vendas confirmadas por indicação. O programa ainda não está disponível."
      : "Esta é uma prévia do TROCA. O cadastro e a publicação de anúncios ainda não estão disponíveis.";

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="pt-3 leading-relaxed">{description}</DialogDescription>
        </DialogHeader>
        <Button variant="brand" onClick={onClose}>
          <Check /> Entendi
        </Button>
      </DialogContent>
    </Dialog>
  );
}
