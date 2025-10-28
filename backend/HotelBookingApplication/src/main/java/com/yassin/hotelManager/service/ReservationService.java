package com.yassin.hotelManager.service;

import com.yassin.hotelManager.exception.InvalidBookingRequestException;
import com.yassin.hotelManager.exception.ResourceNotFoundException;
import com.yassin.hotelManager.model.Reservation;
import com.yassin.hotelManager.model.ReservationStatus;
import com.yassin.hotelManager.model.Room;
import com.yassin.hotelManager.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService implements IReservationService {
    private final ReservationRepository reservationRepository;
    private final IRoomService roomService;

    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public List<Reservation> getReservationsByUserEmail(String email) {
        return reservationRepository.findByGuestEmail(email);
    }

    @Override
    public void cancelReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));
        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> getReservationsByRoomId(Long roomId) {
        return reservationRepository.findByRoomId(roomId);
    }

    @Override
    public String createReservation(Long roomId, Reservation reservationRequest) {
        if (reservationRequest.getCheckOutDate().isBefore(reservationRequest.getCheckInDate())) {
            throw new InvalidBookingRequestException("Check-in date must come before check-out date");
        }

        Room room = roomService.getRoomById(roomId).orElseThrow(
                () -> new ResourceNotFoundException("Room not found")
        );

        // Check availability with entity method
        if (!room.isAvailable(reservationRequest.getCheckInDate(), reservationRequest.getCheckOutDate())) {
            throw new InvalidBookingRequestException("Room not available for selected dates");
        }

        room.addReservation(reservationRequest);
        reservationRequest.setStatus(ReservationStatus.CONFIRMED);
        reservationRepository.save(reservationRequest);

        return reservationRequest.getConfirmationCode();
    }

    @Override
    public Reservation findByConfirmationCode(String confirmationCode) {
        return reservationRepository.findByConfirmationCode(confirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No reservation found with code: " + confirmationCode));
    }
}
