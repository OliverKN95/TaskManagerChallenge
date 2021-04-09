import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import {createRoles} from './libs/initialSetup'
import authRoutes from './routes/auth.routes'
import eventsRoutes from './routes/events.routes'
import usersRoutes from './routes/users.routes'

const app = express();
createRoles();

app.set('pkg', pkg);
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json(
        {
            title: app.get('pkg').name,
            author: app.get('pkg').author,
            description: app.get('pkg').description,
            version: app.get('pkg').version
        }
    );
});

app.use('/api/auth',authRoutes);
app.use('/api/events',eventsRoutes);
app.use('/api/users',usersRoutes);

export default app;

