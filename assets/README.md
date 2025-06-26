# Assets

This directory contains app icons for different platforms:

- `icon.ico` - Windows icon (256x256)
- `icon.icns` - macOS icon bundle
- `icon.png` - Linux icon (512x512)

## Icon Requirements

- **Windows (.ico)**: 256x256 pixels, ICO format
- **macOS (.icns)**: Multiple sizes bundled, ICNS format
- **Linux (.png)**: 512x512 pixels, PNG format

## Generating Icons

You can use online tools or ImageMagick to convert a base PNG:

```bash
# Convert PNG to ICO (Windows)
convert icon.png -resize 256x256 icon.ico

# Convert PNG to ICNS (macOS) - requires iconutil on macOS
mkdir icon.iconset
sips -z 512 512 icon.png --out icon.iconset/icon_512x512.png
iconutil -c icns icon.iconset
```

For now, placeholder icons will be used until custom icons are added.