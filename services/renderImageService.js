import {
  BRAND_COLOR,
  BRAND_LOGO,
  JPEG_QUALITY,
  LOGO_BOX_RADIUS_RATIO,
  LOGO_PADDING_RATIO,
  LOGO_SIZE_RATIO,
  MIN_LOGO_BOX_RADIUS,
  MIN_LOGO_PADDING,
  MIN_LOGO_SIZE,
} from "../config/constant.js";
import { createCanvas, loadImage } from "canvas";
import { createWriteStream, promises as fs } from "fs";
import path from "path";
import { finished } from "stream/promises";
import { fileURLToPath } from "url";

const BRAND_LOGO_FILE = fileURLToPath(new URL(BRAND_LOGO, import.meta.url));

const getLogoVisualOffset = (image) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  const { data, width, height } = ctx.getImageData(
    0,
    0,
    image.width,
    image.height,
  );
  let totalAlpha = 0;
  let weightedX = 0;
  let weightedY = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[(y * width + x) * 4 + 3];

      if (alpha > 0) {
        totalAlpha += alpha;
        weightedX += x * alpha;
        weightedY += y * alpha;
      }
    }
  }

  if (totalAlpha === 0) {
    return {
      xRatio: 0,
      yRatio: 0,
    };
  }

  return {
    xRatio: (width / 2 - weightedX / totalAlpha) / width,
    yRatio: (height / 2 - weightedY / totalAlpha) / height,
  };
};

const getLogoOverlayLayout = (
  animeImage,
  logoAspectRatio,
  logoOffsetXRatio,
  logoOffsetYRatio,
) => {
  const shortSide = Math.min(animeImage.width, animeImage.height);
  const logoHeight = Math.max(
    MIN_LOGO_SIZE,
    Math.floor(shortSide * LOGO_SIZE_RATIO),
  );
  const logoWidth = Math.max(1, Math.round(logoAspectRatio * logoHeight));
  const padding = Math.max(
    MIN_LOGO_PADDING,
    Math.floor(shortSide * LOGO_PADDING_RATIO),
  );
  const boxRadius = Math.max(
    MIN_LOGO_BOX_RADIUS,
    Math.floor(shortSide * LOGO_BOX_RADIUS_RATIO),
  );
  const boxWidth = logoWidth + padding * 2;
  const boxHeight = logoHeight + padding * 2;
  const boxX = animeImage.width - boxWidth;
  const boxY = animeImage.height - boxHeight;
  const logoOffsetX = Math.round(logoWidth * logoOffsetXRatio);
  const logoOffsetY = Math.round(logoHeight * logoOffsetYRatio);

  return {
    boxHeight,
    boxRadius,
    boxWidth,
    boxX,
    boxY,
    logoHeight,
    logoOffsetX,
    logoOffsetY,
    logoWidth,
    logoX: boxX + Math.round((boxWidth - logoWidth) / 2) + logoOffsetX,
    logoY: boxY + Math.round((boxHeight - logoHeight) / 2) + logoOffsetY,
  };
};

const drawTopLeftRadiusBox = (ctx, x, y, width, height, radius) => {
  const limitedRadius = Math.max(0, Math.min(radius, width, height));

  ctx.beginPath();
  ctx.moveTo(x + limitedRadius, y);
  ctx.arcTo(x, y, x, y + limitedRadius, limitedRadius);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x + width, y);
  ctx.closePath();
  ctx.fill();
};

const saveRenderedImage = async (canvas, outputPath) => {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const outputStream = createWriteStream(outputPath);
  const jpegStream = canvas.createJPEGStream({ quality: JPEG_QUALITY });
  await finished(jpegStream.pipe(outputStream));
};

const loadBrandAssets = async () => {
  const brandLogo = await loadImage(BRAND_LOGO_FILE);
  const { xRatio, yRatio } = getLogoVisualOffset(brandLogo);

  return {
    brandLogo,
    logoAspectRatio: brandLogo.width / brandLogo.height,
    logoOffsetXRatio: xRatio,
    logoOffsetYRatio: yRatio,
  };
};

const brandAssetsPromise = loadBrandAssets();

const renderImageService = async (sourcePath, outputPath) => {
  try {
    console.log("renderImageService:", "Render Start:", sourcePath);

    // Load Source and Brand Assets
    const [
      animeImage,
      { brandLogo, logoAspectRatio, logoOffsetXRatio, logoOffsetYRatio },
    ] = await Promise.all([loadImage(sourcePath), brandAssetsPromise]);
    const {
      boxHeight,
      boxRadius,
      boxWidth,
      boxX,
      boxY,
      logoHeight,
      logoOffsetX,
      logoOffsetY,
      logoWidth,
      logoX,
      logoY,
    } = getLogoOverlayLayout(
      animeImage,
      logoAspectRatio,
      logoOffsetXRatio,
      logoOffsetYRatio,
    );

    const canvas = createCanvas(animeImage.width, animeImage.height);

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Draw Background
    ctx.drawImage(animeImage, 0, 0);

    // Draw Logo Box
    ctx.fillStyle = BRAND_COLOR;
    drawTopLeftRadiusBox(ctx, boxX, boxY, boxWidth, boxHeight, boxRadius);

    // Draw Logo Overlay
    ctx.drawImage(
      brandLogo,
      0,
      0,
      brandLogo.width,
      brandLogo.height,
      logoX,
      logoY,
      logoWidth,
      logoHeight,
    );

    console.log(
      "renderImageService:",
      "Logo Box:",
      `box=${boxWidth}x${boxHeight}`,
      `radius=${boxRadius}`,
      `logo=${logoWidth}x${logoHeight}`,
      `logoOffset=${logoOffsetX},${logoOffsetY}`,
      `position=${boxX},${boxY}`,
    );

    // Save Rendered Image
    await saveRenderedImage(canvas, outputPath);

    console.log("renderImageService:", "Render Success:", outputPath);
  } catch (error) {
    console.error("renderImageService:", "Render Error:", error);
    throw error;
  }
};
export default renderImageService;
