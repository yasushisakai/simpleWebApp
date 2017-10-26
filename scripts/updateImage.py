from PIL import Image, ImageFilter
import time

try:
    image = Image.open("./static/current.png")
except IOError:
    image = Image.open("./static/original.png")
now = int(round(time.time()))

# change the pixels
image.putpixel((0,0), 0)

#
# save the image
#

# save tentative
image.save('./static/current_{}.png'.format(now))
# save current
image.save('./static/current.png')
