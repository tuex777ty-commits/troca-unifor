import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LoginDialog } from "@/components/swap/login-dialog";

describe("LoginDialog", () => {
  it("shows email and password fields and can reveal the password", () => {
    render(<LoginDialog onClose={vi.fn()} />);

    expect(screen.getByLabelText("E-mail da Unifor")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByRole("button", { name: "Mostrar senha" }));

    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "text");
  });

  it("does not claim to authenticate or transmit form data", () => {
    render(<LoginDialog onClose={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("E-mail da Unifor"), {
      target: { value: "aluna@edu.unifor.br" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "minha-senha" } });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Esta prévia não enviou nem armazenou seus dados.",
    );
  });
});
