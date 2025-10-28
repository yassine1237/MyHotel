import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080"
});

export const getHeader = (isMultipart = false) => {
  const token = localStorage.getItem("token");
  return isMultipart
    ? { Authorization: `Bearer ${token}` }
    : { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
};

/* -------------------- ROOM APIs -------------------- */
export async function addRoom(photo, roomType, price, capacity, description) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("price", price);
  formData.append("capacity", capacity);
  formData.append("description", description);

  const response = await api.post("/rooms/add", formData, {
    headers: getHeader(true), 
  });

  return response.status === 200;
}

export async function getRoomTypes() {
  const response = await api.get("/rooms/types");
  return response.data;
}

export async function getAllRooms() {
  const result = await api.get("/rooms/all");
  return result.data;
}

export async function deleteRoom(roomId) {
  const result = await api.delete(`/rooms/delete/${roomId}`, {
    headers: getHeader(),
  });
  return result.data;
}

export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  if (roomData.roomType) formData.append("roomType", roomData.roomType);
  if (roomData.price) formData.append("price", roomData.price);
  if (roomData.capacity) formData.append("capacity", roomData.capacity);
  if (roomData.description) formData.append("description", roomData.description);
  if (roomData.photo) formData.append("photo", roomData.photo);

  const response = await api.put(`/rooms/update/${roomId}`, formData, {
    headers: getHeader(),
  });
  return response.data;
}

export async function getRoomById(roomId) {
  const result = await api.get(`/rooms/${roomId}`);
  return result.data;
}

export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  const result = await api.get(
    `/rooms/available?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
  );
  return result.data;
}

/* -------------------- RESERVATION APIs -------------------- */
export async function createReservation(roomId, reservation) {
  const response = await api.post(`/reservations/room/${roomId}`, reservation, {
    headers: getHeader()
  });
  return response.data;
}

export async function bookRoom(roomId, bookingData) {
  return createReservation(roomId, bookingData);
}

export async function getAllReservations() {
  const result = await api.get("/reservations/all", { headers: getHeader() });
  return result.data;
}

export async function getReservationByCode(confirmationCode) {
  const result = await api.get(`/reservations/confirmation/${confirmationCode}`, {
    headers: getHeader()
  });
  return result.data;
}

export async function getReservationsByUserEmail(email) {
  const result = await api.get(`/reservations/user/${email}`, { headers: getHeader() });
  return result.data;
}

export async function cancelReservation(reservationId) {
  const result = await api.put(`/reservations/${reservationId}/cancel`, {}, { headers: getHeader() });
  return result.data;
}

/* -------------------- AUTH APIs -------------------- */
export async function registerUser(userData) {
  const response = await api.post("/auth/register-user", userData);
  return response.data;
}

export async function loginUser(loginData) {
  const response = await api.post("/auth/login", loginData);
  return response.data; // contains jwt + roles + email + id
}

/* -------------------- USER APIs -------------------- */
export async function getAllUsers() {
  const response = await api.get("/users/all", { headers: getHeader() });
  return response.data;
}

export async function getUserByEmail(email) {
  const response = await api.get(`/users/${email}`, { headers: getHeader() });
  return response.data;
}

export async function deleteUser(email) {
  const response = await api.delete(`/users/delete/${email}`, { headers: getHeader() });
  return response.data;
}

/* -------------------- ALIASES FOR COMPATIBILITY -------------------- */

// Some older components still use these function names,
// so we add them as simple aliases to avoid import errors.

export async function getBookingsByUserId(email) {
  return getReservationsByUserEmail(email);
}

export async function getUser(email) {
  return getUserByEmail(email);
}

export async function cancelBooking(bookingId) {
  return cancelReservation(bookingId);
}

export async function getAllBookings() {
  return getAllReservations();
}

export async function getBookingByConfirmationCode(confirmationCode) {
  return getReservationByCode(confirmationCode);
}
