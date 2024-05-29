package com.project.Event_Booking.Service;

import com.project.Event_Booking.Entity.Event;
import com.project.Event_Booking.Repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
