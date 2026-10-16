import { addEvent, events, storageWarning, deleteEvent, updateEvent } from "./state.js";
import { setupFormValidation } from "./form-validation.js";
import { isValidDuration } from "./validators.js";
import { organizers } from "./events-data.js";
import { sortEvents } from "./sorting.js";
import { compileRegex, highlightMatch } from "./search.js";

if (document.body.dataset.page === "discover") {


const role = sessionStorage.getItem("role");
const isAdmin = role === "admin";

if (isAdmin) {
  document.querySelector("#dashboard-heading").textContent =
    "Manage campus events";
  document.body.classList.add("admin-page");
}

const createEventButton = document.querySelector("#create-event-button");

createEventButton.hidden = !isAdmin;

const eventCount = document.querySelector("#event-count");
const eventList = document.querySelector("#discovery-events");
const categorySelect = document.querySelector("#categories");
const searchInput = document.querySelector("#event-search");
const searchError = document.querySelector("#filter-error");
const ignoreCaseInput = document.querySelector("#ignore-case");
const entrySelect = document.querySelector("#entry-filter");
const sortSelect = document.querySelector("#event-sort");
const emptyMessage = document.querySelector("#events-empty");
document.querySelector("#storage-status").textContent = storageWarning;

function filterEvents() {
  try {
    const pattern = compileRegex(searchInput.value, ignoreCaseInput.checked);
    searchError.textContent = "";

    const filteredEvents = events.filter(function (event) {
      const matchesCategory =
        categorySelect.value === "" || event.tag === categorySelect.value;

      const searchableText =
        event.title +
        " " +
        event.description +
        " " +
        event.tag +
        " " +
        event.venue;

      const matchesSearch = !pattern || pattern.test(searchableText);
      const matchesEntry =
        entrySelect.value === "" ||
        (entrySelect.value === "free" && event.price === 0) ||
        (entrySelect.value === "paid" && event.price > 0);

      return matchesCategory && matchesSearch && matchesEntry;
    });

    renderEvents(sortEvents(filteredEvents, sortSelect.value), pattern);
    searchInput.setAttribute("aria-invalid", "false");
  } catch {
    searchError.textContent =
      "Enter a valid regex pattern. The previous results are still displayed.";
    searchInput.setAttribute("aria-invalid", "true");
  }
}

searchInput.addEventListener("input", filterEvents);
ignoreCaseInput.addEventListener("change", filterEvents);
categorySelect.addEventListener("change", filterEvents);
entrySelect.addEventListener("change", filterEvents);
sortSelect.addEventListener("change", filterEvents);

function createEventCard(event, pattern) {
  const card = document.createElement("article");
  card.className = "event-card";
  card.dataset.eventId = event.id;

  const image = document.createElement("img");
  image.className = "event-cover";
  image.src = event.image || "assets/event-default.svg";
  image.alt = "";

  const content = document.createElement("div");
  content.className = "event-card-content";

  const title = document.createElement("h3");
  if (pattern) {
    highlightMatch(title, event.title, pattern);
  } else {
    title.textContent = event.title;
  }

  const description = document.createElement("p");
  description.className = "event-summary";
  highlightMatch(description, event.description, pattern);

  const tag = document.createElement("span");
  tag.className = "event-tag";
  highlightMatch(tag, event.tag, pattern);

  const details = document.createElement("p");
  details.className = "event-meta";

  const date = document.createElement("time");
  date.dateTime = event.dueDate;
  date.textContent = event.dueDate;

  const venue = document.createElement("span");
  highlightMatch(venue, event.venue, pattern);

  const host = organizers.find(function (organizer) {
    return organizer.id === event.organizerId;
  });
  const organizer = document.createElement("span");
  organizer.textContent = "By " + (host ? host.name : "Campus administration");
  const entry = event.price === 0 ? "Free" : "Paid";
  details.append(
    date,
    " · " + event.duration + " min · " + entry,
    venue,
    organizer,
  );

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const rsvpButton = document.createElement("button");
  rsvpButton.type = "button";
  rsvpButton.className = "button-primary card-rsvp";
  rsvpButton.textContent = "RSVP ↗";
  rsvpButton.disabled = true;

  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.className = "bookmark-button card-save";
  saveButton.setAttribute("aria-label", "Bookmark " + event.title);
  saveButton.setAttribute("aria-pressed", "false");
  saveButton.disabled = true;

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", "1.8");
  icon.setAttribute("aria-hidden", "true");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M6 3h12v18l-6-4-6 4V3Z");

  icon.append(path);
  saveButton.append(icon);

  actions.append(rsvpButton, saveButton);

  if (isAdmin) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "button-secondary";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", "Delete" + event.title);

    deleteButton.addEventListener("click", function () {
      if (!confirm("Delete" + event.title + "?")) return;

      try {
        deleteEvent(event.id);
      } catch {
        document.querySelector("#storage-status").textContent =
          "Could not delete the event.";
        return;
      }
      filterEvents();

      document.querySelector("#storage-status").textContent = "Event deleted.";

      createEventButton.focus();
    });

    actions.append(deleteButton);

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "button-secondary";
    editButton.textContent = "Edit";

    editButton.addEventListener("click", function (){
      editingEvent = event;
      createForm.reset();

      for (const input of createForm.elements) {
        if (input.name && event[input.name] !== undefined) {
          input.value = event[input.name];
        }
      }

      createForm.elements.entry.value = 
        event.price === 0 ? "Free" : "Paid";

      document.querySelector("#create-event").showPopover();
    });

    actions.append(editButton);

  }

  content.append(tag, title, description, details, actions);
  card.append(image, content);

  return card;
}

function renderEvents(eventArray, pattern = null) {
  eventList.replaceChildren();

  for (const event of eventArray) {
    const card = createEventCard(event, pattern);
    eventList.append(card);
  }

  eventCount.textContent =
    eventArray.length + (eventArray.length === 1 ? " event" : " events");
  emptyMessage.hidden = eventArray.length !== 0;
}

filterEvents();

const filterForm = document.querySelector("#discovery-filters");
filterForm.addEventListener("submit", function (event) {
  event.preventDefault();
});
filterForm.addEventListener("reset", function () {
  // Explicit defaults are set before rendering; native reset happens after this event.
  searchInput.value = "";
  categorySelect.value = "";
  entrySelect.value = "";
  sortSelect.value = "trending";
  ignoreCaseInput.checked = true;
  filterEvents();
});

const createForm = document.querySelector("#create-form");

let editingEvent = null;

createEventButton.addEventListener("click", function() {
  editingEvent = null;
  createForm.reset();
});





function saveNewEvent(form) {
  const fields = form.elements;
  const message = form.querySelector("#form-status");
  const paid = fields.entry.value === "Paid";

  if (
    paid &&
    (!isValidDuration(fields.price.value) || Number(fields.price.value) <= 0)
  ) {
    message.textContent = "Enter a valid price greater than zero";
    fields.price.focus();
    return;
  }

  const registrationUrl = fields.registrationUrl.value;

  if (registrationUrl && !/^https?:\/\//i.test(registrationUrl)) {
    message.textContent = "Use an http:// or https:// registration link.";
    fields.registrationUrl.focus();
    return;
  }

  const now = new Date().toISOString();

  const newEvent = {
    id: "rec_" + Date.now() + "_" + Math.random().toString(36).slice(2),
    title: fields.title.value,
    description: fields.description.value,
    dueDate: fields.dueDate.value,
    duration: Number(fields.duration.value),
    tag: fields.tag.value,
    venue: fields.venue.value,
    startTime: fields.startTime.value,
    price: paid ? Number(fields.price.value) : 0,
    registrationUrl: registrationUrl,
    organizerId: "careers",
    image: "assets/event-default.svg",
    popularity: 0,
    recentInterest: 0,
    createdAt: now,
    updatedAt: now,
  };

  try {
    if(editingEvent) {
      for (const name of [
        "id", "createdAt", "image",
        "organizerId", "popularity", "recentInterest"
      ]) {
        newEvent[name] = editingEvent[name];
      }
      updateEvent(newEvent);
    }else {
      addEvent(newEvent);
    }
  } catch {
    message.textContent = "Could not save. Your entered value are kept.";
    return;
  }

  form.reset();
  message.textContent = "";

  searchInput.value = "";
  categorySelect.value = "";
  entrySelect.value = "";
  filterEvents();

  document.querySelector("#create-event").hidePopover();
  document.querySelector("#storage-status").textContent = "Event saved.";
  createEventButton.focus();
}

if (isAdmin) {
  setupFormValidation(createForm, saveNewEvent);
}

}

export function showWeeklyChart() {
  const chart = document.querySelector("#weekly-chart");
  const days = [];
  let highestMinutes = 1;

  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate()- i);

    const date = 
      day.getFullYear() + "-" + 
      String(day.getMonth() + 1).padStart(2, "0") + "-" +
      String(day.getDate()).padStart(2, "0");

      let minutes = 0;

      for (const event of events) {
        if (event.dueDate === date) {
          minutes = minutes + event.duration
        }
      }

      days.push({ date:date, minutes: minutes });

      if (minutes > highestMinutes) {
        highestMinutes = minutes;
      }
  }

  chart.replaceChildren();

  for (const day of days) {
    const row = document.createElement("div");
    row.className = "chart-row";

    const label = document.createElement("span");
    label.textContent = day.date + ":" + day.minutes + "min";

    const bar = document.createElement("progress");
    bar.max = highestMinutes;
    bar.value = day.minutes;
    bar.setAttribute("aria-label", label.textContent);

    row.append(label, bar);
    chart.append(row);
  }
}
