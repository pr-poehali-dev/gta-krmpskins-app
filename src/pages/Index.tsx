import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

const SKIN_IMG = "https://cdn.poehali.dev/projects/c05f2902-7b89-4115-beff-077c32091490/files/c43b3698-4567-46a8-a87e-f9cb131f5750.jpg";
const CAR_IMG = "https://cdn.poehali.dev/projects/c05f2902-7b89-4115-beff-077c32091490/files/67339b4e-2849-43c0-8262-a7ce88f132fb.jpg";

const SKINS = [
  { id: 1,  name: "1",  category: "Гражданские", rarity: "Обычный",    tags: ["толстовка", "улица"],       img: "https://cdn.poehali.dev/files/d4d93c24-5603-4863-91d7-5d162a7617b9.png" },
  { id: 2,  name: "2",  category: "Гражданские", rarity: "Обычный",    tags: ["кепка", "толстовка"],       img: "https://cdn.poehali.dev/files/125ce22e-86f0-4c0d-918e-dbf1836ac107.png" },
  { id: 3,  name: "3",  category: "Байкеры",     rarity: "Обычный",    tags: ["кожа", "спорт"],            img: "https://cdn.poehali.dev/files/429d757f-d77d-4c2c-a9cc-7c6abca3d9cd.png" },
  { id: 4,  name: "4",  category: "Супергерои",  rarity: "Легендарный",tags: ["марвел", "маска"],          img: "https://cdn.poehali.dev/files/e48e0385-e750-4b77-82ba-c4cce5f13100.png" },
  { id: 5,  name: "5",  category: "Гражданские", rarity: "Обычный",    tags: ["футболка", "красный"],      img: "https://cdn.poehali.dev/files/c0bb7ffa-ab56-4d5c-b5b5-2d9193c0a072.png" },
  { id: 6,  name: "6",  category: "Мафия",       rarity: "Редкий",     tags: ["костюм", "клетка"],         img: "https://cdn.poehali.dev/files/3c546ec4-9b2c-42d2-ba9c-59dcb9d9f913.png" },
  { id: 7,  name: "7",  category: "Спецодежда",  rarity: "Эпический",  tags: ["космос", "рубашка"],        img: "https://cdn.poehali.dev/files/8ff1ccbe-cd85-4e77-8d7f-56670984162d.png" },
  { id: 8,  name: "8",  category: "Гражданские", rarity: "Обычный",    tags: ["толстовка", "улица"],       img: "https://cdn.poehali.dev/files/b309949d-7773-45f1-8f13-589f3d08d94d.png" },
  { id: 9,  name: "9",  category: "Девушки",     rarity: "Эпический",  tags: ["огонь", "девушка"],         img: "https://cdn.poehali.dev/files/ea115450-ee97-4f97-aacb-7ed4927a3a78.png" },
  { id: 10, name: "10", category: "Гражданские", rarity: "Обычный",    tags: ["пожилая", "гражданский"],   img: "https://cdn.poehali.dev/files/171bf3e9-77aa-43a8-bdb9-ae53c4a981a2.png" },
  { id: 11, name: "11", category: "Гражданские", rarity: "Обычный",    tags: ["костюм", "работа"],         img: "https://cdn.poehali.dev/files/033c6b04-e497-4163-b5cf-d265aa06a0de.png" },
  { id: 12, name: "12", category: "Девушки",     rarity: "Редкий",     tags: ["платье", "девушка"],        img: "https://cdn.poehali.dev/files/724c3c8d-72a3-46c5-a36a-6d646ad4b7ac.png" },
  { id: 13, name: "13", category: "Девушки",     rarity: "Обычный",    tags: ["рубашка", "девушка"],       img: "https://cdn.poehali.dev/files/7c047a96-8c85-44d4-8a76-a4ed978d55ee.png" },
  { id: 14, name: "14", category: "Гражданские", rarity: "Обычный",    tags: ["футболка", "логотип"],      img: "https://cdn.poehali.dev/files/d147204f-f128-4663-8f94-f8e25fa4e36f.png" },
];

const CARS = [
  { id: 1, name: "Sultan RS", category: "Спорт", speed: 92, control: 78, rarity: "Редкий", tags: ["тюнинг", "дрифт"], img: CAR_IMG },
  { id: 2, name: "Infernus", category: "Суперкар", speed: 99, control: 70, rarity: "Легендарный", tags: ["быстрый", "эксклюзив"], img: CAR_IMG },
  { id: 3, name: "Elegy RH8", category: "Спорт", speed: 88, control: 85, rarity: "Редкий", tags: ["тюнинг", "гонки"], img: CAR_IMG },
  { id: 4, name: "Lowrider Blade", category: "Классика", speed: 70, control: 65, rarity: "Эпический", tags: ["лоурайдер", "ретро"], img: CAR_IMG },
  { id: 5, name: "Patriot", category: "Внедорожник", speed: 75, control: 80, rarity: "Обычный", tags: ["внедорожник", "большой"], img: CAR_IMG },
  { id: 6, name: "BF Injection", category: "Багги", speed: 68, control: 88, rarity: "Обычный", tags: ["багги", "пустыня"], img: CAR_IMG },
  { id: 7, name: "Phoenix", category: "Классика", speed: 82, control: 72, rarity: "Редкий", tags: ["мускул", "классика"], img: CAR_IMG },
  { id: 8, name: "Turismo", category: "Суперкар", speed: 96, control: 74, rarity: "Эпический", tags: ["быстрый", "итальянский"], img: CAR_IMG },
];

const RARITY_COLORS: Record<string, string> = {
  "Обычный": "text-gray-400 border-gray-600",
  "Редкий": "text-blue-400 border-blue-700",
  "Эпический": "text-purple-400 border-purple-700",
  "Легендарный": "text-yellow-400 border-yellow-600",
};

const TABS = [
  { id: "skins", label: "Скины", icon: "User" },
  { id: "cars", label: "Автомобили", icon: "Car" },
  { id: "favorites", label: "Избранное", icon: "Star" },
];

type Tab = "skins" | "cars" | "favorites";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("skins");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("Все");
  const [filterRarity, setFilterRarity] = useState("Все");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  const skinCategories = ["Все", ...Array.from(new Set(SKINS.map(s => s.category)))];
  const carCategories = ["Все", ...Array.from(new Set(CARS.map(c => c.category)))];
  const rarities = activeTab === "cars"
    ? ["Все", "Обычный", "Редкий", "Эпический"]
    : [];

  const categories = activeTab === "skins" ? skinCategories : carCategories;

  const filteredSkins = useMemo(() => {
    return SKINS.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some(t => t.includes(search.toLowerCase()));
      const matchCat = filterCategory === "Все" || s.category === filterCategory;
      const matchRarity = filterRarity === "Все" || s.rarity === filterRarity;
      return matchSearch && matchCat && matchRarity;
    });
  }, [search, filterCategory, filterRarity]);

  const filteredCars = useMemo(() => {
    return CARS.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some(t => t.includes(search.toLowerCase()));
      const matchCat = filterCategory === "Все" || c.category === filterCategory;
      const matchRarity = filterRarity === "Все" || c.rarity === filterRarity;
      return matchSearch && matchCat && matchRarity;
    });
  }, [search, filterCategory, filterRarity]);

  const favoriteSkins = SKINS.filter(s => favorites.includes(s.id));
  const favoriteCars = CARS.filter(c => favorites.includes(c.id + 100));

  const toggleFavSkin = (id: number) => {
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  };
  const toggleFavCar = (id: number) => {
    const key = id + 100;
    setFavorites(f => f.includes(key) ? f.filter(x => x !== key) : [...f, key]);
  };

  const toggleCompare = (id: number) => {
    setCompareList(l => {
      if (l.includes(id)) return l.filter(x => x !== id);
      if (l.length >= 2) return [l[1], id];
      return [...l, id];
    });
  };

  const compareCars = CARS.filter(c => compareList.includes(c.id));

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSearch("");
    setFilterCategory("Все");
    setFilterRarity("Все");
    if (tab !== "cars") {
      setCompareList([]);
      setShowCompare(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--gta-dark)" }}>
      {/* Header */}
      <header className="border-b sticky top-0 z-50" style={{
        borderColor: "var(--gta-border)",
        background: "rgba(10,10,10,0.97)",
        backdropFilter: "blur(12px)"
      }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded" style={{ background: "var(--gta-gold)" }}>
              <span className="font-bold text-xs" style={{ fontFamily: "Oswald", color: "#000", letterSpacing: "0.05em" }}>GTA</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none" style={{ fontFamily: "Oswald", color: "var(--gta-gold)", letterSpacing: "0.1em" }}>
                CRMP DATABASE
              </h1>
              <p className="text-xs" style={{ color: "var(--gta-muted)", fontFamily: "Rubik" }}>база скинов и автомобилей</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--gta-muted)" }} />
            <input
              type="text"
              placeholder="Поиск по названию или тегу..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded outline-none"
              style={{
                background: "var(--gta-card)",
                border: "1px solid var(--gta-border)",
                color: "#fff",
                fontFamily: "Rubik",
                transition: "border-color 0.2s"
              }}
              onFocus={e => e.target.style.borderColor = "var(--gta-gold)"}
              onBlur={e => e.target.style.borderColor = "var(--gta-border)"}
            />
          </div>

          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--gta-muted)" }}>
            <Icon name="Star" size={16} style={{ color: favorites.length > 0 ? "var(--gta-gold)" : "var(--gta-muted)" }} />
            <span style={{ fontFamily: "Oswald", color: favorites.length > 0 ? "var(--gta-gold)" : "var(--gta-muted)" }}>
              {favorites.length}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-0">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as Tab)}
              className="flex items-center gap-2 px-5 py-3 text-sm gta-btn relative"
              style={{
                fontFamily: "Oswald",
                letterSpacing: "0.1em",
                color: activeTab === tab.id ? "var(--gta-gold)" : "var(--gta-muted)",
                borderBottom: activeTab === tab.id ? "2px solid var(--gta-gold)" : "2px solid transparent",
                background: "none",
                transition: "color 0.2s"
              }}
            >
              <Icon name={tab.icon} size={15} />
              {tab.label}
              {tab.id === "favorites" && favorites.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded" style={{ background: "var(--gta-gold)", color: "#000", fontSize: "10px", fontFamily: "Oswald" }}>
                  {favorites.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        {activeTab === "cars" && (
          <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-in">
            <div className="flex items-center gap-2">
              <Icon name="Filter" size={14} style={{ color: "var(--gta-muted)" }} />
              <span className="text-xs uppercase" style={{ fontFamily: "Oswald", color: "var(--gta-muted)", letterSpacing: "0.1em" }}>Фильтры</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className="px-3 py-1 text-xs rounded transition-all"
                  style={{
                    fontFamily: "Oswald",
                    letterSpacing: "0.06em",
                    background: filterCategory === cat ? "var(--gta-gold)" : "var(--gta-card)",
                    color: filterCategory === cat ? "#000" : "var(--gta-muted)",
                    border: `1px solid ${filterCategory === cat ? "var(--gta-gold)" : "var(--gta-border)"}`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {rarities.length > 0 && (
              <>
                <div className="w-px h-4" style={{ background: "var(--gta-border)" }} />
                <div className="flex flex-wrap gap-2">
                  {rarities.map(r => (
                    <button
                      key={r}
                      onClick={() => setFilterRarity(r)}
                      className="px-3 py-1 text-xs rounded transition-all"
                      style={{
                        fontFamily: "Oswald",
                        letterSpacing: "0.06em",
                        background: filterRarity === r ? "rgba(245,168,0,0.15)" : "var(--gta-card)",
                        color: filterRarity === r ? "var(--gta-gold)" : "var(--gta-muted)",
                        border: `1px solid ${filterRarity === r ? "var(--gta-gold)" : "var(--gta-border)"}`,
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </>
            )}

            {activeTab === "cars" && (
              <>
                <div className="w-px h-4" style={{ background: "var(--gta-border)" }} />
                <button
                  onClick={() => { setCompareMode(!compareMode); if (compareMode) setCompareList([]); }}
                  className="flex items-center gap-2 px-3 py-1 text-xs rounded transition-all"
                  style={{
                    fontFamily: "Oswald",
                    letterSpacing: "0.06em",
                    background: compareMode ? "rgba(245,168,0,0.15)" : "var(--gta-card)",
                    color: compareMode ? "var(--gta-gold)" : "var(--gta-muted)",
                    border: `1px solid ${compareMode ? "var(--gta-gold)" : "var(--gta-border)"}`,
                  }}
                >
                  <Icon name="GitCompare" size={13} />
                  Сравнить {compareMode && compareList.length > 0 && `(${compareList.length}/2)`}
                </button>
                {compareList.length === 2 && (
                  <button
                    onClick={() => setShowCompare(true)}
                    className="flex items-center gap-2 px-3 py-1 text-xs rounded gta-btn"
                    style={{
                      fontFamily: "Oswald",
                      background: "var(--gta-gold)",
                      color: "#000",
                      border: "none"
                    }}
                  >
                    <Icon name="BarChart2" size={13} />
                    Показать сравнение
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* SKINS TAB */}
        {activeTab === "skins" && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm" style={{ color: "var(--gta-muted)", fontFamily: "Rubik" }}>
                Найдено: <span style={{ color: "#fff" }}>{filteredSkins.length}</span> скинов
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredSkins.map((skin, i) => (
                <SkinCard
                  key={skin.id}
                  skin={skin}
                  isFav={favorites.includes(skin.id)}
                  onFav={() => toggleFavSkin(skin.id)}
                  delay={i * 40}
                />
              ))}
              {filteredSkins.length === 0 && <EmptyState />}
            </div>
          </div>
        )}

        {/* CARS TAB */}
        {activeTab === "cars" && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm" style={{ color: "var(--gta-muted)", fontFamily: "Rubik" }}>
                Найдено: <span style={{ color: "#fff" }}>{filteredCars.length}</span> машин
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCars.map((car, i) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isFav={favorites.includes(car.id + 100)}
                  onFav={() => toggleFavCar(car.id)}
                  compareMode={compareMode}
                  inCompare={compareList.includes(car.id)}
                  onCompare={() => toggleCompare(car.id)}
                  delay={i * 40}
                />
              ))}
              {filteredCars.length === 0 && <EmptyState />}
            </div>
          </div>
        )}

        {/* FAVORITES TAB */}
        {activeTab === "favorites" && (
          <div className="animate-slide-up">
            {favorites.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="Star" size={48} className="mx-auto mb-4" style={{ color: "var(--gta-border)" }} />
                <p style={{ fontFamily: "Oswald", color: "var(--gta-muted)", letterSpacing: "0.1em", fontSize: "18px" }}>
                  ИЗБРАННОЕ ПУСТО
                </p>
                <p className="text-sm mt-2" style={{ color: "var(--gta-muted)", fontFamily: "Rubik" }}>
                  Добавляй скины и авто через ★
                </p>
              </div>
            ) : (
              <div>
                {favoriteSkins.length > 0 && (
                  <>
                    <h2 className="text-sm mb-3 flex items-center gap-2" style={{ fontFamily: "Oswald", color: "var(--gta-gold)", letterSpacing: "0.15em" }}>
                      <Icon name="User" size={14} /> СКИНЫ ({favoriteSkins.length})
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                      {favoriteSkins.map((skin, i) => (
                        <SkinCard key={skin.id} skin={skin} isFav onFav={() => toggleFavSkin(skin.id)} delay={i * 40} />
                      ))}
                    </div>
                  </>
                )}
                {favoriteCars.length > 0 && (
                  <>
                    <h2 className="text-sm mb-3 flex items-center gap-2" style={{ fontFamily: "Oswald", color: "var(--gta-gold)", letterSpacing: "0.15em" }}>
                      <Icon name="Car" size={14} /> АВТОМОБИЛИ ({favoriteCars.length})
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {favoriteCars.map((car, i) => (
                        <CarCard key={car.id} car={car} isFav onFav={() => toggleFavCar(car.id)} compareMode={false} inCompare={false} onCompare={() => {}} delay={i * 40} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Compare Modal */}
      {showCompare && compareCars.length === 2 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowCompare(false)}
        >
          <div
            className="w-full max-w-2xl rounded-lg animate-slide-up"
            style={{ background: "var(--gta-card)", border: "1px solid var(--gta-gold)" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--gta-border)" }}>
              <h2 style={{ fontFamily: "Oswald", color: "var(--gta-gold)", letterSpacing: "0.15em", fontSize: "18px" }}>
                СРАВНЕНИЕ АВТОМОБИЛЕЙ
              </h2>
              <button onClick={() => setShowCompare(false)} style={{ color: "var(--gta-muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                {compareCars.map(car => (
                  <div key={car.id} className="text-center">
                    <img src={car.img} alt={car.name} className="w-full h-32 object-cover rounded mb-3" style={{ border: "1px solid var(--gta-border)" }} />
                    <h3 style={{ fontFamily: "Oswald", color: "#fff", fontSize: "16px", letterSpacing: "0.08em" }}>{car.name}</h3>
                    <p className="text-xs mt-1" style={{ color: "var(--gta-muted)" }}>{car.category}</p>
                  </div>
                ))}
              </div>
              <CompareBar label="Скорость" a={compareCars[0].speed} b={compareCars[1].speed} />
              <CompareBar label="Управление" a={compareCars[0].control} b={compareCars[1].control} />
              <div className="mt-4 grid grid-cols-2 gap-4">
                {compareCars.map(car => (
                  <div key={car.id} className="text-center">
                    <span className={`text-xs px-2 py-0.5 rounded border ${RARITY_COLORS[car.rarity]}`} style={{ fontFamily: "Oswald" }}>
                      {car.rarity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CompareBar({ label, a, b }: { label: string; a: number; b: number }) {
  const winner = a > b ? "a" : b > a ? "b" : "tie";
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1" style={{ fontFamily: "Oswald", color: "var(--gta-muted)", letterSpacing: "0.08em" }}>
        <span style={{ color: winner === "a" ? "var(--gta-gold)" : "#fff" }}>{a}</span>
        <span style={{ color: "var(--gta-muted)" }}>{label.toUpperCase()}</span>
        <span style={{ color: winner === "b" ? "var(--gta-gold)" : "#fff" }}>{b}</span>
      </div>
      <div className="flex gap-1 h-2">
        <div className="flex-1 rounded-l overflow-hidden" style={{ background: "var(--gta-border)" }}>
          <div className="h-full rounded-l" style={{
            width: `${a}%`,
            background: winner === "a" ? "var(--gta-gold)" : "#555",
            marginLeft: "auto",
          }} />
        </div>
        <div className="flex-1 rounded-r overflow-hidden" style={{ background: "var(--gta-border)" }}>
          <div className="h-full rounded-r" style={{
            width: `${b}%`,
            background: winner === "b" ? "var(--gta-gold)" : "#555",
          }} />
        </div>
      </div>
    </div>
  );
}

function SkinCard({ skin, isFav, onFav, delay }: { skin: typeof SKINS[0]; isFav: boolean; onFav: () => void; delay?: number }) {
  return (
    <div
      className="rounded gta-card-hover animate-slide-up"
      style={{
        background: "var(--gta-card)",
        border: "1px solid var(--gta-border)",
        overflow: "hidden",
        animationDelay: `${delay || 0}ms`,
        animationFillMode: "both"
      }}
    >
      <div className="relative">
        <img src={skin.img} alt={skin.name} className="w-full h-44 object-cover object-top scanline" />
        <button
          onClick={onFav}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", transition: "transform 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Icon name="Star" size={14} style={{ color: isFav ? "var(--gta-gold)" : "#aaa", fill: isFav ? "var(--gta-gold)" : "none" }} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }} />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm leading-tight mb-1" style={{ fontFamily: "Oswald", color: "#fff", letterSpacing: "0.05em" }}>{skin.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.07)", color: "var(--gta-muted)", fontFamily: "Rubik" }}>
            {skin.category}
          </span>
          <span className={`text-xs px-1.5 py-0.5 rounded border ${RARITY_COLORS[skin.rarity]}`} style={{ fontFamily: "Oswald", fontSize: "10px" }}>
            {skin.rarity}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {skin.tags.map(tag => (
            <span key={tag} className="text-xs" style={{ color: "var(--gta-muted)", fontFamily: "Rubik" }}>#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CarCard({ car, isFav, onFav, compareMode, inCompare, onCompare, delay }: {
  car: typeof CARS[0]; isFav: boolean; onFav: () => void;
  compareMode: boolean; inCompare: boolean; onCompare: () => void; delay?: number;
}) {
  return (
    <div
      className={`rounded gta-card-hover animate-slide-up ${inCompare ? "compare-glow" : ""}`}
      style={{
        background: "var(--gta-card)",
        border: `1px solid ${inCompare ? "var(--gta-gold)" : "var(--gta-border)"}`,
        overflow: "hidden",
        animationDelay: `${delay || 0}ms`,
        animationFillMode: "both"
      }}
    >
      <div className="relative">
        <img src={car.img} alt={car.name} className="w-full h-40 object-cover scanline" />
        <div className="absolute top-2 right-2 flex gap-1">
          {compareMode && (
            <button
              onClick={onCompare}
              className="w-7 h-7 flex items-center justify-center rounded"
              style={{ background: inCompare ? "var(--gta-gold)" : "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", transition: "all 0.15s" }}
            >
              <Icon name="GitCompare" size={13} style={{ color: inCompare ? "#000" : "#aaa" }} />
            </button>
          )}
          <button
            onClick={onFav}
            className="w-7 h-7 flex items-center justify-center rounded"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", transition: "transform 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Icon name="Star" size={14} style={{ color: isFav ? "var(--gta-gold)" : "#aaa", fill: isFav ? "var(--gta-gold)" : "none" }} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }} />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm leading-tight mb-2" style={{ fontFamily: "Oswald", color: "#fff", letterSpacing: "0.05em" }}>{car.name}</h3>
        <div className="space-y-1.5 mb-3">
          <StatBar label="Скорость" value={car.speed} />
          <StatBar label="Управление" value={car.control} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.07)", color: "var(--gta-muted)", fontFamily: "Rubik" }}>
            {car.category}
          </span>
          <span className={`text-xs px-1.5 py-0.5 rounded border ${RARITY_COLORS[car.rarity]}`} style={{ fontFamily: "Oswald", fontSize: "10px" }}>
            {car.rarity}
          </span>
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-0.5" style={{ fontFamily: "Rubik" }}>
        <span style={{ color: "var(--gta-muted)" }}>{label}</span>
        <span style={{ color: "#fff" }}>{value}</span>
      </div>
      <div className="h-1 rounded-full" style={{ background: "var(--gta-border)" }}>
        <div
          className="h-1 rounded-full"
          style={{
            width: `${value}%`,
            background: value >= 90 ? "var(--gta-gold)" : value >= 75 ? "#e67e22" : "#555",
          }}
        />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full text-center py-16">
      <Icon name="SearchX" size={40} className="mx-auto mb-3" style={{ color: "var(--gta-border)" }} />
      <p style={{ fontFamily: "Oswald", color: "var(--gta-muted)", letterSpacing: "0.1em" }}>НИЧЕГО НЕ НАЙДЕНО</p>
      <p className="text-sm mt-1" style={{ color: "var(--gta-muted)", fontFamily: "Rubik" }}>Попробуй изменить фильтры или запрос</p>
    </div>
  );
}