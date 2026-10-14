import { events } from "./events-data.js";

const eventCount = document.querySelector("#event-count");
const eventList = document.querySelector("#discovery-events");
const categorySelect = document.querySelector("#categories")


categorySelect.addEventListener("change", function () {
    const selectCategory = categorySelect.value;

    if(selectCategory === "") {
        renderEvents(events);
    }else {
        const filteredEvents = events.filter(function(event){
            return event.tag === selectCategory;
        });

        renderEvents(filteredEvents);
    }
    
});


function createEventCard(event) {

    const card = document.createElement("article");
    card.className = "event-card";
    
    const image = document.createElement("img");
    image.className = "event-cover";
    image.src = event.image;
    image.alt = "";
    
    const content = document.createElement("div");
    content.className = "event-card-content";
    
    const title = document.createElement("h3");
    title.textContent = event.title;
    
    const description = document.createElement("p");
    description.className = "event-summary";
    description.textContent = event.description;
    

    const tag = document.createElement("span");
    tag.className = "event-tag";
    tag.textContent = event.tag;

    const details = document.createElement("p");
    details.className = "event-meta";

    const date = document.createElement("time");
    date.dateTime = event.dueDate;
    date.textContent = event.dueDate;

    const venue = document.createElement("span");
    venue.textContent = event.venue;

    details.append(date, " · " + event.duration + " min", venue);

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
    content.append(tag, title, description, details, actions);
    card.append(image, content);




    return card;
}

function renderEvents(eventArray) {
    eventList.replaceChildren(); 
    
    for (const event of eventArray) {
        const card = createEventCard(event);
        eventList.append(card);
    }

    eventCount.textContent = eventArray.length + " events";
}


renderEvents(events);


const filterForm = document.querySelector("#discovery-filters");
filterForm.addEventListener("reset", function () {
    renderEvents(events);
})
