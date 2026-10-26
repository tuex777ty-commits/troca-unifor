import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function LoginDialog({ onClose }: { onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="login-dialog">
        <DialogHeader>
          <DialogTitle>Boas-vindas ao TROCA</DialogTitle>
          <DialogDescription>
            Entre com seu e-mail acadêmico para continuar na comunidade.
          </DialogDescription>
        </DialogHeader>
        <form
          className="login-form"
          onSubmit={(event) => {
            event.preventDefault();
            setMessage(
              "O acesso ainda não está conectado. Esta prévia não enviou nem armazenou seus dados.",
            );
          }}
        >
          <label className="login-field">
            E-mail da Unifor
            <input
              autoComplete="email"
              name="email"
              placeholder="voce@edu.unifor.br"
              required
              type="email"
            />
          </label>
          <label className="login-field">
            Senha
            <span className="login-password-wrap">
              <input
                autoComplete="current-password"
                name="password"
                placeholder="Digite sua senha"
                required
                type={showPassword ? "text" : "password"}
              />
              <button
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="login-password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                type="button"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </span>
          </label>
          <div className="login-links">
            <button
              onClick={() =>
                setMessage("A recuperação de senha ainda não está disponível nesta prévia.")
              }
              type="button"
            >
              Esqueceu a senha?
            </button>
          </div>
          <Button className="login-submit" type="submit" variant="ink">
            Entrar
          </Button>
          {message && (
            <p className="login-feedback" role="status">
              {message}
            </p>
          )}
          <p className="login-signup">
            Ainda não tem conta?{" "}
            <button
              onClick={() => setMessage("O cadastro ainda não está disponível nesta prévia.")}
              type="button"
            >
              Criar conta
            </button>
          </p>
          <p className="prototype-note">
            Login, cadastro e recuperação de senha ainda não estão conectados.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
