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
    name: "Conjunto de Talheres Premium 17 Peças Preto Elegance",
    estoque: "3 UND",
    category: "Louças",
    price: 20.00,
    oldPrice: 30.00,
    badge: "Mais Vendido",
    description: "Um conjunto de talheres moderno e sofisticado, ideal para complementar sua mesa com elegância e praticidade. Fabricado com materiais de alta qualidade, possui acabamento refinado e cabos ergonômicos que proporcionam conforto durante o uso. Perfeito para refeições do dia a dia, encontros familiares e ocasiões especiais.",
    mediaType: "image",
    mediaUrl: "/louca1.jpeg",
    additionalMedia: [
      "/louca1.jpeg",
      "/louca2.jpeg"
    ],
    specifications: [
      { name: "Material", value: "Aço Inoxidável Premium" },
      { name: "Cor", value: "Preto Fosco/vermelho" },
      { name: "Quantidade de Peças", value: "17 Peças" },
      { name: "Acabamento", value: "Polido e Resistente à Corrosão" }
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 2,
    name: "Headphone KA-916",
    estoque: "1 UND",
    category: "Áudio",
    price: 45.00,
    oldPrice: 40.00,
    badge: "Exclusivo",
    description: "Qualidade de som hifi estéreo entorno o mais minucioso, o melhor.",
    mediaType: "image",
    mediaUrl: "/fone4.jpeg",
    additionalMedia: [
      "/fone4.jpeg",
      "/fone3.jpeg"
    ],
    specifications: [
      { name: "Tempo de conversação", value: "6 horas" },
      { name: "Tempo de espera", value: "até 15 horas" },
      { name: "Âmbito de trabalho", value: "10 metros" },
      { name: "Suporte à versão sem fio", value: "5.0 para baixo" }
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 3,
    name: "Headphone WLY-501 Stitch/infantil",
    estoque: "1 UND",
    category: "Áudio",
    price: 50.00,
    oldPrice: 70.00,
    badge: "Lançamento",
    description: "Chamada de voz são claras e suaves. Conexão sem fio. Qualidade de som surround 360",
    mediaType: "image",
    mediaUrl: "/fone2.jpeg",
    additionalMedia: [
      "/fone2.jpeg",
      "/fone1.jpeg"
    ],
    specifications: [
      { name: "Cor", value: "Azul" },
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 4,
    name: "Headphone Bluetooth BT770",
    estoque: "1 UND",
    category: "Áudio",
    price: 55.00,
    oldPrice: 65.00,
    badge: "Exclusivo",
    description: "Active Noise Cancelling",
    mediaType: "image",
    mediaUrl: "/fone8.jpeg",
    additionalMedia: [
      "/fone8.jpeg",
      "/fone7.jpeg",
    ],
    specifications: [
      { name: "Cor", value: "Preto" },
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 5,
    name: "Fone de Ouvido Bluetooth Pro Sound Preto – Sem Fio",
    estoque: "1 UND",
    category: "Áudio",
    price: 45.00,
    oldPrice: 55.00,
    badge: "Premium",
    description: "Desfrute de uma experiência sonora de alta qualidade com o Fone de Ouvido Bluetooth Pro Sound. Desenvolvido para oferecer conforto.",
    mediaType: "image",
    mediaUrl: "/fone6.jpeg",
    additionalMedia: [
      "/fone6.jpeg",
      "/fone5.jpeg",
    ],
    specifications: [
      { name: "Tipo", value: "Fone de Ouvido Bluetooth Sem Fio" },
      { name: "Cor", value: "Preto" },
      { name: "Alcance Sem Fio", value: "Até 10 metros" },
      { name: "Tempo de Reprodução", value: "Até 6 horas contínuas" }
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 6,
    name: "Fone de Ouvido Bluetooth Pro Sound Preto – Sem Fio",
    estoque: "1 UND",
    category: "Áudio",
    price: 45.00,
    oldPrice: 55.00,
    badge: "Premium",
    description: "Desfrute de uma experiência sonora de alta qualidade com o Fone de Ouvido Bluetooth Pro Sound. Desenvolvido para oferecer conforto.",
    mediaType: "image",
    mediaUrl: "/fone9.jpeg",
    additionalMedia: [
      "/fone9.jpeg",
    ],
    specifications: [
      { name: "Tipo", value: "Fone de Ouvido Bluetooth Sem Fio" },
      { name: "Cor", value: "Preto" },
      { name: "Alcance Sem Fio", value: "Até 10 metros" },
      { name: "Tempo de Reprodução", value: "Até 6 horas contínuas" }
    ],
    isSoldOut: true // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 7,
    name: "Tira Sagu e Strass/Napa Turim - Cristal-Silver/Branco off 526",
    number: "N° 35",
    estoque: "1 UND",
    category: "Calçados",
    price: 50.00,
    oldPrice: 65.00,
    badge: "Premium",
    description: "Sempre presente no lifestyle de mulheres jovens de espirito de todas as idades, Moleca tem tudo a ver com a moda urbana que toma conta das ruas do Brasil e do mundo.",
    mediaType: "image",
    mediaUrl: "/sandalia1.jpeg",
    additionalMedia: [
      "/sandalia1.jpeg",
      "/sandalia2.jpeg",
    ],
    specifications: [
      { name: "Forro", value: "Têxtil" },
      { name: "Cor", value: "Branco" },
      { name: "Palmilha", value: "Sintético" },
      { name: "Solado", value: "Sintético" }
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 8,
    name: "Tira Sagu e Strass/Napa Turim - Black Diamond-Black - Diamond/Preto 01",
    number: "N° 35 - 36",
    estoque: "2 UND",
    category: "Calçados",
    price: 50.00,
    oldPrice: 65.00,
    badge: "Premium",
    description: "Sempre presente no lifestyle de mulheres jovens de espirito de todas as idades, Moleca tem tudo a ver com a moda urbana que toma conta das ruas do Brasil e do mundo.",
    mediaType: "image",
    mediaUrl: "/sandalia3.jpeg",
    additionalMedia: [
      "/sandalia3.jpeg",
      "/sandalia4.jpeg",
    ],
    specifications: [
      { name: "Forro", value: "Têxtil" },
      { name: "Cor", value: "Preto" },
      { name: "Palmilha", value: "Sintético" },
      { name: "Solado", value: "Sintético" }
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 9,
    name: "Black Diamond-Black - Diamond/Preto 01",
    number: "N° 35 - 36",
    estoque: "2 UND",
    category: "Calçados",
    price: 130.00,
    oldPrice: 140.00,
    badge: "Premium",
    description: "Sempre presente no lifestyle de mulheres jovens de espirito de todas as idades, Moleca tem tudo a ver com a moda urbana que toma conta das ruas do Brasil e do mundo.",
    mediaType: "image",
    mediaUrl: "/sapato2.jpeg",
    additionalMedia: [
      "/sapato2.jpeg",
      "/sapato1.jpeg",
    ],
    specifications: [
      { name: "Forro", value: "Têxtil" },
      { name: "Cor", value: "Preto" },
      { name: "Palmilha", value: "Sintético" },
      { name: "Solado", value: "Sintético" }
    ],
    isSoldOut: true // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 10,
    name: "Greendha - Sandália Infantil Feminina",
    number: "N° 28",
    estoque: "1 UND",
    category: "Calçados",
    price: 20.00,
    oldPrice: 30.00,
    badge: "Premium",
    description: "19177 Grendha Bela Ternura S - Bl872 Lilas Primavera",
    mediaType: "image",
    mediaUrl: "/sandalia6.jpeg",
    additionalMedia: [
      "/sandalia6.jpeg",
      "/sandalia5.jpeg",
    ],
    specifications: [
      { name: "Marca", value: "Grendha" },
      { name: "Cor", value: "Rosa" },
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 11,
    name: "Sandália Masculina Infantil Grandene",
    number: "N° 31",
    estoque: "1 UND",
    category: "Calçados",
    price: 20.00,
    oldPrice: 30.00,
    badge: "Premium",
    description: "Sandalia Infantil Masculina",
    mediaType: "image",
    mediaUrl: "/sandalia8.jpeg",
    additionalMedia: [
      "/sandalia8.jpeg",
      "/sandalia7.jpeg",
    ],
    specifications: [
      { name: "Marca", value: "Grendene" },
      { name: "Cor", value: "Marrom Claro" },
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 12,
    name: "Ipanema - Sandália Infantil Feminina",
    number: "N° 29/30",
    estoque: "1 UND",
    category: "Calçados",
    price: 20.00,
    oldPrice: 30.00,
    badge: "Premium",
    description: "27399 Ipanema Glow Inf - Bs202 Laranja/Laranja/Amarelo",
    mediaType: "image",
    mediaUrl: "/sandalia10.jpeg",
    additionalMedia: [
      "/sandalia10.jpeg",
      "/sandalia9.jpeg",
    ],
    specifications: [
      { name: "Marca", value: "Ipanema" },
      { name: "Cor", value: "Laranja" },
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 13,
    name: "Ipanema - Sandália Infantil Feminina",
    number: "N° 25 - 31",
    estoque: "2 UND",
    category: "Calçados",
    price: 20.00,
    oldPrice: 30.00,
    badge: "Premium",
    description: "27235 Ipanema Diversa Sandalha - Bh058 Preto/Lilas",
    mediaType: "image",
    mediaUrl: "/sandalia20.jpeg",
    additionalMedia: [
      "/sandalia20.jpeg",
      "/sandalia19.jpeg",
    ],
    specifications: [
      { name: "Marca", value: "Ipanema" },
      { name: "Cor", value: "Preto/Lilas" },
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 14,
    name: "Turma do Chico - Sandália Infantil Masculina",
    number: "N° 27/28",
    estoque: "1 UND",
    category: "Calçados",
    price: 20.00,
    oldPrice: 30.00,
    badge: "Premium",
    description: "27190 Ipanema Chico Bento - Bf210 Azul/Azul/Verde",
    mediaType: "image",
    mediaUrl: "/sandalia12.jpeg",
    additionalMedia: [
      "/sandalia12.jpeg",
      "/sandalia11.jpeg",
    ],
    specifications: [
      { name: "Marca", value: "Ipanema" },
      { name: "Cor", value: "Azul/Azul/Verde" },
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 15,
    name: "Polly e Max Steel - Sandália Infantil Masculina",
    number: "N° 29/30",
    estoque: "1 UND",
    category: "Calçados",
    price: 20.00,
    oldPrice: 30.00,
    badge: "Premium",
    description: "26048 Ipanema Polly e Max Steel - Au021 Azul/Azul Medio",
    mediaType: "image",
    mediaUrl: "/sandalia14.jpeg",
    additionalMedia: [
      "/sandalia14.jpeg",
      "/sandalia13.jpeg",
    ],
    specifications: [
      { name: "Marca", value: "Ipanema" },
      { name: "Cor", value: "Azul/Azul/Verde" },
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
  },
  {
    id: 16,
    name: "Ipanema - Sandália Adulto Masculina",
    number: "N° 39/40",
    estoque: "1 UND",
    category: "Calçados",
    price: 20.00,
    oldPrice: 30.00,
    badge: "Premium",
    description: "25122 - Ipanema Anatomica - 09064 Preto/Preto",
    mediaType: "image",
    mediaUrl: "/sandalia22.jpeg",
    additionalMedia: [
      "/sandalia22.jpeg",
      "/sandalia21.jpeg",
    ],
    specifications: [
      { name: "Marca", value: "Ipanema" },
      { name: "Cor", value: "Preto" },
    ],
    isSoldOut: false // 🔴 Adicione isso para marcar como esgotado
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
            ENTREGAS A PARTIR DE R$ 25,00
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
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${selectedCategory === cat
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
                // Se estiver esgotado, você decide se ainda quer abrir o modal ou bloquear o clique
                onClick={() => !product.isSoldOut && handleOpenDetails(product)}
                className={`group cursor-pointer bg-white border border-neutral-200/60 rounded-lg overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm ${product.isSoldOut ? 'opacity-75' : 'hover:shadow-xl hover:border-neutral-300'
                  }`}
              >
                {/* Media Container */}
                <div className="relative aspect-square w-full p-2 bg-neutral-50 flex items-center justify-center border-b border-neutral-100">

                  {/* Badge condicional: Se vendido, mostra 'Esgotado', se não, mostra o badge padrão */}
                  {product.isSoldOut ? (
                    <span className="absolute top-1.5 left-1.5 z-20 bg-neutral-500 text-white text-[8px] sm:text-[10px] font-bold tracking-wider uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-sm shadow-sm">
                      Esgotado
                    </span>
                  ) : product.badge && (
                    <span className="absolute top-1.5 left-1.5 z-20 bg-[#cc0c39] text-white text-[8px] sm:text-[10px] font-bold tracking-wider uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-sm shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  {/* Imagem com filtro preto e branco caso esteja esgotado */}
                  <img
                    src={product.mediaUrl}
                    alt={product.name}
                    className={`max-h-full max-w-full object-contain group-hover:scale-102 transition-transform duration-500 ${product.isSoldOut ? 'grayscale contrast-75' : ''
                      }`}
                  />
                </div>

                {/* Conteúdo do Card */}
                {/* Conteúdo do Card */}
    <div className="p-3 sm:p-5 flex-grow flex flex-col justify-between bg-white">
      <div>
        {/* Categoria e Status de Estoque (Usando sua propriedade product.estoque) */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
            {product.category}
          </span>
          
          <span className={`text-[9px] sm:text-[10px] font-bold font-mono tracking-wider uppercase ${
            product.isSoldOut ? 'text-neutral-400' : 'text-emerald-600'
          }`}>
            {product.isSoldOut ? 'Sem Estoque' : product.estoque || 'Em Estoque'}
          </span>
        </div>
        
        {/* Título com limite de 2 linhas */}
        <h2 className={`text-xs sm:text-base font-medium sm:font-bold line-clamp-2 min-h-[2rem] sm:min-h-[3rem] leading-tight ${
          product.isSoldOut ? 'text-neutral-400 line-through' : 'text-neutral-800 group-hover:text-amber-600'
        }`}>
          {product.name}
        </h2>

        {/* 🌟 A numeração do calçado (ex: N° 29/30) inserida bem aqui embaixo do título */}
        {product.number && (
          <div className="mt-1 flex items-center">
            <span className={`text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200/60 font-mono ${
              product.isSoldOut ? 'text-neutral-400 line-through bg-neutral-50' : 'text-neutral-700'
            }`}>
              {product.number}
            </span>
          </div>
        )}
      </div>

      <div className="mt-2">
        {/* Preço com suporte a oldPrice (Estilizado para Esgotado ou Disponível) */}
        <div className={`flex items-start gap-0.5 mb-2.5 ${product.isSoldOut ? 'opacity-40' : ''}`}>
          <span className="text-[10px] sm:text-sm font-normal pt-0.5">R$</span>
          <span className="text-lg sm:text-2xl font-bold tracking-tight leading-none">
            {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).split(',')[0]}
          </span>
          <span className="text-[10px] sm:text-sm font-bold leading-none pt-0.5">
            {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }).split(',')[1]}
          </span>
          
          {product.oldPrice && (
            <span className="text-[9px] sm:text-xs text-neutral-400 line-through ml-1.5 self-center">
              {product.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          )}
        </div>

        {/* Botão de Ação Dinâmico */}
        <div className="flex items-center gap-1.5">
          <button 
            disabled={product.isSoldOut}
            onClick={(e) => {
              e.stopPropagation();
              handleWhatsAppLink(product);
            }}
            className={`w-full py-2 sm:py-2.5 rounded-md text-[10px] sm:text-xs font-bold transition-all shadow-sm ${
              product.isSoldOut 
                ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' 
                : 'bg-amber-400 hover:bg-amber-500 text-neutral-900 active:scale-[0.98]'
            }`}
          >
            {product.isSoldOut ? "Indisponível" : "Comprar"}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          {/* Container do Modal com max-h dinâmico no mobile para não estourar a tela */}
          <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] sm:max-h-none flex flex-col border border-neutral-200">

            {/* Fechar Modal - Posicionado fixo e menor no mobile para não cobrir a imagem */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 p-1.5 sm:p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-800 rounded-full border border-neutral-200 transition-colors shadow-sm focus:outline-none"
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>

            {/* Scroll interno apenas se o conteúdo acumular muito no mobile */}
            <div className="overflow-y-auto flex-grow grid grid-cols-1 lg:grid-cols-12">

              {/* Coluna 1: Mídias do Produto (Compactado no Mobile) */}
              <div className="lg:col-span-7 bg-neutral-50 p-3 sm:p-6 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-neutral-100">

                {/* Visualizador Principal - Muito mais baixo no mobile */}
                <div className="relative flex-grow flex items-center justify-center rounded-lg overflow-hidden bg-white border border-neutral-200/60 p-2 sm:p-4 shadow-inner min-h-[180px] max-h-[220px] sm:max-h-[380px]">
                  {selectedProduct.mediaType === 'video' && activeMediaIndex === 0 ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <video
                        src={selectedProduct.mediaUrl}
                        controls
                        muted={videoMuted}
                        autoPlay
                        loop
                        playsInline
                        className="max-h-[180px] sm:max-h-[380px] object-contain"
                      />
                      <button
                        onClick={() => setVideoMuted(!videoMuted)}
                        className="absolute bottom-2 right-2 p-1.5 bg-black/70 hover:bg-black/85 text-white rounded-full transition-colors shadow-md"
                      >
                        {videoMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
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
                      className="max-h-[180px] sm:max-h-[300px] lg:max-h-[380px] object-contain rounded-md"
                    />
                  )}
                </div>

                {/* Carrossel de Miniaturas - Menor e mais colado na imagem */}
                {selectedProduct.additionalMedia && selectedProduct.additionalMedia.length > 1 && (
                  <div className="flex gap-2 mt-2 sm:mt-4 overflow-x-auto pb-1 justify-center">
                    {selectedProduct.mediaType === 'video' && (
                      <button
                        onClick={() => setActiveMediaIndex(0)}
                        className={`relative h-10 w-12 sm:h-14 sm:w-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${activeMediaIndex === 0 ? 'border-amber-500 scale-105 shadow-sm' : 'border-neutral-200 opacity-70'
                          }`}
                      >
                        <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
                          <Play className="h-3.5 w-3.5 text-neutral-800 fill-neutral-800" />
                        </div>
                      </button>
                    )}

                    {selectedProduct.additionalMedia.map((media, index) => {
                      const itemIndex = selectedProduct.mediaType === 'video' ? index + 1 : index;
                      return (
                        <button
                          key={index}
                          onClick={() => setActiveMediaIndex(itemIndex)}
                          className={`h-10 w-12 sm:h-14 sm:w-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${activeMediaIndex === itemIndex ? 'border-amber-500 scale-105 shadow-sm' : 'border-neutral-200 opacity-70'
                            }`}
                        >
                          <img src={media} alt="Miniatura" className="h-full w-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Coluna 2: Informações (Ajustes de espaçamentos verticais) */}
              <div className="lg:col-span-5 p-4 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-amber-700 uppercase bg-amber-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded">
                    {selectedProduct.category}
                  </span>

                  <h1 className="text-lg sm:text-2xl font-bold text-neutral-900 mt-1.5 sm:mt-3 mb-1 sm:mb-2 leading-tight">
                    {selectedProduct.name}
                  </h1>

                  <div className="flex items-baseline gap-2 mb-2 sm:mb-4 border-b border-neutral-100 pb-2 sm:pb-4">
                    <span className="text-xs text-neutral-600 mr-1">Preço:</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#b12704]">
                      {selectedProduct.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    {selectedProduct.oldPrice && (
                      <span className="text-xs text-neutral-400 line-through ml-2">
                        {selectedProduct.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    )}
                  </div>

                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-5">
                    {selectedProduct.description}
                  </p>

                  <div className="mb-4 sm:mb-5">
                    <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 font-mono">Especificações Técnicas</h3>
                    <div className="space-y-1 bg-neutral-50 p-2.5 sm:p-3.5 rounded-lg border border-neutral-200/80 text-xs">
                      {selectedProduct.specifications ? selectedProduct.specifications.map((spec, i) => (
                        <div key={i} className="flex justify-between border-b border-neutral-200/60 pb-1 last:border-b-0 last:pb-0">
                          <span className="text-neutral-500">{spec.name}</span>
                          <span className="text-neutral-800 font-semibold text-right pl-2">{spec.value}</span>
                        </div>
                      )) : (
                        <p className="text-neutral-500">Sob consulta com vendedor.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Área de Ação WhatsApp - Mais compacta */}
                <div className="border-t border-neutral-100 pt-3">
                  <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-200 mb-3 flex gap-2 items-center sm:items-start">
                    <div className="p-1.5 bg-emerald-500 text-white rounded-md hidden sm:block">
                      <MessageCircle className="h-3.5 w-3.5 fill-current" />
                    </div>
                    <div>
                      <p className="text-[11px] text-emerald-700 leading-tight">
                        <span className="font-bold sm:inline block text-emerald-800 sm:mr-1">Compra Garantida:</span>
                        Combine os detalhes da entrega direto pelo WhatsApp.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleWhatsAppLink(selectedProduct)}
                    className="w-full bg-[#f0c14b] hover:bg-[#e7b43b] text-neutral-900 border border-[#a88734] py-2.5 sm:py-3.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shadow-sm active:scale-[0.99]"
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