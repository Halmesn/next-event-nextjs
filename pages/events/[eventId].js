import EventSummary from 'components/event-detail/EventSummary';
import EventContent from 'components/event-detail/EventContent';
import EventLogistics from 'components/event-detail/EventLogistics';
import Comments from 'components/input/Comments';

import { getEventById, getFeaturedEvents } from 'utilities/NextEvents';

export default function EventDetail({ event }) {
  if (!event) {
    return <div className="center">Loading...</div>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const eventId = params.eventId;
  const event = await getEventById(eventId);

  if (!event) {
    return { notFound: true };
  }

  return {
    props: { event },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const featuredEvents = await getFeaturedEvents();
  const paths = featuredEvents.map(({ id }) => ({ params: { eventId: id } }));

  return {
    paths,
    fallback: true,
    // fallback: 'blocking', show page when data fully loaded
  };
}
