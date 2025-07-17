export default function AboutUs() {
  return (
    <div id="about-us" className="min-h-lvh flex flex-col p-4">
      <div className="flex flex-col md:flex-row justify-between mb-20">
        <h2 className="text-4xl font-bold text-nowrap">Sobre nós</h2>
        <p className="max-w-md">
          A Elevate Pro Media é uma empresa de marketing digital que oferece
          soluções inovadoras para empresas que desejam se destacar no mercado.
        </p>
      </div>
      <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-3 md:grid-rows-2 gap-4 flex-1">
        <div className="row-span-2 md:col-span-2 md:row-span-2 rounded">1</div>
        <div className="row-start-3 md:col-start-3 rounded">2</div>
        <div className="row-start-4 md:col-start-3 md:row-start-2 min-h-64 rounded">
          3
        </div>
      </div>
      <div className="bg-[#262626] p-4 rounded-lg">
        <div>
          <h2 className="text-2xl font-bold text-nowrap">
            Nossas conquistas e números
          </h2>
          <p className="max-w-md text-[#ababab] opacity-70">
            Fornecendo às empresas ferramentas eficazes para melhorar os fluxos
            de trabalho
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-4 justify-evenly py-8">
          <div className="flex items-center flex-col gap-2">
            <p className="text-sm text-[#ababab] opacity-70">
              Empresas Atendidas
            </p>
            <h3 className="text-2xl font-bold text-nowrap">+99</h3>
          </div>
          <div className="flex items-center flex-col gap-2 grow-0">
            <p className="text-sm text-[#ababab] opacity-70">
              Projetos Concluídos
            </p>
            <h3 className="text-2xl font-bold text-nowrap">+999</h3>
          </div>
          <div className="flex items-center flex-col gap-2 grow-0">
            <p className="text-sm text-[#ababab] opacity-70">
              Aprovação de Clientes
            </p>
            <h3 className="text-2xl font-bold text-nowrap">90%</h3>
          </div>
          <div className="flex items-center flex-col gap-2 grow-0">
            <p className="text-sm text-[#ababab] opacity-70">
              Empresas Atendidas
            </p>
            <h3 className="text-2xl font-bold text-nowrap">+99</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
