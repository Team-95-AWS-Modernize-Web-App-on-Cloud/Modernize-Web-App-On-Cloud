package com.project.Event_Booking.Repository;

import com.project.Event_Booking.Entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {
}
