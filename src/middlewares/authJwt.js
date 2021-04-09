import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) return res.status(403).json({message: "Token no ha sido proporcionado."});

        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, {password: 0});
        if (!user) return res.status(404).json({message: 'El usuario no existe.'});

        next();

    } catch (error) {
        return res.status(401).json({message: "Sin autorización."});
    }
};

export const isAgent = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});

    for (let i = 0; i < roles.length; i++) {
        
        if (roles[i].name === "moderator" || roles[i].name === "admin") {
            next();
            return; 
        }
    }

    return res.status(403).json({message: "No cuentas con el nivel de acceso solicitado."});
}

