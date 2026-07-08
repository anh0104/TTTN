/**
 * sharedFields.js
 *
 * Shared Puck field definitions injected into every component in puckConfig.jsx.
 *
 * Fix notes:
 *  - Radio option values MUST be strings (not booleans) to avoid Puck's internal
 *    CollisionObserver calling .toString() on undefined when computing droppable IDs.
 *  - `type: 'custom'` requires a `render` function; without one Puck crashes.
 *    All colour pickers are `type: 'text'` so editors can type any CSS value.
 */

// ---------------------------------------------------------------------------
// Constants (exported for use in render helpers or other modules)
// ---------------------------------------------------------------------------

/** Background type options */
export const BACKGROUND_TYPES = [
    { value: 'color', label: 'Màu đơn (Color)' },
    { value: 'gradient', label: 'Gradient' },
    { value: 'image', label: 'Hình ảnh (Image)' },
    { value: 'image+gradient', label: 'Hình + Gradient' },
    { value: 'image+color', label: 'Hình + Màu' }
];

/** Gradient direction options */
export const GRADIENT_DIRECTIONS = [
    { value: 'to right', label: '→ To Right' },
    { value: 'to left', label: '← To Left' },
    { value: 'to bottom', label: '↓ To Bottom' },
    { value: 'to bottom right', label: '↘ To Bottom Right' },
    { value: 'to bottom left', label: '↙ To Bottom Left' }
];

/** Animation preset names */
export const ANIMATION_TYPES = [
    { value: 'none', label: 'Không' },
    { value: 'fadeIn', label: 'Fade In' },
    { value: 'fadeInUp', label: 'Fade In Up' },
    { value: 'fadeInDown', label: 'Fade In Down' },
    { value: 'slideInLeft', label: 'Slide In Left' },
    { value: 'slideInRight', label: 'Slide In Right' },
    { value: 'zoomIn', label: 'Zoom In' },
    { value: 'bounceIn', label: 'Bounce In' }
];

// ---------------------------------------------------------------------------
// Shared Puck field definitions
// Spread into a component's `fields` object via { ...SHARED_FIELDS }.
// ---------------------------------------------------------------------------
export const SHARED_FIELDS = {
    // ── 1. ANIMATE ──────────────────────────────────────────────────────────
    animateEnabled: {
        type: 'select',
        label: '🎬 Bật Animation',
        // NOTE: values are STRINGS ('true'/'false') — Puck requires string option values.
        // Convert to boolean in render: animateEnabled === 'true'
        options: [
            { value: 'false', label: 'Tắt' },
            { value: 'true', label: 'Bật' }
        ]
    },
    animationType: {
        type: 'select',
        label: 'Kiểu Animation',
        options: ANIMATION_TYPES
    },
    animateDuration: {
        type: 'number',
        label: 'Duration (ms)',
        min: 100,
        max: 5000,
        step: 100
    },
    animateDelay: {
        type: 'number',
        label: 'Delay (ms)',
        min: 0,
        max: 5000,
        step: 100
    },

    // ── 2. BACKGROUND ────────────────────────────────────────────────────────
    backgroundType: {
        type: 'select',
        label: '🖼️ Kiểu Background',
        options: BACKGROUND_TYPES
    },
    backgroundImage: {
        type: 'text',
        label: 'URL Hình nền'
    },
    // Use type:'text' (not 'custom') — Puck crashes when type:'custom' has no render fn
    backgroundColor: {
        type: 'text',
        label: 'Màu nền (CSS value: #hex, rgb(), rgba())'
    },
    backgroundImageOpacity: {
        type: 'number',
        label: 'Độ mờ hình nền (0–100)',
        min: 0,
        max: 100,
        step: 5
    },

    // ── 3. GRADIENT ──────────────────────────────────────────────────────────
    gradientDirection: {
        type: 'select',
        label: '🌈 Hướng Gradient',
        options: GRADIENT_DIRECTIONS
    },
    gradientColorStart: {
        type: 'text',
        label: 'Màu đầu Gradient'
    },
    gradientColorEnd: {
        type: 'text',
        label: 'Màu cuối Gradient'
    },

    // ── 4. COLORS ────────────────────────────────────────────────────────────
    textColor: {
        type: 'text',
        label: '🎨 Màu chữ (text color)'
    },
    bgColor: {
        type: 'text',
        label: 'Màu nền section (bg color)'
    },
    buttonColor: {
        type: 'text',
        label: 'Màu nút (button color)'
    },

    // ── 5. BUTTONS ───────────────────────────────────────────────────────────
    buttons: {
        type: 'array',
        label: '🔘 Danh sách Button',
        arrayFields: {
            text: {
                type: 'text',
                label: 'Nội dung button'
            },
            link: {
                type: 'text',
                label: 'Đường dẫn (href)'
            },
            // Use 'select' with string values — radio with booleans causes Puck toString crash
            targetBlank: {
                type: 'select',
                label: 'Mở tab mới',
                options: [
                    { value: 'false', label: 'Không' },
                    { value: 'true', label: 'Có (_blank)' }
                ]
            },
            icon: {
                type: 'text',
                label: 'Icon (emoji hoặc URL)'
            },
            color: {
                type: 'text',
                label: 'Màu button (CSS value)'
            },
            borderRadius: {
                type: 'text',
                label: 'Border Radius (vd: 8px, 9999px)'
            }
        },
        // Safe summary: handles undefined item gracefully
        getItemSummary: (item, i) =>
            (item && item.text) ? item.text : `Button ${(i ?? 0) + 1}`
    }
};

// ---------------------------------------------------------------------------
// Default prop values — spread into every component's `defaultProps`.
// ---------------------------------------------------------------------------
export const SHARED_DEFAULT_PROPS = {
    // Animate — string 'false' not boolean
    animateEnabled: 'false',
    animationType: 'fadeInUp',
    animateDuration: 600,
    animateDelay: 0,

    // Background
    backgroundType: 'color',
    backgroundImage: '',
    backgroundColor: '',
    backgroundImageOpacity: 50,

    // Gradient
    gradientDirection: 'to bottom',
    gradientColorStart: '#1A6B49',
    gradientColorEnd: '#000000',

    // Colors
    textColor: '',
    bgColor: '',
    buttonColor: '',

    // Buttons — empty list by default
    buttons: []
};
