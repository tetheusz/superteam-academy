# Customization Guide — Superteam Academy

## Theme

The design system uses CSS custom properties defined in `src/app/globals.css`.

### Colors
```css
:root {
  --primary: #14f195;        /* Solana green */
  --secondary: #9945ff;      /* Solana purple */
  --accent: #00c2ff;         /* Cyan accent */
  --background: #050a18;     /* Dark background */
  --foreground: #e8ecf4;     /* Light text */
  /* ... more tokens */
}
```

To customize colors, edit the `:root` block in `globals.css`. All components reference these variables through Tailwind's `bg-primary`, `text-muted-foreground`, etc.

### Light Mode
A `.light` class variant is defined. Toggle it on `<html>` to switch themes. The Settings page includes a theme toggle.

### Typography
Default: Inter (sans-serif). Code: JetBrains Mono. Change in `tailwind.config.ts` → `theme.extend.fontFamily`.

## Adding a New Language

1. Create `src/i18n/messages/[locale].ts` (copy from `en.ts`)
2. Translate all keys
3. Add the locale to `src/i18n/locales.ts`:
   ```typescript
   export const SUPPORTED_LOCALES = [
     { code: "en", label: "English" },
     { code: "pt-BR", label: "Português" },
     { code: "es", label: "Español" },
     { code: "fr", label: "Français" },  // new
   ];
   ```
4. Import and register in `src/i18n/I18nProvider.tsx`

## Extending Gamification

### New Achievement Types
Add entries to the `MOCK_ACHIEVEMENTS` array or implement `AchievementService.getAchievementTypes()`.

### Streak Milestones
The streak system tracks daily activity. Add milestone thresholds (7, 30, 100 days) in the Dashboard component.

### XP Formula
Level calculation: `level = floor(sqrt(xp / 100))`. Change in Dashboard and Profile pages.

## Adding a New Page

1. Create `src/app/[route]/page.tsx`
2. Use the glass/card-hover utility classes for consistent styling
3. Add navigation link in `SiteHeader.tsx`
4. Add i18n key in all message files
