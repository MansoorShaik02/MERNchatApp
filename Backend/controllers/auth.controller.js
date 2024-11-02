import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import genToken from "../utils/generateToken.js"

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmpassword, gender } = req.body
        // if (password !== confirmpassword) {
        //     return res.status(400).json({ error: "Passwords don't match" })
        // }
        const existuser = await User.findOne({ username })
        if (existuser) {
            return res.status(400).json({ error: "Username already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)



        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        //HASHPASSWORD
        const newUser = new User({
            fullName, username, password: hashedpassword, gender, profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })


        if (newUser) {
            genToken(newUser._id, res);
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ error: "invalid user data" })
        }
    }

    catch (error) {
        console.log("error in signup controller", error.message)
        res.status(500).json({ error: "Internal server error" })
    }

}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" })
        }

        genToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in login : ", error.message)
        res.status(500).json({ error: "internal server error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })

    } catch (error) {
        console.log("Error in logout: ", error.message)
        res.status(500).json({ error: "internal server error" })

    }
}