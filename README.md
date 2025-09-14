# Lista Badań - React + TypeScript + Vite

Aplikacja do zarządzania listą badań laboratoryjnych z funkcjonalnością koszyka, filtrowania i szczegółów badań.

## Wymagania systemowe

- **Node.js 22+** (zalecana najnowsza wersja LTS)
- **pnpm** (menedżer pakietów)

## Instalacja

```bash
# Klonowanie repozytorium
git clone https://github.com/bszydlowski96/lista-badan.git
cd lista-badan

# Instalacja zależności
pnpm install
```

## Uruchomienie aplikacji

### Aplikacja główna (localhost:5173)

```bash
# Uruchomienie serwera deweloperskiego
pnpm dev
```

### Mock API (localhost:4000)

```bash
# Uruchomienie JSON Server w osobnym terminalu
pnpm dev:api
```

**Ważne:** Aplikacja wymaga działającego JSON Server do poprawnego funkcjonowania.

## Funkcjonalności

### MVP

- ✅ **Lista badań** - wyświetlanie z polami: nazwa, kod, kategoria, cena, czas wykonania, przygotowanie
- ✅ **Wyszukiwanie** - po nazwie lub kodzie badania (case-insensitive)
- ✅ **Filtrowanie** - po kategorii badań
- ✅ **Sortowanie** - po cenie rosnąco/malejąco
- ✅ **Koszyk** - dodawanie/usuwanie badań, zliczanie ceny i czasu
- ✅ **Szczegóły badania** - modal z pełnym opisem
- ✅ **Responsywność** - działa na urządzeniach 320px-1440px+
- ✅ **Stany UI** - loading, error, empty state

### Bonusy

- ✅ **Dark Mode** - przełączanie motywów
- ✅ **localStorage** - zapamiętywanie koszyka
- ✅ **Dostępność** - nawigacja klawiaturą, aria-labels
- ✅ **Storybook** - dokumentacja komponentów

## Dostępne komendy

```bash
# Rozwój
pnpm dev                    # Uruchom aplikację (port 5173)
pnpm dev:api               # Uruchom JSON Server (port 4000)

# Testowanie
pnpm test                  # Uruchom testy
pnpm test:ui               # Uruchom testy z interfejsem
pnpm test:coverage         # Uruchom testy z pokryciem kodu

# Storybook
pnpm storybook             # Uruchom Storybook (port 6006)
pnpm build-storybook       # Zbuduj Storybook

# Build i Deploy
pnpm build                 # Zbuduj aplikację
pnpm preview               # Podgląd zbudowanej aplikacji
pnpm lint                  # Sprawdź kod ESLintem
```

## Storybook

Dokumentacja komponentów dostępna po uruchomieniu:

```bash
pnpm storybook
```

**URL:** http://localhost:6006

### Udokumentowane komponenty:

- **SearchBar** - Pole wyszukiwania z skrótem klawiszowym (Ctrl+/)
- **CategoryFilter** - Dropdown do filtrowania kategorii
- **SortControl** - Przełącznik sortowania cen
- **Modal** - Okno modalne (3 rozmiary: sm/md/lg)
- **Cart** - Koszyk z podsumowaniem
- **StudyList** - Lista badań z wszystkimi funkcjami
- **ThemeToggle** - Przełącznik Dark/Light Mode

## Testowanie

### Uruchomienie testów

```bash
# Wszystkie testy
pnpm test

# Testy z interfejsem (Vitest UI)
pnpm test:ui

# Pokrycie kodu
pnpm test:coverage
```

### Pokrycie testami

- **SearchBar** - wyszukiwanie, clearowanie, skróty klawiszowe
- **CategoryFilter** - wybór kategorii, obsługa opcji
- **SortControl** - przełączanie kierunku sortowania
- **Cart** - dodawanie/usuwanie, stany pusty/pełny
- **Modal** - otwieranie/zamykanie, różne rozmiary
- **CartContext** - zarządzanie stanem koszyka

## Struktura projektu

```
src/
├── components/          # Komponenty UI
│   ├── SearchBar/
│   ├── CategoryFilter/
│   ├── SortControl/
│   ├── Modal/
│   ├── Cart/
│   ├── StudyList/
│   └── ThemeToggle/
├── context/            # Contexty React
│   ├── CartContext/
│   └── ThemeContext/
├── hooks/             # Custom hooki
│   └── useStudies/
├── lib/               # Utilities
│   └── currency/
├── pages/             # Strony aplikacji
│   └── Home/
├── styles/            # Style globalne
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── global.scss
├── test/              # Konfiguracja testów
└── types/             # Definicje TypeScript
```

## Tech Stack

### Core

- **React 19** - biblioteka UI
- **TypeScript** - typowanie statyczne
- **Vite** - bundler i dev server
- **React Router** - routing

### Styling

- **SCSS** - preprocessing CSS
- **CSS Variables** - Dark Mode
- **Mobile-first** - responsywne design

### State Management

- **React Context** - globalny stan koszyka i motywu
- **useReducer** - zarządzanie złożonym stanem
- **localStorage** - persystencja danych

### Testing & Quality

- **Vitest** - framework testowy
- **Testing Library** - testy komponentów
- **ESLint** - linting kodu
- **TypeScript** - sprawdzanie typów

### Dokumentacja

- **Storybook** - dokumentacja komponentów
- **Stories** - przypadki użycia UI

### API

- **JSON Server** - mock REST API
- **Fetch API** - komunikacja z serwerem

## API Endpoints

Mock API dostępne pod adresem `http://localhost:4000`:

```bash
GET /studies          # Lista wszystkich badań
```

### Przykładowe dane (studies.json):

```json
[
  {
    "id": "morf-1",
    "name": "Morfologia krwi",
    "code": "MORF",
    "category": "Krew",
    "price": 29.0,
    "etaMinutes": 15,
    "preparation": "Na czczo",
    "description": "Podstawowe badanie krwi..."
  }
]
```

## Obsługa Dark Mode

- **Automatyczne wykrywanie** - preferencje systemu
- **Przełącznik** - w header aplikacji
- **Zapamiętywanie** - localStorage
- **CSS Variables** - dynamiczne kolory

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Deployment

```bash
# Build production
pnpm build

# Podgląd lokalny
pnpm preview

# Pliki w folderze dist/
```

## Autorzy

Projekt stworzony jako zadanie rekrutacyjne (Junior Frontend).

## Licencja

MIT License
