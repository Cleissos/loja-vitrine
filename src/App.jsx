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

// ==========================================
// CONFIGURAÇÃO DOS SEUS PRODUTOS
// ==========================================
// Você pode editar, adicionar ou remover produtos diretamente neste array de objetos.
// Para usar fotos locais, basta colocar a foto dentro da pasta "public/assets/"
// e referenciar o caminho relativo como: "/assets/sua-foto.jpg"
const MEUS_PRODUTOS = [
  {
    id: 1,
    name: "Relógio Stealth Chronograph",
    category: "Acessórios",
    price: 89.90,
    oldPrice: 119.00,
    badge: "Mais Vendido",
    description: "Um relógio minimalista de alta precisão com caixa em titânio escovado, vidro de safira ultra resistente e pulseira de couro legítimo italiano. Desenhado para transitar entre o casual moderno e o clássico sofisticado.",
    mediaType: "image",
    // Link de exemplo para visualização rápida, mude para seu arquivo local "/assets/relogio.jpg"
    mediaUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
    additionalMedia: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1200"
    ],
    specifications: [
      { name: "Material da Caixa", value: "Titânio Escovado de Grau 2" },
      { name: "Vidro", value: "Safira Sintética Antirreflexo" },
      { name: "Movimento", value: "Quartz Suíço de 4 Rubis" },
      { name: "Resistência", value: "5 ATM (50 metros)" }
    ]
  },
  {
    id: 2,
    name: "Headphone Pro Hifi ANC-90",
    category: "Áudio",
    price: 145.00,
    badge: "Vídeo Demonstrativo",
    description: "Sinta cada nota com pureza total. Cancelamento de ruído ativo híbrido que isola o ambiente externo de forma inteligente, aliado a diafragmas de grafeno de 40mm para agudos nítidos e graves profundos.",
    mediaType: "image",
    // Exemplo de vídeo leve de banco de vídeos para demonstração imediata
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
    name: "Mochila Tech Impermeável",
    category: "Viagem",
    price: 49.00,
    oldPrice: 499.00,
    badge: "Lançamento",
    description: "Organização cirúrgica para os seus equipamentos. Desenvolvida em Nylon Balístico Cordura®, oferece segurança contra chuva forte, fechaduras zíper YKK com trava, compartimento flutuante para laptop e porta USB integrada.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200",
    additionalMedia: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=1200"
    ],
    specifications: [
      { name: "Capacidade", value: "24 Litros expansível até 28L" },
      { name: "Compatibilidade", value: "Notebooks de até 16.2 polegadas" },
      { name: "Material Exterior", value: "Nylon Balístico Cordura® 1000D" },
      { name: "Segurança", value: "Bolso secreto RFID safe integrado" }
    ]
  },
  {
    id: 4,
    name: "Luminária Modular Eclipse",
    category: "Home Office",
    price: 38.90,
    badge: "Exclusivo",
    description: "Transforme a atmosfera de trabalho ou descanso. Luminária de mesa magnética que levita suavemente e ajusta a temperatura de cor ao toque físico ou pelo aplicativo nativo.",
    mediaType: "image",
    mediaUrl: "https://m.media-amazon.com/images/I/41r0fg2-DEL.jpg",
    additionalMedia: [
      "https://m.media-amazon.com/images/I/41r0fg2-DEL.jpg",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&q=80&w=1200"
    ],
    specifications: [
      { name: "Iluminação", value: "LED RGB+CCT dimerizável" },
      { name: "Fluxo Luminoso", value: "850 Lúmens ajustáveis" },
      { name: "Carregamento", value: "Indução Qi 15W integrada na base" },
      { name: "Controle", value: "Touch na base ou assistentes virtuais" }
    ]
  },
  {
    id: 5,
    name: "Teclado Mecânico Alumínio Gasket",
    category: "Acessórios",
    price: 98.00,
    oldPrice: 1100.00,
    badge: "Premium",
    description: "Construído em bloco maciço de alumínio anodizado CNC com montagem tipo Gasket Mount, garantindo o perfil acústico mais refinado e suave do mercado mecânico.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=1200",
    additionalMedia: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=1200"
    ],
    specifications: [
      { name: "Layout", value: "Compacto 75% ANSI" },
      { name: "Switches", value: "Linear Premium pré-lubrificados de fábrica" },
      { name: "Conexão", value: "Dongle 2.4Ghz, Bluetooth 5.1 e Cabo Tipo-C" },
      { name: "Bateria", value: "4000mAh recarregável de longa duração" }
    ]
  }
];

export default function App() {
  const WHATSAPP_NUMERO = "5591992209101"; // <-- Substitua pelo seu número com DDD (ex: 5591999999999)
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [videoMuted, setVideoMuted] = useState(true);

  // Categorias Dinâmicas
  const categories = useMemo(() => {
    const list = new Set(MEUS_PRODUTOS.map(p => p.category));
    return ['Todos', ...Array.from(list)];
  }, []);

  // Filtragem inteligente de produtos
  const filteredProducts = useMemo(() => {
    return MEUS_PRODUTOS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Gerador de link do WhatsApp para vendas
  const handleWhatsAppLink = (product, isCustomMessage = false, customText = '') => {
    const baseMessage = `Olá! Vi o produto *${product.name}* na vitrine virtual e gostaria de mais informações sobre a compra.`;
    const textToSend = isCustomMessage ? customText : baseMessage;
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
  };

  // Abrir detalhes do produto
  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
    setActiveMediaIndex(0);
    setVideoMuted(true);
  };

  return (
    <div className="min-height-screen bg-[#0f1115] text-[#e4e6eb] font-sans antialiased selection:bg-emerald-500 selection:text-black">
      
      {/* HEADER / NAV */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[#0f1115]/85 border-b border-white/5 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <ShoppingBag className="h-5 w-5 text-[#0f1115] stroke-[2.5]" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                VITRINE
              </span>
              <p className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">e-commerce</p>
            </div>
          </div>

          {/* Barra de Busca */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="O que você está procurando hoje?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-900/60 border border-white/5 rounded-full text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 focus:bg-neutral-900 transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Botão de contato rápido no header */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMERO}?text=Ol%C3%A1!%20Gostaria%20de%20ver%20o%20cat%C3%A1logo%20de%20produtos.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 text-xs font-semibold text-neutral-300 hover:text-emerald-400 transition-all duration-300"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Falar com Vendedor
          </a>

        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-8 px-6">
        {/* Glow ambient background decorativo */}
        <div className="absolute top-[-20%] left-[50%] -translate-x-[50%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-6 font-mono">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            FRETE GRÁTIS EM COMPRAS SELECIONADAS
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Experiência Premium,<br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
              Direto na Sua Casa.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-neutral-400 text-base md:text-lg leading-relaxed mb-8">
            Navegue por nossa linha selecionada de produtos de alta tecnologia e estilo. Assista a vídeos reais, analise detalhes e compre direto com atendimento exclusivo via WhatsApp.
          </p>

          {/* Categorias / Filtros Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mr-2 px-3 py-1.5 text-neutral-500 text-xs font-bold uppercase tracking-wider font-mono">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Categorias:
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-neutral-950 font-bold shadow-lg shadow-emerald-500/20 scale-105'
                    : 'bg-neutral-900 border border-white/5 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUTOS GRID */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/30 border border-white/5 rounded-3xl">
            <Search className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
            <p className="text-lg text-neutral-400 font-semibold mb-2">Nenhum produto encontrado</p>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto">Tente alterar o filtro de categoria ou redefinir sua busca digitando outro termo.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }}
              className="mt-6 px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-full transition-colors"
            >
              Resetar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => handleOpenDetails(product)}
                className="group cursor-pointer bg-neutral-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 hover:bg-neutral-900/80 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Media Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-4 left-4 z-20 bg-[#0f1115]/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[10px] font-bold font-mono tracking-wider uppercase px-2.5 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}

                  {/* Render Mídia Inicial */}
                  {product.mediaType === "video" ? (
                    <div className="relative w-full h-full">
                      <video
                        src={product.mediaUrl}
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      <span className="absolute bottom-4 right-4 z-10 h-7 w-7 bg-[#0f1115]/80 rounded-full flex items-center justify-center text-white border border-white/10 shadow-lg">
                        <Play className="h-3 w-3 fill-current ml-0.5" />
                      </span>
                    </div>
                  ) : (
                    <img 
                      src={product.mediaUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}

                  
                  {/* Gradiente de overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold font-mono tracking-widest text-neutral-500 uppercase">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Disponível
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-200 line-clamp-1">
                      {product.name}
                    </h2>
                    <p className="text-neutral-400 text-xs leading-relaxed mt-2.5 mb-5 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    {/* Linha de Preço */}
                    <div className="flex items-baseline gap-2.5 mb-5">
                      <span className="text-2xl font-black text-white font-mono">
                        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-neutral-500 line-through font-mono">
                          {product.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      )}
                    </div>

                    {/* Botão de Chamada */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppLink(product);
                        }}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-[#0f1115] py-3 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25"
                      >
                        <MessageCircle className="h-4 w-4 fill-current stroke-[2]" />
                        Comprar agora
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetails(product);
                        }}
                        className="p-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-2xl transition-colors active:scale-95 border border-white/5"
                        title="Ver detalhes do produto"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

      {/* DETALHES MODAL (Abre quando clica no card ou no botão de lupa) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-[#14171d] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden my-8">
            
            {/* Fechar Modal */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 z-30 p-2.5 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-full border border-white/5 transition-colors focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Layout em Duas Colunas */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Coluna 1: Mídias do Produto (Lado Esquerdo) */}
              <div className="lg:col-span-7 bg-neutral-950 p-6 flex flex-col justify-between min-h-[400px] lg:min-h-[550px]">
                
                {/* Visualizador Principal */}
                <div className="relative flex-grow flex items-center justify-center rounded-2xl overflow-hidden border border-white/5">
                  {selectedProduct.mediaType === 'video' && activeMediaIndex === 0 ? (
                    <div className="relative w-full h-full aspect-video flex items-center justify-center">
                      <video 
                        src={selectedProduct.mediaUrl}
                        controls
                        muted={videoMuted}
                        autoPlay
                        loop
                        playsInline
                        className="w-full h-full object-contain max-h-[420px]"
                      />
                      {/* Botão de Som Alternador */}
                      <button 
                        onClick={() => setVideoMuted(!videoMuted)}
                        className="absolute bottom-4 right-4 p-2 bg-black/60 hover:bg-black/85 text-white rounded-full border border-white/10 transition-colors"
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
                      className="w-full h-full object-contain max-h-[420px] rounded-xl"
                    />
                  )}
                </div>

                {/* Carrossel de Miniaturas */}
                {selectedProduct.additionalMedia && selectedProduct.additionalMedia.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2 justify-center">
                    {/* Se o produto for de vídeo, coloca a miniatura de vídeo na primeira posição */}
                    {selectedProduct.mediaType === 'video' && (
                      <button 
                        onClick={() => setActiveMediaIndex(0)}
                        className={`relative h-16 w-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          activeMediaIndex === 0 ? 'border-emerald-500 scale-105' : 'border-transparent opacity-60'
                        }`}
                      >
                        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                          <Play className="h-4 w-4 text-white fill-white" />
                        </div>
                      </button>
                    )}

                    {/* Renderiza as outras imagens */}
                    {selectedProduct.additionalMedia.map((media, index) => {
                      // Se for tipo vídeo, as fotos começam a contar do índice 1 para não sobrepor
                      const itemIndex = selectedProduct.mediaType === 'video' ? index + 1 : index;
                      return (
                        <button
                          key={index}
                          onClick={() => setActiveMediaIndex(itemIndex)}
                          className={`h-16 w-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                            activeMediaIndex === itemIndex ? 'border-emerald-500 scale-105' : 'border-transparent opacity-60'
                          }`}
                        >
                          <img src={media} alt="Miniatura" className="h-full w-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Coluna 2: Informações e Atendimento (Lado Direito) */}
              <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-[#14171d]">
                <div>
                  {/* Categoria */}
                  <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full">
                    {selectedProduct.category}
                  </span>

                  {/* Nome */}
                  <h1 className="text-3xl font-black text-white mt-4 mb-2">
                    {selectedProduct.name}
                  </h1>

                  {/* Preço */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-mono font-black text-white">
                      {selectedProduct.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    {selectedProduct.oldPrice && (
                      <span className="text-sm text-neutral-500 line-through font-mono">
                        {selectedProduct.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    )}
                  </div>

                  {/* Descrição */}
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>

                  {/* Detalhes / Especificações */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 font-mono">Especificações Técnicas</h3>
                    <div className="space-y-2 bg-neutral-950/40 p-4 rounded-2xl border border-white/5 text-xs">
                      {selectedProduct.specifications ? selectedProduct.specifications.map((spec, i) => (
                        <div key={i} className="flex justify-between border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                          <span className="text-neutral-500">{spec.name}</span>
                          <span className="text-white font-medium">{spec.value}</span>
                        </div>
                      )) : (
                        <p className="text-neutral-500">Sob consulta com vendedor.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Área de Ação & Mensagem Personalizável */}
                <div className="mt-6 border-t border-white/5 pt-6">
                  <div className="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/10 mb-4 flex gap-3.5 items-start">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <MessageCircle className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide font-mono">Compra Assistida</h4>
                      <p className="text-[11px] text-neutral-400 leading-normal mt-1">Ao clicar, enviaremos os dados do produto para o WhatsApp para garantir que você receba o suporte correto no pagamento e retirada.</p>
                    </div>
                  </div>

                  {/* Botão Compra Rápida WhatsApp */}
                  <button
                    onClick={() => handleWhatsAppLink(selectedProduct)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-neutral-950 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-emerald-500/15 transition-all duration-300 flex items-center justify-center gap-3 scale-100 hover:scale-[1.01] active:scale-95 cursor-pointer text-sm"
                  >
                    <MessageCircle className="h-5 w-5 fill-current stroke-[2]" />
                    Falar com Vendedor no WhatsApp
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#0a0c0f] py-12 px-6 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono">© 2026 VITRINE. Todos os direitos reservados. Desenvolvido por Cleisson Silva</p>
          <div className="flex gap-4">
            <a href={`https://wa.me/${WHATSAPP_NUMERO}`} className="hover:text-emerald-400 transition-colors">Termos de Compra</a>
            <span className="text-neutral-800">|</span>
            <a href={`https://wa.me/${WHATSAPP_NUMERO}`} className="hover:text-emerald-400 transition-colors font-semibold">Suporte WhatsApp</a>
          </div>
        </div>
      </footer>

    </div>
  );
}