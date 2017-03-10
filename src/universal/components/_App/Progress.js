import React from 'react';
import pace from './../Plugins/pace/pace';

class Progress extends React.Component {
    componentDidMount() {
        pace.start();
    }

    render() {
        return (null);
    }
}

export default Progress;
