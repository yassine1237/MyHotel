import { useState } from "react";
import { addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
    capacity: "",
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({
      ...newRoom,
      [name]: name === "roomPrice" ? parseFloat(value) || "" : value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice,
        newRoom.capacity,
        newRoom.description
      );

      if (success) {
        setSuccessMessage("✅ New room added successfully!");
        setNewRoom({
          photo: null,
          roomType: "",
          roomPrice: "",
          capacity: "",
          description: "",
        });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding new room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-2">Add a New Room</h2>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            {/* Room Type */}
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label">Room Type</label>
              <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom} />
            </div>

            {/* Price */}
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label">Room Price (€)</label>
              <input
                required
                type="number"
                className="form-control"
                id="roomPrice"
                name="roomPrice"
                value={newRoom.roomPrice}
                onChange={handleRoomInputChange}
              />
            </div>

            {/* Capacity */}
            <div className="mb-3">
              <label htmlFor="capacity" className="form-label">Capacity</label>
              <input
                required
                type="number"
                className="form-control"
                id="capacity"
                name="capacity"
                value={newRoom.capacity}
                onChange={handleRoomInputChange}
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                required
                id="description"
                name="description"
                className="form-control"
                rows="3"
                value={newRoom.description}
                onChange={handleRoomInputChange}
              />
            </div>

            {/* Photo */}
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">Room Photo</label>
              <input
                required
                name="photo"
                id="photo"
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Room Preview"
                  className="mb-3 mt-2"
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                />
              )}
            </div>

            <div className="d-flex gap-3">
              <Link to="/existing-rooms" className="btn btn-outline-info">Existing Rooms</Link>
              <button type="submit" className="btn btn-outline-primary">Save Room</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddRoom;
