// Navbar.js
import React from 'react';
import { Menu, Container } from 'semantic-ui-react';  
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <Menu inverted>
            <Container>
                <Link to={'/'}>
                    <Menu.Item name="starwars" />
                </Link>
                <Link to={'/people'}> {/* Fixed typo */}
                    <Menu.Item name="people" />
                </Link>
                <Link to={'/planets'}> {/* Fixed typo */}
                    <Menu.Item name="planets" />
                </Link>
            </Container>
        </Menu>
    );
}
