
import { useAtom } from "jotai"

const yPosition = 9999
const BentoUtils = {
    createSection: () => {

        const uid = BentoUtils.generateUniqueId()
        const img = {
            id: uid,
            type: 'section',
            heading: '',
            layout: {
                desktop: {
                    //need to find a gap here. must use cp lol
                    "w": 12,
                    "h": 6,
                    "x": 0,
                    "y": yPosition,
                    "i": uid,
                    "moved": false,
                    "static": false,
                    "minW": 12,
                    "maxW": 12,
                    "minH": 1,
                    "maxH": 100000,
                    'isBounded': true,
                    'isDraggable': true,
                    'isResizable': '',
                    'static': false,
                    'resizeHandles': ['s', 'n']
                },
                mobile: {
                    //need to find a gap here. must use cp lol
                    "w": 12,
                    "h": 6,
                    "x": 0,
                    "y": yPosition,
                    "i": uid,
                    "moved": false,
                    "static": false,
                    "minW": 12,
                    "maxW": 12,
                    "minH": 1,
                    "maxH": 100000,
                    'isBounded': true,
                    'isDraggable': true,
                    'isResizable': '',
                    'static': false,
                    'resizeHandles': ['s', 'n']
                }
            }
        }
        return img
    },
    createImageSection: () => {

        const uid = BentoUtils.generateUniqueId()
        const img = {
            id: uid,
            type: 'image',
            src: '/assets/images/placeholder-image.png',
            layout: {
                desktop: {
                    //need to find a gap here. must use cp lol
                    "w": 6,
                    "h": 6,
                    "x": 0,
                    "y": yPosition,
                    "i": uid,
                    "moved": false,
                    "static": false,
                    "minW": 1,
                    "maxW": 12,
                    "minH": 1,
                    "maxH": 100000,
                    'isBounded': true,
                    'isDraggable': true,
                    'isResizable': '',
                    'static': false,
                    'resizeHandles': ['s', 'w', 'e', 'n']
                },
                mobile: {
                    //need to find a gap here. must use cp lol
                    "w": 6,
                    "h": 6,
                    "x": 0,
                    "y": yPosition,
                    "i": uid,
                    "moved": false,
                    "static": false,
                    "minW": 1,
                    "maxW": 12,
                    "minH": 1,
                    "maxH": 100000,
                    'isBounded': true,
                    'isDraggable': true,
                    'isResizable': '',
                    'static': false,
                    'resizeHandles': ['s', 'w', 'e', 'n']
                }
            }
        }
        return img
    },
    createFormSection: () => {

        const uid = BentoUtils.generateUniqueId()
        const form = {
            'id': uid,
            'type': 'form',
            'form_fields': [],
            'layout': {
                'desktop': {
                    //need to find a gap here. must use cp lol
                    "w": 7,
                    "h": 6,
                    "x": 0,
                    "y": yPosition,
                    "i": uid,
                    "moved": false,
                    "static": false,
                    "minW": 1,
                    "maxW": 12,
                    "minH": 1,
                    "maxH": 100000,
                    'isBounded': true,
                    'isDraggable': true,
                    'isResizable': '',
                    'static': false,
                    'resizeHandles': ['s', 'w', 'e', 'n']
                },
                'mobile': {
                    //need to find a gap here. must use cp lol
                    "w": 7,
                    "h": 6,
                    "x": 0,
                    "y": yPosition,
                    "i": uid,
                    "moved": false,
                    "static": false,
                    "minW": 1,
                    "maxW": 12,
                    "minH": 1,
                    "maxH": 100000,
                    'isBounded': true,
                    'isDraggable': true,
                    'isResizable': '',
                    'static': false,
                    'resizeHandles': ['s', 'w', 'e', 'n']
                }
            }
        }
        return form
    },
    createSocialMediaSection: (social_media) => {

        const uid = BentoUtils.generateUniqueId()
        const social = {
            id: uid,
            type: 'social',
            social_media: social_media,
            link: 'https://media.istockphoto.com/id/1489649103/photo/3d-rendering-of-a-misty-forest-illuminated-by-a-bright-television-surrounded-by-hanging-light.jpg?s=1024x1024&w=is&k=20&c=tJS3VwE2qrJGJvaiD4RdbnuWMV71OczHaAPryGx8MJg=',
            layout: {
                desktop: {
                    "w": 7,
                    "h": 6,
                    "x": 0,
                    "y": yPosition,
                    "i": uid,
                    "moved": false,
                    "static": false,
                    "minW": 1,
                    "maxW": 12,
                    "minH": 1,
                    "maxH": 100000,
                    'isBounded': true,
                    'isDraggable': true,
                    'isResizable': '',
                    'static': false,
                    'resizeHandles': ['s', 'w', 'e', 'n']
                },
                mobile: {
                    "w": 7,
                    "h": 6,
                    "x": 0,
                    "y": yPosition,
                    "i": uid,
                    "moved": false,
                    "static": false,
                    "minW": 1,
                    "maxW": 12,
                    "minH": 1,
                    "maxH": 100000,
                    'isBounded': true,
                    'isDraggable': true,
                    'isResizable': '',
                    'static': false,
                    'resizeHandles': ['s', 'w', 'e', 'n']
                }
            }
        }
        return social
    },
    createText: () => {

        const uid = BentoUtils.generateUniqueId()
        const social = {
            id: uid,
            type: 'text',
            text: '',
            layout: {
                desktop: {
                    "w": 7,
                    "h": 6,
                    "x": 0,
                    "y": yPosition,
                    "i": uid,
                    "moved": false,
                    "static": false,
                    "minW": 1,
                    "maxW": 12,
                    "minH": 1,
                    "maxH": 100000,
                    'isBounded': true,
                    'isDraggable': true,
                    'isResizable': '',
                    'static': false,
                    'resizeHandles': ['s', 'w', 'e', 'n']
                },
                mobile: {
                    "w": 7,
                    "h": 6,
                    "x": 0,
                    "y": yPosition,
                    "i": uid,
                    "moved": false,
                    "static": false,
                    "minW": 1,
                    "maxW": 12,
                    "minH": 1,
                    "maxH": 100000,
                    'isBounded': true,
                    'isDraggable': true,
                    'isResizable': '',
                    'static': false,
                    'resizeHandles': ['s', 'w', 'e', 'n']
                }
            }
        }
        return social
    },
    generateUniqueId: () => {
        // Get the current timestamp
        const timestamp = Date.now();

        // Function to generate a random alphanumeric character
        function getRandomChar() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            return chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Generate a 5-character alphanumeric string
        let randomString = '';
        for (let i = 0; i < 5; i++) {
            randomString += getRandomChar();
        }

        // Concatenate the components to form the unique ID
        const uniqueId = `bento-${timestamp}-${randomString}`;

        return uniqueId;
    },
    createHeadingParagraphSection: () => {

        const uid = BentoUtils.generateUniqueId()
        const form = {
            'id': uid,
            'type': 'heading_paragraph',
            'heading': '',
            'paragraph': '',
            'button_link': '',
            'button_text': '',
            'layout': {
                'desktop': {
                    //need to find a gap here. must use cp lol
                    "w": 7,
                    "h": 6,
                    "x": 0,
                    "y": yPosition,
                    "i": uid,
                    "moved": false,
                    "static": false,
                    "minW": 1,
                    "maxW": 12,
                    "minH": 1,
                    "maxH": 100000,
                    'isBounded': true,
                    'isDraggable': true,
                    'isResizable': '',
                    'static': false,
                    'resizeHandles': ['s', 'w', 'e', 'n']
                },
                'mobile': {
                    //need to find a gap here. must use cp lol
                    "w": 7,
                    "h": 6,
                    "x": 0,
                    "y": yPosition,
                    "i": uid,
                    "moved": false,
                    "static": false,
                    "minW": 1,
                    "maxW": 12,
                    "minH": 1,
                    "maxH": 100000,
                    'isBounded': true,
                    'isDraggable': true,
                    'isResizable': '',
                    'static': false,
                    'resizeHandles': ['s', 'w', 'e', 'n']
                }
            }
        }
        return form
    },
}



export default BentoUtils