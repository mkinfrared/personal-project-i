import React from 'react';

export default function AuditoriumOptions(props) {
	const {id, name} = props.data;

	return (
		<option value={id}>{name}</option>
	)
}