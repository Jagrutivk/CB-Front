import React from 'react';
import { Card } from 'react-bootstrap';

const SearchResults = ({ searchResults }) => {
    return (
        <Card>
            <Card.Body>
                <h4>Search Results</h4>
                <ul>
                    {searchResults.map(member => (
                        <li key={member.id}>{member.name}</li>
                    ))}
                </ul>
            </Card.Body>
        </Card>
    );
}

export default SearchResults;
