"""Thử phong cách người que: nhân viên phục vụ ở quầy bar.

Chạy: python3 lab/stickman/bartender.py  → lab/stickman/bartender.svg
"""
import random
from pathlib import Path

W, H = 1920, 1080
INK = "#111"
SW = 7  # độ dày nét chính

random.seed(7)
BOTTLE_COLORS = ["#2e7d4f", "#a0522d", "#d9a441", "#cfe3e6", "#7a2e3a", "#3b6ea5"]


def bottle(x, base_y):
    """Một chai đứng trên kệ, đáy tại base_y, tâm tại x."""
    kind = random.choice(["wine", "whiskey", "round"])
    c = random.choice(BOTTLE_COLORS)
    if kind == "wine":
        w, h, nw, nh = 36, 105, 13, 38
    elif kind == "whiskey":
        w, h, nw, nh = 52, 80, 17, 24
    else:
        w, h, nw, nh = 46, 70, 14, 30
    top = base_y - h
    r = 14 if kind != "whiskey" else 6
    parts = [
        f'<rect x="{x - nw/2}" y="{top - nh}" width="{nw}" height="{nh + r}" rx="3" fill="{c}" stroke="{INK}" stroke-width="5"/>',
        f'<rect x="{x - w/2}" y="{top}" width="{w}" height="{h}" rx="{r}" fill="{c}" stroke="{INK}" stroke-width="5"/>',
        f'<rect x="{x - w/2 + 7}" y="{top + h*0.4}" width="{w - 14}" height="{h*0.3}" fill="#f3ead8" stroke="{INK}" stroke-width="3"/>',
        f'<line x1="{x - w/2 + 8}" y1="{top + 10}" x2="{x - w/2 + 8}" y2="{top + h*0.3}" stroke="#fff" stroke-opacity=".45" stroke-width="5" stroke-linecap="round"/>',
    ]
    return "\n".join(parts)


def shelf(y, x1, x2, gap):
    out = [f'<rect x="{x1}" y="{y}" width="{x2 - x1}" height="20" fill="#5a4535" stroke="{INK}" stroke-width="6"/>']
    x = x1 + 50
    while x < x2 - 40:
        if not (gap[0] < x < gap[1]):
            out.insert(0, bottle(x, y))
        x += random.randint(62, 82)
    return "\n".join(out)


def lamp(x):
    return f"""
<polygon points="{x-55},178 {x+55},178 {x+300},640 {x-300},640" fill="#fff4cf" opacity=".13"/>
<line x1="{x}" y1="0" x2="{x}" y2="120" stroke="{INK}" stroke-width="6"/>
<path d="M{x-25},120 L{x+25},120 L{x+65},178 L{x-65},178 Z" fill="#2f5d50" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>
<ellipse cx="{x}" cy="182" rx="30" ry="9" fill="#fff6d8" stroke="{INK}" stroke-width="4"/>"""


def bartender():
    cx, cy, r = 960, 330, 85
    return f"""
<!-- thân -->
<line x1="{cx}" y1="{cy + r}" x2="{cx}" y2="660" stroke="{INK}" stroke-width="{SW}" stroke-linecap="round"/>
<!-- áo gile + cổ áo trắng + nơ -->
<path d="M928,440 L992,440 L1012,660 L908,660 Z" fill="#262626" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>
<path d="M945,440 L960,505 L975,440 Z" fill="#fff" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>
<path d="M960,448 L936,434 L936,462 Z M960,448 L984,434 L984,462 Z" fill="#c0392b" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>
<circle cx="960" cy="448" r="6" fill="#c0392b" stroke="{INK}" stroke-width="4"/>
<!-- cốc đang lau -->
<path d="M893,505 L967,505 L959,582 L901,582 Z" fill="#d9eef3" fill-opacity=".85" stroke="{INK}" stroke-width="5" stroke-linejoin="round"/>
<line x1="905" y1="518" x2="910" y2="566" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
<!-- tay trái đỡ đáy cốc -->
<polyline points="932,452 880,522 912,578" fill="none" stroke="{INK}" stroke-width="{SW}" stroke-linecap="round" stroke-linejoin="round"/>
<!-- tay phải cầm khăn -->
<polyline points="988,452 1042,512 975,506" fill="none" stroke="{INK}" stroke-width="{SW}" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M940,492 Q962,478 992,490 L998,520 Q975,532 952,526 Z" fill="#f7f7f2" stroke="{INK}" stroke-width="5" stroke-linejoin="round"/>
<path d="M958,494 L962,522 M978,492 L981,523" stroke="#bbb" stroke-width="3" stroke-linecap="round"/>
<!-- đầu -->
<circle cx="{cx}" cy="{cy}" r="{r}" fill="#e9c49f" stroke="{INK}" stroke-width="{SW}"/>
<path d="M877,318 Q872,240 960,242 Q1048,240 1044,312 Q1030,282 992,280 Q975,262 950,282 Q905,280 877,318 Z" fill="#2a2a2a" stroke="{INK}" stroke-width="5" stroke-linejoin="round"/>
<circle cx="932" cy="328" r="9" fill="{INK}"/>
<circle cx="990" cy="328" r="9" fill="{INK}"/>
<path d="M940,368 Q962,386 986,368" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>"""


def counter():
    panels = "\n".join(
        f'<line x1="{x}" y1="690" x2="{x}" y2="960" stroke="#3a281d" stroke-width="6"/>'
        for x in range(460, 1710, 250)
    )
    return f"""
<rect x="210" y="680" width="1500" height="280" fill="#4e3628" stroke="{INK}" stroke-width="6"/>
{panels}
<line x1="230" y1="905" x2="1690" y2="905" stroke="#c9a24a" stroke-width="10" stroke-linecap="round"/>
<line x1="230" y1="905" x2="1690" y2="905" stroke="{INK}" stroke-width="2" stroke-opacity=".5"/>
<rect x="180" y="640" width="1560" height="42" rx="4" fill="#6b4a35" stroke="{INK}" stroke-width="6"/>
<line x1="200" y1="652" x2="1720" y2="652" stroke="#fff" stroke-opacity=".12" stroke-width="5"/>"""


def bar_props():
    taps = "\n".join(
        f'<rect x="{x-11}" y="545" width="22" height="62" rx="8" fill="{c}" stroke="{INK}" stroke-width="5"/>'
        f'<line x1="{x}" y1="607" x2="{x}" y2="622" stroke="{INK}" stroke-width="6"/>'
        for x, c in [(445, "#c0392b"), (500, "#d9a441"), (555, "#2e7d4f")]
    )
    return f"""
<!-- vòi bia -->
<rect x="410" y="618" width="180" height="24" rx="4" fill="#b8b8b8" stroke="{INK}" stroke-width="5"/>
{taps}
<!-- ly martini -->
<path d="M1245,555 L1355,555 L1300,612 Z" fill="#e8b4c2" stroke="{INK}" stroke-width="5" stroke-linejoin="round"/>
<line x1="1300" y1="612" x2="1300" y2="636" stroke="{INK}" stroke-width="5"/>
<line x1="1275" y1="638" x2="1325" y2="638" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>
<line x1="1318" y1="540" x2="1292" y2="575" stroke="{INK}" stroke-width="4"/>
<circle cx="1290" cy="578" r="9" fill="#7aa43a" stroke="{INK}" stroke-width="4"/>
<!-- cốc whisky -->
<path d="M1450,575 L1510,575 L1505,638 L1455,638 Z" fill="#d9eef3" fill-opacity=".85" stroke="{INK}" stroke-width="5" stroke-linejoin="round"/>
<path d="M1453,602 L1507,602 L1505,636 L1455,636 Z" fill="#c98a2e"/>
<rect x="1466" y="590" width="20" height="18" rx="3" fill="#fff" fill-opacity=".8" stroke="{INK}" stroke-width="3"/>"""


def bubble(text, x, y, tail):
    return f"""
<path d="M{tail[0]},{tail[1]} L{x-150},{y+50} L{x-70},{y+72} Z" fill="#fff" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>
<ellipse cx="{x}" cy="{y}" rx="265" ry="88" fill="#fff" stroke="{INK}" stroke-width="6"/>
<path d="M{x-148},{y+52} L{x-72},{y+70}" stroke="#fff" stroke-width="10"/>
<text x="{x}" y="{y + 16}" text-anchor="middle" font-family="Arial Rounded MT Bold, Arial, sans-serif" font-weight="bold" font-size="40" fill="{INK}">{text}</text>"""


svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<rect width="{W}" height="{H}" fill="#85725f"/>
<rect y="0" width="{W}" height="560" fill="#8e7a66"/>
{shelf(330, 120, 1800, (820, 1100))}
{shelf(530, 120, 1800, (820, 1100))}
{lamp(520)}
{lamp(1660)}
<rect y="960" width="{W}" height="{H-960}" fill="#4f4540"/>
<line x1="0" y1="960" x2="{W}" y2="960" stroke="{INK}" stroke-width="6"/>
{bartender()}
{counter()}
{bar_props()}
{bubble("Quý khách dùng gì ạ?", 1330, 190, (1050, 300))}
</svg>"""

out = Path(__file__).with_suffix(".svg")
out.write_text(svg, encoding="utf-8")
print(out)
