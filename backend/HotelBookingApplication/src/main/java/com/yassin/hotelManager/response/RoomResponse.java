package com.yassin.hotelManager.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomResponse {
    private Long id;
    private String roomType;
    private BigDecimal price;
    private int capacity;
    private String description;
    private String photo;
    private List<ReservationResponse> reservations;

    public RoomResponse(Long id, String roomType, BigDecimal price) {
        this.id = id;
        this.roomType = roomType;
        this.price = price;
    }

    public RoomResponse(Long id, String roomType, BigDecimal price, int capacity,
                        String description, byte[] photoBytes, List<ReservationResponse> reservations) {
        this.id = id;
        this.roomType = roomType;
        this.price = price;
        this.capacity = capacity;
        this.description = description;
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
        this.reservations = reservations;
    }
}
