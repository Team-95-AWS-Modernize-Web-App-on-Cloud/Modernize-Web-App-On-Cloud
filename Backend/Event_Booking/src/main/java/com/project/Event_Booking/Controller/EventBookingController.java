package com.project.Event_Booking.Controller;

import com.project.Event_Booking.Entity.Event;
import com.project.Event_Booking.Entity.Event_Booking;
import com.project.Event_Booking.Entity.ValidateJwtResponse;
import com.project.Event_Booking.Service.EventBookingService;
import com.project.Event_Booking.Service.EventService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class EventBookingController {

    private final EventBookingService eventBookingService;
    private final EventService eventService;
    private final WebClient.Builder builder;

    private Mono<ResponseEntity<?>> validateJwt(String jwt) {
        WebClient webClient = builder.baseUrl("http://localhost:" + "8083").build();

        return webClient.post()
                .uri("/validate-jwt")
                .header(HttpHeaders.AUTHORIZATION, jwt) // set JWT in header
                .exchangeToMono(response -> {
                    return response.bodyToMono(ValidateJwtResponse.class)
                            .map(body -> ResponseEntity.status(response.statusCode()).body(body));
                });
    }

    @PostMapping("/book-event")
    public Mono<ResponseEntity<?>> bookAnEvent(@RequestBody Event_Booking event_booking, HttpServletRequest request) {

        String jwt = request.getHeader("Authorization");

        return validateJwt(jwt).flatMap(validateJwtResponse -> {
            if (validateJwtResponse.getStatusCode().is2xxSuccessful()) {
                // If JWT is valid, proceed with fetching events
                Optional<Event> event = eventService.findEventById(event_booking.getEventId());
                if (!event.isPresent()) {
                    return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "This Event does not exist")));
                }
                Event_Booking bookedEvent = Event_Booking
                        .builder()
                        .userId(event_booking.getUserId()).eventId(event_booking.getEventId()).build();
                String message = eventBookingService.bookAnEvent(bookedEvent);
                if (Objects.equals(message, "You already booked this Event")) {
                    return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", message)));
                }
                return Mono.just(ResponseEntity.status(HttpStatus.CREATED).body(Map.of("bookedEvent", bookedEvent)));

            } else {
                // If JWT is not valid, return the response from the validate-jwt API
                return Mono.just(validateJwtResponse);

            }
        });
    }
}
