import { Schema, model } from 'mongoose'

const eventSchema = new Schema({
    name: String,
    initDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Event', eventSchema);