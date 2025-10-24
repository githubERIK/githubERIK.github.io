# Site

## Generate

- `make gen`

## SEO

<https://developers.google.com/search/docs/appearance/structured-data/organization>

## Video

- `make -d video file=YOUR.mov`

# Vertical Videos
ffmpeg -i YOUR.mov -vf "scale=1080:1920" -b:v 5000k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart video_v_1080p.mp4

# Horizontal Videos
ffmpeg -i YOUR.mov -vf "scale=1920:1080" -b:v 5000k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart video_h_1080p.mp4

## Images

- make -d image file=YOUR.png

