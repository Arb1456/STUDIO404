/**
 * Teardown guide (/teardown): where every piece of studio equipment goes back.
 * Linked from the rental pre-booking email and the door-code text.
 *
 * `where` is what the renter reads after tapping an item. Leave it '' until André
 * confirms the spot: items with no `where` are hidden from the page (never guess).
 * `photo` is an optional Cloudinary ID showing the spot.
 * Inventory matches components/pages/EquipmentPage.tsx.
 */
export interface TeardownItem {
    name: string;
    where: string;
    photo?: string;
}

export interface TeardownGroup {
    id: string;
    title: string;
    /** One line shown under the group title. */
    summary: string;
    items: TeardownItem[];
}

export const RESET_FEE = 25;

const CABINETS = 'Back in the light cabinets.';
const WALL = 'Back on the modifier wall.';
const STANDS = 'Back with the other C-stands, all placed together.';

export const TEARDOWN_GROUPS: TeardownGroup[] = [
    {
        id: 'lights',
        title: 'Lights',
        summary: 'Every light goes back in the cabinets.',
        items: [
            { name: 'Godox SK400ii strobes (3)', where: CABINETS },
            { name: 'Godox MS300 strobes (2)', where: CABINETS },
            { name: 'Godox XT-16 trigger', where: '' },
            { name: 'Amaran 200d', where: CABINETS },
            { name: 'Godox SL100d (2)', where: CABINETS },
            { name: 'Neewer 70bi', where: CABINETS },
            { name: 'Godox SL60bi', where: CABINETS },
            { name: 'Neewer 660 RGB panels (4)', where: CABINETS },
            { name: 'KinoFlo FIX-4804 (2)', where: CABINETS },
        ],
    },
    {
        id: 'modifiers',
        title: 'Softboxes & Modifiers',
        summary: 'Softboxes, strip boxes, grids and umbrellas go back on the wall.',
        items: [
            { name: '60 x 90 cm softboxes + grids (2)', where: WALL },
            { name: '30 x 160 cm strip boxes + grids (2)', where: WALL },
            { name: '20 x 90 cm strip boxes + grids (2)', where: WALL },
            { name: '95 cm octabox + grid', where: WALL },
            { name: '55 x 55 cm softbox + grid', where: WALL },
            { name: 'Umbrellas', where: WALL },
            { name: 'Optical projector snoots (2)', where: '' },
        ],
    },
    {
        id: 'stands',
        title: 'Stands',
        summary: 'All C-stands placed together.',
        items: [
            { name: '12 ft C-stands (4)', where: STANDS },
            { name: 'Rolling 10 ft C-stand', where: STANDS },
            { name: '10 ft light tripods (3)', where: '' },
            { name: 'Overhead boom arm (wall mounted)', where: '' },
        ],
    },
    {
        id: 'grip',
        title: 'Grip, Clamps & Cables',
        summary: 'Sandbags, clamps, cables and tape.',
        items: [
            { name: 'Sandbags', where: '' },
            { name: 'A-clamps, super clamps, duckbill and mini clamps', where: '' },
            { name: 'Power cords and trigger cables', where: '' },
            { name: 'Gaffer and electrical tape', where: '' },
            { name: 'Ladders', where: '' },
        ],
    },
    {
        id: 'reflectors',
        title: 'Reflectors, V-Flats & Gels',
        summary: 'Bounce, flags and colour.',
        items: [
            { name: 'V-flats (black/white)', where: '' },
            { name: '5-in-1 reflector kit', where: '' },
            { name: 'Bounce cards', where: '' },
            { name: 'Gels, CTO/CTB rolls and diffusion', where: '' },
        ],
    },
    {
        id: 'backdrops',
        title: 'Seamless Paper',
        summary: 'Paper backdrops and the cyc wall.',
        items: [
            { name: 'Seamless paper rolls', where: '' },
            { name: 'Cyc wall floor', where: 'Remove all tape from the floor and clear any large debris.' },
        ],
    },
    {
        id: 'seating',
        title: 'Seating & Props',
        summary: 'Chairs, stools and props go back where you took them from.',
        items: [
            { name: 'Chairs and stools', where: 'Back exactly where you took them from.' },
            { name: 'Props and decor', where: 'Back exactly where you took them from.' },
        ],
    },
];

/** Items still waiting on a location from André (hidden on the page). */
export const missingLocations = () =>
    TEARDOWN_GROUPS.flatMap((g) => g.items.filter((i) => !i.where.trim()).map((i) => `${g.title}: ${i.name}`));
