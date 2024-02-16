import React from 'react';

const About = () => {
    return (
        <div className="container">
            <h1>About iNote</h1>
            <p>
                iNote is a note-taking application designed to help you organize your thoughts, tasks, and ideas seamlessly across devices. With iNote, you can create, edit, and delete notes effortlessly.
            </p>
            <h2>Features</h2>
            <ul>
                <li>Create and manage notes with ease.</li>
                <li>Organize notes using tags and categories.</li>
                <li>Sync your notes across multiple devices.</li>
                <li>Collaborate with others by sharing notes.</li>
                <li>Search functionality to find notes quickly.</li>
            </ul>
            <h2>Save Notes on Cloud</h2>
            <p>
                iNote leverages cloud storage to ensure your notes are securely stored and accessible from anywhere. By saving your notes on the cloud, you can sync them across devices and never have to worry about losing your important thoughts.
            </p>
            <p>
                We use advanced encryption techniques to protect your data and prioritize user privacy and security.
            </p>
            <h2>Future Enhancements</h2>
            <p>
                In future updates, we plan to introduce additional features such as:
            </p>
            <ul>
                <li>Integration with third-party cloud services.</li>
                <li>Offline access to notes.</li>
                <li>Markdown support for formatting.</li>
                <li>Customizable themes and layouts.</li>
                <li>Reminders and notifications.</li>
            </ul>
            <p>
                We're committed to continuously improving iNote to provide you with the best note-taking experience possible.
            </p>
            <h2>Contact Us</h2>
            <p>
                If you have any feedback, suggestions, or questions, feel free to reach out to us at support@inote.com. We'd love to hear from you!
            </p>
        </div>
    );
};

export default About;
