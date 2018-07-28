#!/usr/bin/env python
from PIL import Image
import sys

try :
    image = Image.open("./static/current.gif")
except IOError:
    image = Image.open("./static/original.gif")

image = image.convert('RGB')

index = int(sys.argv[1])

width, height = image.size

# make sure it's in bound
index %= (width * height)

x = index % width
y = index / width

pixel = image.getpixel((x,y))

print(pixel[0])
