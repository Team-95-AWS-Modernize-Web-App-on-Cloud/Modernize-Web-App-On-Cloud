package com.project.Event_Booking.Repository;

import com.project.Event_Booking.Entity.Event_Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventBookingRepository extends JpaRepository<Event_Booking, Integer> {

    boolean existsByUserIdAndEventId(Integer userId, Integer eventId);
}
