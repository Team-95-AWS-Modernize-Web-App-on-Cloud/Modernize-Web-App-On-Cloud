package com.project.Event_Booking.Entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "Event_Booking")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event_Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    @ManyToOne
//    @JoinColumn(name = "event_id")
//    private Event event;

    @Column(name = "event_id")
    private Integer eventId;

    @Column(name = "user_id")
    private Integer userId;

    public Event_Booking(Integer eventId, Integer userId) {
        this.eventId = eventId;
        this.userId = userId;
    }
}
