// State management using localStorage for CMS pages

const STORAGE_KEY = 'hexagon_pages';

// Helper: generate a UUID (works in all modern browsers)
function genId() {
    return crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 11);
}

const DEFAULT_PAGES = [
    {
        id: 'seed-page-1',
        title: 'Kiểm thử',
        seoTitle: 'Kiểm thử',
        slug: '/kiem-thu',
        language: 'vi',
        // Seed group so default page can be linked to a translation later
        translationGroupId: 'seed-group-1',
        createdAt: '2026-07-01T00:00:00.000Z',
        updatedAt: '2026-07-01T00:00:00.000Z',
        status: 'published',
        content: {
            content: [
                {
                    type: 'Hero',
                    // Puck 0.22 uses props.id as the componentId in its internal node index.
                    // The id MUST be inside props, not at the top level.
                    props: {
                        id: 'seed-hero-1',
                        title: 'Kiểm thử visual builder',
                        description: 'Trang kiểm thử Puck visual builder cho Hexagon.'
                    }
                }
            ],
            // Use root.props (not top-level root keys) per Puck 0.19+ requirement
            root: { props: {} }
        }
    }
];

// Initialize storage if empty
export function initStore() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PAGES));
        return DEFAULT_PAGES;
    }
    try {
        const list = JSON.parse(data);
        let migrated = false;

        const newList = list.map((item) => {
            let u = { ...item };

            // Migrate: puckData → content
            if ('puckData' in u) {
                u.content = u.puckData;
                delete u.puckData;
                migrated = true;
            }

            // Migrate: publishDate → createdAt/updatedAt
            if ('publishDate' in u && !u.createdAt) {
                u.createdAt = u.publishDate;
                u.updatedAt = u.publishDate;
                delete u.publishDate;
                migrated = true;
            }

            // Migrate: missing timestamps
            if (!u.createdAt) {
                const now = new Date().toISOString();
                u.createdAt = now;
                u.updatedAt = now;
                migrated = true;
            }

            // Migrate: missing translationGroupId (each unpaired page gets its own group)
            if (!u.translationGroupId) {
                u.translationGroupId = genId();
                migrated = true;
            }

            // Migrate: Puck root props format — old: root:{title:'...'}, new: root:{props:{}}
            // Any non-props keys at root level are moved into root.props
            if (u.content && u.content.root && !u.content.root.props) {
                const { ...legacyKeys } = u.content.root;
                u.content = {
                    ...u.content,
                    root: { props: legacyKeys }
                };
                migrated = true;
            }

            // Migrate: content items missing props.id (Puck 0.22 uses props.id as componentId
            // in its internal node index — it must be INSIDE props, not at top level)
            if (u.content && Array.isArray(u.content.content)) {
                let itemMigrated = false;
                const fixedItems = u.content.content.map((item) => {
                    if (!item.props || !item.props.id) {
                        itemMigrated = true;
                        // Preserve any existing top-level _id or generate new UUID
                        const newId = item._id || genId();
                        const { _id, ...rest } = item; // remove stray top-level _id if present
                        return { ...rest, props: { id: newId, ...(item.props || {}) } };
                    }
                    return item;
                });
                if (itemMigrated) {
                    u.content = { ...u.content, content: fixedItems };
                    migrated = true;
                }
            }

            return u;
        });

        if (migrated) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
        }
        return newList;
    } catch (e) {
        console.error('Error parsing pages from localStorage, resetting...', e);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PAGES));
        return DEFAULT_PAGES;
    }
}

export function getPages() {
    return initStore();
}

export function savePages(pages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
}

export function getPageById(id) {
    const pages = getPages();
    return pages.find((p) => p.id === id);
}

export function getPageBySlug(slug, lang) {
    const pages = getPages();
    const normalizedSlug = slug.startsWith('/') ? slug : '/' + slug;
    return pages.find((p) => p.slug === normalizedSlug && p.language === lang);
}

/**
 * Find the translated counterpart of a page.
 * Uses translationGroupId + target language to locate the linked page.
 *
 * @param {string} translationGroupId — shared group id between page pair
 * @param {string} lang — target language ('vi' or 'en')
 * @returns {object|undefined} — the found page or undefined
 */
export function getTranslationByGroupAndLang(translationGroupId, lang) {
    if (!translationGroupId) return undefined;
    const pages = getPages();
    return pages.find(
        (p) => p.translationGroupId === translationGroupId && p.language === lang
    );
}

export function createPage(pageData) {
    const pages = getPages();
    const now = new Date().toISOString();
    const newPage = {
        id: genId(),
        title: pageData.title || 'Untitled Page',
        seoTitle: pageData.seoTitle || pageData.title || 'Untitled Page',
        slug: pageData.slug.startsWith('/') ? pageData.slug : '/' + pageData.slug,
        language: pageData.language || 'vi',
        // Each brand-new page starts its own translation group
        translationGroupId: pageData.translationGroupId || genId(),
        createdAt: now,
        updatedAt: now,
        status: pageData.status || 'published',
        content: pageData.content || { content: [], root: { props: {} } }
    };
    pages.push(newPage);
    savePages(pages);
    return newPage;
}

export function updatePage(id, pageData) {
    let pages = getPages();
    const now = new Date().toISOString();
    pages = pages.map((p) => {
        if (p.id === id) {
            return {
                ...p,
                ...pageData,
                updatedAt: now,
                // Never overwrite these fields
                id,
                createdAt: p.createdAt || now,
                translationGroupId: p.translationGroupId // preserve group link
            };
        }
        return p;
    });
    savePages(pages);
    return pages.find((p) => p.id === id);
}

/**
 * Delete a single page by id.
 * Does NOT cascade-delete the translation counterpart.
 * Each page lives and dies independently.
 *
 * @param {string} id — page id to remove
 */
export function deletePage(id) {
    const pages = getPages();
    const filtered = pages.filter((p) => p.id !== id);
    savePages(filtered);
}

/**
 * Create a translation clone of an existing page.
 *
 * Rules:
 * - Same slug as the original (language field differentiates them)
 * - Same translationGroupId as the original (links the pair)
 * - If a page with the same translationGroupId and target language already exists,
 *   return it without creating a duplicate.
 *
 * @param {string} id — source page id
 * @returns {object|null} — new or existing translation page
 */
export function createTranslation(id) {
    const original = getPageById(id);
    if (!original) return null;

    const targetLang = original.language === 'vi' ? 'en' : 'vi';

    const pages = getPages();

    // Check if translation already exists in the same group
    const existing = pages.find(
        (p) =>
            p.translationGroupId === original.translationGroupId &&
            p.language === targetLang
    );
    if (existing) {
        return existing;
    }

    const now = new Date().toISOString();

    // Clone the page: same slug, same group, different language
    const translated = {
        id: genId(),
        title: `${original.title} (${targetLang.toUpperCase()})`,
        seoTitle: `${original.seoTitle || original.title} (${targetLang.toUpperCase()})`,
        // Keep the SAME slug; language field distinguishes the two pages
        slug: original.slug,
        language: targetLang,
        // Link to the same translation group
        translationGroupId: original.translationGroupId,
        createdAt: now,
        updatedAt: now,
        status: 'draft',
        // Deep clone the Puck content tree so edits are independent
        content: JSON.parse(JSON.stringify(original.content || { content: [], root: { props: {} } }))
    };

    pages.push(translated);
    savePages(pages);
    return translated;
}
