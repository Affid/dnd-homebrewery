import { splitTextStyleAndMetadata } from "../../../shared/helpers.js";
import PropTypes from 'prop-types';

const React = require('react');
const Nav = require('naturalcrit/nav/nav.jsx');

const SyncBrew = ({ updateBrew, trySave, processShareId }) => {

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                const newBrew = {
                    text: fileContent,
                    style: ''
                };
                if (fileContent.startsWith('```metadata')) {
                    splitTextStyleAndMetadata(newBrew); // Modify newBrew directly
                    updateBrew(newBrew);
                    trySave(true);
                } else {
                    alert('This file is invalid, please enter a valid file');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <Nav.dropdown>
            <Nav.item
                className='new'
                color='purple'
                icon='fa-solid fa-rotate'>
                Sync
            </Nav.item>

            <Nav.item color='blue' icon='fas fa-download' href={`/download/${processShareId()}`}>
                Save File
            </Nav.item>

            <Nav.item
                className='fromFile'
                color='purple'
                icon='fa-solid fa-upload'
                onClick={() => {
                    document.getElementById('uploadTxt').click();
                }}>
                <input id='uploadTxt' className='newFromLocal' type='file' onChange={handleFileChange} style={{ display: 'none' }} />
                Update from file
            </Nav.item>
        </Nav.dropdown>
    );
};

SyncBrew.propTypes = {
    updateBrew: PropTypes.func.isRequired,
    trySave: PropTypes.func.isRequired,
    processShareId: PropTypes.func.isRequired,
};

module.exports = {
    item: (props) => <SyncBrew {...props} />
};
