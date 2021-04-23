import EventList from 'components/events/EventList';
import EventItem from 'components/events/EventItem';
import EventSearch from 'components/events/EventSearch';

import { getAllEvents } from 'api/NextEventsApi';

export default function AllEvents({ allEvents }) {
  if (!allEvents) {
    <div className="center">
      <p>Loading...</p>
    </div>;
  }

  return (
    <div>
      <EventSearch />
      <EventList>
        <EventItem events={allEvents} />
      </EventList>
    </div>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: { allEvents },
    revalidate: 60,
  };
}
