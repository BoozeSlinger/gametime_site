// Cloudinary image configuration
// Update CLOUDINARY_CLOUD_NAME with your actual cloud name
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'gametime';
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// Responsive image breakpoints for srcSet generation
export const RESPONSIVE_BREAKPOINTS = {
  mobile: 320,
  tablet: 640,
  desktop: 1024,
  wide: 1280,
  xlarge: 1920,
};

// Image quality presets
export const QUALITY_PRESETS = {
  high: 'q_auto:best',
  medium: 'q_auto:good',
  low: 'q_auto:eco',
};

// Generate optimized Cloudinary URL with transformations
export function getCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'high' | 'medium' | 'low';
    crop?: 'fill' | 'fit' | 'thumb' | 'crop';
    gravity?: 'auto' | 'face' | 'center';
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  } = {}
): string {
  const {
    width,
    height,
    quality = 'high',
    crop = 'fill',
    gravity = 'auto',
    format = 'auto',
  } = options;

  const transformations: string[] = [];

  if (width && height) {
    transformations.push(`w_${width},h_${height},c_${crop},g_${gravity}`);
  } else if (width) {
    transformations.push(`w_${width},c_scale`);
  } else if (height) {
    transformations.push(`h_${height},c_scale`);
  }

  transformations.push(QUALITY_PRESETS[quality]);
  transformations.push(`f_${format}`);

  const transformationString = transformations.join('/');
  return `${CLOUDINARY_BASE}/${transformationString}/${publicId}`;
}

// Generate srcSet string for responsive images
export function generateSrcSet(
  publicId: string,
  options: {
    quality?: 'high' | 'medium' | 'low';
    crop?: 'fill' | 'fit' | 'thumb' | 'crop';
    gravity?: 'auto' | 'face' | 'center';
  } = {}
): string {
  return Object.entries(RESPONSIVE_BREAKPOINTS)
    .map(([, width]) => {
      const url = getCloudinaryUrl(publicId, {
        width,
        ...options,
      });
      return `${url} ${width}w`;
    })
    .join(', ');
}

// Quarter section images (homepage)
// Using actual Cloudinary images from gametime folder
export const QUARTER_IMAGES = {
  atmosphere: 'gametime/gm_sportsbar_DUoUjNwkuKx', // 1st Quarter: Where Every Game Comes Alive (1080x1440)
  food: 'gametime/gm_sportsbar_DVU0HLgkQmn', // 2nd Quarter: Food That Hits Different (1080x1440)
  vibes: 'gametime/gm_sportsbar_DVPMzN1kofh', // 3rd Quarter: Your Scene, Your Rules (720x1280)
};

// Bartender profile images (our-girls page)
// Using actual Cloudinary images from gametime folder
export const BARTENDER_IMAGES = {
  sarah: 'gametime/gm_sportsbar_DWcH--Yj638', // (1080x1416)
  jessica: 'gametime/gm_sportsbar_DUrBEYqEnmi', // (1080x1440)
  amanda: 'gametime/gm_sportsbar_DVb4R0zEtuE', // (1080x1440)
};

// Menu item images (organized by category)
// Rotating through available images - 5 images across 16 items
const MENU_IMAGE_ROTATION = [
  'gametime/gm_sportsbar_DUjXyFekmuT', // (640x1136)
  'gametime/gm_sportsbar_DUuRQb9ka-O', // (640x1136)
  'gametime/gm_sportsbar_DU39LVpEtzc', // (640x1136)
  'gametime/gm_sportsbar_DV9QxPlEnvf', // (640x1136)
  'gametime/gm_sportsbar_DWZsGgNEmY3', // (1080x1440)
];

export const MENU_IMAGES = {
  starters: {
    gametimeWings: MENU_IMAGE_ROTATION[0],
    loadedNachos: MENU_IMAGE_ROTATION[1],
    crispyCalamari: MENU_IMAGE_ROTATION[2],
    streetCornDip: MENU_IMAGE_ROTATION[3],
  },
  burgers: {
    blitzBurger: MENU_IMAGE_ROTATION[4],
    crimsonCowboy: MENU_IMAGE_ROTATION[0],
    blackAndBlue: MENU_IMAGE_ROTATION[1],
    mushroomRanchStack: MENU_IMAGE_ROTATION[2],
  },
  cocktails: {
    overtimeOldFashioned: MENU_IMAGE_ROTATION[3],
    crimsonMule: MENU_IMAGE_ROTATION[4],
    thePlaymaker: MENU_IMAGE_ROTATION[0],
    victoryLap: MENU_IMAGE_ROTATION[1],
  },
  shareables: {
    pretzelBoard: MENU_IMAGE_ROTATION[2],
    slidersTrio: MENU_IMAGE_ROTATION[3],
    charcuterieAndCraft: MENU_IMAGE_ROTATION[4],
    flatbreadFlight: MENU_IMAGE_ROTATION[0],
  },
};

// Image dimension presets for different use cases
export const IMAGE_DIMENSIONS = {
  hero: { width: 1920, height: 1080 },
  quarter: { width: 600, height: 600 },
  bartender: { width: 400, height: 500 },
  menuItem: { width: 300, height: 300 },
  thumbnail: { width: 150, height: 150 },
};
