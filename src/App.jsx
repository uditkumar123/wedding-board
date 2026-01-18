import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  ExternalLink, 
  Menu,
  X,
  ShoppingBag,
  Sparkles,
  Search
} from 'lucide-react';

// --- Data Parsing & Cleaning ---

const rawData = [
  { 
    category: "Bridal", 
    title: "White Bridal Lehenga", 
    link: "https://www.etsy.com/in-en/listing/4302293478/made-to-order-off-white-embroidered-net",
    image: "https://i.etsystatic.com/51991917/r/il/425e2a/6917742533/il_1080xN.6917742533_7qow.jpg",
    tags: ["White", "Net", "Embroidered"]
  },
  { 
    category: "Bridal", 
    title: "Ivory Hand Embroidered Lehenga", 
    link: "https://www.etsy.com/in-en/listing/4330705710/hand-embroidered-ivory-bridal-lehenga",
    image: "https://i.etsystatic.com/51991917/r/il/915a40/7043572157/il_1080xN.7043572157_r5f8.jpg",
    tags: ["Ivory", "Handwork", "Luxury"]
  },
  { 
    category: "Bridal", 
    title: "Off-White Georgette Lehenga", 
    link: "https://www.etsy.com/in-en/listing/1744603021/indian-lehenga-off-white-georgette",
    image: "https://i.etsystatic.com/51991917/r/il/534f68/6497094303/il_1080xN.6497094303_qqph.jpg",
    tags: ["Georgette", "Minimal", "Elegant"]
  },
  
  { 
    category: "Bridal (Haldi)", 
    title: "Heavy Embroidered Yellow Outfit", 
    link: "https://www.etsy.com/in-en/listing/4392363548/beautiful-yellow-heavy-embroidered",
    image: "https://i.etsystatic.com/60364745/r/il/bb62ff/7376568071/il_1080xN.7376568071_ghu6.jpg",
    tags: ["Yellow", "Heavy Work", "Haldi"]
  },
  { 
    category: "Bridal (Haldi)", 
    title: "Yellow Sequins Georgette Lehenga", 
    link: "https://www.etsy.com/in-en/listing/4317810264/yellow-sequins-georgette-lehenga-choli",
    image: "https://i.etsystatic.com/60113107/r/il/f27568/7000839770/il_1080xN.7000839770_eot3.jpg",
    tags: ["Sequins", "Sparkle", "Georgette"]
  },
  { 
    category: "Bridal (Haldi)", 
    title: "Yellow Mirror Work Lehenga", 
    link: "https://www.etsy.com/in-en/listing/1742157597/yellow-embroidered-mirror-work-lehenga",
    image: "https://i.etsystatic.com/19302620/r/il/9433e6/6729927672/il_1080xN.6729927672_tqrk.jpg",
    tags: ["Mirror Work", "Traditional", "Bright"]
  },

  { 
    category: "Bridal (Sangeet)", 
    title: "Yellow Georgette & Mirror Art Silk", 
    link: "https://www.etsy.com/in-en/listing/4328187910/yellow-georgette-lehenga-mirror-art-silk",
    image: "https://i.etsystatic.com/60113107/r/il/580875/6980978222/il_1080xN.6980978222_3n2s.jpg",
    tags: ["Art Silk", "Fusion", "Dance"]
  },
  { 
    category: "Bridal (Sangeet)", 
    title: "Multi Color Embroidered Lehenga", 
    link: "https://www.etsy.com/in-en/listing/4346749094/multi-color-embroidered-lehenga",
    image: "https://i.etsystatic.com/60795886/r/il/66fc25/7130304165/il_1080xN.7130304165_e8h3.jpg",
    tags: ["Colorful", "Boho", "Statement"]
  },
  
  { 
    category: "Bridal", 
    title: "Purple Modest Lehenga", 
    link: "https://www.etsy.com/in-en/listing/4414089665/modest-indian-pakistani-lahanga-mexi",
    image: "https://i.etsystatic.com/61040656/r/il/ab5f89/7500635837/il_1080xN.7500635837_8xft.jpg",
    tags: ["Purple", "Modest", "Pakistani Style"]
  },
  { 
    category: "Bridal", 
    title: "Embroidered Off White Lehenga", 
    link: "https://www.etsy.com/in-en/listing/4349758193/embroidered-off-white-lehenga-pakistani",
    image: "https://i.etsystatic.com/58553345/r/il/f442ab/7097675080/il_1080xN.7097675080_4k3l.jpg",
    tags: ["Classic", "Detailed", "White"]
  },

  { 
    category: "Decor", 
    title: "Wedding Nikah Varmala", 
    link: "https://www.etsy.com/in-en/listing/1845253773/wedding-nikah-varmala-wedding-mala",
    image: "https://i.etsystatic.com/21396452/r/il/06986f/6511795490/il_1080xN.6511795490_1d6n.jpg",
    tags: ["Garland", "Roses", "Ceremony"]
  },
  { 
    category: "Decor", 
    title: "Floral Garlands (Faux)", 
    link: "https://www.etsy.com/in-en/listing/1853637298/floral-garlands-faux-flower-mala-mendhi",
    image: "https://i.etsystatic.com/17644010/r/il/330b9e/6660668221/il_1080xN.6660668221_7rcp.jpg",
    tags: ["Decor", "Backdrop", "Faux Flowers"]
  },
  { 
    category: "Decor", 
    title: "Floral Jewelry Set", 
    link: "https://www.etsy.com/in-en/listing/1290107467/floral-garlands-faux-flower-jewelry-set",
    image: "https://i.etsystatic.com/17644010/r/il/9ed437/6568787687/il_1080xN.6568787687_to3o.jpg",
    tags: ["Accessories", "Haldi", "Floral"]
  },
  { 
    category: "Decor", 
    title: "Desi Wedding Favors", 
    link: "https://www.etsy.com/in-en/listing/1070903227/desi-wedding-favors-sonf-cones-fennel",
    image: "https://i.etsystatic.com/25828009/r/il/371d35/4343626437/il_1080xN.4343626437_8f3p.jpg",
    tags: ["Favors", "Guests", "Details"]
  },
  { 
    category: "Decor", 
    title: "Artificial Greenery Vines", 
    link: "https://www.etsy.com/in-en/listing/4311196370/12pcs-artificial-greenery-vine-faux",
    image: "https://i.etsystatic.com/59707848/r/il/dede45/6891596034/il_1080xN.6891596034_kdu3.jpg",
    tags: ["Greenery", "Nature", "Setup"]
  },
  { 
    category: "Decor", 
    title: "Pom Pom Garland with Bells", 
    link: "https://www.etsy.com/in-en/listing/4391489461/50-pcs-pom-pom-garland-with-bells-indian",
    image: "https://i.etsystatic.com/61213728/r/il/9af27d/7174502583/il_1080xN.7174502583_fbn3.jpg",
    tags: ["Traditional", "Colorful", "Fun"]
  },
  { 
    category: "Decor", 
    title: "Haldi Ceremony Platter", 
    link: "https://www.etsy.com/in-en/listing/1531030547/bride-haldi-ceremony-platter-steel-base",
    image: "https://i.etsystatic.com/29060052/r/il/c003a3/6793415627/il_1080xN.6793415627_5fyc.jpg",
    tags: ["Rituals", "Custom", "Yellow"]
  },

  { 
    category: "Bridesmaids", 
    title: "Haldi - Yellow Banarasi", 
    link: "https://www.etsy.com/in-en/listing/4402091783/yellow-party-wear-lehenga-choli-banarasi",
    image: "https://i.etsystatic.com/57467196/r/il/6c4514/7426265979/il_1080xN.7426265979_q726.jpg",
    tags: ["Silk", "Group", "Yellow"]
  },
  { 
    category: "Bridesmaids", 
    title: "Sangeet - Designer Lehenga", 
    link: "https://www.etsy.com/in-en/listing/4437077722/womens-beautiful-designer-lehenga-choli",
    image: "https://i.etsystatic.com/58442558/r/il/8bb2e8/7624417747/il_1080xN.7624417747_7z3s.jpg",
    tags: ["Designer", "Modern", "Chic"]
  },
  { 
    category: "Bridesmaids", 
    title: "Sangeet - Orange Banarasi", 
    link: "https://www.etsy.com/in-en/listing/1892421854/orange-banarasi-lehenga-choli-indian",
    image: "https://i.etsystatic.com/57467196/r/il/b905bc/6857228147/il_1080xN.6857228147_gnnn.jpg",
    tags: ["Orange", "Vibrant", "Traditional"]
  },
  { 
    category: "Bridesmaids", 
    title: "Wedding - Off White Georgette", 
    link: "https://www.etsy.com/in-en/listing/1870430922/off-white-lehenga-choli-georgette",
    image: "https://i.etsystatic.com/57467196/r/il/dfde22/6786811894/il_1080xN.6786811894_c8hx.jpg",
    tags: ["Matching", "Subtle", "Graceful"]
  },
  { 
    category: "Bridesmaids", 
    title: "Wedding - White Sequin", 
    link: "https://www.etsy.com/in-en/listing/4311332446/white-sequin-lehenga-choli-indian",
    image: "https://i.etsystatic.com/56400298/r/il/7182d4/6940119709/il_1080xN.6940119709_f71h.jpg",
    tags: ["Sparkle", "Evening", "Party"]
  },
  
  { 
    category: "Jewelry", 
    title: "Kundan Bridal Set", 
    link: "https://www.etsy.com/in-en/listing/1349678193/kundan-bridal-jewelry-set-indian",
    image: "https://i.etsystatic.com/18845451/r/il/63ebb8/6012568322/il_1080xN.6012568322_a9rw.jpg",
    tags: ["Kundan", "Bridal", "Set"]
  },
  { 
    category: "Jewelry", 
    title: "Gold Mirror Necklace Set", 
    link: "https://www.etsy.com/in-en/listing/1657950341/indian-asian-gold-mirror-necklace-set",
    image: "https://i.etsystatic.com/25902879/r/il/b5f45e/6006197052/il_1080xN.6006197052_k7fc.jpg",
    tags: ["Mirror", "Gold", "Modern"]
  },
  { 
    category: "Jewelry", 
    title: "Antique Gold Crystal Set", 
    link: "https://www.etsy.com/in-en/listing/1079791806/antique-gold-indian-necklace-set-crystal",
    image: "https://i.etsystatic.com/18845451/r/il/fa20a3/6174607030/il_1080xN.6174607030_kr17.jpg",
    tags: ["Antique", "Crystal", "Heirloom"]
  },
  { 
    category: "Jewelry", 
    title: "Delicate Kundan Choker", 
    link: "https://www.etsy.com/in-en/listing/1404286211/delicate-kundan-choker-necklace-matte",
    image: "https://i.etsystatic.com/22562645/r/il/e3d55a/4754959545/il_1080xN.4754959545_da0z.jpg",
    tags: ["Choker", "Minimal", "Necklace"]
  },
  { 
    category: "Jewelry", 
    title: "Ruby & Green Necklace", 
    link: "https://www.etsy.com/in-en/listing/4380869555/ruby-and-green-necklace-with-earrings",
    image: "https://i.etsystatic.com/59977242/r/il/b646cb/7473121722/il_1080xN.7473121722_hp8k.jpg",
    tags: ["Color", "Gemstones", "Statement"]
  },
  { 
    category: "Jewelry", 
    title: "Floral Gajra", 
    link: "https://www.etsy.com/in-en/listing/1293212030/floral-gajra-desi-wedding-jewelry",
    image: "https://i.etsystatic.com/32067973/r/il/4a52fb/6115838491/il_1080xN.6115838491_bj3v.jpg",
    tags: ["Hair", "Traditional", "Flowers"]
  },

  { 
    category: "Groom", 
    title: "Haldi - Sequin Chikankari", 
    link: "https://www.etsy.com/in-en/listing/1401426498/sequin-chikhenkari-kurta-pajama-set-in",
    image: "https://i.etsystatic.com/22456625/r/il/6f7534/4667256521/il_1080xN.4667256521_b7n0.jpg",
    tags: ["Chikankari", "Kurta", "Comfort"]
  },
  { 
    category: "Groom", 
    title: "Haldi - Yellow Kurta Sherwani", 
    link: "https://www.etsy.com/in-en/listing/4395529257/mens-yellow-kurta-sherwani-top-set-kurta",
    image: "https://i.etsystatic.com/19565952/r/il/915a77/7338416554/il_1080xN.7338416554_lrm1.jpg",
    tags: ["Yellow", "Sherwani", "Vibrant"]
  },
  { 
    category: "Groom", 
    title: "Sangeet - White Sherwani", 
    link: "https://www.etsy.com/in-en/listing/1511497703/groom-wedding-sherwani-outfit-white",
    image: "https://i.etsystatic.com/27072540/r/il/67f7a5/5035907260/il_1080xN.5035907260_jwr3.jpg",
    tags: ["White", "Sangeet", "Classic"]
  },
  { 
    category: "Groom", 
    title: "Wedding - Ivory Silk Sherwani", 
    link: "https://www.etsy.com/in-en/listing/1291475537/ivory-embroidered-silk-sherwani-set",
    image: "https://i.etsystatic.com/30819167/r/il/60358b/4536268719/il_1080xN.4536268719_dns0.jpg",
    tags: ["Ivory", "Silk", "Royal"]
  },
  { 
    category: "Groom", 
    title: "Wedding - White Sherwani Set", 
    link: "https://www.etsy.com/in-en/listing/1782811713/white-sherwani-set-indian-wedding-groom",
    image: "https://i.etsystatic.com/37668241/r/il/726fcb/6217525240/il_1080xN.6217525240_dft5.jpg",
    tags: ["White", "Set", "Groom"]
  },
  { 
    category: "Groom", 
    title: "Wedding - Cream Embroidered", 
    link: "https://www.etsy.com/in-en/listing/4322477913/cream-embroidered-sherwani-for-menmens",
    image: "https://i.etsystatic.com/17634941/r/il/eec762/6998468967/il_1080xN.6998468967_fbg9.jpg",
    tags: ["Cream", "Embroidered", "Traditional"]
  },
  { 
    category: "Groom", 
    title: "Wedding - Warm White", 
    link: "https://www.etsy.com/in-en/listing/1494781604/groom-wedding-sherwani-outfit-white",
    image: "https://i.etsystatic.com/27072540/r/il/157c1b/5073653597/il_1080xN.5073653597_k6k0.jpg",
    tags: ["Warm", "Detailed", "Fit"]
  },
  { 
    category: "Groom", 
    title: "Parsi Design Maharaja", 
    link: "https://www.etsy.com/in-en/listing/1875314488/luxury-white-parsi-design-maharaja-fully",
    image: "https://i.etsystatic.com/13519379/r/il/cbe845/6845426974/il_1080xN.6845426974_h3om.jpg",
    tags: ["Luxury", "Maharaja", "Parsi"]
  },
];

const InspirationCard = ({ item }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
        <img 
          src={item.image} 
          alt={item.title}
          loading="lazy"
          onLoad={() => setIsImageLoading(false)}
          className={`h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110 ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Loading Skeleton */}
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="animate-pulse text-stone-300" size={32} />
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

        {/* Top Right Tag */}
        <div className="absolute right-3 top-3 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <a 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-900 shadow-lg transition-transform hover:scale-110"
            title="View on Etsy"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <span className="inline-block rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-600">
            {item.category}
          </span>
        </div>
        
        <h3 className="mb-3 line-clamp-2 font-serif text-lg font-medium leading-snug text-stone-900 group-hover:text-rose-700">
          {item.title}
        </h3>

        {/* Tags */}
        <div className="mt-auto flex flex-wrap gap-1">
          {item.tags.map((tag, i) => (
            <span key={i} className="text-[10px] text-stone-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filterGroups = useMemo(() => {
    return ["All", "Bridal", "Groom", "Bridesmaids", "Jewelry", "Decor"];
  }, []);

  const filteredData = useMemo(() => {
    return rawData.filter(item => {
      const matchesFilter = activeFilter === "All" || item.category.includes(activeFilter);
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const stats = useMemo(() => {
    return {
      bridal: rawData.filter(i => i.category.includes("Bridal")).length,
      groom: rawData.filter(i => i.category.includes("Groom")).length,
      decor: rawData.filter(i => i.category.includes("Decor")).length
    };
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-rose-200">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 px-4 py-4 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-200">
              <Heart size={20} fill="currentColor" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif text-xl font-bold tracking-tight text-stone-900">Maddie's Board</h1>
              <p className="text-xs text-stone-500">Wedding Inspiration</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text"
              placeholder="Search for lehengas, jewelry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-stone-200 bg-stone-50 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-50"
            />
          </div>

          {/* Mobile Search Icon & Menu */}
          <div className="flex gap-2 md:hidden">
            <button 
              className="rounded-lg p-2 hover:bg-stone-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu & Search */}
        {isMobileMenuOpen && (
          <div className="mt-4 border-t border-stone-100 pt-4 md:hidden">
             <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-sm outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              {filterGroups.map(filter => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 text-left font-medium transition-colors ${
                    activeFilter === filter 
                      ? "bg-rose-50 text-rose-600" 
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {filter}
                  {activeFilter === filter && <Sparkles size={16} />}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        
        {/* Hero Section */}
        <header className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-medium text-stone-800 md:text-5xl">
            The Mood Board
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-stone-600">
            Curated styles for the big day.
          </p>
          
          {/* Desktop Filters */}
          <div className="mt-8 hidden flex-wrap justify-center gap-2 md:flex">
            {filterGroups.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter 
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-200 transform scale-105" 
                    : "bg-white text-stone-600 border border-stone-200 hover:border-rose-200 hover:text-rose-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 flex justify-center gap-6 text-xs font-medium uppercase tracking-widest text-stone-400">
            <span>{stats.bridal} Bridal</span>
            <span>•</span>
            <span>{stats.groom} Groom</span>
            <span>•</span>
            <span>{stats.decor} Decor</span>
          </div>
        </header>

        {/* Masonry-style Grid */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 space-y-6">
          {filteredData.map((item, index) => (
            <div key={index} className="break-inside-avoid">
              <InspirationCard item={item} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 p-8 text-center">
            <ShoppingBag size={48} className="mb-4 text-stone-300" />
            <h3 className="text-xl font-medium text-stone-900">No matches found</h3>
            <p className="text-stone-500">Try adjusting your search or filters.</p>
            <button 
              onClick={() => {
                setActiveFilter("All");
                setSearchQuery("");
              }}
              className="mt-6 font-medium text-rose-600 hover:text-rose-700 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

      </main>

      <footer className="mt-20 border-t border-stone-200 bg-white py-12 text-center text-stone-500">
        <div className="mb-4 flex justify-center gap-4">
          <div className="h-1 w-1 rounded-full bg-stone-300"></div>
          <div className="h-1 w-1 rounded-full bg-stone-300"></div>
          <div className="h-1 w-1 rounded-full bg-stone-300"></div>
        </div>
        <p className="font-serif italic">"Planning for the perfect day"</p>
      </footer>
    </div>
  );
}