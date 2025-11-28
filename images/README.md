# Images Folder

This folder contains images for your book store.

## Folder Structure

```
images/
├── book-covers/    # Book cover images (300x400px recommended)
├── icons/          # Site icons and logos
└── README.md       # This file
```

## Book Cover Images

### Current Setup
The project currently uses Unsplash images as placeholders. These are free, high-quality images that work great for development and testing.

### Using Your Own Images

To replace with your own book covers:

1. **Download or create** your book cover images
2. **Optimize** them for web:
   - Recommended size: 300x400px (3:4 aspect ratio)
   - Format: JPG or WebP (for better compression)
   - Quality: 80-90% (balance between quality and file size)
3. **Save** them in the `book-covers/` folder
4. **Update** the paths in `js/books.js`:

   ```javascript
   coverImage: "images/book-covers/psychology-of-money.jpg"
   ```

### Naming Convention

Use descriptive, lowercase names with hyphens:
- ✅ `psychology-of-money.jpg`
- ✅ `atomic-habits.jpg`
- ✅ `the-midnight-library.jpg`
- ❌ `Book1.jpg`
- ❌ `IMG_2345.jpg`

### Image Optimization Tools

Free tools to optimize your images:

- **TinyPNG**: https://tinypng.com
- **Squoosh**: https://squoosh.app
- **ImageOptim** (Mac): https://imageoptim.com

### Free Book Cover Resources

If you need placeholder images:

- **Unsplash**: https://unsplash.com (currently used)
- **Pexels**: https://pexels.com
- **Pixabay**: https://pixabay.com

## Icons

Add your site icons here:
- `favicon.ico` (16x16, 32x32)
- `logo.svg` or `logo.png` (site logo)
- `og-image.jpg` (1200x630px for social media sharing)

## Notes

- Keep file sizes small (< 200KB per image) for fast loading
- Use lazy loading (already implemented in the code)
- Consider using WebP format for modern browsers
- Always have fallback JPG images for older browsers
