package com.project.Event_Booking.Controller;

import com.project.Event_Booking.Entity.Event;
import com.project.Event_Booking.Entity.ValidateJwtResponse;
import com.project.Event_Booking.Service.EventService;
import com.project.Event_Booking.Service.ValidateJwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final ValidateJwtService validateJwtService;
    private static final Logger LOGGER = LoggerFactory.getLogger(EventController.class);

    @GetMapping("/events")
    public Mono<ResponseEntity<?>> getAllEvents(HttpServletRequest request) {
        String jwt = request.getHeader("Authorization"); // assuming JWT is passed in Authorization header
        LOGGER.info("jwt is {}", jwt);
        return validateJwtService.validateJwt(jwt).flatMap(validateJwtResponse -> {
            if (validateJwtResponse.getStatusCode().is2xxSuccessful()) {
                // If JWT is valid, proceed with fetching events
                List<Event> events = eventService.findAllEvents();
                return Mono.just(ResponseEntity.ok(Map.of("events", events)));
            } else {
                // If JWT is not valid, return the response from the validate-jwt API
                return Mono.just(validateJwtResponse);

            }
        });
    }


    @PostMapping("/events")
    public Mono<ResponseEntity<?>> createAnEvent(@RequestBody Event event, HttpServletRequest request) {

        String jwt = request.getHeader("Authorization");

        return validateJwtService.validateJwt(jwt).flatMap(validateJwtResponse -> {
            if (validateJwtResponse.getStatusCode().is2xxSuccessful()) {
                // If JWT is valid, proceed with fetching events
                Optional<Event> createdEvent = eventService.createAnEvent(event);
                if(!createdEvent.isPresent()) {
                    return Mono.just(ResponseEntity.status(HttpStatus.CONFLICT).body("Event already exists"));
                }
                return Mono.just(ResponseEntity.ok(Map.of("createdEvent", createdEvent.get())));
            } else {
                // If JWT is not valid, return the response from the validate-jwt API
                return Mono.just(validateJwtResponse);

            }
        });

    }

    @GetMapping("/events/{id}")
    public Mono<ResponseEntity<?>> findEventById(@PathVariable Integer id, HttpServletRequest request) {

        String jwt = request.getHeader("Authorization");

        return validateJwtService.validateJwt(jwt).flatMap(validateJwtResponse -> {
            if (validateJwtResponse.getStatusCode().is2xxSuccessful()) {
                // If JWT is valid, proceed with fetching events
                Optional<Event> foundEvent = eventService.findEventById(id);
                return foundEvent.map(event -> Mono.just(ResponseEntity.ok(Map.of("foundEvent", event)))).orElseGet(() -> Mono.just(ResponseEntity.notFound().build()));
            } else {
                // If JWT is not valid, return the response from the validate-jwt API
                return Mono.just(validateJwtResponse);

            }
        });

    }

    @DeleteMapping("/events/{id}")
    public Mono<ResponseEntity<?>> deleteEventById(@PathVariable Integer id, HttpServletRequest request) {

        String jwt = request.getHeader("Authorization");

        return validateJwtService.validateJwt(jwt).flatMap(validateJwtResponse -> {
            if (validateJwtResponse.getStatusCode().is2xxSuccessful()) {
                // If JWT is valid, proceed with fetching events
                Optional<Event> foundEvent = eventService.findEventById(id);
                if(!foundEvent.isPresent()) {
                    return Mono.just(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "This Event does not exist")));
                }
                eventService.deleteEventById(id);
                return Mono.just(ResponseEntity.ok(Map.of("deletedEventId", id)));
            } else {
                // If JWT is not valid, return the response from the validate-jwt API
                return Mono.just(validateJwtResponse);

            }
        });
    }
}
