.PHONY: gen
gen:
	python3 translate_tokens.py index.template.html translations_et.json index.et.html
	python3 translate_tokens.py index.template.html translations_en.json index.en.html

file = $(input)

.PHONY: convert
video: $(file)
	@ffmpeg -i $(file) -vf "scale=360:640" -b:v 800k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart $(file)_360p.mp4
	@ffmpeg -i $(file) -vf "scale=480:854" -b:v 1200k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart $(file)_480p.mp4
	@ffmpeg -i $(file) -vf "scale=720:1280" -b:v 2500k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart $(file)_720p.mp4
	@ffmpeg -i $(file) -vcodec libx264 -acodec aac -strict -2 -movflags +faststart $(file)_1080p.mp4

.PHONY: image
image: $(file)
	magick $(file) -resize 640x360 -quality 85 $(file)_360.webp
	magick $(file) -resize 854x480 -quality 85 $(file)_480.webp
	magick $(file) -resize 1280x720 -quality 85 $(file)_720.webp
	magick $(file) -resize 1920x1080 -quality 85 $(file)_1080.webp
