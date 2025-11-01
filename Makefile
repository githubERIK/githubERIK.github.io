.PHONY: gen
gen:
	python3 translate_tokens.py index.template.html translations_et.json index.et.html
	python3 translate_tokens.py index.template.html translations_en.json index.en.html

file = $(input)

.PHONY: convert
video: $(file)
	@ffmpeg -i $(file) -vf "scale=360:640" -b:v 800k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart $(file)_360x640.mp4
	@ffmpeg -i $(file) -vf "scale=480:854" -b:v 1200k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart $(file)_480x854.mp4
	@ffmpeg -i $(file) -vf "scale=720:1280" -b:v 2500k -vcodec libx264 -acodec aac -strict -2 -movflags +faststart $(file)_720x1280.mp4
	@ffmpeg -i $(file) -vcodec libx264 -acodec aac -strict -2 -movflags +faststart $(file)_1080x1920.mp4

.PHONY: image
image: $(file)
	magick $(file) -resize 640x360 -quality 85 $(file)_360x640.webp
	magick $(file) -resize 854x480 -quality 85 $(file)_480x854.webp
	magick $(file) -resize 1280x720 -quality 85 $(file)_720x1280.webp
	magick $(file) -resize 1920x1080 -quality 85 $(file)_1080x1920.webp
