export async function getAllEvents() {
  const res = await fetch(
    'https://nextevent-268bd-default-rtdb.firebaseio.com/events.json'
  );
  const jsonData = await res.json();
  const allEvents = [];

  for (const key in jsonData) {
    allEvents.push({
      id: key,
      ...jsonData[key],
    });
  }

  return allEvents;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(dateFilter) {
  const [year, month] = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === +year && eventDate.getMonth() === +month - 1
    );
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
