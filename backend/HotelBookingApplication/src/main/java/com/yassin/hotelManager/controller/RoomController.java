package com.yassin.hotelManager.controller;

import com.yassin.hotelManager.exception.PhotoRetrievalException;
import com.yassin.hotelManager.exception.ResourceNotFoundException;
import com.yassin.hotelManager.model.Reservation;
import com.yassin.hotelManager.model.Room;
import com.yassin.hotelManager.response.ReservationResponse;
import com.yassin.hotelManager.response.RoomResponse;
import com.yassin.hotelManager.service.IReservationService;
import com.yassin.hotelManager.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {
    private final IRoomService roomService;
    private final IReservationService reservationService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("price") BigDecimal price,
            @RequestParam("capacity") int capacity,
            @RequestParam("description") String description) throws SQLException, IOException {

        Room savedRoom = roomService.addNewRoom(photo, roomType, price);
        savedRoom.setCapacity(capacity);
        savedRoom.setDescription(description);

        RoomResponse response = new RoomResponse(
                savedRoom.getId(),
                savedRoom.getRoomType(),
                savedRoom.getPrice(),
                savedRoom.getCapacity(),
                savedRoom.getDescription(),
                null,
                List.of()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @GetMapping("/all")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : rooms) {
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            RoomResponse roomResponse = getRoomResponse(room);
            if (photoBytes != null && photoBytes.length > 0) {
                roomResponse.setPhoto(Base64.encodeBase64String(photoBytes));
            }
            roomResponses.add(roomResponse);
        }
        return ResponseEntity.ok(roomResponses);
    }

    @DeleteMapping("/delete/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId) {
        roomService.deleteRoom(roomId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long roomId,
                                                   @RequestParam(required = false) String roomType,
                                                   @RequestParam(required = false) BigDecimal price,
                                                   @RequestParam(required = false) Integer capacity,
                                                   @RequestParam(required = false) String description,
                                                   @RequestParam(required = false) MultipartFile photo) throws SQLException, IOException {

        byte[] photoBytes = photo != null && !photo.isEmpty() ? photo.getBytes()
                : roomService.getRoomPhotoByRoomId(roomId);

        Room theRoom = roomService.updateRoom(roomId, roomType, price, photoBytes);
        if (capacity != null) theRoom.setCapacity(capacity);
        if (description != null) theRoom.setDescription(description);
        if (photoBytes != null && photoBytes.length > 0) {
            theRoom.setPhoto(new SerialBlob(photoBytes));
        }

        RoomResponse roomResponse = getRoomResponse(theRoom);
        return ResponseEntity.ok(roomResponse);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable Long roomId) {
        Optional<Room> theRoom = roomService.getRoomById(roomId);
        return theRoom.map(room -> ResponseEntity.ok(getRoomResponse(room)))
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }

    @GetMapping("/available")
    public ResponseEntity<List<RoomResponse>> getAvailableRooms(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam("roomType") String roomType) throws SQLException {

        List<Room> availableRooms = roomService.getAvailableRooms(checkInDate, checkOutDate, roomType);
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : availableRooms) {
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            RoomResponse roomResponse = getRoomResponse(room);
            if (photoBytes != null && photoBytes.length > 0) {
                roomResponse.setPhoto(Base64.encodeBase64String(photoBytes));
            }
            roomResponses.add(roomResponse);
        }
        if (roomResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(roomResponses);
        }
    }

    // Helper methods
    private RoomResponse getRoomResponse(Room room) {
        List<Reservation> reservations = getAllReservationsByRoomId(room.getId());
        List<ReservationResponse> reservationInfo = reservations.stream()
                .map(reservation -> new ReservationResponse(
                        reservation.getId(),
                        reservation.getCheckInDate(),
                        reservation.getCheckOutDate(),
                        reservation.getConfirmationCode(),
                        reservation.getStatus()
                ))
                .toList();

        byte[] photoBytes = null;
        Blob photoBlob = room.getPhoto();
        if (photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrievalException("Error retrieving photo");
            }
        }

        return new RoomResponse(
                room.getId(),
                room.getRoomType(),
                room.getPrice(),
                room.getCapacity(),
                room.getDescription(),
                photoBytes,
                reservationInfo
        );
    }

    private List<Reservation> getAllReservationsByRoomId(Long roomId) {
        return reservationService.getReservationsByRoomId(roomId);
    }
}
