# Site

## Generate

- `python3 translate_tokens.py index.template.html translations_et.json index.et.html`
- `python3 translate_tokens.py index.template.html translations_en.json index.en.html`

## SEO

<https://developers.google.com/search/docs/appearance/structured-data/organization>

## Video

`ffmpeg -i YOUR.mov -vcodec libx264 -acodec aac -strict -2 -movflags +faststart YOUR.mp4`

`-movflags +faststart`: Optimizes the MP4 file for web usage, allowing it to start playing before the entire file is downloaded.


# Vertical Videos
ffmpeg -i YOUR.mov -vf "scale=360:640" -b:v 800k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart video_v_360p.mp4
ffmpeg -i YOUR.mov -vf "scale=480:854" -b:v 1200k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart video_v_480p.mp4
ffmpeg -i YOUR.mov -vf "scale=720:1280" -b:v 2500k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart video_v_720p.mp4
ffmpeg -i YOUR.mov -vf "scale=1080:1920" -b:v 5000k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart video_v_1080p.mp4

# Horizontal Videos
ffmpeg -i YOUR.mov -vf "scale=854:480" -b:v 1200k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart video_h_480p.mp4
ffmpeg -i YOUR.mov -vf "scale=1280:720" -b:v 2500k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart video_h_720p.mp4
ffmpeg -i YOUR.mov -vf "scale=1920:1080" -b:v 5000k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart video_h_1080p.mp4

## Images

# Resize and convert to WebP
magick input.png -resize 640x360 -quality 85 output_360.webp
magick input.png -resize 854x480 -quality 85 output_480.webp
magick input.png -resize 1280x720 -quality 85 output_720.webp
magick input.png -resize 1920x1080 -quality 85 output_1080.webp
