import User from '../models/userModel.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


class UserController {
    async signUpUser(req, res){
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    
    async signInUser(req, res){
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid user password' });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({ token, user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async changePassword(req, res){
        try {
            const user = await User.findOne({email:req.body.email})
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            const salt = await bcrypt.genSalt(10);
            const newPassword= await bcrypt.hash(req.body.newPassword, salt);
            const updatedUser = await user.updateOne({ password: newPassword }, { new: true });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new UserController();

