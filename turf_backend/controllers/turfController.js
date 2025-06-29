// //turfController.js
const dotenv=require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Turf = require("../models/turf");
const TurfEvents = require("../models/turfevents");
const fetch = require('node-fetch');

const getCoordinatesFromAddress = async (address) => {
  const apiKey = process.env.GEOCODING_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry;
    return [lng, lat];
  }
  throw new Error('Unable to geocode address');
};




// const addTurfWithEvents = async (req, res) => {
//   try {
//     const user = req.user;
//     const {
//       turfname,
//       address,
//       court,
//       price,
//       availability,
//       events,
//     } = req.body;

//     // Validate
//     if (!turfname || !address || !court || isNaN(Number(price)) || availability === undefined) {
//       return res.status(400).json({ message: "Missing or invalid required fields" });
//     }

//     const parsedPrice = Number(price);
//     const parsedAvailability = availability === 'true' || availability === true;

//     let parsedEvents = [];
//     try {
//       parsedEvents = JSON.parse(events);
//     } catch (e) {
//       return res.status(400).json({ message: "Invalid events format" });
//     }

//     // Get coordinates from address
//     const coordinates = await getCoordinatesFromAddress(address);

//     // ⚠️ Use req.files.heroimg instead of req.file
//     const heroimg = req.files?.heroimg?.[0]
//       ? `/uploads/turfs/${req.files.heroimg[0].filename}`
//       : "";

//     // 🧠 Add image paths to each event
//     const eventImages = req.files?.eventimgs || [];

//     const parsedEventsWithImgs = parsedEvents.map((event, index) => {
//       const imgPath = eventImages[index]
//         ? `/uploads/turfs/${eventImages[index].filename}`
//         : "";
//       return { ...event, img: imgPath };
//     });

//     // Create Turf
//     const newTurf = await Turf.create({
//       turfname,
//       address,
//       location: {
//         type: "Point",
//         coordinates,
//       },
//       heroimg,
//       court,
//       price: parsedPrice,
//       availability: parsedAvailability,
//       createdBy: {
//         role: user.role,
//         id: user.id,
//       },
//     });

//     // Create associated events
//     const newTurfevent = await TurfEvents.create({
//       turf: newTurf._id,
//       turfname: newTurf.turfname,
//       events: parsedEventsWithImgs,
//     });

//     return res.status(201).json({
//       message: "Turf and events added successfully",
//       turf: newTurf,
//       events: newTurfevent,
//     });

//   } catch (err) {
//     console.error("Error adding turf:", err);
//     res.status(500).json({ error: err.message });
//   }
// };




// const addEventsToTurf = async (req, res) => {
//   try {
//     const { turfId, name, type, price, img } = req.body;

//     // Validate required fields
//     if (!turfId || !name || !type || !price || !img) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     // Check if turf exists
//     const turf = await Turf.findById(turfId);
//     if (!turf) {
//       return res.status(404).json({ message: "Turf not found" });
//     }

//     // Check if event record already exists for the turf
//     let turfEvent = await TurfEvents.findOne({ turf: turfId });

//     const newEvent = { name, type, price, img };

//     if (turfEvent) {
//       // Add new event to existing document
//       turfEvent.events.push(newEvent);
//       await turfEvent.save();
//     } else {
//       // Create a new Turfevent document
//       turfEvent = new TurfEvents({
//         turf: turfId,
//         events: [newEvent]
//       });
//       await turfEvent.save();
//     }

//     return res.status(201).json({
//       message: "Event added successfully",
//       turfEvent
//     });

//   } catch (error) {
//     console.error("Error adding event:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };








//get all event of one turf



//working

// const addTurfWithEvents = async (req, res) => {
//   try {
//     const user = req.user;
//     const {
//       turfname,
//       address,
//       court,
//       price,
//       availability,
//       events,
//     } = req.body;

//     if (!turfname || !address || !court || isNaN(Number(price)) || availability === undefined) {
//       return res.status(400).json({ message: "Missing or invalid required fields" });
//     }

//     const parsedPrice = Number(price);
//     const parsedAvailability = availability === 'true' || availability === true;

//     let parsedEvents = [];
//     try {
//       parsedEvents = JSON.parse(events);
//     } catch (e) {
//       return res.status(400).json({ message: "Invalid events format" });
//     }

//     const coordinates = await getCoordinatesFromAddress(address);

//     const heroimg = req.files?.heroimg?.[0]?.path || "";

//     const eventImages = req.files?.eventimgs || [];

//     const parsedEventsWithImgs = parsedEvents.map((event, index) => {
//       const imgPath = eventImages[index]?.path || "";
//       return { ...event, img: imgPath };
//     });

//     const newTurf = await Turf.create({
//       turfname,
//       address,
//       location: {
//         type: "Point",
//         coordinates,
//       },
//       heroimg,
//       court,
//       price: parsedPrice,
//       availability: parsedAvailability,
//       createdBy: {
//         role: user.role,
//         id: user.id,
//       },
//     });

//     const newTurfevent = await TurfEvents.create({
//       turf: newTurf._id,
//       turfname: newTurf.turfname,
//       events: parsedEventsWithImgs,
//     });

//     return res.status(201).json({
//       message: "Turf and events added successfully",
//       turf: newTurf,
//       events: newTurfevent,
//     });

//   } catch (err) {
//     console.error("Error adding turf:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// const addEventsToTurf = async (req, res) => {
//   try {
//     const { turfId, name, type, price } = req.body;
//     const img = req.file ? `/uploads/events/${req.file.filename}` : null;

//     if (!turfId || !name || !type || !price || !img) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const turf = await Turf.findById(turfId);
//     if (!turf) return res.status(404).json({ message: "Turf not found" });

//     let turfEvent = await TurfEvents.findOne({ turf: turfId });

//     const newEvent = { name, type, price, img };

//     if (turfEvent) {
//       turfEvent.events.push(newEvent);
//       await turfEvent.save();
//     } else {
//       turfEvent = new TurfEvents({ turf: turfId, events: [newEvent] });
//       await turfEvent.save();
//     }

//     return res.status(201).json({ message: "Event added successfully", turfEvent });
//   } catch (error) {
//     console.error("Error adding event:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// working
// const addEventsToTurf = async (req, res) => {
//   try {
//     const { turfId, name, type, price } = req.body;
//     const img = req.file?.path || null;

//     if (!turfId || !name || !type || !price || !img) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const turf = await Turf.findById(turfId);
//     if (!turf) return res.status(404).json({ message: "Turf not found" });

//     let turfEvent = await TurfEvents.findOne({ turf: turfId });

//     const newEvent = { name, type, price, img };

//     if (turfEvent) {
//       turfEvent.events.push(newEvent);
//       await turfEvent.save();
//     } else {
//       turfEvent = new TurfEvents({ turf: turfId, events: [newEvent] });
//       await turfEvent.save();
//     }

//     return res.status(201).json({ message: "Event added successfully", turfEvent });
//   } catch (error) {
//     console.error("Error adding event:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


// nowexisting
// const addTurfWithEvents = async (req, res) => {
//   try {
//     const user = req.user;
//     const {
//       turfname,
//       address,
//       court,
//       price,
//       availability,
//       events,
//     } = req.body;

//     if (!turfname || !address || !court || isNaN(Number(price)) || availability === undefined) {
//       return res.status(400).json({ message: "Missing or invalid required fields" });
//     }

//     const parsedPrice = Number(price);
//     const parsedAvailability = availability === 'true' || availability === true;

//     let parsedEvents = [];
//     try {
//       parsedEvents = JSON.parse(events);
//     } catch (e) {
//       return res.status(400).json({ message: "Invalid events format" });
//     }

//     const coordinates = await getCoordinatesFromAddress(address);

//     // ✅ Use Cloudinary URL
//     const heroimg = req.files?.heroimg?.[0]?.secure_url || "";

//     const eventImages = req.files?.eventimgs || [];

//     const parsedEventsWithImgs = parsedEvents.map((event, index) => {
//       const imgPath = eventImages[index]?.secure_url || "";
//       return { ...event, img: imgPath };
//     });

//     const newTurf = await Turf.create({
//       turfname,
//       address,
//       location: {
//         type: "Point",
//         coordinates,
//       },
//       heroimg, // ✅ full Cloudinary URL
//       court,
//       price: parsedPrice,
//       availability: parsedAvailability,
//       createdBy: {
//         role: user.role,
//         id: user.id,
//       },
//     });

//     const newTurfevent = await TurfEvents.create({
//       turf: newTurf._id,
//       turfname: newTurf.turfname,
//       events: parsedEventsWithImgs,
//     });

//     return res.status(201).json({
//       message: "Turf and events added successfully",
//       turf: newTurf,
//       events: newTurfevent,
//     });

//   } catch (err) {
//     console.error("Error adding turf:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// adding
const addTurfWithEvents = async (req, res) => {
  try {
    const user = req.user;
    const {
      turfname,
      address,
      court,
      price,
      availability,
      events,
    } = req.body;

    if (!turfname || !address || !court || isNaN(Number(price)) || availability === undefined) {
      return res.status(400).json({ message: "Missing or invalid required fields" });
    }

    const parsedPrice = Number(price);
    const parsedAvailability = availability === 'true' || availability === true;

    let parsedEvents = [];
    try {
      parsedEvents = JSON.parse(events);
    } catch (e) {
      return res.status(400).json({ message: "Invalid events format" });
    }

    const coordinates = await getCoordinatesFromAddress(address);

    // ✅ Use Cloudinary .path (NOT secure_url)
    const heroimg = req.files?.heroimg?.[0]?.path || "";

    const eventImages = req.files?.eventimgs || [];

    // ✅ Use .path for each event image
    const parsedEventsWithImgs = parsedEvents.map((event, index) => {
      const imgPath = eventImages[index]?.path || "";
      return { ...event, img: imgPath };
    });

    // ✅ Create Turf
    const newTurf = await Turf.create({
      turfname,
      address,
      location: {
        type: "Point",
        coordinates,
      },
      heroimg,
      court,
      price: parsedPrice,
      availability: parsedAvailability,
      createdBy: {
        role: user.role,
        id: user.id,
      },
    });

    // ✅ Create Events for Turf
    const newTurfevent = await TurfEvents.create({
      turf: newTurf._id,
      turfname: newTurf.turfname,
      events: parsedEventsWithImgs,
    });

    return res.status(201).json({
      message: "Turf and events added successfully",
      turf: newTurf,
      events: newTurfevent,
    });

  } catch (err) {
    console.error("Error adding turf:", err);
    res.status(500).json({ error: err.message });
  }
};

// const addEventsToTurf = async (req, res) => {
//   try {
//     const { turfId, name, type, price } = req.body;
//     const img = req.file?.secure_url || null; // ✅ use Cloudinary URL

//     if (!turfId || !name || !type || !price || !img) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const turf = await Turf.findById(turfId);
//     if (!turf) return res.status(404).json({ message: "Turf not found" });

//     let turfEvent = await TurfEvents.findOne({ turf: turfId });

//     const newEvent = { name, type, price, img };

//     if (turfEvent) {
//       turfEvent.events.push(newEvent);
//       await turfEvent.save();
//     } else {
//       turfEvent = new TurfEvents({ turf: turfId, events: [newEvent] });
//       await turfEvent.save();
//     }

//     return res.status(201).json({ message: "Event added successfully", turfEvent });
//   } catch (error) {
//     console.error("Error adding event:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

const addEventsToTurf = async (req, res) => {
  try {
    const { name, type, price } = req.body;
    const { turfId } = req.params;
    const img = req.file?.path || null; // ✅ FIXED

    console.log("Incoming Add Event:", { name, type, price, turfId });
    console.log("File:", req.file);

    if (!name || !type || !price || !img) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const turf = await Turf.findById(turfId);
    if (!turf) return res.status(404).json({ message: "Turf not found" });

    let turfEvent = await TurfEvents.findOne({ turf: turfId });
    const newEvent = { name, type, price, img };

    if (turfEvent) {
      turfEvent.events.push(newEvent);
      await turfEvent.save();
    } else {
      turfEvent = new TurfEvents({ turf: turfId, events: [newEvent] });
      await turfEvent.save();
    }

    return res.status(201).json({ message: "Event added successfully", turfEvent });

  } catch (error) {
    console.error("Error adding event:", error);
    return res.status(500).json({ message: "Server error" });
  }
};




const getEventsByTurf = async (req, res) => {
  try {
    const { turfId } = req.params;

    const turfEvent = await TurfEvents.findOne({ turf: turfId }).populate('turf');

    if (!turfEvent) {
      return res.status(404).json({ message: "No events found for this turf" });
    }

    return res.status(200).json({
      message: "Events fetched successfully",
      turfname: turfEvent.turf?.turfname, // 👈 Extract from populated turf
      location:turfEvent.turf?.location,
      address: turfEvent.turf?.address,
      price: turfEvent.turf?.price,
      heroimg: turfEvent.turf?.heroimg,
      events: turfEvent.events,
    });

  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

//update event of turf


// const updateTurfEvent = async (req, res) => {
//   try {
//     const { turfId, eventId } = req.params;
//     const { name, type, price } = req.body;
//     const img = req.file ? `/uploads/events/${req.file.filename}` : undefined;

//     if (!mongoose.Types.ObjectId.isValid(turfId) || !mongoose.Types.ObjectId.isValid(eventId)) {
//       return res.status(400).json({ message: "Invalid Turf or Event ID" });
//     }

//     const turfEventDoc = await TurfEvents.findOne({ turf: turfId });
//     if (!turfEventDoc) {
//       return res.status(404).json({ message: "Turfevent not found" });
//     }

//     const eventToUpdate = turfEventDoc.events.id(eventId);
//     if (!eventToUpdate) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     if (name) eventToUpdate.name = name;
//     if (type) eventToUpdate.type = type;
//     if (price) eventToUpdate.price = price;
//     if (img) eventToUpdate.img = img;

//     await turfEventDoc.save();

//     return res.status(200).json({ message: "Turf event updated successfully", event: eventToUpdate });
//   } catch (error) {
//     console.error("Error updating turf event:", error.message);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
// existing
// const updateTurfEvent = async (req, res) => {
//   try {
//     const { turfId, eventId } = req.params;
//     const { name, type, price } = req.body;
//     const img = req.file?.path;

//     if (!mongoose.Types.ObjectId.isValid(turfId) || !mongoose.Types.ObjectId.isValid(eventId)) {
//       return res.status(400).json({ message: "Invalid Turf or Event ID" });
//     }

//     const turfEventDoc = await TurfEvents.findOne({ turf: turfId });
//     if (!turfEventDoc) {
//       return res.status(404).json({ message: "Turfevent not found" });
//     }

//     const eventToUpdate = turfEventDoc.events.id(eventId);
//     if (!eventToUpdate) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     if (name) eventToUpdate.name = name;
//     if (type) eventToUpdate.type = type;
//     if (price) eventToUpdate.price = price;
//     if (img) eventToUpdate.img = img;

//     await turfEventDoc.save();

//     return res.status(200).json({ message: "Turf event updated successfully", event: eventToUpdate });
//   } catch (error) {
//     console.error("Error updating turf event:", error.message);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// adding
const updateTurfEvent = async (req, res) => {
  try {
    const { turfId, eventId } = req.params;
    const { name, type, price } = req.body;

    const imgUrl = req.file?.path; // ✅ Cloudinary image URL

    if (!mongoose.Types.ObjectId.isValid(turfId) || !mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid Turf or Event ID" });
    }

    const turfEventDoc = await TurfEvents.findOne({ turf: turfId });
    if (!turfEventDoc) {
      return res.status(404).json({ message: "Turfevent not found" });
    }

    const eventToUpdate = turfEventDoc.events.id(eventId);
    if (!eventToUpdate) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (name) eventToUpdate.name = name;
    if (type) eventToUpdate.type = type;
    if (price) eventToUpdate.price = price;
    if (imgUrl) eventToUpdate.img = imgUrl;

    await turfEventDoc.save();

    return res.status(200).json({
      message: "Turf event updated successfully",
      event: eventToUpdate
    });
  } catch (error) {
    console.error("Error updating turf event:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



// const updateTurf = async (req, res) => {
//   try {
//     const { turfId } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(turfId)) {
//       return res.status(400).json({ message: "Invalid Turf ID" });
//     }

//     const updates = {
//       turfname: req.body.turfname,
//       address: req.body.address,
//       court: req.body.court,
//       price: req.body.price,
//       availability: req.body.availability === 'true',
//     };

//     // Use provided coordinates, or geocode if missing
//     if (req.body.coordinates) {
//       updates.location = {
//         type: 'Point',
//         coordinates: JSON.parse(req.body.coordinates),
//       };
//     } else if (req.body.address) {
//       const coords = await getCoordinatesFromAddress(req.body.address);
//       updates.location = {
//         type: 'Point',
//         coordinates: coords,
//       };
//     }

//     if (req.files?.heroimg?.[0]) {
//       updates.heroimg = `/uploads/turfs/${req.files.heroimg[0].filename}`;
//     }

//     const updatedTurf = await Turf.findByIdAndUpdate(turfId, updates, { new: true });

//     if (!updatedTurf) {
//       return res.status(404).json({ message: "Turf not found" });
//     }

//     res.status(200).json({ message: "Turf updated successfully", turf: updatedTurf });
//   } catch (error) {
//     console.error("Error updating turf:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

const updateTurf = async (req, res) => {
  try {
    const { turfId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(turfId)) {
      return res.status(400).json({ message: "Invalid Turf ID" });
    }

    const updates = {
      turfname: req.body.turfname,
      address: req.body.address,
      court: req.body.court,
      price: req.body.price,
      availability: req.body.availability === 'true',
    };

    if (req.body.coordinates) {
      updates.location = {
        type: 'Point',
        coordinates: JSON.parse(req.body.coordinates),
      };
    } else if (req.body.address) {
      const coords = await getCoordinatesFromAddress(req.body.address);
      updates.location = {
        type: 'Point',
        coordinates: coords,
      };
    }

    if (req.files?.heroimg?.[0]) {
      updates.heroimg = req.files.heroimg[0].path;
    }

    const updatedTurf = await Turf.findByIdAndUpdate(turfId, updates, { new: true });

    if (!updatedTurf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    res.status(200).json({ message: "Turf updated successfully", turf: updatedTurf });
  } catch (error) {
    console.error("Error updating turf:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteTurfEvent = async (req, res) => {
  try {
    const { turfId, eventId } = req.params;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(turfId) || !mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid turf or event ID" });
    }

    // Find the turfevent document
    const turfEventDoc = await TurfEvents.findOne({ turf: turfId });

    if (!turfEventDoc) {
      return res.status(404).json({ message: "Turf event record not found" });
    }

    // Find and remove the event
    const eventToDelete = turfEventDoc.events.id(eventId);
    if (!eventToDelete) {
      return res.status(404).json({ message: "Event not found in this turf" });
    }

     // Remove the event by filtering
     turfEventDoc.events = turfEventDoc.events.filter(event => event._id.toString() !== eventId);
     await turfEventDoc.save();
 
    return res.status(200).json({
      message: "Event deleted successfully",
      remainingEvents: turfEventDoc.events
    });
  } catch (error) {
    console.error("Error deleting turf event:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteTurfAndEvents = async (req, res) => {
  const turfId = req.params.turfId;

  try {
    // Check if the Turf exists
    const turf = await Turf.findById(turfId);
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    // Delete all events linked to the turf
    await TurfEvents.deleteMany({ turf: turfId });

    // Delete the turf itself
    await Turf.findByIdAndDelete(turfId);

    res.status(200).json({ message: "Turf and its events deleted successfully" });
  } catch (error) {
    console.error("Error deleting turf and events:", error);
    res.status(500).json({ message: "Server error while deleting turf and events" });
  }
};

const getAllTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(turfs);
  } catch (err) {
    console.error("Error fetching turfs:", err);
    res.status(500).json({ message: "Server error while fetching turfs" });
  }
};
  
const getMngrTurfs = async (req, res) => {
  try {
    const managerId = req.user.id;
const turfs = await Turf.find({ "createdBy.role": "manager", "createdBy.id": managerId }).sort({ createdAt: -1 });

    res.status(200).json(turfs);
  } catch (err) {
    console.error("Error fetching turfs:", err);
    res.status(500).json({ message: "Server error while fetching turfs" });
  }
};



// const searchTurfs = async (req, res) => {
//   try {
//     const { turfname, address, event, minPrice, maxPrice } = req.query;

//     // Step 1: Find all turfevents that match the event name and price range (if given)
//     let turfeventFilter = {};
//     if (event || minPrice || maxPrice) {
//       turfeventFilter.events = {};

//       if (event) {
//         turfeventFilter["events.name"] = { $regex: event, $options: "i" };
//       }

//       if (minPrice || maxPrice) {
//         turfeventFilter["events.price"] = {};
//         if (minPrice) turfeventFilter["events.price"].$gte = Number(minPrice);
//         if (maxPrice) turfeventFilter["events.price"].$lte = Number(maxPrice);
//       }
//     }

//     let turfIdsFromEvents = [];
//     if (Object.keys(turfeventFilter).length > 0) {
//       const matchingEvents = await TurfEvents.find(turfeventFilter).select("turf");
//       turfIdsFromEvents = matchingEvents.map(ev => ev.turf.toString());
//     }

//     // Step 2: Build Turf search filter
//     let turfFilter = {};

//     if (turfname) {
//       turfFilter.turfname = { $regex: turfname, $options: "i" };
//     }

//     if (address) {
//       turfFilter.address = { $regex: address, $options: "i" };
//     }

//     if (turfIdsFromEvents.length > 0) {
//       turfFilter._id = { $in: turfIdsFromEvents };
//     }

//     // Step 3: Query Turf collection with filters
//     const turfs = await Turf.find(turfFilter);

//     res.status(200).json(turfs);
//   } catch (error) {
//     console.error("Search error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const searchTurfs = async (req, res) => {
  try {
    const { turfname, address, event, minPrice, maxPrice } = req.query;

    let turfIdsFromEvents = [];

    if (event || minPrice || maxPrice) {
      const turfeventFilter = {};

      if (event) {
        turfeventFilter["events.name"] = { $regex: event, $options: "i" };
      }

      if (minPrice || maxPrice) {
        turfeventFilter["events.price"] = {};
        if (minPrice) turfeventFilter["events.price"].$gte = Number(minPrice);
        if (maxPrice) turfeventFilter["events.price"].$lte = Number(maxPrice);
      }

      const matchingEvents = await TurfEvents.find(turfeventFilter).select("turf");
      turfIdsFromEvents = matchingEvents.map(ev => ev.turf.toString());
    }

    const turfFilter = {};

    if (turfname) {
      turfFilter.turfname = { $regex: turfname, $options: "i" };
    }

    if (address) {
      turfFilter.address = { $regex: address, $options: "i" };
    }

    // Only apply event filter if it was used in query
    if ((event || minPrice || maxPrice) && turfIdsFromEvents.length > 0) {
      turfFilter._id = { $in: turfIdsFromEvents };
    }

    // If event filter was used but NO turf matched, return early
    if ((event || minPrice || maxPrice) && turfIdsFromEvents.length === 0) {
      return res.status(200).json([]); // No matches
    }

    const turfs = await Turf.find(turfFilter);
    res.status(200).json(turfs);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { addTurfWithEvents,addEventsToTurf, getEventsByTurf,updateTurfEvent,updateTurf,
  deleteTurfEvent,deleteTurfAndEvents, getAllTurfs,getMngrTurfs, searchTurfs  };
