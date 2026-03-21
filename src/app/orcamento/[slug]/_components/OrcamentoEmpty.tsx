export default function OrcamentoEmpty() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-[clamp(1.5rem,4vw,5rem)]">
      <div className="text-center flex flex-col items-center gap-[2rem]">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#D9381E]">
          Conteúdo não configurado
        </span>
        <h2
          className="font-serif font-normal text-[#0A0A0A] leading-[1] tracking-tighter"
          style={{
            fontSize: "clamp(2rem,4vw,4rem)",
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          Esta proposta ainda não possui<br />
          <span className="italic text-[#555555]">conteúdo publicado.</span>
        </h2>
        <p className="font-sans text-[0.875rem] text-[#555555] max-w-[32rem]">
          Configure o conteúdo desta proposta no painel administrativo para que ela seja
          visualizada corretamente pelos clientes.
        </p>
      </div>
    </div>
  );
}
