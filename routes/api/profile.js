const express = require('express');
const config = require('config');
const axios = require('axios');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('current_position', 'Position is required').not().isEmpty(),
            check('skills', 'Skills is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            skills,
            current_position,
            headline,
            company,
            location,
            website,
            bio,
            github_username,
            youtube,
            twitter,
            instagram,
            linkedin,
            facebook
        } = req.body;

        const profileFields = {
            user: req.user.id,
            current_position,
            skills: Array.isArray(skills)
                ? skills
                : skills.split(',').map((skill) => ' ' + skill.trim()),
            headline,
            company,
            location,
            website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
            bio,
            github_username
        };

        // Build social object and add to profileFields
        const socialFields = { youtube, twitter, instagram, linkedin, facebook };

        for (const [key, value] of Object.entries(socialFields)) {
            if (value && value.length > 0)
                socialFields[key] = normalize(value, { forceHttps: true });
        }
        profileFields.social = socialFields;

        try {
            // Using upsert option (creates new doc if no match is found):
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true }
            );
            return res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/profile/:user_id
// @desc     Get profile by userId
// @access   Public
router.get(
    '/user/:user_id',
    async ({ params: { user_id } }, res) => {
        try {
            const profile = await Profile.findOne({
                user: user_id
            }).populate('user', ['name', 'avatar']);

            if (!profile) return res.status(400).json({ msg: 'Profile not found' });

            return res.json(profile);
        } catch (err) {
            console.error(err.message);
            if(err.kind == 'ObjectId'){
                return res.status(400).json({ msg: 'Profile not found' });
            }
            return res.status(500).json({ msg: 'Server error' });
        }
    }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove user posts
        // await Post.deleteMany({ user: req.user.id });
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put('/experience',
    [ auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'From date is required and needs to be from the past')
                .not()
                .isEmpty()
                .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(newExp);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/profile/experience/:experience_id
// @desc     Delete experience from profile
// @access   Private
router.delete('/experience/:experience_id', auth,
    async (req,res) => {
        try {
            const foundProfile = await Profile.findOne({ user: req.user.id});
            // Removing by getting index
            // const removeIndex = foundProfile.experience
            //     .map(exp => exp.id)
            //     .indexOf(req.params.experience_id)
            // foundProfile.experience.splice(removeIndex,1);

            // Removing by using filter
            foundProfile.experience = foundProfile.experience.filter((exp) => {
                exp._id.toString() !== req.params.experience_id
                }
            );

            await foundProfile.save();
            return res.status(200).json(foundProfile);
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Sever Error');
        }
    }
);

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put('/education',
    [ auth,
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree or Certificate is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            degree,
            field_of_study,
            from,
            to,
            current,
            description
        } = req.body;

        const newEducation = {
            school,
            degree,
            field_of_study,
            from,
            to,
            current,
            description
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEducation);

            await profile.save();

            res.json(profile);
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/profile/education/:education_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:education_id', auth,
    async (req,res) => {
        try {
            const foundProfile = await Profile.findOne({ user: req.user.id});
            // Removing by getting index
            // const removeIndex = foundProfile.education
            //     .map(exp => exp.id)
            //     .indexOf(req.params.education_id)
            // foundProfile.education.splice(removeIndex,1);

            // Removing by using filter
            foundProfile.education = foundProfile.education.filter((exp) => {
                    exp._id.toString() !== req.params.education_id
                }
            );

            await foundProfile.save();
            return res.status(200).json(foundProfile);
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Sever Error');
        }
    }
);

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public

router.get('/github/:username', async (req, res) => {
    try {
        const uri = encodeURI(
            `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
        );
        const headers = {
            'user-agent': 'node.js',
            Authorization: `token ${config.get('githubToken')}`
        };

        const gitHubResponse = await axios.get(uri, { headers });
        return res.json(gitHubResponse.data);
    } catch (err) {
        console.error(err.message);
        return res.status(404).json({ msg: 'No Github profile found' });
    }
});

module.exports = router;