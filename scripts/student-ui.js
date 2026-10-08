import { loadBookmarks, saveBookmarks } from './bookmarks.js';

const eventList = document.querySelector('#events .event-list');
const cards = Array.from(eventList.querySelectorAll('.event-card'));
const savedList = document.querySelector('#saved-events');
const emptyMessage = document.querySelector('#saved-empty');
const searchInput = document.querySelector('#event-search');
const categoryInput = document.querySelector('#categories');
const sortInput = document.querySelector('#event-sort');
const status = document.querySelector('#ui-status');
const recommendedBookmark = document.querySelector('#recommended-bookmark');
let storage;
try { storage = window.localStorage; } catch { storage = null; }
const initial = loadBookmarks(storage, cards.map(card => card.dataset.eventId));
const savedIds = new Set(initial.ids);

function syncBookmark(button, id, title) {
    const saved = savedIds.has(id);
    button.setAttribute('aria-pressed', String(saved));
    button.setAttribute('aria-label', `${saved ? 'Remove bookmark for' : 'Bookmark'} ${title}`);
}

function renderSavedEvents() {
    savedList.replaceChildren();
    cards.forEach(card => {
        const id = card.dataset.eventId;
        const title = card.querySelector('h3').textContent;
        syncBookmark(card.querySelector('.card-save'), id, title);
        if (savedIds.has(id)) {
            const copy = card.cloneNode(true);
            copy.hidden = false;
            savedList.append(copy);
        }
    });
    emptyMessage.hidden = savedIds.size > 0;
    syncBookmark(recommendedBookmark, 'event-1', 'Campus Careers Fair');
}

function toggleBookmark(id) {
    const card = cards.find(item => item.dataset.eventId === id);
    if (!card) return;
    const title = card.querySelector('h3').textContent;
    const removing = savedIds.has(id);
    if (removing) savedIds.delete(id); else savedIds.add(id);
    const persisted = saveBookmarks(storage, savedIds);
    renderSavedEvents();
    status.textContent = `${title} ${removing ? 'removed from' : 'added to'} My Events.${persisted ? '' : ' Browser storage is unavailable; this change lasts only for this page session.'}`;
}

function updateDiscovery() {
    const query = searchInput.value.toLowerCase();
    const category = categoryInput.value;
    const sorted = [...cards].sort((a, b) => {
        if (sortInput.value === 'popular') return Number(b.dataset.popularity) - Number(a.dataset.popularity);
        if (sortInput.value === 'trending') return Number(b.dataset.trending) - Number(a.dataset.trending);
        const difference = Date.parse(a.dataset.created) - Date.parse(b.dataset.created);
        return sortInput.value === 'oldest' ? difference : -difference;
    });
    let visible = 0;
    sorted.forEach(card => {
        const text = [card.querySelector('h3').textContent, card.querySelector('.event-summary').textContent,
            card.querySelector('.event-meta').textContent, card.dataset.category].join(' ').toLowerCase();
        card.hidden = !(text.includes(query) && (!category || card.dataset.category === category));
        if (!card.hidden) visible++;
        eventList.append(card);
    });
    status.textContent = `${visible} events shown.`;
}

// Delegation also handles cards created later inside My Events.
function handleCardAction(event) {
    const save = event.target.closest('.card-save');
    if (save) {
        const id = save.closest('.event-card').dataset.eventId;
        const wasInSaved = savedList.contains(save);
        toggleBookmark(id);
        if (wasInSaved) {
            const next = savedList.querySelector('.card-save');
            if (next) next.focus();
            else {
                const heading = document.querySelector('#my-events-heading');
                heading.tabIndex = -1;
                heading.focus();
            }
        }
    }
    if (event.target.closest('.card-rsvp')) {
        status.textContent = 'The organiser has not provided a registration link yet.';
    }
}
eventList.addEventListener('click', handleCardAction);
savedList.addEventListener('click', handleCardAction);
recommendedBookmark.addEventListener('click', () => toggleBookmark('event-1'));
document.querySelector('#recommended-rsvp').addEventListener('click', () => {
    document.querySelector('#recommended-status').textContent = 'Registration is not available yet. The organiser needs to add an RSVP link.';
});
searchInput.addEventListener('input', updateDiscovery);
categoryInput.addEventListener('change', updateDiscovery);
sortInput.addEventListener('change', updateDiscovery);

const organizers = [
    { id: 'careers', name: 'Careers Office', logo: 'assets/careers-logo.svg' },
    { id: 'council', name: 'Student Council', logo: 'assets/council-logo.svg' },
    { id: 'sports', name: 'Campus Sports', logo: 'assets/sports-logo.svg' }
];
const profiles = document.querySelector('#organizer-profiles');
organizers.forEach(organizer => {
    const profile = document.createElement('article');
    profile.className = 'organizer-profile';
    const image = document.createElement('img');
    image.src = organizer.logo;
    image.alt = '';
    image.width = 72;
    image.height = 72;
    const name = document.createElement('h3');
    name.textContent = organizer.name;
    const count = document.createElement('p');
    const total = cards.filter(card => card.dataset.organizer === organizer.id).length;
    count.textContent = String(total);
    count.setAttribute('aria-label', `${total} events organised`);
    profile.append(image, name, count);
    profiles.append(profile);
});
renderSavedEvents();
updateDiscovery();
if (initial.error) status.textContent = initial.error;
