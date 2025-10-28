package com.yassin.hotelManager.service;

import com.yassin.hotelManager.model.Reservation;

import java.util.List;

public interface IReservationService {
    void cancelReservation(Long reservationId);
    List<Reservation> getReservationsByRoomId(Long roomId);
    String createReservation(Long roomId, Reservation reservationRequest);
    Reservation findByConfirmationCode(String confirmationCode);
    List<Reservation> getAllReservations();
    List<Reservation> getReservationsByUserEmail(String email);
}
