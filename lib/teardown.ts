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

const CABINETS = 'Back in the lighting cabinet.';
const WALL = 'Back on the modifier wall.';
const STANDS = 'C-stand storage, to the right of the cyclorama wall. Place all C-stands together.';
const ABOVE_SINK = 'Kitchenette cabinet above the sink.';
const KITCHEN_TOP = 'Kitchenette cabinets, top shelves.';
const BEHIND_COUCH = 'Against the wall behind the couch.';

/** Photo IDs are filled in once André's spot photos are uploaded (see the photo checklist artifact). */
export const TEARDOWN_GROUPS: TeardownGroup[] = [
    {
        id: 'lights',
        title: 'Lights & Cables',
        summary: 'Every light, power cord and cable goes back in the lighting cabinet.',
        items: [
            { name: 'Godox SK400ii strobes (3)', where: CABINETS },
            { name: 'Godox MS300 strobes (2)', where: CABINETS },
            { name: 'Amaran 200d', where: CABINETS },
            { name: 'Godox SL100d (2)', where: CABINETS },
            { name: 'Neewer 70bi', where: CABINETS },
            { name: 'Godox SL60bi', where: CABINETS },
            { name: 'Neewer 660 RGB panels (4)', where: CABINETS },
            { name: 'KinoFlo FIX-4804 (2)', where: CABINETS },
            { name: 'Power cords and cables', where: CABINETS },
            { name: 'Godox XT-16 trigger', where: 'On its Velcro tab, to the left of the backdrop storage.' },
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
            { name: 'Optical projector snoots (2)', where: 'Kitchenette cabinets, above the lights.' },
        ],
    },
    {
        id: 'stands',
        title: 'Stands & Sandbags',
        summary: 'All C-stands placed together in C-stand storage.',
        items: [
            { name: '12 ft C-stands (4)', where: STANDS },
            { name: 'Rolling 10 ft C-stand', where: STANDS },
            { name: 'Light tripods', where: KITCHEN_TOP },
            { name: 'Sandbags', where: 'On the floor to the right of the cyclorama wall, near the C-stand storage.' },
            { name: 'Overhead boom arm', where: 'Stays mounted on the wall. Just swing it back out of the way.' },
        ],
    },
    {
        id: 'grip',
        title: 'Clamps, Tape & Ladders',
        summary: 'Small grip goes in the kitchenette cabinet above the sink.',
        items: [
            { name: 'A-clamps, super clamps, duckbill and mini clamps', where: ABOVE_SINK },
            { name: 'Gaffer and electrical tape', where: ABOVE_SINK },
            { name: 'Ladders', where: 'Beside the change room.' },
        ],
    },
    {
        id: 'reflectors',
        title: 'V-Flats & Reflectors',
        summary: 'Both go against the wall behind the couch.',
        items: [
            { name: 'V-flats (black/white)', where: BEHIND_COUCH },
            { name: '5-in-1 reflector kit', where: BEHIND_COUCH },
        ],
    },
    {
        id: 'backdrops',
        title: 'Seamless Paper & Cyc Wall',
        summary: 'Paper back in storage, cyc floor clear of tape.',
        items: [
            { name: 'Seamless paper rolls', where: 'Back in the seamless paper roll storage area.' },
            { name: 'Cyc wall floor', where: 'Remove all tape from the floor and clear any large debris.' },
        ],
    },
    {
        id: 'seating',
        title: 'Seating & Props',
        summary: 'Stools, ottomans and chairs go under the modifier wall.',
        items: [
            { name: "Stools, ottomans and director's chairs", where: 'Underneath the light modifiers, against the wall.' },
            { name: 'Other props and decor', where: 'Back exactly where you took them from.' },
        ],
    },
    {
        id: 'christmas',
        title: 'Christmas Set',
        summary: 'Please do not touch or move the Christmas set.',
        items: [
            { name: 'Trees, couch, carpet, presents and decor', where: 'Not to be touched. Shoot it exactly as it is.' },
        ],
    },
];

/** Items still waiting on a location from André (hidden on the page). */
export const missingLocations = () =>
    TEARDOWN_GROUPS.flatMap((g) => g.items.filter((i) => !i.where.trim()).map((i) => `${g.title}: ${i.name}`));
