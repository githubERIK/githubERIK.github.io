# Site

## Generate

- `make gen`

## SEO

<https://developers.google.com/search/docs/appearance/structured-data/organization>


<https://www.bing.com/indexnow/getstarted>

```
curl -X POST https://api.indexnow.org/IndexNow \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
           "host": "www.example.org",
           "key": "0d7a41af88924b28a038305e39314042",
           "keyLocation": "https://www.example.org/0d7a41af88924b28a038305e39314042.txt",
           "urlList": [
               "https://www.example.org/url1",
               "https://www.example.org/folder/url2",
               "https://www.example.org/url3"
           ]
         }'

```

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
