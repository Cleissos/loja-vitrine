import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MessageCircle, 
  X, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  Play, 
  Sparkles, 
  ArrowUpRight, 
  Check, 
  ChevronRight, 
  SlidersHorizontal 
} from 'lucide-react';

const MEUS_PRODUTOS = [
  {
    id: 1,
    name: "Conjunto de Talheres Premium 25 Peças Preto Elegance",
    category: "Louças",
    price: 25.90,
    oldPrice: 31.90,
    badge: "Mais Vendido",
    description: "Um conjunto de talheres moderno e sofisticado, ideal para complementar sua mesa com elegância e praticidade. Fabricado com materiais de alta qualidade, possui acabamento refinado e cabos ergonômicos que proporcionam conforto durante o uso. Perfeito para refeições do dia a dia, encontros familiares e ocasiões especiais.",
    mediaType: "image",
    mediaUrl: "/talher1.webp",
    additionalMedia: [
      "/talher1.webp",
      "/talher2.webp",
      "/talher3.webp",
      "/talher4.webp",
      "/talher5.webp"
    ],
    specifications: [
      { name: "Material", value: "Aço Inoxidável Premium" },
      { name: "Cor", value: "Preto Fosco" },
      { name: "Quantidade de Peças", value: "25 Peças" },
      { name: "Acabamento", value: "Polido e Resistente à Corrosão" }
    ]
  },
  {
    id: 2,
    name: "Headphone Pro Hifi ANC-90",
    category: "Áudio",
    price: 145.00,
    badge: "Exclusivo",
    description: "Sinta cada nota com pureza total. Cancelamento de ruído ativo híbrido que isola o ambiente externo de forma inteligente, aliado a diafragmas de grafeno de 40mm para agudos nítidos e graves profundos.",
    mediaType: "image",
    mediaUrl: "https://iloft.fbitsstatic.net/img/p/headphone-anc-vintage-preto-95266/281977-1.jpg?w=520&h=520&v=202509250227&qs=ignore",
    additionalMedia: [
      "https://iloft.fbitsstatic.net/img/p/headphone-anc-vintage-preto-95266/281977-1.jpg?w=520&h=520&v=202509250227&qs=ignore",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=1200"
    ],
    specifications: [
      { name: "Autonomia da Bateria", value: "Até 40 horas com ANC ativo" },
      { name: "Conexão", value: "Bluetooth 5.3 Multiponto / P2" },
      { name: "Codec Suportado", value: "LDAC, AAC, SBC" },
      { name: "Cancelamento de Ruído", value: "Ativo e Híbrido até -42dB" }
    ]
  },
  {
    id: 3,
    name: "Conjunto de Xícaras para Café com Pires Elegance Diverso – 12 Peças",
    category: "Louças",
    price: 27.00,
    oldPrice: 30.00,
    badge: "Lançamento",
    description: "Transforme seus momentos de café em experiências especiais com este elegante conjunto de xícaras e pires na sofisticada cor Verde Tiffany. Produzido com material resistente e acabamento brilhante, o conjunto combina beleza, praticidade e durabilidade, sendo ideal para receber visitas, reuniões familiares ou para o uso diário.",
    mediaType: "image",
    mediaUrl: "/xicara1.webp",
    additionalMedia: [
      "/xicara1.webp",
      "/xicara2.webp",
      "/xicara3.webp",
      "/xicara4.webp"
    ],
    specifications: [
      { name: "Material", value: "Cerâmica de Alta Qualidade" },
      { name: "Cor", value: "Diverso" },
      { name: "Quantidade de Peças", value: "12 Peças" },
      { name: "Acabamento", value: "Brilhante e Uniforme" }
    ]
  },
  {
    id: 4,
    name: "Calça Chino Slim Fit Flex",
    category: "Roupas",
    price: 38.90,
    oldPrice: 49.00,
    badge: "Exclusivo",
    description: "A versatilidade que o seu guarda-roupa precisa. Transita facilmente entre o escritório e o happy hour. Produzida em sarja acetinada com elastano de alta recuperação, garantindo liberdade total de movimento sem deformar os joelhos ao longo do dia.",
    mediaType: "image",
    mediaUrl: "/shortf1.webp",
    additionalMedia: [
      "/shortf1.webp",
      "/shortf2.webp",
      "/shortf3.webp",
      "/shortf4.webp",
    ],
    specifications: [
      { name: "Tecido", value: "Sarja Peletizada Com Elastano" },
      { name: "Composição", value: "98% Algodão / 2% Elastano Lycra" },
      { name: "Bolsos", value: "2 Frontais tipo faca / 2 Traseiros embutidos" },
      { name: "Modelagem", value: "Slim Ajustada (Moderna)" }
    ]
  },
  {
    id: 5,
    name: "Fone de Ouvido Bluetooth Pro Sound Preto – Sem Fio",
    category: "Acessórios",
    price: 98.00,
    oldPrice: 110.00,
    badge: "Premium",
    description: "Desfrute de uma experiência sonora de alta qualidade com o Fone de Ouvido Bluetooth Pro Sound. Desenvolvido para oferecer conforto, praticidade e excelente desempenho, ele proporciona conexão rápida e estável com smartphones, tablets e notebooks.",
    mediaType: "image",
    mediaUrl: "/fone1.webp",
    additionalMedia: [
      "/fone1.webp",
      "/fone2.webp",
      "/fone3.webp",
      "/fone4.webp"
    ],
    specifications: [
      { name: "Tipo", value: "Fone de Ouvido Bluetooth Sem Fio" },
      { name: "Cor", value: "Preto" },
      { name: "Alcance Sem Fio", value: "Até 10 metros" },
      { name: "Tempo de Reprodução", value: "Até 6 horas contínuas" }
    ]
  }
];

export default function App() {
  const WHATSAPP_NUMERO = "5591992209101"; 
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [videoMuted, setVideoMuted] = useState(true);

  const categories = useMemo(() => {
    const list = new Set(MEUS_PRODUTOS.map(p => p.category));
    return ['Todos', ...Array.from(list)];
  }, []);

  const filteredProducts = useMemo(() => {
    return MEUS_PRODUTOS.filter(product => {
      const matchesSearch = product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleWhatsAppLink = (product, isCustomMessage = false, customText = '') => {
    const baseMessage = `Olá! Vi o produto *${product.name}* na vitrine virtual e gostaria de mais informações sobre a compra.`;
    const textToSend = isCustomMessage ? customText : baseMessage;
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
  };

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
    setActiveMediaIndex(0);
    setVideoMuted(true);
  };

  return (
    <div className="min-h-screen bg-[#eaeded] text-neutral-800 font-sans antialiased selection:bg-amber-500 selection:text-white">
      
      {/* HEADER / NAV */}
      <nav className="sticky top-0 z-40 bg-[#131921] px-6 py-4 transition-all shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-md">
              <ShoppingBag className="h-5 w-5 text-[#131921] stroke-[2.5]" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-white">
                VITRINE
              </span>
              <p className="text-[10px] text-amber-500 font-mono tracking-widest uppercase font-bold">Amazon Style</p>
            </div>
          </div>

          {/* Barra de Busca */}
          <div className="relative w-full md:max-w-xl">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Pesquisar na Vitrine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 bg-white border border-transparent rounded-lg text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-sm"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Botão de contato rápido */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMERO}?text=Ol%C3%A1!%20Gostaria%20de%20ver%20o%20cat%C3%A1logo%20de%20produtos.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-900 text-xs font-bold transition-all shadow-sm"
          >
            <MessageCircle className="h-4 w-4" />
            Falar com Vendedor
          </a>

        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#131921] to-[#eaeded] pt-8 pb-10 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-600 mb-4 font-mono">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            ENTREGAS A PARTIR DE R$ 50,00
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Ofertas Imperdíveis Escolhidas para Você
          </h1>
          <p className="max-w-2xl mx-auto text-neutral-300 text-sm md:text-base mb-6">
            Explore nossa vitrine premium com atendimento humanizado. Analise mídias reais, compare especificações técnicas e faça seu pedido via WhatsApp.
          </p>

          {/* Categorias / Filtros Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mr-2 px-2 py-1 text-neutral-100 text-xs font-bold uppercase tracking-wider font-mono">
              <SlidersHorizontal className="h-3.5 w-3.5 text-amber-500" />
              Filtrar:
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-neutral-950 shadow-md scale-105'
                    : 'bg-white hover:bg-neutral-100 text-neutral-700 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUTOS GRID */}
      {/* PRODUTOS GRID */}
      <main className="max-w-7xl mx-auto px-2 sm:px-6 py-4 sm:py-8 relative z-10">
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-neutral-200 rounded-2xl shadow-sm">
            <Search className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-lg text-neutral-700 font-bold mb-2">Nenhum produto encontrado</p>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto mb-6">Tente alterar o filtro de categoria ou redefinir sua busca digitando outro termo.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }}
              className="px-5 py-2 bg-neutral-800 hover:bg-neutral-900 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              Resetar Filtros
            </button>
          </div>
        ) : (
          /* 🌟 MUDANÇA AQUI: grid-cols-2 no mobile (2 cards por linha) com espaçamento menor (gap-2) */
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => handleOpenDetails(product)}
                className="group cursor-pointer bg-white border border-neutral-200/60 rounded-lg overflow-hidden hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between shadow-sm"
              >
                {/* Media Container */}
                <div className="relative aspect-square w-full p-2 sm:p-4 bg-neutral-50 flex items-center justify-center border-b border-neutral-100">
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-1.5 left-1.5 z-20 bg-[#cc0c39] text-white text-[8px] sm:text-[10px] font-bold tracking-wider uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-sm shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  {/* Render Mídia Inicial */}
                  {product.mediaType === "video" ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <video
                        src={product.mediaUrl}
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="max-h-full max-w-full object-contain group-hover:scale-102 transition-transform duration-500"
                      />
                      <span className="absolute bottom-2 right-2 z-10 h-6 w-6 sm:h-8 sm:w-8 bg-black/70 rounded-full flex items-center justify-center text-white shadow-md">
                        <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current ml-0.5" />
                      </span>
                    </div>
                  ) : (
                    <img 
                      src={product.mediaUrl} 
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-102 transition-transform duration-500"
                    />
                  )}
                </div>

                {/* Conteúdo do Card */}
                <div className="p-3 sm:p-5 flex-grow flex flex-col justify-between bg-white">
                  <div>
                    {/* Categoria escondida ou menor no mobile para focar no design limpo da imagem */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
                        {product.category}
                      </span>
                    </div>
                    
                    {/* Título com texto menor no mobile (text-sm) e limite estrito de 2 linhas */}
                    <h2 className="text-xs sm:text-base font-medium sm:font-bold text-neutral-800 group-hover:text-amber-600 transition-colors duration-200 line-clamp-2 min-h-[2rem] sm:min-h-[3rem] leading-tight">
                      {product.name}
                    </h2>
                  </div>

                  <div className="mt-2">
                    {/* 🌟 Preço idêntico à imagem: R$ pequeno, centavos suspensos e colados */}
                    <div className="flex items-start gap-0.5 mb-2.5">
                      <span className="text-[10px] sm:text-sm font-normal text-neutral-900 pt-0.5">R$</span>
                      <span className="text-lg sm:text-2xl font-bold text-neutral-900 tracking-tight leading-none">
                        {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).split(',')[0]}
                      </span>
                      <span className="text-[10px] sm:text-sm font-bold text-neutral-900 leading-none pt-0.5">
                        {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).split(',')[1]}
                      </span>
                      {product.oldPrice && (
                        <span className="text-[9px] sm:text-xs text-neutral-400 line-through ml-1.5 self-center">
                          {product.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      )}
                    </div>

                    {/* Botões ajustados para mobile: O "Ver detalhes" some ou encolhe, priorizando o clique do Card */}
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppLink(product);
                        }}
                        className="flex-1 bg-amber-400 hover:bg-amber-500 text-neutral-900 py-2 sm:py-2.5 rounded-md text-[10px] sm:text-xs font-bold transition-all active:scale-[0.98] shadow-sm"
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

      {/* DETALHES MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden my-auto mb-12 lg:mb-8 border border-neutral-200">
            
            {/* Fechar Modal */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-30 p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-800 rounded-full border border-neutral-200 transition-colors shadow-sm focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Layout em Duas Colunas */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Coluna 1: Mídias do Produto (Lado Esquerdo Claro) */}
              <div className="lg:col-span-7 bg-neutral-50 p-6 flex flex-col justify-between min-h-[350px] sm:min-h-[400px] lg:min-h-[550px] border-r border-neutral-100">
                
                {/* Visualizador Principal */}
                <div className="relative flex-grow flex items-center justify-center rounded-xl overflow-hidden bg-white border border-neutral-200/60 p-4 shadow-inner">
                  {selectedProduct.mediaType === 'video' && activeMediaIndex === 0 ? (
                    <div className="relative w-full h-full aspect-video flex items-center justify-center">
                      <video 
                        src={selectedProduct.mediaUrl}
                        controls
                        muted={videoMuted}
                        autoPlay
                        loop
                        playsInline
                        className="max-h-[380px] object-contain"
                      />
                      <button 
                        onClick={() => setVideoMuted(!videoMuted)}
                        className="absolute bottom-3 right-3 p-2 bg-black/70 hover:bg-black/85 text-white rounded-full transition-colors shadow-md"
                      >
                        {videoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </button>
                    </div>
                  ) : (
                    <img 
                      src={
                        selectedProduct.additionalMedia && selectedProduct.additionalMedia[activeMediaIndex] 
                          ? selectedProduct.additionalMedia[activeMediaIndex] 
                          : selectedProduct.mediaUrl
                      } 
                      alt={selectedProduct.name}
                      className="max-h-[300px] lg:max-h-[380px] object-contain rounded-lg"
                    />
                  )}
                </div>

                {/* Carrossel de Miniaturas */}
                {selectedProduct.additionalMedia && selectedProduct.additionalMedia.length > 1 && (
                  <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 justify-center">
                    {selectedProduct.mediaType === 'video' && (
                      <button 
                        onClick={() => setActiveMediaIndex(0)}
                        className={`relative h-14 w-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                          activeMediaIndex === 0 ? 'border-amber-500 scale-105 shadow-sm' : 'border-neutral-200 opacity-70'
                        }`}
                      >
                        <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
                          <Play className="h-4 w-4 text-neutral-800 fill-neutral-800" />
                        </div>
                      </button>
                    )}

                    {selectedProduct.additionalMedia.map((media, index) => {
                      const itemIndex = selectedProduct.mediaType === 'video' ? index + 1 : index;
                      return (
                        <button
                          key={index}
                          onClick={() => setActiveMediaIndex(itemIndex)}
                          className={`h-14 w-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                            activeMediaIndex === itemIndex ? 'border-amber-500 scale-105 shadow-sm' : 'border-neutral-200 opacity-70'
                          }`}
                        >
                          <img src={media} alt="Miniatura" className="h-full w-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Coluna 2: Informações (Lado Direito Moderno) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-amber-700 uppercase bg-amber-500/10 px-2.5 py-1 rounded">
                    {selectedProduct.category}
                  </span>

                  <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-3 mb-2 leading-tight">
                    {selectedProduct.name}
                  </h1>

                  <div className="flex items-baseline gap-2 mb-4 border-b border-neutral-100 pb-4">
                    <span className="text-xs text-neutral-600 mr-1">Preço:</span>
                    <span className="text-2xl font-bold text-[#b12704]">
                      {selectedProduct.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    {selectedProduct.oldPrice && (
                      <span className="text-xs text-neutral-400 line-through ml-2">
                        {selectedProduct.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    )}
                  </div>

                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-5">
                    {selectedProduct.description}
                  </p>

                  <div className="mb-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 font-mono">Especificações Técnicas</h3>
                    <div className="space-y-1.5 bg-neutral-50 p-3.5 rounded-lg border border-neutral-200 text-xs">
                      {selectedProduct.specifications ? selectedProduct.specifications.map((spec, i) => (
                        <div key={i} className="flex justify-between border-b border-neutral-200/60 pb-1.5 last:border-b-0 last:pb-0">
                          <span className="text-neutral-500">{spec.name}</span>
                          <span className="text-neutral-800 font-semibold">{spec.value}</span>
                        </div>
                      )) : (
                        <p className="text-neutral-500">Sob consulta com vendedor.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Área de Ação WhatsApp */}
                <div className="border-t border-neutral-100 pt-4">
                  <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-200 mb-4 flex gap-3 items-start">
                    <div className="p-2 bg-emerald-500 text-white rounded-lg hidden sm:block">
                      <MessageCircle className="h-4 w-4 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Compra Garantida</h4>
                      <p className="text-[11px] text-emerald-700 leading-normal mt-0.5">Clique no botão abaixo para alinhar os detalhes da entrega direto com o vendedor especialista.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleWhatsAppLink(selectedProduct)}
                    className="w-full bg-[#f0c14b] hover:bg-[#e7b43b] text-neutral-900 border border-[#a88734] py-3.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shadow-sm active:scale-[0.99]"
                  >
                    <MessageCircle className="h-4 w-4 fill-current stroke-[2]" />
                    Falar com Vendedor no WhatsApp
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 bg-[#131921] py-10 px-6 text-center text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono">© 2026 VITRINE. Todos os direitos reservados. Desenvolvido por Cleisson Silva</p>
          <div className="flex gap-4">
            <a href={`https://wa.me/${WHATSAPP_NUMERO}`} className="hover:text-amber-500 transition-colors">Termos de Compra</a>
            <span className="text-neutral-600">|</span>
            <a href={`https://wa.me/${WHATSAPP_NUMERO}`} className="hover:text-amber-500 transition-colors font-semibold">Suporte</a>
          </div>
        </div>
      </footer>

    </div>
  );
}