from PIL import Image, ImageFilter
import time

try:
    image = Image.open("./static/current.png")
except IOError:
    image = Image.open("./static/original.png")

now = int(round(time.time()))
width, height = image.size
interval = 60 * 60 # 1h

#
# change the pixels
#

with open('pixels.csv') as f:
    for line in f.readlines():
        data = [ int(v) for v in line.split(',') ]
        # timestamp, index, value
        if (now - data[0]) < interval :
            index = data[1] % (width * height) # just to make sure it's in the realm
            x = index % width
            y = int(index / width)
            prevValue = image.getpixel((x, y))
            if(data[2] != 255):
                newValue = int((prevValue + data[2]) * 0.5)
                image.putpixel((x, y), newValue)
            else:
                image.putpixel((x, y), min(prevValue+5, 255))

#
# save the image
#

# save tentative
image.save('./static/current_{}.png'.format(now))
# save current
image.save('./static/current.png')
