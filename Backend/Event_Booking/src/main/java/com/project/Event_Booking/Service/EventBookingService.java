package com.project.Event_Booking.Service;

import com.project.Event_Booking.Entity.Event_Booking;
import com.project.Event_Booking.Repository.EventBookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventBookingService {

    private final EventBookingRepository eventBookingRepository;

    public String bookAnEvent(Event_Booking event_booking) {
        boolean existBookedEvent = eventBookingRepository.existsByUserIdAndEventId(event_booking.getUserId(), event_booking.getEventId());
        if (existBookedEvent) {
            return "You already booked this Event";
        }
        eventBookingRepository.save(event_booking);
        return "Event is booked Successfully";
    }

//    public Optional<Event_Booking> findEventBookingById(Integer id) {
//
//        Optional<Event_Booking> foundEventBooking = eventBookingRepository.findById(id);
//        if (!foundEventBooking.isPresent()) {
//            return Optional.empty();
//        }
//        return Optional.of(foundEventBooking.get());
//    }
}
