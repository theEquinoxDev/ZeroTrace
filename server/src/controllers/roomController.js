import RoomModel from "../models/Room.js";
import { v4 as uuidv4 } from "uuid";


export const getRooms = async (req, res) => {
  try {
    const rooms = await RoomModel.find().select("roomId name visibility inviteCode");
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createRoom = async (req, res) => {
  try {
    const { name, visibility, inviteCode } = req.body;
    if (!name || !visibility || !["public", "private"].includes(visibility)) {
      return res.status(400).json({ error: "Invalid room data" });
    }

    const roomId = uuidv4();

    const room = new RoomModel({ roomId, name, visibility, inviteCode });
    await room.save();

    res.status(201).json({ roomId, name, visibility, inviteCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
const { id } = req.params;
const room = await RoomModel.findOne({ roomId: id });
if(!room) {
  return res.status(404).json({message: "Room does not exist"});
}
res.json({
  roomId: room.roomId,
  name: room.name,
  visibility: room.visibility,
  inviteCode: room.inviteCode
});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
