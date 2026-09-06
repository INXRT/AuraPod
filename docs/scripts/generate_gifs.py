import math
import os
from PIL import Image, ImageDraw, ImageFont

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, '..', 'assets'))

os.makedirs(ASSETS_DIR, exist_ok=True)

# Helper to load basic font or default
try:
    font_large = ImageFont.truetype("arial.ttf", 16)
    font_mid = ImageFont.truetype("arial.ttf", 13)
    font_small = ImageFont.truetype("arial.ttf", 11)
    font_mono = ImageFont.truetype("consola.ttf", 11)
    font_mono_bold = ImageFont.truetype("consolab.ttf", 12)
    font_title = ImageFont.truetype("arialbd.ttf", 18)
except Exception:
    font_large = ImageFont.load_default()
    font_mid = ImageFont.load_default()
    font_small = ImageFont.load_default()
    font_mono = ImageFont.load_default()
    font_mono_bold = ImageFont.load_default()
    font_title = ImageFont.load_default()

# -------------------------------------------------------------
# GIF 1: RF Wavefront Focusing Simulation (assets/rf-wavefront-focus.gif)
# -------------------------------------------------------------
def generate_rf_wave_gif():
    w, h = 680, 320
    num_frames = 24
    frames = []

    for f in range(num_frames):
        img = Image.new('RGB', (w, h), color=(7, 9, 14)) # #07090E
        draw = ImageDraw.Draw(img)

        # Background grid
        for x in range(0, w, 40):
            draw.line([(x, 0), (x, h)], fill=(18, 24, 38), width=1)
        for y in range(0, h, 40):
            draw.line([(0, y), (w, y)], fill=(18, 24, 38), width=1)

        # Header Bar
        draw.rectangle([(10, 10), (w - 10, 42)], fill=(12, 15, 23), outline=(35, 45, 66), width=1)
        draw.text((22, 18), "AURAPOD RF FOCUS SIMULATOR // 250mm REBAR WALL vs PARABOLIC GAIN", fill=(56, 189, 248), font=font_mono_bold)
        draw.text((w - 180, 18), "[LIVE LINK BUDGET]", fill=(34, 197, 94), font=font_mono_bold)

        # Exterior Zone (Left)
        draw.rectangle([(20, 55), (160, 265)], fill=(10, 14, 23), outline=(30, 41, 59), width=1)
        draw.text((30, 65), "EXTERIOR BASE TOWER", fill=(148, 163, 184), font=font_mono)
        draw.text((30, 80), "+24 dBm TX (3.5 GHz)", fill=(100, 116, 139), font=font_mono)

        # Tower Icon
        tx, ty = 90, 170
        draw.line([(tx, ty - 60), (tx, ty + 60)], fill=(56, 189, 248), width=2)
        draw.line([(tx - 25, ty + 60), (tx + 25, ty + 60)], fill=(56, 189, 248), width=2)
        draw.line([(tx - 18, ty + 20), (tx + 18, ty + 20)], fill=(56, 189, 248), width=2)
        draw.line([(tx - 10, ty - 20), (tx + 10, ty - 20)], fill=(56, 189, 248), width=2)
        draw.ellipse([(tx - 5, ty - 65), (tx + 5, ty - 55)], fill=(56, 189, 248))

        # Animated Expanding Wavefronts from Tower
        for r_offset in [0, 40, 80, 120, 160]:
            cur_r = (r_offset + f * 7) % 200 + 10
            color = (56, 189, 248) if cur_r < 140 else (56, 140, 200)
            bbox = [(tx - cur_r, ty - cur_r - 20), (tx + cur_r, ty + cur_r - 20)]
            draw.arc(bbox, start=320, end=40, fill=color, width=2)

        # 250mm Reinforced Concrete Wall (Center Barrier)
        wx1, wx2 = 200, 280
        draw.rectangle([(wx1, 55), (wx2, 265)], fill=(30, 41, 59), outline=(71, 85, 105), width=2)
        # Rebar grid lines inside wall
        for ry in range(70, 260, 22):
            draw.line([(wx1, ry), (wx2, ry)], fill=(100, 116, 139), width=1)
        draw.line([(225, 55), (225, 265)], fill=(100, 116, 139), width=1)
        draw.line([(255, 55), (255, 265)], fill=(100, 116, 139), width=1)

        # Reflected energy bouncing off concrete
        refl_offset = (f * 5) % 35
        draw.line([(wx1, 140), (wx1 - 50 - refl_offset, 100 - refl_offset)], fill=(239, 68, 68), width=2)
        draw.line([(wx1, 180), (wx1 - 50 - refl_offset, 220 + refl_offset)], fill=(239, 68, 68), width=2)
        draw.text((wx1 - 95, 200), "84% REFLECTION\n(-32 dB LOSS)", fill=(239, 68, 68), font=font_mono)

        # Window Aperture Slot (Top portion of wall)
        draw.rectangle([(wx1, 55), (wx2, 105)], fill=(14, 165, 233, 40), outline=(56, 189, 248), width=2)
        draw.text((wx1 + 8, 75), "WINDOW APERTURE", fill=(56, 189, 248), font=font_mono)

        # Incident waves passing through window slot into Room
        draw.line([(wx2, 80), (380, 80)], fill=(56, 189, 248), width=2)

        # Interior Dorm Zone (Right)
        draw.rectangle([(320, 55), (w - 20, 265)], fill=(10, 14, 23), outline=(30, 41, 59), width=1)
        draw.text((330, 65), "STUDENT DORMITORY ROOM", fill=(148, 163, 184), font=font_mono)

        # AuraPod Parabolic Concentrator & Desk
        desk_y = 200
        draw.rectangle([(360, desk_y), (600, desk_y + 8)], fill=(51, 65, 85))
        
        # Parabolic Dish Curve
        dish_center_x, dish_center_y = 430, 160
        dish_points = []
        for dy in range(-35, 36, 4):
            dx = -(dy * dy) / 45
            dish_points.append((dish_center_x + dx, dish_center_y + dy))
        draw.line(dish_points, fill=(56, 189, 248), width=3)
        
        # Focal feed horn at optical focus
        horn_x, horn_y = dish_center_x + 18, dish_center_y
        draw.line([(dish_center_x, dish_center_y), (horn_x, horn_y)], fill=(148, 163, 184), width=2)
        draw.ellipse([(horn_x - 5, horn_y - 5), (horn_x + 5, horn_y + 5)], fill=(34, 197, 94))

        # Incident rays bending from dish into focal horn
        draw.line([(380, 80), (dish_center_x - 20, dish_center_y - 25)], fill=(56, 189, 248), width=2)
        draw.line([(dish_center_x - 20, dish_center_y - 25), (horn_x, horn_y)], fill=(34, 197, 94), width=2)
        
        draw.line([(380, 80), (dish_center_x - 20, dish_center_y + 25)], fill=(56, 189, 248), width=2)
        draw.line([(dish_center_x - 20, dish_center_y + 25), (horn_x, horn_y)], fill=(34, 197, 94), width=2)

        # Concentrated signal beam to Student Laptop
        laptop_x, laptop_y = 520, desk_y - 25
        draw.rectangle([(laptop_x, laptop_y), (laptop_x + 45, desk_y)], fill=(15, 23, 42), outline=(100, 116, 139), width=2)
        draw.rectangle([(laptop_x - 5, desk_y - 2), (laptop_x + 50, desk_y + 2)], fill=(100, 116, 139))
        
        # Beam from horn to laptop
        draw.line([(horn_x, horn_y), (laptop_x + 20, laptop_y + 10)], fill=(34, 197, 94), width=2)
        
        # Signal gain readout on laptop screen
        pulse = (f % 6 < 3)
        bars_color = (34, 197, 94) if pulse else (22, 163, 74)
        draw.text((laptop_x - 15, laptop_y - 28), "● -78 dBm (4 BARS)", fill=bars_color, font=font_mono_bold)
        draw.text((laptop_x - 15, laptop_y - 14), "+11.8 dBi FOCUS", fill=(56, 189, 248), font=font_mono)

        # Footer Telemetry Ticker
        draw.rectangle([(10, 275), (w - 10, 310)], fill=(12, 15, 23), outline=(35, 45, 66), width=1)
        telemetry_text = f"LINK TELEMETRY: CARRIER=3.5GHz n78 | RSRP=-78dBm | SINR=+18.2dB | RETRANSMIT=0.0% | BUFFER=OPTIMAL"
        draw.text((22, 286), telemetry_text, fill=(148, 163, 184), font=font_mono)

        frames.append(img)

    frames[0].save(os.path.join(ASSETS_DIR, 'rf-wavefront-focus.gif'), save_all=True, append_images=frames[1:], duration=75, loop=0)
    print("Saved rf-wavefront-focus.gif to docs/assets")

# -------------------------------------------------------------
# GIF 2: 11:59 PM Deadline Simulator (assets/deadline-simulator.gif)
# -------------------------------------------------------------
def generate_deadline_gif():
    w, h = 680, 320
    num_frames = 28
    frames = []

    for f in range(num_frames):
        img = Image.new('RGB', (w, h), color=(7, 9, 14))
        draw = ImageDraw.Draw(img)

        # Grid
        for x in range(0, w, 40):
            draw.line([(x, 0), (x, h)], fill=(18, 24, 38), width=1)
        for y in range(0, h, 40):
            draw.line([(0, y), (w, y)], fill=(18, 24, 38), width=1)

        # LMS Window Header
        draw.rectangle([(15, 12), (w - 15, 46)], fill=(15, 23, 42), outline=(35, 45, 66), width=1)
        draw.ellipse([(26, 26), (34, 34)], fill=(239, 68, 68))
        draw.ellipse([(40, 26), (48, 34)], fill=(245, 158, 11))
        draw.ellipse([(54, 26), (62, 34)], fill=(34, 197, 94))
        draw.text((75, 22), "portal.university.edu/lms/cs402-capstone-final", fill=(148, 163, 184), font=font_mono)

        # Retro Midnight Clock
        seconds_left = max(1, 38 - f)
        draw.rectangle([(w - 190, 18), (w - 25, 40)], fill=(0, 0, 0), outline=(239, 68, 68), width=1)
        draw.text((w - 180, 22), f"DEADLINE: 11:59:{seconds_left:02d} PM", fill=(248, 113, 113), font=font_mono_bold)

        # Assignment Card
        draw.rectangle([(20, 56), (w - 20, 120)], fill=(12, 15, 23), outline=(30, 41, 59), width=1)
        draw.text((35, 66), "CS402: DISTRIBUTED SYSTEMS CAPSTONE ARCHIVE (40% FINAL GRADE)", fill=(255, 255, 255), font=font_mono_bold)
        draw.text((35, 84), "File: Distributed_Systems_Final_v3.tar.gz (34.8 MB)  •  Strictly Zero Late Submissions Accepted", fill=(148, 163, 184), font=font_mono)
        draw.text((35, 100), "STATUS: DISPATCHING VIA RESILIENT SOCKET PIPELINE", fill=(56, 189, 248), font=font_mono)

        # Dual Column Comparison in Mid Section: Dead Zone vs AuraQueue
        col_w = (w - 55) // 2
        
        # Left: Standard Browser Upload (Fails)
        cx1, cy1 = 20, 130
        draw.rectangle([(cx1, cy1), (cx1 + col_w, cy1 + 135)], fill=(15, 18, 28), outline=(239, 68, 68, 120), width=1)
        draw.text((cx1 + 12, cy1 + 10), "WITHOUT AURAPOD (1-BAR DEAD ZONE)", fill=(248, 113, 113), font=font_mono_bold)
        draw.text((cx1 + 12, cy1 + 28), "Signal: -119 dBm • Wall Loss: -32 dB", fill=(148, 163, 184), font=font_mono)

        # Progress bar left
        fail_pct = min(18, f * 3)
        draw.rectangle([(cx1 + 12, cy1 + 48), (cx1 + col_w - 12, cy1 + 60)], fill=(20, 24, 38), outline=(50, 60, 80))
        draw.rectangle([(cx1 + 12, cy1 + 48), (cx1 + 12 + int((col_w - 24) * (fail_pct / 100)), cy1 + 60)], fill=(239, 68, 68))
        draw.text((cx1 + 12, cy1 + 68), f"Progress: {fail_pct}% (Socket Retransmitting...)", fill=(239, 68, 68), font=font_mono)

        if f >= 6:
            draw.rectangle([(cx1 + 12, cy1 + 88), (cx1 + col_w - 12, cy1 + 125)], fill=(35, 15, 20), outline=(239, 68, 68))
            draw.text((cx1 + 18, cy1 + 94), "❌ 12:00:01 AM: DEADLINE BREACH", fill=(239, 68, 68), font=font_mono_bold)
            draw.text((cx1 + 18, cy1 + 108), "TCP RST: ERR_CONNECTION_RESET (0/100)", fill=(248, 113, 113), font=font_mono)

        # Right: AuraQueue Engine (Succeeds)
        cx2, cy2 = 25 + col_w, 130
        draw.rectangle([(cx2, cy2), (cx2 + col_w, cy2 + 135)], fill=(15, 18, 28), outline=(34, 197, 94, 120), width=1)
        draw.text((cx2 + 12, cy2 + 10), "WITH AURAPOD + AURAQUEUE DAEMON", fill=(34, 197, 94), font=font_mono_bold)
        draw.text((cx2 + 12, cy2 + 28), "Signal: -78 dBm (4 Bars) • Tus Protocol", fill=(148, 163, 184), font=font_mono)

        # Progress bar right
        succ_pct = min(100, f * 9)
        draw.rectangle([(cx2 + 12, cy2 + 48), (cx2 + col_w - 12, cy2 + 60)], fill=(20, 24, 38), outline=(50, 60, 80))
        draw.rectangle([(cx2 + 12, cy2 + 48), (cx2 + 12 + int((col_w - 24) * (succ_pct / 100)), cy2 + 60)], fill=(34, 197, 94))
        draw.text((cx2 + 12, cy2 + 68), f"Progress: {succ_pct}% (Chunked Stream 34.8 Mbps)", fill=(56, 189, 248), font=font_mono)

        if succ_pct >= 100:
            draw.rectangle([(cx2 + 12, cy2 + 88), (cx2 + col_w - 12, cy2 + 125)], fill=(15, 35, 25), outline=(34, 197, 94))
            draw.text((cx2 + 18, cy2 + 94), "✔ 11:58:26 PM: ON-TIME VERIFIED", fill=(34, 197, 94), font=font_mono_bold)
            draw.text((cx2 + 18, cy2 + 108), "SHA-256 [7f83b1...069] Proof Stored", fill=(187, 247, 208), font=font_mono)

        # Footer Terminal Log Snippet
        draw.rectangle([(15, 275), (w - 15, 310)], fill=(12, 15, 23), outline=(35, 45, 66), width=1)
        chunk_idx = min(4, max(1, f // 4))
        terminal_msg = f"[AuraQueue-Daemon] Chunk {chunk_idx}/4 Offset {chunk_idx*8.7:.1f}MB: SHA-256 Verified (HTTP 204) -> Latency: 24ms RTT"
        draw.text((25, 286), terminal_msg, fill=(56, 189, 248), font=font_mono)

        frames.append(img)

    frames[0].save(os.path.join(ASSETS_DIR, 'deadline-simulator.gif'), save_all=True, append_images=frames[1:], duration=90, loop=0)
    print("Saved deadline-simulator.gif to docs/assets")

# -------------------------------------------------------------
# GIF 3: Dual Edition Architecture & Radar (assets/edition-anatomy-radar.gif)
# -------------------------------------------------------------
def generate_edition_anatomy_gif():
    w, h = 680, 320
    num_frames = 24
    frames = []

    for f in range(num_frames):
        img = Image.new('RGB', (w, h), color=(7, 9, 14))
        draw = ImageDraw.Draw(img)

        # Grid
        for x in range(0, w, 40):
            draw.line([(x, 0), (x, h)], fill=(18, 24, 38), width=1)
        for y in range(0, h, 40):
            draw.line([(0, y), (w, y)], fill=(18, 24, 38), width=1)

        # Top Banner
        draw.rectangle([(15, 12), (w - 15, 46)], fill=(12, 15, 23), outline=(35, 45, 66), width=1)
        draw.text((25, 20), "AURAPOD DUAL-EDITION HARDWARE ARCHITECTURE // EDC BLOCK vs DORM HUB", fill=(255, 255, 255), font=font_mono_bold)
        
        # Left Panel: Pocket Edition
        px1, py1 = 20, 58
        pw = 310
        draw.rectangle([(px1, py1), (px1 + pw, py1 + 215)], fill=(12, 15, 23), outline=(56, 189, 248, 140), width=1)
        draw.rectangle([(px1 + 10, py1 + 10), (px1 + 150, py1 + 30)], fill=(56, 189, 248, 30), outline=(56, 189, 248))
        draw.text((px1 + 18, py1 + 14), "POCKET EDITION ($29)", fill=(56, 189, 248), font=font_mono_bold)

        # Pocket Model Graphic (Stepped Telescoping Masts)
        cx, cy = px1 + pw // 2, py1 + 115
        # Pocket block body
        draw.rectangle([(cx - 45, cy + 10), (cx + 45, cy + 60)], fill=(24, 31, 48), outline=(100, 116, 139), width=2)
        draw.text((cx - 38, cy + 30), "TITANIUM EDC", fill=(148, 163, 184), font=font_mono)

        # Telescoping Antennas Articulating
        mast_ext = min(55, 30 + f * 2)
        angle_spread = 22 + math.sin(f * 0.25) * 4
        rad_left = math.radians(90 + angle_spread)
        rad_right = math.radians(90 - angle_spread)

        # Left Mast
        lx2 = cx - 20 - int(mast_ext * math.cos(rad_left))
        ly2 = cy + 10 - int(mast_ext * math.sin(rad_left))
        draw.line([(cx - 20, cy + 10), (lx2, ly2)], fill=(241, 245, 249), width=3)
        draw.ellipse([(lx2 - 3, ly2 - 3), (lx2 + 3, ly2 + 3)], fill=(56, 189, 248))

        # Right Mast
        rx2 = cx + 20 + int(mast_ext * math.cos(rad_right))
        ry2 = cy + 10 - int(mast_ext * math.sin(rad_right))
        draw.line([(cx + 20, cy + 10), (rx2, ry2)], fill=(241, 245, 249), width=3)
        draw.ellipse([(rx2 - 3, ry2 - 3), (rx2 + 3, ry2 + 3)], fill=(56, 189, 248))

        draw.text((px1 + 15, py1 + 180), "• Dual 3-Stage Stepped Masts\n• <180g Pocket Block • +12 dBi Gain\n• Active Shielded LNA (<1.2 dB NF)", fill=(148, 163, 184), font=font_mono)

        # Right Panel: Room Edition
        rx1 = px1 + pw + 20
        draw.rectangle([(rx1, py1), (rx1 + pw, py1 + 215)], fill=(12, 15, 23), outline=(34, 197, 94, 140), width=1)
        draw.rectangle([(rx1 + 10, py1 + 10), (rx1 + 150, py1 + 30)], fill=(34, 197, 94, 30), outline=(34, 197, 94))
        draw.text((rx1 + 18, py1 + 14), "ROOM EDITION ($49)", fill=(34, 197, 94), font=font_mono_bold)

        # Room Model Graphic (Parabolic Dish on Desk Base)
        rcx, rcy = rx1 + pw // 2, py1 + 115
        # Base pod
        draw.rectangle([(rcx - 30, rcy + 40), (rcx + 30, rcy + 60)], fill=(24, 31, 48), outline=(100, 116, 139), width=2)
        draw.line([(rcx - 30, rcy + 42), (rcx + 30, rcy + 42)], fill=(56, 189, 248), width=2) # Halo ring

        # Parabolic Dish wireframe
        dish_pts = []
        for step in range(-35, 36, 6):
            dx = -(step * step) / 50
            dish_pts.append((rcx + dx - 10, rcy + step))
        draw.line(dish_pts, fill=(34, 197, 94), width=3)

        # Focal arm and horn
        draw.line([(rcx - 10, rcy), (rcx + 25, rcy)], fill=(148, 163, 184), width=2)
        draw.ellipse([(rcx + 20, rcy - 5), (rcx + 30, rcy + 5)], fill=(34, 197, 94))

        draw.text((rx1 + 15, py1 + 180), "• 18-Stage Parabolic Dish\n• f=0.65 Focal Horn • +11.8 dBi Gain\n• 120° Multi-Bed Room Coverage", fill=(148, 163, 184), font=font_mono)

        # Footer Specification Comparison
        draw.rectangle([(15, 280), (w - 15, 312)], fill=(12, 15, 23), outline=(35, 45, 66), width=1)
        draw.text((25, 290), "BOM COGS: Pocket = $9.50 (67.2% Margin) | Room = $14.20 (71.0% Margin) | Compliance: 100% FCC Part 15 Unlicensed", fill=(148, 163, 184), font=font_mono)

        frames.append(img)

    frames[0].save(os.path.join(ASSETS_DIR, 'edition-anatomy-radar.gif'), save_all=True, append_images=frames[1:], duration=90, loop=0)
    print("Saved edition-anatomy-radar.gif to docs/assets")

if __name__ == '__main__':
    generate_rf_wave_gif()
    generate_deadline_gif()
    generate_edition_anatomy_gif()
