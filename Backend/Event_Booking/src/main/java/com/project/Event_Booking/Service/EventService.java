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

    public Event createAnEvent(Event event) {
        return eventRepository.save(event);
    }

    public Optional<Event> findEventById(Integer id) {
        return eventRepository.findById(id);
    }
}
