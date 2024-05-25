import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";

interface Event {
  id: string;
  name: string;
  description: string;
}

const EventCategoryPage: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;

  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!category) return;
    try {
      const response = await fetch(`/api/events/${category}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEvents(data.events);
    } catch (error: any) {
      setError(error.message);
    }
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [category, fetchData]);

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  return (
    <div>
      <p className="p-4 font-semibold">{category}</p>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="p-2">
              <p className="font-semibold">{event.name}</p>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventCategoryPage;
