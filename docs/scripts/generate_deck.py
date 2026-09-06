import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    # 16:9 Widescreen
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Color Palette
    BG_DARK = RGBColor(10, 13, 20)          # #0A0D14
    CARD_BG = RGBColor(19, 25, 38)          # #131926
    CARD_BORDER = RGBColor(38, 48, 70)      # #263046
    CYAN_ACCENT = RGBColor(0, 242, 254)     # #00F2FE Electric Cyan
    GREEN_ACCENT = RGBColor(16, 185, 129)   # #10B981 Emerald
    RED_ACCENT = RGBColor(239, 68, 68)      # #EF4444 Crimson
    AMBER_ACCENT = RGBColor(245, 158, 11)   # #F59E0B Amber
    TEXT_WHITE = RGBColor(255, 255, 255)    # #FFFFFF
    TEXT_MUTED = RGBColor(148, 163, 184)    # #94A3B8 Slate-400
    TEXT_SUBTLE = RGBColor(100, 116, 139)   # #64748B

    blank_layout = prs.slide_layouts[6] # Blank slide layout

    def add_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.fill.background() # No border
        return bg

    def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(1.5)
        else:
            card.line.fill.background()
        return card

    def add_badge(slide, left, top, text, text_color=CYAN_ACCENT, bg_color=RGBColor(16, 35, 55)):
        badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(2.2), Inches(0.42))
        badge.fill.solid()
        badge.fill.fore_color.rgb = bg_color
        badge.line.color.rgb = text_color
        badge.line.width = Pt(1)
        tf = badge.text_frame
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        run = p.add_run()
        run.text = text.upper()
        run.font.name = "Arial"
        run.font.size = Pt(10)
        run.font.bold = True
        run.font.color.rgb = text_color
        return badge

    def add_header(slide, tag, title, subtitle=None):
        add_badge(slide, Inches(0.8), Inches(0.55), tag)
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(1.05), Inches(11.7), Inches(1.1))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(28)
        p.font.bold = True
        p.font.color.rgb = TEXT_WHITE
        
        if subtitle:
            p2 = tf.add_paragraph()
            p2.text = subtitle
            p2.font.name = "Arial"
            p2.font.size = Pt(13)
            p2.font.color.rgb = TEXT_MUTED
            p2.space_before = Pt(4)

    # -------------------------------------------------------------
    # SLIDE 1: COVER SLIDE
    # -------------------------------------------------------------
    s1 = prs.slides.add_slide(blank_layout)
    add_slide_background(s1)

    # Hero card center
    add_card(s1, Inches(1.2), Inches(1.0), Inches(10.9), Inches(5.5), bg_color=CARD_BG, border_color=CYAN_ACCENT)
    
    # Title Tag
    add_badge(s1, Inches(5.5), Inches(1.5), "HARDWARE + SOFTWARE EDTECH", CYAN_ACCENT)

    tb = s1.shapes.add_textbox(Inches(1.8), Inches(2.1), Inches(9.7), Inches(3.8))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "AuraPod"
    p.font.name = "Arial"
    p.font.size = Pt(64)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE

    p2 = tf.add_paragraph()
    p2.alignment = PP_ALIGN.CENTER
    p2.text = "Personal Portable Signal Reflector & Resilient Campus Caching Hub"
    p2.font.name = "Arial"
    p2.font.size = Pt(22)
    p2.font.bold = True
    p2.font.color.rgb = CYAN_ACCENT
    p2.space_before = Pt(8)

    p3 = tf.add_paragraph()
    p3.alignment = PP_ALIGN.CENTER
    p3.text = "\"Turn 1-Bar Frustration into Academic Flow.\""
    p3.font.name = "Georgia"
    p3.font.italic = True
    p3.font.size = Pt(16)
    p3.font.color.rgb = TEXT_MUTED
    p3.space_before = Pt(12)

    p4 = tf.add_paragraph()
    p4.alignment = PP_ALIGN.CENTER
    p4.text = "A pocket-sized passive RF concentrator + intelligent local queueing engine that rescues students from campus dead zones."
    p4.font.name = "Arial"
    p4.font.size = Pt(13)
    p4.font.color.rgb = TEXT_SUBTLE
    p4.space_before = Pt(16)

    # Speaker Notes
    notes = s1.notes_slide.notes_text_frame
    notes.text = (
        "SPEECH HOOK (0:00-0:30):\n"
        "Judges, imagine this: It is 11:58 PM on a Sunday night. You've worked all weekend on your final project. "
        "You sit at your desk, click 'Submit Assignment'... and your phone flickers with 1 bar of dead signal. "
        "At midnight, the portal locks out. Grade: Zero. Today we present AuraPod, the personal tool that ends this nightmare."
    )

    # -------------------------------------------------------------
    # SLIDE 2: THE PROBLEM (THE MIDNIGHT CRISIS)
    # -------------------------------------------------------------
    s2 = prs.slides.add_slide(blank_layout)
    add_slide_background(s2)
    add_header(s2, "THE PROBLEM", "The Campus Dead Zone Dilemma", "Millions of students in concrete hostels and basement libraries face academic failure due to 1-bar connectivity.")

    # 3 Problem Cards
    col_w = Inches(3.7)
    gap = Inches(0.3)
    start_x = Inches(0.8)
    top_y = Inches(2.2)
    h = Inches(4.5)

    # Card 1
    c1 = add_card(s2, start_x, top_y, col_w, h, border_color=RED_ACCENT)
    tb = s2.shapes.add_textbox(start_x + Inches(0.25), top_y + Inches(0.25), col_w - Inches(0.5), h - Inches(0.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "01. FARADAY CAGE DORMS"
    p.font.name = "Arial"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = RED_ACCENT
    p_desc = tf.add_paragraph()
    p_desc.text = "\n• Reinforced concrete, brick walls, and steel rebar cause severe building attenuation (-20 dB to -35 dB signal loss).\n\n• High-frequency 4G & 5G bands (especially 3.5 GHz n78) fail to penetrate deep indoor corner rooms.\n\n• Hallway Wi-Fi routers cannot overcome heavy fire doors."
    p_desc.font.size = Pt(13)
    p_desc.font.color.rgb = TEXT_MUTED

    # Card 2
    c2 = add_card(s2, start_x + col_w + gap, top_y, col_w, h, border_color=AMBER_ACCENT)
    tb = s2.shapes.add_textbox(start_x + col_w + gap + Inches(0.25), top_y + Inches(0.25), col_w - Inches(0.5), h - Inches(0.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "02. THE 11:59 PM HORROR"
    p.font.name = "Arial"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = AMBER_ACCENT
    p_desc = tf.add_paragraph()
    p_desc.text = "\n• Standard browsers offer zero offline resilience during network flickers.\n\n• When network drops for even 2 seconds, LMS portals (Canvas, Moodle, Blackboard) crash with ERR_CONNECTION_RESET.\n\n• Form data resets, quiz answers are wiped, and late penalties destroy GPA."
    p_desc.font.size = Pt(13)
    p_desc.font.color.rgb = TEXT_MUTED

    # Card 3
    c3 = add_card(s2, start_x + (col_w + gap)*2, top_y, col_w, h, border_color=CARD_BORDER)
    tb = s2.shapes.add_textbox(start_x + (col_w + gap)*2 + Inches(0.25), top_y + Inches(0.25), col_w - Inches(0.5), h - Inches(0.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "03. UNAFFORDABLE FIXES"
    p.font.name = "Arial"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE
    p_desc = tf.add_paragraph()
    p_desc.text = "\n• Industrial cell boosters cost $300-$800+, requiring rooftop drilling and strict carrier licensing.\n\n• Mobile hotspots fail: if your phone has 1 bar, hotspotting gives 0 usable throughput.\n\n• DIY tin foil hacks are fragile, non-calibrated, and embarrassing."
    p_desc.font.size = Pt(13)
    p_desc.font.color.rgb = TEXT_MUTED

    notes = s2.notes_slide.notes_text_frame
    notes.text = (
        "TALKING POINTS (0:30-1:00):\n"
        "Reinforced concrete dorms act like RF bunkers. 4G/5G loses 30 dB. "
        "Students are forced to sit on cold balconies at 2 AM or face failed quiz submissions. "
        "Industrial boosters cost $500 and are illegal without carrier licenses. Students need a personal tool."
    )

    # -------------------------------------------------------------
    # SLIDE 3: WHY CURRENT FIXES FAIL (COMPARISON MATRIX)
    # -------------------------------------------------------------
    s3 = prs.slides.add_slide(blank_layout)
    add_slide_background(s3)
    add_header(s3, "MARKET ANALYSIS", "Why Existing Solutions Fail Students", "A direct breakdown of current market alternatives versus the student reality.")

    # Table card
    add_card(s3, Inches(0.8), Inches(2.2), Inches(11.73), Inches(4.6))
    
    # We will build 4 columns of cards inside
    headers = ["Features", "Industrial Boosters", "Portable MiFi Dongles", "AuraPod System"]
    sub_col = Inches(2.7)
    left_margin = Inches(1.1)

    table_y = Inches(2.5)
    row_h = Inches(0.65)

    matrix_data = [
        ("Retail Price", "$400 - $800+", "$50 - $120", "$29 (₹1,999)"),
        ("Installation", "Rooftop drill & cabling", "Plug and pray", "Instant desktop foldout"),
        ("Legal / Regulatory", "Carrier license required", "Carrier locked SIM", "100% Unlicensed & Safe"),
        ("Weak Signal Gain", "Active high-power", "Omni-directional (0 dBi)", "+10 dBi Parabolic Focus"),
        ("Offline Resilience", "None (Network-only)", "None (Network-only)", "AuraQueue + Campus Vault"),
        ("Portability", "Permanent fixed install", "Pocket dongle", "180g Origami Fold-Flat")
    ]

    tb = s3.shapes.add_textbox(Inches(1.0), Inches(2.4), Inches(11.3), Inches(4.2))
    tf = tb.text_frame
    tf.word_wrap = True

    # Title row
    p = tf.paragraphs[0]
    p.text = f"{'METRIC':<24} {'INDUSTRIAL BOOSTERS':<28} {'PORTABLE MIFI':<26} {'AURAPOD (OUR SOLUTION)':<28}"
    p.font.name = "Courier New"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT

    for row in matrix_data:
        p_row = tf.add_paragraph()
        p_row.text = f"{row[0]:<24} {row[1]:<28} {row[2]:<26} {row[3]:<28}"
        p_row.font.name = "Courier New"
        p_row.font.size = Pt(12)
        p_row.font.color.rgb = TEXT_WHITE if "AuraPod" in row[3] else TEXT_MUTED
        p_row.space_before = Pt(8)

    notes = s3.notes_slide.notes_text_frame
    notes.text = (
        "KEY TAKEAWAY (1:00-1:15):\n"
        "Look at this matrix. Dongles have omnidirectional antennas—if your phone gets 1 bar, a dongle gets 1 bar! "
        "AuraPod is the ONLY solution under $30 that combines directional parabolic gain with offline-first software resilience."
    )

    # -------------------------------------------------------------
    # SLIDE 4: INTRODUCING AURAPOD (THE DUAL STACK)
    # -------------------------------------------------------------
    s4 = prs.slides.add_slide(blank_layout)
    add_slide_background(s4)
    add_header(s4, "THE SOLUTION", "Introducing AuraPod: The Dual-Innovation Stack", "Conquering campus dead zones with physical radio wave physics and intelligent client software.")

    # Two big cards: Left = Hardware, Right = Software
    half_w = Inches(5.7)
    h_y = Inches(2.2)
    h_h = Inches(4.5)

    # Left Card: Hardware
    add_card(s4, Inches(0.8), h_y, half_w, h_h, border_color=CYAN_ACCENT)
    tb_hw = s4.shapes.add_textbox(Inches(1.1), h_y + Inches(0.3), half_w - Inches(0.6), h_h - Inches(0.6))
    tf_hw = tb_hw.text_frame
    tf_hw.word_wrap = True
    p = tf_hw.paragraphs[0]
    p.text = "LAYER 1: HARDWARE SIGNAL LENS"
    p.font.name = "Arial"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT

    p_body = tf_hw.add_paragraph()
    p_body.text = (
        "\n• Parabolic Foldable Micro-Grid:\n"
        "  Directional metallic mesh captures scattered 4G/5G/Wi-Fi waves across 120° and focuses them (+10 dBi gain).\n\n"
        "• Active Ultra-Low-Noise Amplifier (LNA):\n"
        "  Suppresses background noise with SAW bandpass filters to stabilize faint micro-volt signals.\n\n"
        "• 5V USB-C Powered:\n"
        "  Runs on <2.5W from laptop or power bank. Zero wall outlet required.\n\n"
        "• Origami Fold-Flat Chassis:\n"
        "  180 grams. Slips into any laptop sleeve or backpack pocket."
    )
    p_body.font.size = Pt(13)
    p_body.font.color.rgb = TEXT_WHITE

    # Right Card: Software
    add_card(s4, Inches(6.8), h_y, half_w, h_h, border_color=GREEN_ACCENT)
    tb_sw = s4.shapes.add_textbox(Inches(7.1), h_y + Inches(0.3), half_w - Inches(0.6), h_h - Inches(0.6))
    tf_sw = tb_sw.text_frame
    tf_sw.word_wrap = True
    p = tf_sw.paragraphs[0]
    p.text = "LAYER 2: AURAOS SOFTWARE ENGINE"
    p.font.name = "Arial"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = GREEN_ACCENT

    p_body = tf_sw.add_paragraph()
    p_body.text = (
        "\n• AuraScope AR Signal Alignment:\n"
        "  Smartphone gyroscope & cellular telemetry (RSRP/SINR) visually guide dish pointing to nearest cell tower.\n\n"
        "• AuraQueue Resilient Submission Engine:\n"
        "  Background daemon intercepts LMS uploads; holds data locally on disconnect, auto-flushes on reconnect.\n\n"
        "• Offline Campus Vault:\n"
        "  Nocturnal 3 AM automated pre-caching of course syllabi, slides, and H.265 compressed video lectures.\n\n"
        "• Campus DormMesh:\n"
        "  Local P2P Wi-Fi Direct sharing between AuraPods at 50 Mbps with 0 cellular data."
    )
    p_body.font.size = Pt(13)
    p_body.font.color.rgb = TEXT_WHITE

    notes = s4.notes_slide.notes_text_frame
    notes.text = (
        "CORE PITCH (1:15-1:45):\n"
        "AuraPod attacks the problem from both ends. "
        "Hardware gets the signal from 1 bar to 3-4 bars using passive parabolic focus and active LNA amplification. "
        "Software guarantees that even if the signal flickers, not a single byte of homework or online exam data is ever lost."
    )

    # -------------------------------------------------------------
    # SLIDE 5: HARDWARE INNOVATION (THE SIGNAL LENS)
    # -------------------------------------------------------------
    s5 = prs.slides.add_slide(blank_layout)
    add_slide_background(s5)
    add_header(s5, "HARDWARE DEEP DIVE", "The Physical Architecture: Signal Lens", "Precision RF mechanical engineering tailored for student portability and zero regulatory friction.")

    col3_w = Inches(3.7)
    
    # 3 hardware cards
    h_cards = [
        ("01. PARABOLIC METALLIC GRID", CYAN_ACCENT, 
         "• Micro-stamped metallic grid reflector\n• Tuned for 700 MHz - 5.8 GHz (4G, 5G Sub-6, Wi-Fi 2.4/5G)\n• Delivers +8 dBi to +12 dBi directional concentration\n• Acts like an optical lens for invisible radio waves"),
        ("02. ACTIVE ULTRA-LNA MODULE", GREEN_ACCENT, 
         "• Sub-1.2 dB Noise Figure (NF)\n• Dual SAW (Surface Acoustic Wave) bandpass filters eliminate interference\n• Local cradle coupling avoids high-power re-radiation (100% legal & compliant)\n• Stabilizes packet jitter"),
        ("03. ORIGAMI TRAVEL CHASSIS", AMBER_ACCENT, 
         "• Foldable dual-hinge mechanical stand\n• Folds completely flat (<12mm thickness)\n• Weighs only 180 grams\n• Standard 5V USB-C bus (<500mA consumption)\n• Integrated silicone desktop grip")
    ]

    for idx, (title, color, desc) in enumerate(h_cards):
        x = Inches(0.8) + idx * (col3_w + gap)
        add_card(s5, x, Inches(2.2), col3_w, Inches(4.5), border_color=color)
        tb = s5.shapes.add_textbox(x + Inches(0.2), Inches(2.4), col3_w - Inches(0.4), Inches(4.0))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = color
        p2 = tf.add_paragraph()
        p2.text = "\n" + desc
        p2.font.size = Pt(13)
        p2.font.color.rgb = TEXT_WHITE

    notes = s5.notes_slide.notes_text_frame
    notes.text = (
        "HARDWARE DEFENSE:\n"
        "Point out the origami form factor: students don't want bulky hardware. "
        "AuraPod folds flat into their backpack. And the passive reflector means ZERO regulatory hurdles—it's not jamming towers."
    )

    # -------------------------------------------------------------
    # SLIDE 6: SOFTWARE ECOSYSTEM (AURAOS)
    # -------------------------------------------------------------
    s6 = prs.slides.add_slide(blank_layout)
    add_slide_background(s6)
    add_header(s6, "SOFTWARE ECOSYSTEM", "AuraOS: Intelligence Where Hardware Stops", "Client-side software that turns intermittent, flickering connections into seamless submissions.")

    # 2 Feature cards with step-by-step
    add_card(s6, Inches(0.8), Inches(2.2), half_w, Inches(4.5), border_color=CYAN_ACCENT)
    tb = s6.shapes.add_textbox(Inches(1.1), Inches(2.4), half_w - Inches(0.6), Inches(4.0))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "AURASCOPE: AR RADAR COMPASS"
    p.font.name = "Arial"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT

    p2 = tf.add_paragraph()
    p2.text = (
        "\n1. Cell Tower Telemetry:\n"
        "   Queries local base station CID/LAC + device RSRP/SINR signal strength.\n\n"
        "2. AR Camera Overlay:\n"
        "   Student points camera around room; an AR crosshair marks the exact angle of the nearest cell tower or campus AP.\n\n"
        "3. Audio Sonar Ping:\n"
        "   Chirps with rising frequency as dish achieves optimal alignment. Dish locked in <10 seconds."
    )
    p2.font.size = Pt(13)
    p2.font.color.rgb = TEXT_WHITE

    add_card(s6, Inches(6.8), Inches(2.2), half_w, Inches(4.5), border_color=GREEN_ACCENT)
    tb = s6.shapes.add_textbox(Inches(7.1), Inches(2.4), half_w - Inches(0.6), Inches(4.0))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "AURAQUEUE: RESILIENT DATA ENGINE"
    p.font.name = "Arial"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = GREEN_ACCENT

    p2 = tf.add_paragraph()
    p2.text = (
        "\n1. Zero-Crash Interception:\n"
        "   Browser extension hooks into fetch/XHR uploads for Canvas, Moodle, and Blackboard.\n\n"
        "2. Resumable Chunking (Tus Protocol):\n"
        "   If connection drops, request freezes in local IndexedDB without timing out.\n\n"
        "3. Cryptographic Timestamp Proof:\n"
        "   Generates an SHA-256 client proof receipt verifying student submitted at 11:58 PM even if network syncs at 12:02 AM."
    )
    p2.font.size = Pt(13)
    p2.font.color.rgb = TEXT_WHITE

    notes = s6.notes_slide.notes_text_frame
    notes.text = (
        "SOFTWARE HIGHLIGHT:\n"
        "Emphasize the cryptographic timestamp proof! "
        "Even if the network takes 5 minutes to flicker back, the student has verifiable cryptographic proof for their professor that they hit submit before midnight."
    )

    # -------------------------------------------------------------
    # SLIDE 7: CAMPUS VAULT & DORMMESH
    # -------------------------------------------------------------
    s7 = prs.slides.add_slide(blank_layout)
    add_slide_background(s7)
    add_header(s7, "BANDWIDTH RESILIENCE", "Offline Campus Vault & DormMesh P2P", "Eliminating reliance on real-time internet through predictive nocturnal pre-caching and local dorm sharing.")

    add_card(s7, Inches(0.8), Inches(2.2), half_w, Inches(4.5), border_color=AMBER_ACCENT)
    tb = s7.shapes.add_textbox(Inches(1.1), Inches(2.4), half_w - Inches(0.6), Inches(4.0))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "OFFLINE CAMPUS VAULT"
    p.font.name = "Arial"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = AMBER_ACCENT

    p2 = tf.add_paragraph()
    p2.text = (
        "\n• Opportunistic Nightly Sync (3 AM):\n"
        "  Takes advantage of uncongested network hours while the student sleeps.\n\n"
        "• Intelligent Course Pre-Caching:\n"
        "  Syncs lecture slides, syllabus PDFs, problem sets, and discussion boards.\n\n"
        "• AI Video Transcoding:\n"
        "  Compresses 1080p lecture videos into lightweight H.265/AV1 streams, saving 75% storage while retaining slide readability.\n\n"
        "• Instant Offline Study:\n"
        "  Zero loading spinners during exam prep."
    )
    p2.font.size = Pt(13)
    p2.font.color.rgb = TEXT_WHITE

    add_card(s7, Inches(6.8), Inches(2.2), half_w, Inches(4.5), border_color=CYAN_ACCENT)
    tb = s7.shapes.add_textbox(Inches(7.1), Inches(2.4), half_w - Inches(0.6), Inches(4.0))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "DORMMESH P2P NETWORK"
    p.font.name = "Arial"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT

    p2 = tf.add_paragraph()
    p2.text = (
        "\n• Hyper-Local Wi-Fi Direct Swarm:\n"
        "  AuraPod units on the same floor establish an encrypted local mesh network.\n\n"
        "• Zero Cellular Data Consumption:\n"
        "  If Student A downloads a 2 GB lecture video, Student B and C stream it directly over local Wi-Fi at 50 Mbps.\n\n"
        "• Crowd-Sourced Campus Bandwidth:\n"
        "  Transforms isolated corner rooms into an interconnected collaborative study hub."
    )
    p2.font.size = Pt(13)
    p2.font.color.rgb = TEXT_WHITE

    notes = s7.notes_slide.notes_text_frame
    notes.text = (
        "INNOVATION MOAT:\n"
        "Judges love network effects. DormMesh creates a local P2P swarm. "
        "The more students in a hostel that own an AuraPod, the faster their local study network becomes!"
    )

    # -------------------------------------------------------------
    # SLIDE 8: TARGET MARKET & USER PERSONAS
    # -------------------------------------------------------------
    s8 = prs.slides.add_slide(blank_layout)
    add_slide_background(s8)
    add_header(s8, "MARKET OPPORTUNITY", "Target Personas & Market Scale", "Serving 250M+ college students globally struggling with campus infrastructure dead zones.")

    # Top metrics bar
    add_card(s8, Inches(0.8), Inches(2.1), Inches(11.73), Inches(1.1), bg_color=CARD_BG, border_color=CYAN_ACCENT)
    tb_m = s8.shapes.add_textbox(Inches(1.0), Inches(2.2), Inches(11.3), Inches(0.9))
    tf_m = tb_m.text_frame
    p = tf_m.paragraphs[0]
    p.text = "TAM: $4.2B Global Campus Hardware  |  SAM: $850M Higher Ed Tech  |  SOM: $42M Student Hostel Launch"
    p.font.name = "Arial"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT

    # 3 Personas
    personas = [
        ("THE HOSTEL RESIDENT", "Aryan, 2nd Year B.Tech", "• Isolated corner room in old campus hostel.\n• Constant 1-bar signal.\n• Misses midnight project deadlines.\n• Needs cheap, desk-friendly booster."),
        ("THE BASEMENT RESEARCHER", "Elena, Master's Candidate", "• Spends 8 hours/day in library basement cubicles.\n• Wi-Fi blocked by steel firewalls.\n• Needs zero-installation laptop tether.\n• Uses offline vault for papers."),
        ("THE RURAL REMOTE LEARNER", "Dev, Competitive Exam Prep", "• Studies from semi-rural hometown with patchy cell towers.\n• Mobile data drops mid-lecture.\n• Relies on AuraScope AR to lock distant tower.")
    ]

    for idx, (title, subtitle, bullets) in enumerate(personas):
        x = Inches(0.8) + idx * (col3_w + gap)
        add_card(s8, x, Inches(3.4), col3_w, Inches(3.4), border_color=CARD_BORDER)
        tb = s8.shapes.add_textbox(x + Inches(0.2), Inches(3.5), col3_w - Inches(0.4), Inches(3.1))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = GREEN_ACCENT
        p_sub = tf.add_paragraph()
        p_sub.text = subtitle
        p_sub.font.size = Pt(11)
        p_sub.font.italic = True
        p_sub.font.color.rgb = TEXT_MUTED
        p_desc = tf.add_paragraph()
        p_desc.text = "\n" + bullets
        p_desc.font.size = Pt(12)
        p_desc.font.color.rgb = TEXT_WHITE

    notes = s8.notes_slide.notes_text_frame
    notes.text = (
        "MARKET CONTEXT:\n"
        "In India alone, there are 38 million college students; over 12 million live in hostels. "
        "Every single one of them has faced a failed submission or dead zone."
    )

    # -------------------------------------------------------------
    # SLIDE 9: BUSINESS MODEL & BILL OF MATERIALS (BOM)
    # -------------------------------------------------------------
    s9 = prs.slides.add_slide(blank_layout)
    add_slide_background(s9)
    add_header(s9, "BUSINESS MODEL", "Unit Economics & Commercial Viability", "Engineered for high gross margins ($9.50 BOM) at an impulsive student price point ($29).")

    # Left: BOM Breakdown
    add_card(s9, Inches(0.8), Inches(2.2), half_w, Inches(4.5), border_color=GREEN_ACCENT)
    tb_bom = s9.shapes.add_textbox(Inches(1.1), Inches(2.4), half_w - Inches(0.6), Inches(4.0))
    tf_bom = tb_bom.text_frame
    tf_bom.word_wrap = True
    p = tf_bom.paragraphs[0]
    p.text = "BILL OF MATERIALS (5,000 UNIT SCALE)"
    p.font.name = "Arial"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = GREEN_ACCENT

    bom_text = (
        "\n• Foldable Metallic Micro-Mesh:        $2.80\n"
        "• Sub-6GHz Wideband Patch Antenna:     $1.50\n"
        "• Low-Noise Amplifier + SAW Filter:    $2.20\n"
        "• USB-C Power Bus & Micro-PCB:         $1.20\n"
        "• Origami ABS Chassis & Hinges:        $0.80\n"
        "• Packaging, Cable & Travel Sleeve:    $1.00\n"
        "--------------------------------------------\n"
        "TOTAL ESTIMATED BOM:                   $9.50 (~₹780)"
    )
    p2 = tf_bom.add_paragraph()
    p2.text = bom_text
    p2.font.name = "Courier New"
    p2.font.size = Pt(12)
    p2.font.color.rgb = TEXT_WHITE

    # Right: Revenue Model
    add_card(s9, Inches(6.8), Inches(2.2), half_w, Inches(4.5), border_color=CYAN_ACCENT)
    tb_rev = s9.shapes.add_textbox(Inches(7.1), Inches(2.4), half_w - Inches(0.6), Inches(4.0))
    tf_rev = tb_rev.text_frame
    tf_rev.word_wrap = True
    p = tf_rev.paragraphs[0]
    p.text = "REVENUE STREAMS & MARGINS"
    p.font.name = "Arial"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT

    rev_text = (
        "\n1. Direct-to-Student Hardware:\n"
        "   Retail Price: $29 (₹1,999)\n"
        "   Gross Margin: ~67% ($19.50 per unit)\n\n"
        "2. AuraPod Pro Cloud Subscription (Optional):\n"
        "   $1.99/mo (₹99/mo) for unlimited automated course pre-caching, cloud vault, and priority LMS queueing.\n\n"
        "3. B2B University Campus Contracts:\n"
        "   Universities provision AuraPods to dorm residents at 1/10th the cost of ripping open concrete walls for rewiring."
    )
    p2 = tf_rev.add_paragraph()
    p2.text = rev_text
    p2.font.size = Pt(13)
    p2.font.color.rgb = TEXT_WHITE

    notes = s9.notes_slide.notes_text_frame
    notes.text = (
        "BUSINESS CLOSING:\n"
        "Sub-$10 BOM enables a sub-$30 retail price. "
        "At $29, it's an impulse buy for parents and students before the semester starts. "
        "Plus, university B2B institutional bulk sales provide massive B2B scaling."
    )

    # -------------------------------------------------------------
    # SLIDE 10: CONCLUSION & VISION
    # -------------------------------------------------------------
    s10 = prs.slides.add_slide(blank_layout)
    add_slide_background(s10)

    add_card(s10, Inches(1.2), Inches(1.0), Inches(10.9), Inches(5.5), bg_color=CARD_BG, border_color=GREEN_ACCENT)
    add_badge(s10, Inches(5.6), Inches(1.5), "THE CONCLUSION", GREEN_ACCENT)

    tb = s10.shapes.add_textbox(Inches(1.8), Inches(2.1), Inches(9.7), Inches(3.8))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "\"No student should fail an exam\nbecause of a concrete wall.\""
    p.font.name = "Arial"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE

    p2 = tf.add_paragraph()
    p2.alignment = PP_ALIGN.CENTER
    p2.text = "AuraPod is personal, portable, and ready to transform campus connectivity."
    p2.font.name = "Arial"
    p2.font.size = Pt(18)
    p2.font.bold = True
    p2.font.color.rgb = CYAN_ACCENT
    p2.space_before = Pt(16)

    p3 = tf.add_paragraph()
    p3.alignment = PP_ALIGN.CENTER
    p3.text = "Next Steps: Campus hostel beta testing | Provisional patent for folded metamaterial mesh"
    p3.font.name = "Arial"
    p3.font.size = Pt(14)
    p3.font.color.rgb = TEXT_MUTED
    p3.space_before = Pt(20)

    p4 = tf.add_paragraph()
    p4.alignment = PP_ALIGN.CENTER
    p4.text = "THANK YOU  •  Q&A"
    p4.font.name = "Arial"
    p4.font.size = Pt(22)
    p4.font.bold = True
    p4.font.color.rgb = GREEN_ACCENT
    p4.space_before = Pt(24)

    notes = s10.notes_slide.notes_text_frame
    notes.text = (
        "FINAL PUNCHLINE:\n"
        "'No student should ever fail a course simply because their desk was placed next to a concrete wall. "
        "With AuraPod, we turn 1 bar of frustration into academic flow. Thank you, and we are ready for your questions!'"
    )

    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, "..", "pitch", "AuraPod_Pitch_Deck.pptx")
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    create_deck()
