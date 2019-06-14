import numpy as np
import random

l = []

for i in range(100):
    lat = random.uniform(25, 49)
    lng = random.uniform(-100, -70)
    cnt = random.randint(0,8)
    d = {}
    d["lat"] = lat
    d["lng"] = lng
    d["count"] = cnt
    l.append(d)
print(l)
