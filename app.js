// Элементтерді сілтеме бойынша алу
const eventForm = document.getElementById('eventForm');
const eventTitle = document.getElementById('eventTitle');
const eventDate = document.getElementById('eventDate');
const eventList = document.getElementById('eventList');

// Бет жүктелгенде LocalStorage-тегі іс-шараларды көрсету
document.addEventListener('DOMContentLoaded', loadEvents);

// Форма жіберілгенде іс-шара қосу
eventForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = eventTitle.value;
  const date = eventDate.value;

  const newEvent = { id: Date.now(), title, date };

  saveEventToStorage(newEvent);
  addEventToDOM(newEvent);

  // Форманы тазалау
  eventTitle.value = '';
  eventDate.value = '';
});

// Іс-шараны экранға шығару
function addEventToDOM(eventObj) {
  const li = document.createElement('li');
  li.className = "flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-200";
  li.setAttribute('data-id', eventObj.id);

  li.innerHTML = `
    <div>
      <span class="font-semibold text-gray-800">${eventObj.title}</span>
      <span class="text-sm text-gray-500 ml-2">(${eventObj.date})</span>
    </div>
    <button onclick="removeEvent(${eventObj.id})" class="text-red-500 hover:text-red-700 text-sm font-medium">
      Жою
    </button>
  `;

  eventList.appendChild(li);
}

// LocalStorage-ке сақтау
function saveEventToStorage(eventObj) {
  const events = getEventsFromStorage();
  events.push(eventObj);
  localStorage.setItem('schoolEvents', JSON.stringify(events));
}

// LocalStorage-тен оқу
function getEventsFromStorage() {
  const events = localStorage.getItem('schoolEvents');
  return events ? JSON.parse(events) : [];
}

// Бет жүктелгенде деректерді шығару
function loadEvents() {
  const events = getEventsFromStorage();
  events.forEach(eventObj => addEventToDOM(eventObj));
}

// Іс-шараны өшіру
function removeEvent(id) {
  let events = getEventsFromStorage();
  events = events.filter(eventObj => eventObj.id !== id);
  localStorage.setItem('schoolEvents', JSON.stringify(events));

  const itemToRemove = document.querySelector(`[data-id="${id}"]`);
  if (itemToRemove) {
    itemToRemove.remove();
  }
}