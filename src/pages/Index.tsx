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
  { id: 14,   name: "14",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/d147204f-f128-4663-8f94-f8e25fa4e36f.png" },
  { id: 15,   name: "15",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/841ea322-6dc7-47cb-b1ca-3494952d58e3.png" },
  { id: 16,   name: "16",   category: "Спецодежда",  rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/3998b829-c1ed-4ab0-aef6-90c312abfd8b.png" },
  { id: 17,   name: "17",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/f5dae1d4-accc-475c-a804-b4b8c5df56b8.png" },
  { id: 18,   name: "18",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/863b7513-e698-40be-8b1b-cb9c83088e92.png" },
  { id: 19,   name: "19",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/449e3eea-4a06-4162-b2a1-88d0eba369df.png" },
  { id: 20,   name: "20",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/e9acecb4-9280-4013-b099-c427c50feeca.png" },
  { id: 21,   name: "21",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/271e408a-e8f1-4625-8f70-9647e0017800.png" },
  { id: 22,   name: "22",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/2050cb0b-3f96-4878-b32a-9d71bf45c5dd.png" },
  { id: 23,   name: "23",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/6d07b5fd-1a38-41c7-b4ba-a309aea6bfbf.png" },
  { id: 24,   name: "24",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/ca43c9f9-4a09-436f-a173-30a062c9841b.png" },
  { id: 25,   name: "25",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/5528674a-6860-4169-9af0-5b981dae15ce.png" },
  { id: 26,   name: "26",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/f7f499e9-ce06-4350-b007-f1070a31bdbc.png" },
  { id: 27,   name: "27",   category: "Спецодежда",  rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/1b7021a0-ef96-46f5-a18b-f94e1e4ac75b.png" },
  { id: 28,   name: "28",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/31fdcd95-5c67-4b5f-99db-79c4cd624fdb.png" },
  { id: 29,   name: "29",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/c65682b5-4ebf-4323-b237-03e8023ac187.png" },
  { id: 30,   name: "30",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/40e6796e-5df2-4bee-b5c6-15ad7a6a9297.png" },
  { id: 31,   name: "31",   category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/3cfd1612-fa1e-4b64-9ac4-31325c38596b.png" },
  { id: 32,   name: "32",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/279dfd68-0e72-445b-9c4b-b40794094ba6.png" },
  { id: 33,   name: "33",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/2577d2b8-fe29-4f12-abd5-9c3e7ffaa8b1.png" },
  { id: 34,   name: "34",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/7c60b92d-4d89-4223-bf47-985015e63dc5.png" },
  { id: 35,   name: "35",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/21eca619-925a-441a-9f28-0e223acfcc07.png" },
  { id: 36,   name: "36",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/b6936995-90ea-456d-8545-43def8ad4450.png" },
  { id: 37,   name: "37",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/c2b39833-05e8-4b47-8983-bc74980ef19a.png" },
  { id: 38,   name: "38",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/ccd4b5d1-b2d8-492f-acbb-6564e8273025.png" },
  { id: 39,   name: "39",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/9df5d759-d14f-42d8-896a-bc9c3fc1c51f.png" },
  { id: 40,   name: "40",   category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/6eb34bc7-2156-4b07-b8c3-01887a964ae5.png" },
  { id: 41,   name: "41",   category: "Спецодежда",  rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/de6cfd58-82fe-4c3d-9332-7124385fcb5a.png" },
  { id: 42,   name: "42",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/24d19b72-229a-4872-9673-2bc79bc6dd0c.png" },
  { id: 43,   name: "43",   category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/288cbefa-676f-4808-8902-6c1a9777aac9.png" },
  { id: 44,   name: "44",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/51af7f38-f73c-43de-8a08-56f0bf46a2cd.png" },
  { id: 45,   name: "45",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/a9dc1d55-3d2f-4e35-8093-0beb6edb8665.png" },
  { id: 46,   name: "46",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/90a147ab-4c34-4223-97dd-37ad852ca2bc.png" },
  { id: 47,   name: "47",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/45dfca35-cc3f-4422-bd77-e19c3a2ee142.png" },
  { id: 48,   name: "48",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/19bbd810-82c4-4dbc-965e-488c475d39c0.png" },
  { id: 49,   name: "49",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/a32a4c6d-7561-4fb6-bd6f-a8a5aadc00e7.png" },
  { id: 50,   name: "50",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/269d2c74-2e5d-4faf-8ff9-60792d392bb2.png" },
  { id: 51,   name: "51",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/946e90cc-4d8f-46e7-887e-094c0d640a98.png" },
  { id: 52,   name: "52",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/f627f24f-2068-4ceb-a235-fa1e1091cc4c.png" },
  { id: 53,   name: "53",   category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/72934ea3-68c7-4a60-94f4-ccf734b424af.png" },
  { id: 54,   name: "54",   category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/e4d1213f-1189-404f-a117-4177fd83fc1f.png" },
  { id: 55,   name: "55",   category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/8de75a55-58a7-4fd5-9248-ebccc45939b3.png" },
  { id: 56,   name: "56",   category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/fe4e411a-c834-4c9b-ad79-7478b37c760d.png" },
  { id: 57,   name: "57",   category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/14f03468-a437-49e5-b6d9-2f6bef1cf4d4.png" },
  { id: 571,  name: "57-1", category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/e6cfc1ef-60bb-4b43-8d56-9417b48cf182.png" },
  { id: 572,  name: "57-2", category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/e6cdaaee-6494-4f87-bc7b-16e0b62b6991.png" },
  { id: 58,   name: "58",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/655b95e0-df66-42a6-9133-5f2c2c7d43bb.png" },
  { id: 59,   name: "59",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/48c7e041-15c2-4ddc-9474-8bdce2a694ec.png" },
  { id: 60,   name: "60",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/e588f126-6707-4d94-b656-da4331db8b6c.png" },
  { id: 61,   name: "61",   category: "Спецодежда",  rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/c11a2a13-5487-40c5-9aa4-b33a52b7dde8.png" },
  { id: 62,   name: "62",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/753e031a-3411-40c3-840d-1fa4d4590603.png" },
  { id: 63,   name: "63",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/165cf6ce-e417-4c5e-b4b6-262a96e1bc73.png" },
  { id: 64,   name: "64",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/adc03e9b-10c2-4de8-95dc-0a29df566eb5.png" },
  { id: 65,   name: "65",   category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/fdcb416d-4427-4476-ab3d-7acad6ecae72.png" },
  { id: 66,   name: "66",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/6b046286-af8c-4295-8652-c6a5d5fec87d.png" },
  { id: 67,   name: "67",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/b730d4d3-a6c7-40f9-b219-425902ce9d43.png" },
  { id: 68,   name: "68",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/c180d9b1-e23d-4494-9815-342ab0b7023b.png" },
  { id: 69,   name: "69",   category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/41873799-2ca9-4874-9145-e8b868226ec6.png" },
  { id: 70,   name: "70",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/2c874960-56fc-43bd-962e-00b5856f0266.png" },
  { id: 71,   name: "71",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/863b5e42-9356-4cee-8aeb-21ec1c3174e1.png" },
  { id: 72,   name: "72",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/7a674397-225e-4ae8-8b67-eaa4443d97fd.png" },
  { id: 73,   name: "73",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/a0a2810e-f500-407d-9067-ff7acda1fd88.png" },
  { id: 74,   name: "74",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/29506bff-7926-422b-943a-93d9d1a400a7.png" },
  { id: 75,   name: "75",   category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/ced18e05-2a64-4d8e-b0ef-02da5eac1f46.png" },
  { id: 76,   name: "76",   category: "Спецодежда",  rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/515fc8a1-4192-496a-988c-3da1e09c52e3.png" },
  { id: 77,   name: "77",   category: "Девушки",     rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/2b6e6622-e755-4b6f-825d-37ff03411693.png" },
  { id: 78,   name: "78",   category: "Гражданские", rarity: "Обычный", tags: [], img: "https://cdn.poehali.dev/files/a6f9f2ab-aa98-42bd-8c32-06f53000b901.png" },
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