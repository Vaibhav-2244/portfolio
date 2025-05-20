from moviepy.editor import VideoFileClip

# ===== CONFIGURATION =====
input_path = "images/EquiTerra/Equiterra.mp4"
output_path = "images/EquiTerra/Equiterra_compressed.mp4"
target_resolution = (1280, 720)  # Optional: Downscale to 720p
target_bitrate = "800k"          # Lower bitrate means smaller size

def compress_video(input_path, output_path, resolution=None, bitrate="800k"):
    try:
        print("📦 Loading video...")
        clip = VideoFileClip(input_path)

        print("📉 Compressing video...")
        clip_resized = clip.resize(height=resolution[1]) if resolution else clip

        clip_resized.write_videofile(
            output_path,
            bitrate=bitrate,
            audio_codec='aac',
            threads=4,
            preset='ultrafast'
        )

        print(f"✅ Compression complete! File saved as: {output_path}")
    except Exception as e:
        print(f"❌ Error: {e}")

# Run the compression
compress_video(input_path, output_path, target_resolution, target_bitrate)
