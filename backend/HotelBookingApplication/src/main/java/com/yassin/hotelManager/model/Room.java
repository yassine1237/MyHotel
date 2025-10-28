package com.yassin.hotelManager.model;

import com.yassin.hotelManager.model.Reservation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomType;
    private BigDecimal price;

    @Lob
    private Blob photo;

    private int capacity;

    private String description;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Reservation> reservations = new ArrayList<>();

    public void addReservation(Reservation reservation) {
        reservations.add(reservation);
        reservation.setRoom(this);
        String bookingCode = RandomStringUtils.randomNumeric(10);
        reservation.setConfirmationCode(bookingCode);
    }

    public boolean isAvailable(LocalDate checkIn, LocalDate checkOut) {
        return reservations.stream().noneMatch(r ->
                r.getStatus() == ReservationStatus.CONFIRMED &&
                        (checkIn.isBefore(r.getCheckOutDate()) && checkOut.isAfter(r.getCheckInDate()))
        );
    }
}
