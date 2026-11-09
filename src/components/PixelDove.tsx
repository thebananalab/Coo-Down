// Sprites de paloma pixel art.
import isolation from "@/assets/Pigeon_Isolation.png";
import floating from "@/assets/Pigeon_Floating_Edit.png";
import preening from "@/assets/Pigeon_Preening.png";
import display from "@/assets/Pigeon_Display.png";
import styleTransfer from "@/assets/Image_Style_Transfer.png";

const SPRITES = [isolation, floating, preening, display, styleTransfer];

export function PixelDove({
  pose = 0,
  flip = false,
  className = "",
}: {
  pose?: number;
  flip?: boolean;
  className?: string;
}) {
  const src = SPRITES[pose % SPRITES.length] ?? SPRITES[0]!;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className}
      style={{
        imageRendering: "pixelated",
        transform: flip ? "scaleX(-1)" : undefined,
        display: "block",
        width: "100%",
        height: "auto",
      }}
    />
  );
}
