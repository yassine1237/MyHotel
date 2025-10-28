package com.yassin.hotelManager.repository;

import com.yassin.hotelManager.model.Reservation;
import com.yassin.hotelManager.model.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByRoomId(Long roomId);

    Optional<Reservation> findByConfirmationCode(String confirmationCode);

    List<Reservation> findByGuestEmail(String email);

    List<Reservation> findByStatus(ReservationStatus status);
}
