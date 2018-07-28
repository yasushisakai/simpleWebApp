from PIL import Image
import sys

try :
    image = Image.open("./static/current.png")
except IOError:
    image = Image.open("./static/original.png")


index = (int)sys.argv[1]

width, height= image.size

# make sure it's in bound
index %= (width * height)

x = index % width
y = index / width

pixel = image.getPixel((x,y))

print pixel
