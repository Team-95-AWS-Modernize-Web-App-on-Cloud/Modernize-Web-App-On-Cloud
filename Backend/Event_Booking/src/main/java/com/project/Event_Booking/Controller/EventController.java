package com.project.Event_Booking.Controller;

import com.project.Event_Booking.Entity.Event;
import com.project.Event_Booking.Service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping("/events")
    public ResponseEntity<Map<String, List<Event>>> getAllEvents() {
        List<Event> events = eventService.findAllEvents();
        return ResponseEntity.ok(Map.of("events", events));
    }

    @PostMapping("/events")
    public ResponseEntity<Map<String, Event>> createAnEvent(@RequestBody Event event) {
        Event createdEvent = eventService.createAnEvent(event);
        return ResponseEntity.ok(Map.of("createdEvent", createdEvent));
    }
}
