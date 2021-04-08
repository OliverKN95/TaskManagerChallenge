import Event from '../models/Event'

export const createEvent = async (req, res) => {
    
    const {name, initDate, endDate} = req.body;
    const user = req.userId;
    const newEvent = new Event({name, initDate, endDate, user});

    console.log(newEvent);
    const EventSaved = await newEvent.save();

    res.status(201).json(EventSaved);
}

export const getEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
}

export const getEventById = async (req, res) => {
    const event = await Event.findById(req.params.eventId);
    res.status(200).json(event);
}

export const updateEventById = async (req, res) => {
    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.eventId, req.body, {
            new: true
        }
    );
    res.status(200).json(updatedEvent);
}

export const deleteEventById = async (req, res) => {
    const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
    res.status(200).json(deletedEvent);
}