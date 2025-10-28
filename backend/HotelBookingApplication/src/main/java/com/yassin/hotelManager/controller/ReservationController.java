package com.yassin.hotelManager.controller;

import com.yassin.hotelManager.exception.InvalidBookingRequestException;
import com.yassin.hotelManager.exception.ResourceNotFoundException;
import com.yassin.hotelManager.model.Reservation;
import com.yassin.hotelManager.model.Room;
import com.yassin.hotelManager.response.ReservationResponse;
import com.yassin.hotelManager.response.RoomResponse;
import com.yassin.hotelManager.service.IReservationService;
import com.yassin.hotelManager.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reservations")
public class ReservationController {
    private final IReservationService reservationService;
    private final IRoomService roomService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<ReservationResponse>> getAllReservations() {
        return ResponseEntity.ok(
                reservationService.getAllReservations().stream()
                        .map(this::mapToReservationResponse)
                        .toList()
        );
    }

    @PostMapping("/room/{roomId}")
    public ResponseEntity<?> createReservation(@PathVariable Long roomId,
                                               @RequestBody Reservation reservationRequest) {
        try {
            String confirmationCode = reservationService.createReservation(roomId, reservationRequest);
            return ResponseEntity.ok("Reservation successful. Your confirmation code: " + confirmationCode);
        } catch (InvalidBookingRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getReservationByCode(@PathVariable String confirmationCode) {
        try {
            Reservation reservation = reservationService.findByConfirmationCode(confirmationCode);
            return ResponseEntity.ok(mapToReservationResponse(reservation));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<ReservationResponse>> getReservationsByUserEmail(@PathVariable String email) {
        return ResponseEntity.ok(
                reservationService.getReservationsByUserEmail(email).stream()
                        .map(this::mapToReservationResponse)
                        .toList()
        );
    }

    @PutMapping("/{reservationId}/cancel")
    public ResponseEntity<String> cancelReservation(@PathVariable Long reservationId) {
        reservationService.cancelReservation(reservationId);
        return ResponseEntity.ok("Reservation cancelled");
    }

    // --- Helper method ---
    private ReservationResponse mapToReservationResponse(Reservation reservation) {
        Room room = roomService.getRoomById(reservation.getRoom().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        RoomResponse roomResponse = new RoomResponse(
                room.getId(),
                room.getRoomType(),
                room.getPrice()
        );

        return new ReservationResponse(
                reservation.getId(),
                reservation.getCheckInDate(),
                reservation.getCheckOutDate(),
                reservation.getGuestFullName(),
                reservation.getGuestEmail(),
                reservation.getNumOfAdults(),
                reservation.getNumOfChildren(),
                reservation.getTotalGuests(),
                reservation.getConfirmationCode(),
                reservation.getStatus(),
                roomResponse
        );
    }
}
