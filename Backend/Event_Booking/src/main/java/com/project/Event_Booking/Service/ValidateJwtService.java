package com.project.Event_Booking.Service;

import com.project.Event_Booking.Entity.ValidateJwtResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ValidateJwtService {

    private final WebClient.Builder builder;
    public Mono<ResponseEntity<?>> validateJwt(String jwt) {
        WebClient webClient = builder.baseUrl("http://localhost:" + "8083").build();

        return webClient.post()
                .uri("/validate-jwt")
                .header(HttpHeaders.AUTHORIZATION, jwt) // set JWT in header
                .exchangeToMono(response -> {
                    return response.bodyToMono(ValidateJwtResponse.class)
                            .map(body -> ResponseEntity.status(response.statusCode()).body(body));
                });
    }
}
