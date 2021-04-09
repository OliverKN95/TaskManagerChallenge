import Event from '../models/Event'

export const createEvent = async (req, res) => {
    
    const {name, initDate, endDate} = req.body;
    const user = req.userId;
    const newEvent = new Event({name, initDate, endDate, user});

    const events = await Event.find({user: {$in: user}});

    
    let inInitDate = new Date(initDate);
    let inEndDate = new Date(endDate);

    for (let i = 0; i < events.length; i++) {
        
        let iDate = new Date(events[i].initDate);
        let eDate = new Date(events[i].endDate);

        if (iDate.getDay() == inInitDate.getDay() && iDate.getMonth() == inInitDate.getMonth() && iDate.getFullYear() == inInitDate.getFullYear()) {
            if (iDate.getHours() == inInitDate.getHours()) {
                return res.status(403).json({ message: "Ya cuentas con un evento guardado en la misma hora de inicio." });
            }
        }
        
        if (eDate.getDay() == inEndDate.getDay() && eDate.getMonth() == inEndDate.getMonth() && eDate.getFullYear() == inEndDate.getFullYear()) {
            if (eDate.getHours() == inEndDate.getHours()) {
                return res.status(403).json({ message: "Ya cuentas con un evento guardado en la misma hora de finalización." });
            }
        }
    }

    console.log(newEvent);
    const EventSaved = await newEvent.save();

    res.status(201).json(EventSaved);
}

export const getEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
}

export const getEventsByUser = async (req, res) => {
    console.log('USER ID ===>',req.params.userId);
    const events = await Event.find({user: req.params.userId});
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