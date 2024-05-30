package com.project.Event_Booking.Controller;

import com.project.Event_Booking.Entity.Event;
import com.project.Event_Booking.Service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    public ResponseEntity<?> createAnEvent(@RequestBody Event event) {
        Optional<Event> createdEvent = eventService.createAnEvent(event);
        if(!createdEvent.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Event already exists");
        }
        return ResponseEntity.ok(Map.of("createdEvent", createdEvent.get()));
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<Map<String, Event>> findEventById(@PathVariable Integer id) {
        Optional<Event> foundEvent = eventService.findEventById(id);
        return foundEvent.map(event -> ResponseEntity.ok(Map.of("foundEvent", event))).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
