package com.yassin.hotelManager.response;

import com.yassin.hotelManager.model.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationResponse {
    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestFullName;
    private String guestEmail;
    private int numOfAdults;
    private int numOfChildren;
    private int totalGuests;
    private String confirmationCode;
    private ReservationStatus status;
    private RoomResponse room;

    public ReservationResponse(Long id, LocalDate checkInDate, LocalDate checkOutDate,
                               String confirmationCode, ReservationStatus status) {
        this.id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.confirmationCode = confirmationCode;
        this.status = status;
    }
}
