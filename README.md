# Site

## Generate

- `make gen`

## SEO

<https://developers.google.com/search/docs/appearance/structured-data/organization>

## Video

`brew install ffmpeg`

- `make -d video file=YOUR.mov`

# Vertical Videos
ffmpeg -i YOUR.mov -vf "scale=1080:1920" -b:v 5000k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart video_v_1080p.mp4

# Horizontal Videos
ffmpeg -i YOUR.mov -vf "scale=1920:1080" -b:v 5000k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart video_h_1080p.mp4

## Images

`brew install imagemagick`

- make -d image file=YOUR.png

## Text

`brew install fonttools`

Make a subset with only letters you need:
- `pyftsubset AlexBrush-Regular.woff2 --output-file=subsetAlexBrush.woff2 --text="C M r e a t i s m k n g" --flavor=woff2 `
