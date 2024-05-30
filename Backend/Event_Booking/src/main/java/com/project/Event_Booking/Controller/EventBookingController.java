package com.project.Event_Booking.Controller;

import com.project.Event_Booking.Entity.Event;
import com.project.Event_Booking.Entity.Event_Booking;
import com.project.Event_Booking.Service.EventBookingService;
import com.project.Event_Booking.Service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class EventBookingController {

    private final EventBookingService eventBookingService;
    private final EventService eventService;

    @PostMapping("/book-event")
    public ResponseEntity<Map<String, ?>> bookAnEvent(@RequestBody Event_Booking event_booking) {
        Optional<Event> event = eventService.findEventById(event_booking.getEventId());
        if (!event.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "This Event does not exist"));
        }
        Event_Booking bookedEvent = Event_Booking
                .builder()
                .userId(event_booking.getUserId()).eventId(event_booking.getEventId()).build();
        String message = eventBookingService.bookAnEvent(bookedEvent);
        if (Objects.equals(message, "You already booked this Event")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", message));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("bookedEvent", bookedEvent));
    }
}
