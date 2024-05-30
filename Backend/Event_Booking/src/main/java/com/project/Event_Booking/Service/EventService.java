package com.project.Event_Booking.Service;

import com.project.Event_Booking.Entity.Event;
import com.project.Event_Booking.Repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<Event> findAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> createAnEvent(Event event) {

        boolean existEvent = eventRepository.existsByEventNameAndEventTime(event.getEventName(), event.getEventTime());
        if(existEvent) {
            return Optional.empty();
        }
        return Optional.of(eventRepository.save(event));
    }

    public Optional<Event> findEventById(Integer id) {
        return eventRepository.findById(id);
    }

    public void deleteEventById(Integer id) {
        eventRepository.deleteById(id);
    }
}
