# Icon Navigation Bar with Tooltips

A modern, responsive icon navigation bar component with theme toggle functionality.

## Features

- **Modern Design**: Rounded corners, glass effect, and smooth animations
- **Responsive**: Adapts to mobile and desktop screens
- **Active Section Tracking**: Highlights the current section based on scroll position
- **Theme Toggle**: Switch between light, dark, and system themes
- **Smooth Tooltips**: Hover tooltips with detailed descriptions
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## Implementation

### 1. Theme Provider Setup
The component uses `next-themes` for theme management. The `ThemeProvider` is configured in `App.tsx`:

```tsx
import { ThemeProvider } from "next-themes";

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    {/* Your app content */}
  </ThemeProvider>
);
```

### 2. CSS Variables
Light and dark mode CSS variables are defined in `index.css`:

```css
:root {
  /* Light mode variables */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  /* ... other variables */
}

.dark {
  /* Dark mode variables */
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... other variables */
}
```

### 3. Component Usage
Add the `IconNavigation` component to your pages:

```tsx
import IconNavigation from '../components/IconNavigation';

const MyPage = () => (
  <div>
    {/* Your page content */}
    <IconNavigation />
  </div>
);
```

## Navigation Items

The navigation includes these sections:
- **Home** (🏠): Navigates to hero section
- **About** (👤): Navigates to about section  
- **Projects** (📁): Navigates to projects section
- **Blog** (📖): Navigates to blog section
- **Experience** (💼): Navigates to experience section
- **Education** (🎓): Navigates to education section
- **Contact** (✉️): Navigates to contact section

## Theme Toggle

The theme toggle cycles through three states:
1. **Light Mode** (☀️): Light theme
2. **Dark Mode** (🌙): Dark theme  
3. **System Mode** (🖥️): Follows system preference

## Active Section Detection

The component automatically detects the active section based on scroll position and highlights the corresponding navigation item with:
- Primary color background
- Scale animation
- Animated indicator dot

## Responsive Design

- **Desktop**: Full-size icons (48x48px) with generous spacing
- **Mobile**: Compact icons (40x40px) with reduced spacing
- **Tooltips**: Disabled on touch devices to prevent interference

## Styling Features

- **Glass Effect**: Semi-transparent background with backdrop blur
- **Hover Animations**: Scale and shadow effects on hover
- **Smooth Transitions**: 300ms duration for all state changes
- **Border Radius**: 16px rounded corners for modern appearance
- **Shadow**: Elevated appearance with subtle shadows

## Accessibility

- Proper ARIA labels for screen readers
- Keyboard navigation support
- High contrast in both light and dark modes
- Descriptive tooltips
- Focus indicators

## Dependencies

- `next-themes`: Theme management
- `lucide-react`: Icon library
- `@radix-ui/react-tooltip`: Tooltip component
- Tailwind CSS: Styling framework

## Browser Support

- Modern browsers supporting CSS backdrop-filter
- Progressive enhancement for older browsers
- Responsive design for all screen sizes

The component provides a modern, accessible navigation solution that enhances the user experience while maintaining visual consistency across different themes and screen sizes.
