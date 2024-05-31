package com.project.Event_Booking.Repository;

import com.project.Event_Booking.Entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface EventRepository extends JpaRepository<Event, Integer> {

    boolean existsByEventNameAndEventTime(String eventName, LocalDateTime eventTime);
}
