from PIL import Image, ImageDraw, ImageFont
import qrcode


def generate_qr(data, output_path, label, sublabel, fg_color, accent_color):
    qr = qrcode.QRCode(
        version=5,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=12,
        border=2,
    )
    qr.add_data(data)
    qr.make(fit=True)

    qr_img = qr.make_image(fill_color=fg_color, back_color="#ffffff").convert("RGBA")
    w, h = qr_img.size

    # Rounded QR corners
    mask = Image.new("L", qr_img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([(0, 0), qr_img.size], radius=10, fill=255)
    rounded = Image.new("RGBA", qr_img.size, (0, 0, 0, 0))
    rounded.paste(qr_img, mask=mask)
    qr_img = rounded

    canvas_size = 700
    canvas = Image.new("RGBA", (canvas_size, canvas_size), "#ffffff")
    draw = ImageDraw.Draw(canvas)

    qr_x = (canvas_size - w) // 2
    qr_y = (canvas_size - h) // 2
    canvas.paste(qr_img, (qr_x, qr_y), qr_img)

    # Border around QR
    b = 20
    draw.rounded_rectangle(
        [(qr_x - b, qr_y - b), (qr_x + w + b, qr_y + h + b)],
        radius=24,
        outline=accent_color,
        width=6,
    )

    # Fonts
    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 36)
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 18)
    except:
        font_large = font_small = ImageFont.load_default()

    # Label
    bbox = draw.textbbox((0, 0), label, font=font_large)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(
        ((canvas_size - tw) // 2, qr_y + h + b + 20),
        label,
        fill=fg_color,
        font=font_large,
    )

    # Sublabel
    bbox2 = draw.textbbox((0, 0), sublabel, font=font_small)
    tw2 = bbox2[2] - bbox2[0]
    draw.text(
        ((canvas_size - tw2) // 2, qr_y + h + b + 20 + th + 6),
        sublabel,
        fill="#666666",
        font=font_small,
    )

    canvas = canvas.convert("RGB")
    canvas.save(output_path, "JPEG", quality=95)
    print(f"QR saved to {output_path}")


# WhatsApp QR (styled with green theme)
generate_qr(
    data="https://wa.me/8801570277410",
    output_path="src/assets/WhatsApp_QR.jpg",
    label="WhatsApp",
    sublabel="+8801570277410",
    fg_color="#075E54",
    accent_color="#25D366",
)

# WeChat QR (clean, minimal, WeChat green)
# Skipping - user has their own WeChat QR asset
# generate_qr(
#     data="LOVE-AI_2024",
#     output_path="src/assets/WeChat_QR.jpg",
#     label="WeChat",
#     sublabel="LOVE-AI_2024",
#     fg_color="#07C160",
#     accent_color="#07C160",
# )
