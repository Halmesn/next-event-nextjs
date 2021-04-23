import EventList from 'components/events/EventList';
import EventItem from 'components/events/EventItem';
import { getFeaturedEvents } from 'api/NextEventsApi';

export default function Home({ featuredEvents }) {
  return (
    <div>
      <EventList>
        <EventItem events={featuredEvents} />
      </EventList>
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return { props: { featuredEvents }, revalidate: 1800 };
}
