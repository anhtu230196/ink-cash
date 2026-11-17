"""Thử phong cách "đồ nét": kiến trúc màu phẳng viền đen run tay + nhân vật mảng màu không viền.

Dựng sảnh biệt thự bằng phối cảnh một điểm tụ (toạ độ 3D tính bằng mét, chiếu ra màn hình),
rồi đặt một người đàn ông ngồi trên ghế đẩu ở giữa sảnh.

Chạy: python3 lab/flatpaint/hall.py  → lab/flatpaint/hall.svg
"""
import math
from pathlib import Path

W, H = 1920, 1080
VP = (960, 470)      # điểm tụ
F = 900              # tiêu cự (px)
EYE = 1.6            # chiều cao mắt (m)
ROOM_X, CEIL, Z_NEAR, Z_BACK = 5.0, 4.2, 1.2, 12.0

INK = "#141414"
WOOD = "#6b3e17"
WOOD_LIGHT = "#8a5528"
GRAY = "#b9b5b0"
GRAY_LIGHT = "#c9c6c1"
FLOOR = "#6a5650"
MAROON = "#561a22"

out = []


def P(x, y, z):
    return (VP[0] + x * F / z, VP[1] - (y - EYE) * F / z)


def poly3(pts, fill, sw=4, stroke=INK):
    s = " ".join(f"{a:.1f},{b:.1f}" for a, b in (P(*p) for p in pts))
    out.append(f'<polygon points="{s}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"/>')


def line3(a, b, sw=4, color=INK):
    (x1, y1), (x2, y2) = P(*a), P(*b)
    out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" stroke-width="{sw}" stroke-linecap="round"/>')


# ---------- vỏ phòng ----------
X, C, N, B = ROOM_X, CEIL, Z_NEAR, Z_BACK
poly3([(-X, C, N), (X, C, N), (X, C, B), (-X, C, B)], GRAY)                 # trần
poly3([(-X, 0, N), (-X, C, N), (-X, C, B), (-X, 0, B)], GRAY_LIGHT)         # tường trái
poly3([(X, 0, N), (X, C, N), (X, C, B), (X, 0, B)], GRAY_LIGHT)             # tường phải
poly3([(X, 0, N), (X, 1.3, N), (X, 1.3, B), (X, 0, B)], WOOD)               # ốp gỗ tường phải
poly3([(-X, 0, B), (X, 0, B), (X, C, B), (-X, C, B)], WOOD)                 # tường sau ốp gỗ
poly3([(-X, 0, N), (X, 0, N), (X, 0, B), (-X, 0, B)], FLOOR, sw=0)         # sàn

# cửa sổ + rèm trên tường sau
poly3([(-1.6, 0.6, B), (0.2, 0.6, B), (0.2, 3.3, B), (-1.6, 3.3, B)], "#ececea")
for x0, x1, inner in [(-1.75, -1.05, -1.05), (-0.35, 0.35, -0.35)]:
    poly3([(x0, 0.5, B), (x1, 0.5, B), (x1, 3.4, B), (x0, 3.4, B)], "#6d6866", sw=3)
    for k in range(1, 4):
        xx = x0 + (x1 - x0) * k / 4
        line3((xx, 0.55, B), (xx, 3.2, B), sw=3)
poly3([(-1.85, 3.0, B), (0.45, 3.0, B), (0.45, 3.5, B), (-1.85, 3.5, B)], "#6d6866", sw=3)
for k in range(4):
    a = -1.85 + k * 0.575
    line3((a, 3.0, B), (a + 0.29, 2.88, B), sw=3)
    line3((a + 0.29, 2.88, B), (a + 0.575, 3.0, B), sw=3)

# ---------- dầm trần ----------
T = 0.32  # bề dày dầm
for bx in (-2.2, 2.2):  # dầm dọc
    poly3([(bx - 0.18, C - T, N), (bx + 0.18, C - T, N), (bx + 0.18, C - T, B), (bx - 0.18, C - T, B)], WOOD)
    side = bx + 0.18 if bx < 0 else bx - 0.18
    poly3([(side, C - T, N), (side, C, N), (side, C, B), (side, C - T, B)], WOOD_LIGHT)
for z in (2.6, 4.6, 7.0, 9.6):  # dầm ngang
    poly3([(-X, C - T, z), (X, C - T, z), (X, C - T, z + 0.35), (-X, C - T, z + 0.35)], WOOD)
    poly3([(-X, C - T, z), (X, C - T, z), (X, C, z), (-X, C, z)], WOOD_LIGHT)
for sx in (-X, X):  # gờ gỗ chân trần
    poly3([(sx, C - 0.4, N), (sx, C, N), (sx, C, B), (sx, C - 0.4, B)], WOOD)

# ---------- cửa vòm trên tường phải ----------
def arch_pts(z0, z1, top, x, y0=0.0, steps=14):
    zc, r = (z0 + z1) / 2, (z1 - z0) / 2
    pts = [(x, y0, z0), (x, top, z0)]
    pts += [(x, top + r * math.sin(math.pi * i / steps), zc - r * math.cos(math.pi * i / steps)) for i in range(steps + 1)]
    pts += [(x, y0, z1)]
    return pts

def back_arch(x0, x1, top, steps=14):
    xc, r = (x0 + x1) / 2, (x1 - x0) / 2
    pts = [(x0, 0, B), (x0, top, B)]
    pts += [(xc - r * math.cos(math.pi * i / steps), top + r * math.sin(math.pi * i / steps), B) for i in range(steps + 1)]
    return pts + [(x1, 0, B)]

poly3(back_arch(0.9, 2.7, 2.0), WOOD_LIGHT)
poly3(back_arch(1.15, 2.45, 2.05), "#0d0d0d")

# ---------- cầu thang dọc tường phải ----------
SX, STEPS, Z0, RUN, RISE = 3.0, 12, 5.6, 0.42, 0.21
z_end = Z0 + STEPS * RUN
for i in range(STEPS - 1, -1, -1):
    z = Z0 + i * RUN
    h0, h1 = i * RISE, (i + 1) * RISE
    poly3([(SX, h1, z), (X, h1, z), (X, h1, z + RUN), (SX, h1, z + RUN)], WOOD_LIGHT, sw=3)  # mặt bậc
    poly3([(SX, h0, z), (X, h0, z), (X, h1, z), (SX, h1, z)], WOOD, sw=3)                   # cổ bậc
profile = [(SX, 0, Z0)]
for i in range(STEPS):
    z = Z0 + i * RUN
    profile += [(SX, (i + 1) * RISE, z), (SX, (i + 1) * RISE, z + RUN)]
profile += [(SX, STEPS * RISE, z_end), (SX, 0, z_end)]
poly3(profile, WOOD)  # má thang
# lan can
for i in range(STEPS):
    z = Z0 + i * RUN + RUN / 2
    line3((SX, (i + 1) * RISE, z), (SX, (i + 1) * RISE + 0.9, z), sw=5)
line3((SX, 1.05, Z0), (SX, STEPS * RISE + 0.95, z_end), sw=14)
line3((SX, 1.05, Z0), (SX, STEPS * RISE + 0.95, z_end), sw=7, color=WOOD_LIGHT)
poly3([(SX - 0.09, 0, Z0), (SX + 0.09, 0, Z0), (SX + 0.09, 1.2, Z0), (SX - 0.09, 1.2, Z0)], WOOD)  # trụ đầu thang

# ---------- lò sưởi trên tường trái ----------
FX, FZ0, FZ1 = -4.45, 5.2, 8.2
poly3([(-X, 0, FZ0), (FX, 0, FZ0), (FX, 1.45, FZ0), (-X, 1.45, FZ0)], WOOD)          # mặt trước khối lò
poly3([(FX, 0, FZ0), (FX, 0, FZ1), (FX, 1.45, FZ1), (FX, 1.45, FZ0)], WOOD)          # mặt bên (nhìn thấy)
poly3([(FX, 0, FZ0 + 0.7), (FX, 0, FZ1 - 0.7), (FX, 1.0, FZ1 - 0.7), (FX, 1.0, FZ0 + 0.7)], "#0d0d0d")  # miệng lò
poly3([(FX - 0.08, 1.45, FZ0 - 0.15), (FX - 0.08, 1.45, FZ1 + 0.15), (FX - 0.08, 1.6, FZ1 + 0.15), (FX - 0.08, 1.6, FZ0 - 0.15)], WOOD_LIGHT)  # bệ
poly3([(-X, 1.6, FZ0 + 0.1), (FX + 0.12, 1.6, FZ0 + 0.1), (FX + 0.12, C - 0.4, FZ0 + 0.1), (-X, C - 0.4, FZ0 + 0.1)], WOOD)
poly3([(FX + 0.12, 1.6, FZ0 + 0.1), (FX + 0.12, 1.6, FZ1 - 0.1), (FX + 0.12, C - 0.4, FZ1 - 0.1), (FX + 0.12, C - 0.4, FZ0 + 0.1)], WOOD)
poly3([(FX + 0.12, 1.95, FZ0 + 0.5), (FX + 0.12, 1.95, FZ1 - 0.5), (FX + 0.12, 3.4, FZ1 - 0.5), (FX + 0.12, 3.4, FZ0 + 0.5)], WOOD, sw=3)  # ô khung trang trí
poly3([(FX + 0.12, 2.1, FZ0 + 0.65), (FX + 0.12, 2.1, FZ1 - 0.65), (FX + 0.12, 3.25, FZ1 - 0.65), (FX + 0.12, 3.25, FZ0 + 0.65)], WOOD, sw=3)


# ---------- đồ đạc 2D đặt theo chiều sâu ----------
def place(x, z):
    """Trả về (gốc x, gốc y, tỉ lệ px/m) cho một vật đứng trên sàn ở (x, z)."""
    gx, gy = P(x, 0, z)
    return gx, gy, F / z


def path_local(cmds, x, z, fill, sw=4, stroke=INK, flip=False):
    """cmds: list điểm (lx, ly) theo mét, ly hướng lên. Vẽ polygon."""
    gx, gy, s = place(x, z)
    pts = " ".join(f"{gx + (-lx if flip else lx) * s:.1f},{gy - ly * s:.1f}" for lx, ly in cmds)
    out.append(f'<polygon points="{pts}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"/>')


def armchair(x, z, flip=False):
    legs = [(-0.38, 0), (-0.34, 0), (-0.32, 0.25), (-0.36, 0.25)]
    path_local(legs, x, z, WOOD, flip=flip)
    path_local([(lx * -1, ly) for lx, ly in legs], x, z, WOOD, flip=flip)
    path_local([(-0.36, 0.42), (-0.36, 1.05), (-0.28, 1.12), (0.28, 1.12), (0.36, 1.05), (0.36, 0.42)], x, z, "#4a141b", flip=flip)  # lưng
    path_local([(-0.42, 0.22), (0.42, 0.22), (0.42, 0.48), (-0.42, 0.48)], x, z, MAROON, flip=flip)  # đệm
    path_local([(-0.5, 0.22), (-0.34, 0.22), (-0.34, 0.68), (-0.42, 0.74), (-0.52, 0.68)], x, z, MAROON, flip=flip)  # tay trái
    path_local([(0.5, 0.22), (0.34, 0.22), (0.34, 0.68), (0.42, 0.74), (0.52, 0.68)], x, z, MAROON, flip=flip)  # tay phải


def floor_lamp(x, z):
    path_local([(-0.02, 0), (0.02, 0), (0.02, 1.35), (-0.02, 1.35)], x, z, "#4a3a2a", sw=3)
    path_local([(-0.16, 0), (0.16, 0), (0.12, 0.04), (-0.12, 0.04)], x, z, "#4a3a2a", sw=3)
    path_local([(-0.13, 1.3), (0.13, 1.3), (0.08, 1.58), (-0.08, 1.58)], x, z, "#c9c19c", sw=3)


def round_table(x, z):
    gx, gy, s = place(x, z)
    for lx in (-0.4, 0.0, 0.4):
        out.append(f'<line x1="{gx + lx*s:.1f}" y1="{gy - 0.5*s:.1f}" x2="{gx + lx*1.1*s:.1f}" y2="{gy:.1f}" stroke="{INK}" stroke-width="{0.09*s + 6:.1f}" stroke-linecap="round"/>')
        out.append(f'<line x1="{gx + lx*s:.1f}" y1="{gy - 0.5*s:.1f}" x2="{gx + lx*1.1*s:.1f}" y2="{gy:.1f}" stroke="#5c3a24" stroke-width="{0.09*s:.1f}" stroke-linecap="round"/>')
    out.append(f'<ellipse cx="{gx:.1f}" cy="{gy - 0.58*s:.1f}" rx="{0.62*s:.1f}" ry="{0.17*s:.1f}" fill="#4f301c" stroke="{INK}" stroke-width="4"/>')
    out.append(f'<ellipse cx="{gx:.1f}" cy="{gy - 0.62*s:.1f}" rx="{0.62*s:.1f}" ry="{0.17*s:.1f}" fill="#6b4329" stroke="{INK}" stroke-width="4"/>')


armchair(-1.9, 8.6)
floor_lamp(-3.0, 10.6)
armchair(-3.5, 4.6, flip=True)
round_table(2.2, 4.3)

ARCH = "\n".join(out)
out.clear()

# ---------- nhân vật: mảng màu, không viền (kiểu đồ từ ảnh) ----------
MX, MZ = -0.3, 3.4
gx, gy, s = place(MX, MZ)


def L(pts, fill):
    p = " ".join(f"{gx + a * s:.1f},{gy - b * s:.1f}" for a, b in pts)
    out.append(f'<polygon points="{p}" fill="{fill}"/>')


def LS(a, b, w, color):
    out.append(f'<line x1="{gx + a[0]*s:.1f}" y1="{gy - a[1]*s:.1f}" x2="{gx + b[0]*s:.1f}" y2="{gy - b[1]*s:.1f}" stroke="{color}" stroke-width="{w*s:.1f}" stroke-linecap="round"/>')


SKIN, SHIRT, PANTS, HAIR = "#e2a983", "#e7e6e3", "#0f0f0f", "#2a2522"
# ghế đẩu
for a, b in [((-0.14, 0.58), (-0.24, 0.0)), ((0.14, 0.58), (0.24, 0.0)), ((0.0, 0.58), (0.0, 0.02))]:
    out.append(f'<line x1="{gx + a[0]*s:.1f}" y1="{gy - a[1]*s:.1f}" x2="{gx + b[0]*s:.1f}" y2="{gy - b[1]*s:.1f}" stroke="{INK}" stroke-width="{0.05*s + 6:.1f}" stroke-linecap="round"/>')
    LS(a, b, 0.05, "#5c3a24")
LS((-0.22, 0.25), (0.22, 0.25), 0.03, "#5c3a24")
# giày
for sx in (-1, 1):
    out.append(f'<ellipse cx="{gx + sx*0.33*s:.1f}" cy="{gy - 0.035*s:.1f}" rx="{0.13*s:.1f}" ry="{0.05*s:.1f}" fill="{PANTS}"/>')
# cẳng chân + đùi (nhìn chính diện, đùi bị rút ngắn)
L([(-0.44, 0.06), (-0.22, 0.06), (-0.2, 0.56), (-0.46, 0.56)], PANTS)
L([(0.22, 0.06), (0.44, 0.06), (0.46, 0.56), (0.2, 0.56)], PANTS)
L([(-0.48, 0.5), (0.48, 0.5), (0.4, 0.74), (0.22, 0.7), (-0.22, 0.7), (-0.4, 0.74)], PANTS)
# thân áo sơ mi
L([(-0.25, 0.68), (0.25, 0.68), (0.27, 1.16), (0.2, 1.24), (0.06, 1.27), (-0.06, 1.27), (-0.2, 1.24), (-0.27, 1.16)], SHIRT)
L([(-0.06, 1.27), (0.0, 1.18), (0.06, 1.27)], SKIN)
# tay: bắp tay áo trắng, cẳng tay xắn để da, bàn tay đặt lên gối
for sx in (-1, 1):
    LS((sx * 0.23, 1.17), (sx * 0.37, 0.88), 0.13, SHIRT)
    LS((sx * 0.37, 0.88), (sx * 0.36, 0.7), 0.085, SKIN)
    out.append(f'<ellipse cx="{gx + sx*0.36*s:.1f}" cy="{gy - 0.66*s:.1f}" rx="{0.06*s:.1f}" ry="{0.05*s:.1f}" fill="{SKIN}"/>')
# cổ + đầu (không vẽ mặt, chỉ có kính)
L([(-0.05, 1.24), (0.05, 1.24), (0.05, 1.33), (-0.05, 1.33)], SKIN)
out.append(f'<ellipse cx="{gx:.1f}" cy="{gy - 1.43*s:.1f}" rx="{0.105*s:.1f}" ry="{0.135*s:.1f}" fill="{SKIN}"/>')
L([(-0.11, 1.44), (-0.115, 1.52), (-0.07, 1.58), (0.03, 1.59), (0.1, 1.55), (0.115, 1.45), (0.09, 1.5), (0.0, 1.52), (-0.08, 1.5)], HAIR)
for sx in (-1, 1):
    out.append(f'<circle cx="{gx + sx*0.045*s:.1f}" cy="{gy - 1.45*s:.1f}" r="{0.032*s:.1f}" fill="none" stroke="{INK}" stroke-width="2.5"/>')
out.append(f'<line x1="{gx - 0.013*s:.1f}" y1="{gy - 1.45*s:.1f}" x2="{gx + 0.013*s:.1f}" y2="{gy - 1.45*s:.1f}" stroke="{INK}" stroke-width="2.5"/>')

FIGURE = "\n".join(out)

svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<defs>
  <filter id="wobble" x="-2%" y="-2%" width="104%" height="104%">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="5" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="edge" x="-2%" y="-2%" width="104%" height="104%">
    <feTurbulence type="fractalNoise" baseFrequency="0.18" numOctaves="1" seed="2" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <clipPath id="frame"><rect width="{W}" height="{H}"/></clipPath>
</defs>
<rect width="{W}" height="{H}" fill="{FLOOR}"/>
<g clip-path="url(#frame)"><g filter="url(#wobble)">
{ARCH}
</g></g>
<g filter="url(#edge)">
{FIGURE}
</g>
</svg>"""

Path(__file__).with_suffix(".svg").write_text(svg, encoding="utf-8")
print(Path(__file__).with_suffix(".svg"))
