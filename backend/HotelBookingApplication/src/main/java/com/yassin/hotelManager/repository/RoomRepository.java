package com.yassin.hotelManager.repository;

import com.yassin.hotelManager.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findDistinctRoomTypes();

    @Query("SELECT r FROM Room r WHERE r.roomType = :roomType AND r.id NOT IN " +
            "(SELECT res.room.id FROM Reservation res " +
            "WHERE (res.checkInDate <= :checkOutDate AND res.checkOutDate >= :checkInDate) " +
            "AND res.status = 'CONFIRMED')")
    List<Room> findAvailableRoomsByDatesAndType(
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate,
            @Param("roomType") String roomType);
}
